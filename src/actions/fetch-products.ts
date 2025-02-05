import type { Implementation, VectorizeResponse } from "../misc/types";

export const fetchProducts: Implementation["actions"]["fetchProducts"] =
	async ({ input, logger, ctx }) => {
		try {
			if (!ctx.configuration.vectorizeURL) {
				logger.forBot().warn("vectorizeURL is not set");

				return;
			}

			logger.forBot().debug("fetchProducts[input]", input);

			const req = await fetch(ctx.configuration.vectorizeURL, {
				method: "POST",
				body: JSON.stringify(input),
				headers: { "Content-Type": "application/json" },
			});

			const res = (await req.json()) as VectorizeResponse;
			logger.forBot().debug("fetchProducts[output]", {
				productSKUs: res.matches.matches.map((match) => match.id),
			});

			return {
				productSKUs: res.matches.matches.map((match) => match.id),
			};
		} catch (error) {
			logger.forBot().error("general uncaught error", error);
			return {};
		}
	};
