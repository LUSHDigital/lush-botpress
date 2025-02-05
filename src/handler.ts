import { RuntimeError } from "@botpress/sdk";
import { SALEOR_EVENT_HEADER, SALEOR_SIGNATURE_HEADER } from "./const";
import { handleDirectusProductUpdated } from "./misc/directus/handlers/product";
import { handleDirectusProductLaunchUpdated } from "./misc/directus/handlers/productLaunch";
import { verifyWebhook } from "./misc/hmac";
import {
	handleCheckoutCreated,
	handleCheckoutPaid,
	handleCheckoutUpdated,
	handleEntryPublished,
	handleEntryUnpublished,
	handleProductCreated,
	handleProductUpdated,
} from "./misc/ops";
import type {
	ContentfulResponse,
	DirectusProductPayload,
	DirectusWebhookPayload,
} from "./misc/types";
import type { IntegrationProps } from ".botpress";

export const handler: IntegrationProps["handler"] = async ({
	req,
	logger,
	client,
	ctx,
}) => {
	const { body, headers } = req;

	logger.forBot().debug(JSON.stringify(body, null, 2));

	let platform = "";
	// First, determine which platform to handle.
	if (headers["x-contentful-crn"]) {
		platform = "contentful";
	}

	if (headers["x-platform"] === "directus") {
		platform = "directus";
	}

	if (
		headers[`x-${SALEOR_SIGNATURE_HEADER}`] ||
		headers[SALEOR_SIGNATURE_HEADER]
	) {
		platform = "saleor";
	}

	if (!platform) {
		throw new RuntimeError("Unknown platform");
	}

	if (typeof body !== "string") {
		throw new RuntimeError("Invalid body");
	}

	if (platform === "saleor") {
		// Saleor
		// In Saleor 4 they're dropping x- prefixed headers
		const signature =
			headers[`x-${SALEOR_SIGNATURE_HEADER}`] ||
			headers[SALEOR_SIGNATURE_HEADER];
		const eventName =
			headers[`x-${SALEOR_EVENT_HEADER}`] || headers[SALEOR_EVENT_HEADER] || "";

		if (!(body && signature)) {
			logger.forBot().warn("Body or signature is missing");
			return;
		}
		const { saleorDomain } = ctx.configuration;
		const isVerified = await verifyWebhook(req, saleorDomain, logger);

		if (isVerified === false) {
			logger.forBot().warn("Invalid webhook secret");
			return;
		}

		const event = JSON.parse(body);

		switch (eventName) {
			case "product_created":
				return await handleProductCreated({ event, client, logger });
			case "product_updated":
				return await handleProductUpdated({ event, client, logger });
			case "product_variant_updated":
				return await handleProductUpdated({ event, client, logger });
			case "checkout_created":
				return await handleCheckoutCreated({ event, ctx, logger, client });
			case "checkout_updated":
				return await handleCheckoutUpdated({ event, ctx, client, logger });
			case "checkout_fully_paid":
				return await handleCheckoutPaid({ event, ctx, client, logger });
			default:
				logger.forBot().warn(`No handler for ${eventName}`);
		}
	} else if (platform === "contentful") {
		// Contentful
		if (headers["content-key"] !== ctx.configuration.contentfulKey) {
			logger.forBot().warn("Invalid webhook secret");
			return;
		}

		try {
			const entry = JSON.parse(body!) as ContentfulResponse;
			const eventName = entry.sys.type;

			switch (eventName) {
				case "DeletedEntry":
					return await handleEntryUnpublished({ entry, ctx, client, logger });
				case "Entry":
					return await handleEntryPublished({ entry, ctx, client, logger });
				default:
					logger.forBot().warn(`No handler for ${eventName}`);
			}
		} catch (error) {
			throw new RuntimeError(error);
		}
	} else if (platform === "directus") {
		// Directus
		const entry = JSON.parse(
			body,
		) as DirectusWebhookPayload<DirectusProductPayload>;
		const eventName = entry.event;

		switch (eventName) {
			case "product.items.update":
				return await handleDirectusProductUpdated({
					entry,
					ctx,
					client,
					logger,
				});
			case "productLaunch.items.update":
				return await handleDirectusProductLaunchUpdated({
					entry,
					ctx,
					client,
					logger,
				});
			default:
				logger.forBot().warn(`No handler for ${eventName}`);
		}
	}
};
