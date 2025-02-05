import {
	type IntegrationContext,
	type IntegrationLogger,
	RuntimeError,
} from "@botpress/sdk";
import type { Product } from "./types";
import type { Client } from ".botpress";
import type { Configuration } from ".botpress/implementation/configuration";

import { createClient } from "contentful";
import app, { type Webhook } from "src/gql/app";
import createWebhook from "src/gql/createWebhook";
import deleteWebhook from "src/gql/deleteWebhook";
import { transformProducts } from "./utils";
// import { getUserAndConversation } from './utils'

export async function createOrGetWebhook(
	url: string,
	token: string,
	wyvernURL: string,
): Promise<Webhook> {
	const data = await app(token, wyvernURL);
	const previous = data.app.webhooks.find((webhook) => {
		return webhook.targetUrl === url;
	});

	// Found a webhook with the same URL so no need to create a new one.
	if (previous != null) {
		return previous;
	}

	// New url, new hook.
	const { webhook } = await createWebhook(
		wyvernURL,
		{
			input: {
				asyncEvents: ["ANY_EVENTS"],
				isActive: true,
				name: "Botpress",
				targetUrl: url,
			},
		},
		token,
	);
	return webhook;
}

export async function removeWebhook(
	url: string,
	token: string,
	wyvernURL: string,
): Promise<void> {
	console.log("removeWebhook invoked");
	const data = await app(token, wyvernURL);
	const previous = data.app.webhooks.find((webhook) => {
		return webhook.targetUrl === url;
	});

	// Found a webhook with the same URL so no need to create a new one.
	if (previous != null) {
		console.log("found old webhook, will remove");
		await deleteWebhook(previous.id, token, wyvernURL);
		return;
	}

	console.log("no webhook found");
}

interface productHandlerArgs {
	event: Product;
	client: Client;
	logger: IntegrationLogger;
}

interface checkoutHandlerArgs {
	event: any;
	client: Client;
	ctx: IntegrationContext<Configuration>;
	logger: IntegrationLogger;
}

interface contentfulHandlerArgs {
	entry: any;
	client: Client;
	ctx: IntegrationContext<Configuration>;
	logger: IntegrationLogger;
}

export async function handleProductCreated({
	event,
	logger,
}: productHandlerArgs): Promise<void> {
	logger
		.forBot()
		.debug("handleProductCreated[event]", JSON.stringify(event, null, 2));
}
export async function handleProductUpdated({
	event,
	client,
	logger,
}: productHandlerArgs): Promise<void> {
	try {
		logger
			.forBot()
			.debug("handleProductUpdated[event]", JSON.stringify(event, null, 2));
		const dto = transformProducts(event, logger);

		await client.createEvent({
			type: "productUpdated",
			payload: {
				type: "lush:productUpdated",
				...dto,
			},
		});
	} catch (error) {
		throw new RuntimeError(error);
	}
}

export async function handleProductLaunchUpdated({
	event,
	client,
	logger,
}: productHandlerArgs): Promise<void> {
	try {
		logger
			.forBot()
			.debug(
				"handleProductLaunchUpdated[event]",
				JSON.stringify(event, null, 2),
			);
		const dto = transformProducts(event, logger);

		await client.createEvent({
			type: "productLaunchUpdated",
			payload: {
				type: "lush:productLaunchUpdated",
				...dto,
			},
		});
	} catch (error) {
		throw new RuntimeError(error);
	}
}

export async function handleCheckoutCreated({
	event,
	logger,
}: checkoutHandlerArgs): Promise<void> {
	console.log("Not implemented", event);
	logger
		.forBot()
		.debug("handleCheckoutCreated[event]", JSON.stringify(event, null, 2));
}

export async function handleCheckoutUpdated({
	event,
	client,
	logger,
}: checkoutHandlerArgs): Promise<void> {
	if (!event.checkout.botpressConversationId) {
		return;
	}

	logger
		.forBot()
		.debug("handleCheckoutUpdated[event]", JSON.stringify(event, null, 2));

	const x = await client
		.createMessage({
			type: "text",
			tags: { id: event.checkout.user.externalReference },
			// tags: { id: event.checkout.botpressConversationId },
			payload: {
				text: "Your basket has been updated from integration",
			},
			conversationId: event.checkout.botpressConversationId,
			userId: event.checkout.botpressUserId,
		})
		.catch((error) => {
			logger
				.forBot()
				.error(
					`handleCheckoutUpdated[createMessage[catch]] ~> ${JSON.stringify(error)}`,
				);
		});

	logger.forBot().debug("handleCheckoutUpdated[x] ~>", x);

	// const y = await client.createEvent({
	//   type: 'basketUpdated',
	//   payload: {
	//     id: '94375905845',
	//     checkout: event.checkout
	//   },
	//   conversationId: event.checkout.conversationId,
	//   userId: event.checkout.conversationUser
	// }).catch((error) => {
	//   logger.forBot().error(`checkout updated createEvent ~> ${JSON.stringify(error)}`)
	// })
	// logger.forBot().debug('handleCheckoutUpdated createEvent', y)
	// logger.forBot().debug('handleCheckoutUpdated createEvent stringed', JSON.stringify(y))
}

export async function handleCheckoutPaid({
	event,
}: checkoutHandlerArgs): Promise<void> {
	console.log("Not implemented", event);
}

export async function handleEntryUnpublished({
	entry,
	client,
}: contentfulHandlerArgs): Promise<void> {
	await client.deleteFile({
		id: entry.sys.id,
	});
}

export async function handleEntryPublished({
	entry,
	ctx,
	client,
}: contentfulHandlerArgs): Promise<void> {
	console.log("Not implemented", entry);

	const kbs = {
		spa: ctx.configuration.spaKnowledgeBaseId,
		product: ctx.configuration.productKnowledgeBaseId,
	};

	const contentfulClient = createClient({
		space: ctx.configuration.contentfulSpaceId,
		accessToken: ctx.configuration.contentfulAccessToken,
	});

	const fields = entry.fields!;

	// Each tag represents a potential Knowledge Base to add to.
	for (const tag of entry.metadata.tags) {
		const kb = kbs[tag.sys.id];

		if (!kb) {
			continue;
		}

		let imageUrls: string[] = [];
		let audioUrls: string[] = [];
		let videoUrls: string[] = [];

		if (fields.images) {
			imageUrls = await Promise.all(
				fields.images["en-GB"].map(async (imageRef: any) => {
					const asset = await contentfulClient.getAsset(imageRef.sys.id);
					if (asset.fields.file?.url) {
						return `![${asset.fields.description}](https:${asset.fields.file?.url})`;
					}
					return "";
				}),
			);
		}

		if (fields.audio) {
			audioUrls = await Promise.all(
				fields.audio["en-GB"].map(async (imageRef: any) => {
					const asset = await contentfulClient.getAsset(imageRef.sys.id);
					if (asset.fields.file?.url) {
						return `![${asset.fields.description}](https:${asset.fields.file?.url})`;
					}
					return "";
				}),
			);
		}

		if (fields.videos) {
			videoUrls = await Promise.all(
				fields.videos["en-GB"].map(async (imageRef: any) => {
					const asset = await contentfulClient.getAsset(imageRef.sys.id);
					if (asset.fields.file?.url) {
						return `![${asset.fields.description}](https:${asset.fields.file?.url})`;
					}
					return "";
				}),
			);
		}

		let content: string = fields.content["en-GB"];

		if (imageUrls.length > 0) {
			content += `## Images
${imageUrls.join("\n")}`;
		}

		if (audioUrls.length > 0) {
			content += `## Audio
${audioUrls.join("\n")}`;
		}

		if (videoUrls.length > 0) {
			content += `## Videos
${videoUrls.join("\n")}`;
		}

		await client.uploadFile({
			accessPolicies: [],
			key: `${kb}/${fields.name["en-GB"]}.md`,
			content,
			index: true,
			contentType: "text/markdown; charset=utf-8",
			tags: {
				dsId: entry.sys.id,
				kbId: kb,
				title: fields.name["en-GB"],
				source: "knowledge-base",
			},
		});
	}
}
