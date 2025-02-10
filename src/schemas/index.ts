import { z } from "@botpress/sdk";
import { INTEGRATION_NAME } from "src/const";

export const basketUpdatedSchema = z.object({
	order_id: z.string(),
	confirmation_number: z.string(),
	created_at: z.string(),
	currency: z.string(),
	current_subtotal_price: z.string(),
	current_total_discounts: z.string(),
	current_total_price: z.string(),
	current_total_tax: z.string(),
	customer_locale: z.string(),
	order_status_url: z.string(),
	fullBody: z.any(),
});
export const checkoutPaidSchema = z.object({
	type: z.literal(`${INTEGRATION_NAME}:checkoutPaid`).optional(),
	id: z.string(),
});
export const checkoutUpdatedSchema = z.object({
	type: z.literal(`${INTEGRATION_NAME}:checkoutUpdated`).optional(),
	id: z.string(),
});
export const productCreatedSchema = z.object({
	type: z.literal(`${INTEGRATION_NAME}:productCreated`).optional(),
	id: z.string(),
});

/* Product Updates */
const availabilitySchema = z.object({
	au: z.boolean(),
	at: z.boolean(),
	bh: z.boolean(),
	cz: z.boolean(),
	de: z.boolean(),
	es: z.boolean(),
	fr: z.boolean(),
	hk: z.boolean(),
	hu: z.boolean(),
	ie: z.boolean(),
	it: z.boolean(),
	mena: z.boolean(),
	nl: z.boolean(),
	nz: z.boolean(),
	pl: z.boolean(),
	pt: z.boolean(),
	se: z.boolean(),
	tw: z.boolean(),
	uk: z.boolean(),
	us: z.boolean(),
	ca: z.boolean(),
	jp: z.boolean(),
	gb: z.boolean(),
});

const variantIdsSchema = z.object({
	au: z.string().optional(),
	at: z.string().optional(),
	bh: z.string().optional(),
	cz: z.string().optional(),
	de: z.string().optional(),
	es: z.string().optional(),
	fr: z.string().optional(),
	hk: z.string().optional(),
	hu: z.string().optional(),
	ie: z.string().optional(),
	it: z.string().optional(),
	mena: z.string().optional(),
	nl: z.string().optional(),
	nz: z.string().optional(),
	pl: z.string().optional(),
	pt: z.string().optional(),
	se: z.string().optional(),
	tw: z.string().optional(),
	uk: z.string().optional(),
	us: z.string().optional(),
	ca: z.string().optional(),
	jp: z.string().optional(),
	gb: z.string().optional(),
});

const priceSchema = z.object({
	au: z.number().optional(),
	at: z.number().optional(),
	bh: z.number().optional(),
	cz: z.number().optional(),
	de: z.number().optional(),
	es: z.number().optional(),
	fr: z.number().optional(),
	hk: z.number().optional(),
	hu: z.number().optional(),
	ie: z.number().optional(),
	it: z.number().optional(),
	mena: z.number().optional(),
	nl: z.number().optional(),
	nz: z.number().optional(),
	pl: z.number().optional(),
	pt: z.number().optional(),
	se: z.number().optional(),
	tw: z.number().optional(),
	uk: z.number().optional(),
	us: z.number().optional(),
	ca: z.number().optional(),
	jp: z.number().optional(),
	gb: z.number().optional(),
});

const variantSchema = z.object({
	name: z.string(),
	size: z.string(),
	commerce_id: z.string(),
	availability: availabilitySchema,
	variant_ids: variantIdsSchema,
	price: priceSchema,
});

export const productUpdatedSchema = z.object({
	type: z.literal(`${INTEGRATION_NAME}:productUpdated`).optional(),
	product: z.object({
		commerce_id: z.string(),
		name: z.string(),
		type: z.string(),
		category: z.string().optional(),
		strapline: z.string().optional(),
		description: z.string().optional(),
		certifications: z.array(z.string()).optional(),
		collections: z.array(z.string()).optional(),
		benefits: z.array(z.string()).optional(),
		key_ingredients: z.array(z.string()).optional(),
		colours: z.array(z.string()).optional(),
		scents: z.array(z.string()).optional(),
		moods: z.array(z.string()).optional(),
		images: z
			.array(
				z.object({
					url: z.string().url(),
					description: z.string(),
				}),
			)
			.optional(),
		average_rating: z.number().optional(),
		// Additional attributes
		skincare: z.string().optional(),
		gift: z.string().optional(),
		oral: z.string().optional(),
		haircare: z.string().optional(),
	}),
	variants: z.array(variantSchema),
});

export const productLaunchUpdatedSchema = z.object({
	type: z.literal(`${INTEGRATION_NAME}:productLaunchUpdated`).optional(),
	name: z.string(),
	description: z.string().optional(),
	dates: z
		.array(
			z.object({
				startDate: z.string().optional(),
				endDate: z.string().optional(),
				market: z.string(),
			}),
		)
		.optional(),
	products: z.array(
		z.object({
			commerce_id: z.string(),
			name: z.string(),
			sku: z.string().optional(),
		}),
	),
});

export const productRelationshipUpdatedSchema = z.object({
	type: z.literal(`${INTEGRATION_NAME}:productRelationshipUpdated`).optional(),
	uid: z.string(),
	commerce_id: z.string(),
	related_commerce_id: z.string(),
	reason: z.string().optional(),
});

export type basketUpdated = z.infer<typeof basketUpdatedSchema>;
