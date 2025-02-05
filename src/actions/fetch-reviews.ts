import { z } from "@botpress/sdk";
import fetchReviewsQuery from "../gql/fetchReviews";
import type { Implementation } from "../misc/types";

const output = {
	schema: z.object({
		reviews: z
			.object({
				items: z.array(
					z.object({
						rating: z.object({
							overall: z.number(),
							quality: z.number().nullable(),
							value: z.number().nullable(),
						}),
						isRecommended: z.boolean().nullable(),
						language: z.string(),
						submissionDate: z.string(),
						text: z.string().nullable(),
						title: z.string().nullable(),
						wouldBuyAgain: z.boolean().nullable(),
						user: z.object({
							nickname: z.string(),
							location: z.string().nullable(),
						}),
						isRatingsOnly: z.boolean(),
						isFeatured: z.boolean(),
						feedback: z.object({
							total: z.number(),
							positive: z.number(),
							negative: z.number(),
						}),
					}),
				),
				rating: z.object({
					value: z.number().nullable(),
					quality: z.number().nullable(),
					overall: z.number().nullable(),
				}),
			})
			.optional(),
	}),
};

export const fetchReviews: Implementation["actions"]["fetchReviews"] = async ({
	input,
	logger,
	ctx,
}) => {
	try {
		logger.forBot().debug("fetchReviews[input]", input);

		async function searchProduct(
			language: string,
			channel: string,
			client: string,
			contentTypes: string[],
			perPage: number,
			query: string,
		) {
			const response = await fetchReviewsQuery(
				{
					language,
					channel,
					client,
					contentTypes,
					perPage,
					query,
				},
				ctx.configuration.token,
				ctx.configuration.wyvernURL,
			);

			logger.forBot().debug("searchProduct[response]", response);

			const productItems = response.searchQuery.items;
			if (productItems.length === 0) {
				throw new Error("No products found");
			}

			logger
				.forBot()
				.debug(
					"searchProduct[response]",
					JSON.stringify(productItems, null, 2),
				);

			return productItems[0]?.content?.reviews;
		}

		// TODO languages and channels
		const reviews = await searchProduct(
			"en",
			"uk",
			"commerce_web",
			["PRODUCT"],
			10,
			`${input.product_name} ${input.product_type}`,
		);
		logger.forBot().info("Reviews:", JSON.stringify(reviews, null, 2));
		const result = output.schema.safeParse(reviews);
		logger.forBot().debug("searchProduct[result]", result);

		return {
			reviews: reviews,
		};
	} catch (error) {
		logger.forBot().error("general uncaught error", error);
		return {};
	}
};
