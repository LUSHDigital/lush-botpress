import { RuntimeError } from "@botpress/sdk";
import { createDirectus, readItem, rest, staticToken } from "@directus/sdk";

import type { ProductHandlerArgs } from "../types";

export async function handleDirectusProductLaunchUpdated({
	entry,
	ctx,
	client,
	logger,
}: ProductHandlerArgs): Promise<void> {
	try {
		logger
			.forBot()
			.debug("handleProductUpdated[event]", JSON.stringify(entry, null, 2));

		const [id] = entry.keys;
		if (!id) {
			throw new RuntimeError("Product not found!");
		}
		const directus = createDirectus(ctx.configuration.directusURL)
			.with(rest())
			.with(staticToken(ctx.configuration.directusToken));
		const result = await directus.request(
			readItem("productLaunch", id, {
				fields: [
					"name",
					"description",
					"products.product_id.name",
					"products.product_id.saleorId",
					"products.product_id.sku",
					"products.product_id.type.name",
					"dates.startDate",
					"dates.endDate",
					"dates.market.slug",
				],
			}),
		);

		logger
			.forBot()
			.debug("DirectusProductLaunch", JSON.stringify(result.products));

		const dto = {
			name: result.name,
			description: result.description,
			products: result.products.map((p) => ({
				name: p.product_id.name,
				commerce_id: p.product_id.saleorId,
				sku: p.product_id.sku || "",
				type: p.product_id.type?.name,
			})),
			dates: result.dates.map((d) => ({
				startDate: d.startDate,
				endDate: d.endDate,
				market: d.market.slug,
			})),
		};

		logger.forBot().debug("DirectusProductLaunch dto", JSON.stringify(dto));

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
