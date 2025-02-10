import { RuntimeError } from "@botpress/sdk";
import { createDirectus, readItem, rest, staticToken } from "@directus/sdk";

import type { ProductHandlerArgs } from "../types";
import { transformProduct } from "./product.helpers";

// When receiving an event from Directus we need to create an event in Botpress and update Vectorize.
// The most complicated part of this process is fetching the requisite data from the ID and formatting it.
export async function handleDirectusProductUpdated({
	entry,
	ctx,
	client,
	logger,
}: ProductHandlerArgs): Promise<void> {
	try {
		logger
			.forBot()
			.debug(
				"handleDirectusProductUpdated[entry.keys]",
				JSON.stringify(entry.keys, null, 2),
			);

		for (const productId of entry.keys) {
			if (!productId) {
				continue;
			}

			const directus = createDirectus(ctx.configuration.directusURL)
				.with(rest())
				.with(staticToken(ctx.configuration.directusToken));

			const directusProduct = await directus.request(
				readItem("product", productId, {
					fields: [
						"*",
						"reportingCategory.item.name",
						"type.name",
						"relatedProducts.relatedProduct.*",
						"relatedProducts.reason",
						"keyIngredients.ingredientFamily_id.name",
						"keyIngredients.ingredientFamily_id.benefits.ingredientBenefit_id.name",
					],
				}),
			);

			const dto = await transformProduct(directusProduct, logger, ctx);

			await client.createEvent({
				type: "productUpdated",
				payload: {
					type: "lush:productUpdated",
					...dto,
				},
			});

			if (directusProduct.relatedProducts?.length) {
				for (const relatedProduct of directusProduct.relatedProducts) {
					await client.createEvent({
						type: "productRelationshipUpdated",
						payload: {
							type: "lush:productRelationshipUpdated",
							uid: `${directusProduct.saleorId}:${relatedProduct.relatedProduct.saleorId}`,
							commerce_id: directusProduct.saleorId,
							related_commerce_id: relatedProduct.relatedProduct.saleorId,
							reason: relatedProduct.reason,
						},
					});
					await client.createEvent({
						type: "productRelationshipUpdated",
						payload: {
							type: "lush:productRelationshipUpdated",
							uid: `${relatedProduct.relatedProduct.saleorId}:${directusProduct.saleorId}`,
							commerce_id: relatedProduct.relatedProduct.saleorId,
							related_commerce_id: directusProduct.saleorId,
							reason: relatedProduct.reason,
						},
					});
				}
			}

			// Upsert to Vectorize.
			const vectorized = await fetch(
				`${ctx.configuration.vectorizeURL}/insert`,
				{
					method: "POST",
					body: JSON.stringify(directusProduct),
				},
			);
			logger.forBot().debug("Vectorized", await vectorized.text());
		}
	} catch (error) {
		throw new RuntimeError(error);
	}
}
