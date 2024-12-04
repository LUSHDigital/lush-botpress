import type { Implementation } from "../misc/types";
import fetchReviewsQuery from "../gql/fetchReviews";

export const fetchReviews: Implementation['actions']['fetchReviews'] = async ({ input, logger, ctx }) => {
    try {
      logger.forBot().debug('fetchReviews[input]', input)

      async function searchProduct(language: string, channel: string, client: string, contentTypes: string[], perPage: number, query: string) {
        const response = await fetchReviewsQuery({
          language,
          channel,
          client,
          contentTypes,
          perPage,
          query,
        }, ctx.configuration.token, ctx.configuration.wyvernURL);

        logger.forBot().debug('searchProduct[response]', response);

        const productItems = response.searchQuery.items;
        if (productItems.length === 0) {
          throw new Error('No products found');
        }

        logger.forBot().debug('searchProduct[response]', JSON.stringify(productItems, null, 2));

        return productItems[0]?.content?.reviews;
      }

      const reviews = await searchProduct('en', 'uk', 'commerce_web', ['PRODUCT'], 10, `${input.product_name} ${input.product_type}`);
      logger.forBot().info('Reviews:', JSON.stringify(reviews, null, 2));

      return {
        reviews: reviews,
      }
    } catch (error) {
      logger.forBot().error('general uncaught error', error)
      return {};
    }
}
