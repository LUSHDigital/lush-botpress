import type { IntegrationContext, IntegrationLogger } from "@botpress/sdk";
import type { Configuration } from "../../../../.botpress/implementation/configuration";
import { channels } from "../../../const";
import type { TransformedProduct, TransformedVariant } from "../../types";
import type { Product } from "../directus-types";
import type {
	GroupedProduct,
	ProductVariantResponse,
	ProductVariantsResponse,
} from "../types";

// Helper function to perform GraphQL queries
async function fetchGraphQL<T>(
	query: string,
	variables: Record<string, any>,
	ctx: IntegrationContext<Configuration>,
): Promise<T> {
	const response = await fetch(ctx.configuration.wyvernURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${ctx.configuration.token}`,
		},
		body: JSON.stringify({ query, variables }),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const result = await response.json();
	if (result.errors) {
		throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`);
	}

	return result.data;
}

// Fetch product variants
export async function getVariants(
	productId: string | undefined,
	ctx: IntegrationContext<Configuration>,
): Promise<any[]> {
	if (!productId) {
		return [];
	}

	const query = `
    query Product($productId: ID) {
      product(id: $productId) {
        variants {
          id
          name
          attributes {
            attribute { slug }
            values { name slug }
          }
        }
      }
    }
  `;

	const variables = { productId };
	const result = await fetchGraphQL<ProductVariantsResponse>(
		query,
		variables,
		ctx,
	);
	return result.product.variants;
}

// Fetch a specific product variant
export async function getVariant(
	productVariantId: string,
	channel: string,
	ctx: IntegrationContext<Configuration>,
): Promise<any> {
	const query = `
    query ProductVariant($productVariantId: ID, $channel: String) {
      productVariant(id: $productVariantId, channel: $channel) {
        pricing {
          price {
            gross { currency amount }
          }
        }
      }
    }
  `;

	const variables = { productVariantId, channel };
	const result = await fetchGraphQL<ProductVariantResponse>(
		query,
		variables,
		ctx,
	);
	return result.productVariant;
}

// Group product variants by commerce ID
export function groupProductVariants(products: Product[]): GroupedProduct[] {
	const groupedProductsMap: Record<string, GroupedProduct> = {};

	for (const product of products) {
		const { name, size, commerce_id, availability, variant_id, price } =
			product;

		if (!groupedProductsMap[commerce_id]) {
			groupedProductsMap[commerce_id] = {
				name,
				size,
				commerce_id,
				availability: {},
				variant_ids: {},
				price: {},
			};
		}

		// Merge availability
		Object.assign(groupedProductsMap[commerce_id].availability, availability);

		// Map variant IDs to their respective markets
		for (const market in availability) {
			if (availability.hasOwnProperty(market)) {
				groupedProductsMap[commerce_id].variant_ids[market] = variant_id;
			}
		}

		// Merge prices
		Object.assign(groupedProductsMap[commerce_id].price, price);
	}

	return Object.values(groupedProductsMap);
}

// Transform product data
export async function transformProduct(
	productData: Product,
	logger: IntegrationLogger,
	ctx: IntegrationContext<Configuration>,
): Promise<{ product: TransformedProduct; variants: GroupedProduct[] }> {
	const toLowercase = (string: string) => string.toLowerCase();

	const transformedProduct: TransformedProduct = {
		category: productData.reportingCategory?.name,
		benefits: productData.benefits?.map(toLowercase) || [],
		certifications: productData.certifications?.map(toLowercase) || [],
		collections: productData.ranges || [],
		colours: productData.colours?.map(toLowercase) || [],
		commerce_id: productData.saleorId,
		description: productData.description,
		key_ingredients: productData.keyIngredients?.map(
			(ingredient) => ingredient.ingredientFamily_id.name,
		),
		moods: productData.moods?.map(toLowercase) || [],
		name: productData.name,
		scents: productData.scents?.map(toLowercase) || [],
		strapline: productData.strapline || "",
		type: productData.type?.name?.toLowerCase() || "",
		additional: "",
		// additional: JSON.stringify(productData),
	};

	const variants = await getVariants(productData.saleorId || "", ctx).catch(
		(error) => {
			logger.forBot().error("getVariants[catch]", error);
			return [];
		},
	);

	const transformedVariants: TransformedVariant[] = [];

	for (const variant of variants) {
		const transformedVariant: TransformedVariant = {
			name: productData.name || "",
			commerce_id: productData.saleorId || "",
			size: variant.name,
			variant_id: variant.id || "",
			variant_ids: {},
			availability: {},
			price: {},
		};

		// Get size
		if (variant.attributes) {
			for (const attribute of variant.attributes) {
				if (attribute.attribute.slug === "display_weight") {
					const weighted = attribute.values?.map((value) => value.name)[0];
					if (weighted) {
						transformedVariant.size = weighted;
					}
					break;
				}
			}
		}

		// Get availability
		if (variant.attributes) {
			for (const attribute of variant.attributes) {
				if (attribute.attribute.slug === "availability_commerce_web") {
					for (const value of attribute.values || []) {
						const [channelCode, , status] = value.slug.split("_");
						if (!channelCode) continue;

						const variantData = await getVariant(variant.id, channelCode, ctx);
						transformedVariant.availability[channelCode] =
							status === "available";
						transformedVariant.price[channelCode] =
							variantData?.pricing?.price?.gross?.amount;
					}
				}
			}
		}

		if (Object.keys(transformedVariant.availability).length > 0) {
			transformedVariants.push(transformedVariant);
		}
	}

	const groupedVariants = groupProductVariants(transformedVariants);

	const finalVariants = groupedVariants?.map((variant) => {
		for (const channel of channels) {
			if (!Object.keys(variant.availability).includes(channel)) {
				variant.availability[channel] = false;
			}
		}

		variant.availability.gb = variant.availability.uk;
		variant.variant_ids.gb = variant.variant_ids.uk;
		variant.price.gb = variant.price.uk;

		delete variant.availability.za;
		delete variant.variant_ids.za;
		delete variant.price.za;

		return variant;
	});

	logger
		.forBot()
		.debug("transformedProduct", JSON.stringify(transformedProduct));

	return { product: transformedProduct, variants: finalVariants };
}
