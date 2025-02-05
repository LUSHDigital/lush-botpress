import type { IntegrationContext, IntegrationLogger } from "@botpress/sdk";
import type { Client } from "../../../.botpress";
import type { Configuration } from "../../../.botpress/implementation/configuration";
import type { DirectusProductPayload, DirectusWebhookPayload } from "../types";

export interface ProductHandlerArgs {
	entry: DirectusWebhookPayload<DirectusProductPayload>;
	client: Client;
	ctx: IntegrationContext<Configuration>;
	logger: IntegrationLogger;
}

export type GroupedProduct = {
	name: string;
	size: string;
	commerce_id: string;
	availability: Record<string, boolean>;
	variant_ids: Record<string, string>;
	price: Record<string, number>;
};

export type ProductVariantsResponse = {
	errors: Record<string, string>[];
	data: {
		product: {
			variants: {
				id: string;
				name: string;
				attributes: {
					attribute: {
						slug: string;
					};
					values: {
						name: string;
						slug: string;
					}[];
				}[];
			}[];
		};
	};
};

export type ProductVariantResponse = {
	errors: Record<string, string>[];
	data: {
		productVariant: {
			pricing: {
				price: {
					gross: {
						currency: string;
						amount: number;
					};
				};
			};
		};
	};
};
