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

interface EditorJsBlock {
	id: string;
	type: string;
	data: {
		text: string;
	};
}

interface EditorJsContent {
	time: number;
	blocks: EditorJsBlock[];
	version: string;
}

function convertEditorJsToMarkdown(jsonString: string): string {
	const content: EditorJsContent = JSON.parse(jsonString);

	if (!content) {
		return "";
	}

	return content.blocks
		.map((block) => {
			switch (block.type) {
				case "paragraph":
					return convertParagraphToMarkdown(block.data.text);
				default:
					return "";
			}
		})
		.join("\n\n");
}

function convertParagraphToMarkdown(text: string): string {
	// Convert HTML tags to Markdown equivalents
	return text
		.replace(/<b>(.*?)<\/b>/g, "**$1**") // Bold
		.replace(/<i>(.*?)<\/i>/g, "*$1*") // Italics
		.replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)") // Links
		.replace(/<br>/g, "\n") // Line breaks
		.replace(/&nbsp;/g, " "); // Spaces
}

function flattenAttributeValues(
	attribute: ProductAttribute,
	includeLowerCase = false,
): string[] {
	if (includeLowerCase) {
		const x = attribute.values.map((value) =>
			value.name.replace(/&nbsp;/g, "").trim(),
		);
		const y = [...x, ...x.map((item) => item.toLowerCase())];
		return y;
	}

	return attribute.values.map((value) =>
		value.name.replace(/&nbsp;/g, "").trim(),
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
		name: canonicalData.name.trim(),
		collections: canonicalData.collections.map((collection) =>
			collection.name.trim(),
		),
		type: flattenAttributeValues(canonicalData.type)?.[0]?.toLowerCase() || "",
		average_rating: canonicalData.rating || undefined,
		description: convertEditorJsToMarkdown(canonicalData.description),
		benefits: flattenAttributeValues(canonicalData.benefits, true),
		colours: flattenAttributeValues(canonicalData.colours, true),
		key_ingredients: flattenAttributeValues(
			canonicalData.key_ingredients,
			true,
		),
		moods: flattenAttributeValues(canonicalData.moods, true),
		scents: flattenAttributeValues(canonicalData.scents, true),
		certifications: flattenAttributeValues(canonicalData.certifications, true),
		strapline: flattenAttributeValues(canonicalData.strapline)?.[0],
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
				// const formattedPrice = new Intl.NumberFormat("en", {
				// 	style: "currency",
				// 	currency: variant.pricing.price.gross.currency,
				// }).format(variant.pricing.price.gross.amount);

				const transformedVariant: TransformedVariant = {
					name: [canonicalData.name, variant.name].filter(Boolean).join(": "),
					commerce_id: product.id,
					available: false,
					variant_id: variant.id,
					price: variant.pricing.price.gross.amount,
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
