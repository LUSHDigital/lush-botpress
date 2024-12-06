import { z } from "@botpress/sdk";

export const configuration = {
	schema: z.object({
		contentfulAccessToken: z.string(),
		contentfulKey: z.string(),
		contentfulSpaceId: z.string(),
		productKnowledgeBaseId: z.string(),
		saleorDomain: z.string(),
		spaKnowledgeBaseId: z.string(),
		token: z.string(),
		wyvernURL: z.string(),
		bazaarvoiceKey: z.string().optional(), // Deprecated
	}),
};
