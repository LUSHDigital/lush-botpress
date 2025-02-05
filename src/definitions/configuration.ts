import { z } from "@botpress/sdk";

export const configuration = {
	schema: z.object({
		bazaarvoiceKey: z.string().optional(), // Deprecated
		contentfulAccessToken: z.string().optional(), // Deprecated
		contentfulKey: z.string().optional(), // Deprecated
		contentfulSpaceId: z.string().optional(), // Deprecated
		directusToken: z.string(),
		directusURL: z.string(),
		productKnowledgeBaseId: z.string().optional(), // Deprecated
		saleorDomain: z.string(),
		vectorizeURL: z.string().optional(),
		spaKnowledgeBaseId: z.string().optional(), // Deprecated
		token: z.string(),
		wyvernURL: z.string(),
		yextToken: z.string().optional(), // Deprecated
		yextURL: z.string().optional(), // Deprecated
	}),
};
