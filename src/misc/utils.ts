import type { Conversation } from "@botpress/client";
import type { IntegrationLogger } from "@botpress/sdk";
import type {
	AckFunction,
	Client,
	Product,
	ProductAttribute,
	TransformedProduct,
	TransformedVariant,
} from "./types";

import { INTEGRATION_NAME } from "../const";

export const getTag = (
	tags: Record<string, string>,
	name: string,
): string | undefined => {
	return tags[`${INTEGRATION_NAME}:${name}`];
};

export function getConversationId(conversation: Conversation): number {
	const id = getTag(conversation.tags, "number");

	if (!id) {
		throw Error(`No chat found for conversation ${conversation.id}`);
	}

	return Number(id);
}

export async function ackMessage(
	messageId: number,
	ack: AckFunction,
): Promise<void> {
	await ack({ tags: { id: messageId.toString() } });
}

interface UserConversation {
	userId: string;
	conversationId: string;
}

export const getUserAndConversation = async (
	props: { userId: string; channelId: string | number; channel: string },
	client: Client,
	logger: IntegrationLogger,
): Promise<UserConversation> => {
	const { userId, channelId, channel } = props;
	logger
		.forBot()
		.debug("getUserAndConversation", { userId, channelId, channel });
	const { conversation } = await client.getOrCreateConversation({
		channel: "channel",
		tags: { id: userId },
	});
	logger.forBot().debug("getUserAndConversation", { conversation });

	const { user } = await client.getOrCreateUser({
		tags: {
			id: props.userId,
		},
	});

	logger.forBot().debug("user", user);
	return {
		userId: user.id,
		conversationId: conversation.id,
	};
};

export function stripLastSlash(inputString: string): string {
	// Check if the last character is a forward slash
	if (inputString.endsWith("/")) {
		// If so, remove it and return the modified string
		return inputString.slice(0, -1);
	}
	// Otherwise, return the original string unchanged
	return inputString;
}

function flattenAttributeValues(attribute: ProductAttribute): string[] {
	return attribute.values.map((value) =>
		value.name.replace("&nbsp", "").trim(),
	);
}

export function transformProducts(
	productData: Product,
	logger: IntegrationLogger,
): {
	variants: Record<string, TransformedVariant[]>;
	product: TransformedProduct;
} {
	const channels = ["uk"]; // Channels we support.

	const canonicalData = productData.uk!;

	const transformedProduct: TransformedProduct = {
		commerce_id: canonicalData.id,
		name: canonicalData.name,
		type: canonicalData.type?.values?.[0]?.name || "",
		average_rating: canonicalData.rating,
		description: canonicalData.description,
		// description: EditorJSMarkdownConverter.toMarkdown(
		// 	canonicalData.description,
		// ),
		benefits: flattenAttributeValues(canonicalData.benefits),
		key_ingredients: flattenAttributeValues(canonicalData.key_ingredients),
		moods: flattenAttributeValues(canonicalData.moods),
		scents: flattenAttributeValues(canonicalData.scents),
		certifications: flattenAttributeValues(canonicalData.certifications),
		strapline: flattenAttributeValues(canonicalData.scents)?.[0],
		images: canonicalData.media
			.filter((media) => media.type === "IMAGE")
			.map((media) => ({
				url: media.url,
				description: media.alt,
			})),
	};

	const variants: Record<string, TransformedVariant[]> = {};

	for (const channel in productData) {
		if (productData.hasOwnProperty(channel)) {
			const product = productData[channel];

			if (!product || !product.variants || !channels.includes(channel)) {
				continue;
			}

			// Transform variants
			for (const variant of product.variants) {
				const formattedPrice = new Intl.NumberFormat("en", {
					style: "currency",
					currency: variant.pricing.price.gross.currency,
				}).format(variant.pricing.price.gross.amount);

				const transformedVariant: TransformedVariant = {
					name: [canonicalData.name, variant.name].filter(Boolean).join(": "),
					commerce_id: product.id,
					available: false,
					variant_id: variant.id,
					price: formattedPrice,
				};

				// Get name.
				if (variant.attributes) {
					for (const attribute of variant.attributes) {
						if (attribute.attribute.slug === "display_weight") {
							const weighted = attribute.values.map((value) => value.name)[0];
							if (weighted) {
								transformedVariant.name = [canonicalData.name, weighted]
									.filter(Boolean)
									.join(": ");
							}
							break;
						}
					}
				}

				// Get availability.
				if (variant.attributes) {
					for (const attribute of variant.attributes) {
						if (attribute.attribute.slug === "availability_commerce_web") {
							for (const value of attribute.values) {
								const [channelCode, _, status] = value.slug.split("_");

								if (!channelCode) {
									// Shouldn't happen but #TS.
									continue;
								}

								if (!channels.includes(channelCode)) {
									// Skip if channel unsupported.
									continue;
								}

								if (status === "available") {
									transformedVariant.available = true;
								}
							}
						}
					}
				}

				if (variants[channel]) {
					variants[channel].push(transformedVariant);
				} else {
					variants[channel] = [transformedVariant];
				}
			}
		}
	}

	logger.forBot().debug(variants);

	return { variants, product: transformedProduct };
}
