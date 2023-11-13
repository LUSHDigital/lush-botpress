import { z } from 'zod'

import {
  InputType,
  Unit,
  ValueEnum,
  PurpleType,
  ID,
  FluffyType,
  VariantType
} from 'src/misc/types'

export const channelSchema = z.object({
  type: z.string(),
  id: z.string(),
  slug: z.string(),
  currency_code: z.string().optional(),
  name: z.string().optional()
})

export const inputTypeSchema = z.nativeEnum(InputType)

export const unitSchema = z.nativeEnum(Unit)

export const dataSchema = z.object({
  text: z.string()
})

export const valueEnumSchema = z.nativeEnum(ValueEnum)

export const issuingPrincipalSchema = z.object({
  id: z.string(),
  type: z.string()
})

export const purpleMetadataSchema = z.object({
  client: z.string(),
  user_id: z.string(),
  language: z.string(),
  user_channel: z.string()
})

export const privateMetadataClassSchema = z.object({})

export const userSchema = z.object({
  type: z.string(),
  id: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string()
})

export const purpleTypeSchema = z.nativeEnum(PurpleType)

export const idSchema = z.nativeEnum(ID)

export const mediaSchema = z.object({
  alt: z.string(),
  url: z.string()
})

export const fluffyMetadataSchema = z.object({
  'avatax.code': z.string(),
  'avatax.description': z.string()
})

export const fluffyTypeSchema = z.nativeEnum(FluffyType)

export const variantTypeSchema = z.nativeEnum(VariantType)

export const blockSchema = z.object({
  id: z.string(),
  data: dataSchema,
  type: z.string()
})

export const metaSchema = z.object({
  issued_at: z.date(),
  version: z.string(),
  issuing_principal: issuingPrincipalSchema
})

export const productChannelListingSchema = z.object({
  type: purpleTypeSchema,
  id: z.string(),
  channel_slug: z.string(),
  publication_date: z.date(),
  available_for_purchase: z.date().nullable(),
  published_at: z.date(),
  is_published: z.boolean(),
  visible_in_listings: z.boolean(),
  available_for_purchase_at: z.date().nullable()
})

export const variantChannelListingSchema = z.object({
  type: fluffyTypeSchema,
  id: z.string(),
  channel_slug: z.string(),
  currency: z.string(),
  price_amount: z.string(),
  cost_price_amount: z.null()
})

export const descriptionSchema = z.object({
  time: z.number(),
  blocks: z.array(blockSchema),
  version: z.string()
})

export const valueElementSchema = z.object({
  name: z.string(),
  slug: z.string(),
  value: valueEnumSchema,
  rich_text: descriptionSchema.nullable(),
  boolean: z.boolean().nullable(),
  date_time: z.null(),
  date: z.null(),
  reference: z.string().nullable(),
  file: z.null()
})

export const attributeSchema = z.object({
  name: z.string(),
  input_type: inputTypeSchema,
  slug: z.string(),
  entity_type: z.string().nullable(),
  unit: unitSchema.nullable(),
  id: z.string(),
  values: z.array(valueElementSchema)
})

export const variantSchema = z.object({
  type: variantTypeSchema,
  id: z.string(),
  attributes: z.array(attributeSchema),
  product_id: idSchema,
  media: z.array(mediaSchema),
  channel_listings: z.array(variantChannelListingSchema),
  private_metadata: privateMetadataClassSchema,
  metadata: privateMetadataClassSchema,
  sku: z.string(),
  name: z.string(),
  track_inventory: z.boolean()
})

export const lineSchema = z.object({
  sku: z.string(),
  variant_id: z.string(),
  quantity: z.number(),
  base_price: z.string(),
  currency: z.string(),
  full_name: z.string(),
  product_name: z.string(),
  variant_name: z.string(),
  attributes: z.array(attributeSchema)
})

export const productSchema = z.object({
  type: z.string(),
  id: idSchema,
  category: channelSchema,
  collections: z.array(channelSchema),
  meta: metaSchema,
  attributes: z.array(attributeSchema),
  media: z.array(mediaSchema),
  charge_taxes: z.boolean(),
  channel_listings: z.array(productChannelListingSchema),
  variants: z.array(variantSchema),
  private_metadata: privateMetadataClassSchema,
  metadata: fluffyMetadataSchema,
  name: z.string(),
  description: descriptionSchema,
  updated_at: z.date(),
  weight: z.null()
})

export const checkoutSchema = z.object({
  type: z.string(),
  id: z.string(),
  channel: channelSchema,
  user: userSchema,
  billing_address: z.null(),
  shipping_address: z.null(),
  warehouse_address: z.null(),
  shipping_method: z.null(),
  lines: z.array(lineSchema),
  collection_point: z.null(),
  meta: metaSchema,
  created: z.date(),
  token: z.string(),
  metadata: purpleMetadataSchema,
  private_metadata: privateMetadataClassSchema,
  last_change: z.date(),
  email: z.string(),
  currency: z.string(),
  discount_amount: z.string(),
  discount_name: z.null(),
  language_code: z.string()
})
