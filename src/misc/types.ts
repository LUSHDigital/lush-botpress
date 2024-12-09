import type * as sdk from "@botpress/sdk";
import type * as bp from ".botpress";

export type ValueOf<T> = T[keyof T];
export type Merge<A, B> = Omit<A, keyof B> & B;

export type Handler = bp.IntegrationProps["handler"];
export type HandlerProps = Parameters<Handler>[0];
export type IntegrationCtx = HandlerProps["ctx"];
export type Logger = HandlerProps["logger"];
export type Implementation = ConstructorParameters<typeof bp.Integration>[0];

export type Client = bp.Client;
export type Conversation = Awaited<
	ReturnType<Client["getConversation"]>
>["conversation"];
export type Message = Awaited<ReturnType<Client["getMessage"]>>["message"];
export type BpUser = Awaited<ReturnType<Client["getUser"]>>["user"];
export type Event = Awaited<ReturnType<bp.Client["getEvent"]>>["event"];

export type EventDefinition = NonNullable<
	sdk.IntegrationDefinitionProps["events"]
>[string];
export type ActionDefinition = NonNullable<
	sdk.IntegrationDefinitionProps["actions"]
>[string];
export type ChannelDefinition = NonNullable<
	sdk.IntegrationDefinitionProps["channels"]
>[string];

export type Action = ValueOf<bp.IntegrationProps["actions"]>;
export type ActionProps = Parameters<Action>[0];

export type BpChannel = ValueOf<bp.IntegrationProps["channels"]>;
export type BpChannels = bp.IntegrationProps["channels"];
export type RegisterFunction = Implementation["register"];
export type UnregisterFunction = Implementation["unregister"];
export type MessageHandler = ValueOf<BpChannel["messages"]>;
export type MessageHandlerProps = Parameters<MessageHandler>[0];
export type AckFunction = MessageHandlerProps["ack"];

// Auto-generated Saleor types

export interface Checkout {
	type: string;
	id: string;
	channel: Channel;
	user: User;
	billing_address: null;
	shipping_address: null;
	warehouse_address: null;
	shipping_method: null;
	lines: Line[];
	collection_point: null;
	meta: Meta;
	created: Date;
	token: string;
	metadata: PurpleMetadata;
	private_metadata: PrivateMetadataClass;
	last_change: Date;
	email: string;
	currency: string;
	discount_amount: string;
	discount_name: null;
	language_code: string;
}

export interface Channel {
	type: string;
	id: string;
	slug: string;
	currency_code?: string;
	name?: string;
}

export interface Line {
	sku: string;
	variant_id: string;
	quantity: number;
	base_price: string;
	currency: string;
	full_name: string;
	product_name: string;
	variant_name: string;
	attributes: Attribute[];
}

export interface Attribute {
	name: string;
	input_type: InputType;
	slug: string;
	entity_type: null | string;
	unit: Unit | null;
	id: string;
	values: ValueElement[];
}

export enum InputType {
	Boolean = "boolean",
	Dropdown = "dropdown",
	Multiselect = "multiselect",
	Numeric = "numeric",
	PlainText = "plain-text",
	Reference = "reference",
	RichText = "rich-text",
}

export enum Unit {
	Liter = "liter",
}

export interface ValueElement {
	name: string;
	slug: string;
	value: ValueEnum;
	rich_text: Description | null;
	boolean: boolean | null;
	date_time: null;
	date: null;
	reference: null | string;
	file: null;
}

export interface Description {
	time: number;
	blocks: Block[];
	version: string;
}

export interface Block {
	id: string;
	data: Data;
	type: string;
}

export interface Data {
	text: string;
}

export enum ValueEnum {
	Empty = "",
	UKAvailable = "UK Available",
}

export interface Meta {
	issued_at: Date;
	version: string;
	issuing_principal: IssuingPrincipal;
}

export interface IssuingPrincipal {
	id: string;
	type: string;
}

export interface PurpleMetadata {
	client: string;
	user_id: string;
	language: string;
	user_channel: string;
}

export type PrivateMetadataClass = {};

export interface User {
	type: string;
	id: string;
	email: string;
	first_name: string;
	last_name: string;
}

export interface VariantAttribute {
	attribute: {
		id: string;
		inputType: InputType;
		name: string;
		slug: string;
	};
	values: {
		id: string;
		plainText: string;
		value: string;
		slug: string;
		name: string;
	}[];
}

export interface ProductAttribute {
	values: {
		name: string;
	}[];
}

export interface Product {
	[key: string]: {
		benefits: ProductAttribute;
		certifications: ProductAttribute;
		description: string;
		id: string;
		key_ingredients: ProductAttribute;
		media: {
			alt: string;
			type: string;
			url: string;
		}[];
		moods: ProductAttribute;
		name: string;
		rating: number;
		scents: ProductAttribute;
		strapline: ProductAttribute;
		type: ProductAttribute;
		variants: {
			id: string;
			name: string;
			attributes: VariantAttribute[];
			pricing: {
				price: {
					gross: {
						currency: string;
						amount: number;
					};
				};
			};
		}[];
	};
}

export interface TransformedVariant {
	variant_id: string;
	name: string;
	price: string;
	available: boolean;
	commerce_id: string;
}

export interface TransformedProduct {
	average_rating?: number;
	benefits?: string[];
	certifications?: string[];
	colours?: string[];
	commerce_id: string;
	description: string;
	images?: {
		description: string;
		url: string;
	}[];
	key_ingredients?: string[];
	moods?: string[];
	name: string;
	scents?: string[];
	strapline?: string;
	type: string;
}

export interface ProductChannelListing {
	type: PurpleType;
	id: string;
	channel_slug: string;
	publication_date: Date;
	available_for_purchase: Date | null;
	published_at: Date;
	is_published: boolean;
	visible_in_listings: boolean;
	available_for_purchase_at: Date | null;
}

export enum PurpleType {
	ProductChannelListing = "ProductChannelListing",
}

export enum ID {
	UHJvZHVjdDo4MjM = "UHJvZHVjdDo4MjM=",
}

export interface Media {
	alt: string;
	url: string;
}

export interface FluffyMetadata {
	"avatax.code": string;
	"avatax.description": string;
}

export interface Variant {
	type: VariantType;
	id: string;
	attributes: Attribute[];
	product_id: ID;
	media: Media[];
	channel_listings: VariantChannelListing[];
	private_metadata: PrivateMetadataClass;
	metadata: PrivateMetadataClass;
	sku: string;
	name: string;
	track_inventory: boolean;
}

export interface VariantChannelListing {
	type: FluffyType;
	id: string;
	channel_slug: string;
	currency: string;
	price_amount: string;
	cost_price_amount: null;
}

export enum FluffyType {
	ProductVariantChannelListing = "ProductVariantChannelListing",
}

export enum VariantType {
	ProductVariant = "ProductVariant",
}

interface ContentfulSysLink {
	type: string;
	linkType: string;
	id: string;
}

interface ContentfulTag {
	sys: ContentfulSysLink;
}

interface ContentfulMetadata {
	tags: ContentfulTag[];
	concepts: unknown[]; // Need to find an example.
}

interface ContentfulLocalizedField {
	"en-GB": string;
}

interface ContentfulLocalizedFieldFileArray {
	"en-GB": {
		file: {
			url: string;
		};
	}[];
}

interface ContentfulFields {
	name: ContentfulLocalizedField;
	content: ContentfulLocalizedField;
	audio: ContentfulLocalizedFieldFileArray;
	images: ContentfulLocalizedFieldFileArray;
	videos: ContentfulLocalizedFieldFileArray;
}

interface ContentfulSys {
	type: string;
	id: string;
	space: { sys: ContentfulSysLink };
	environment: { sys: ContentfulSysLink };
	contentType: { sys: ContentfulSysLink };
	createdBy?: { sys: ContentfulSysLink };
	updatedBy?: { sys: ContentfulSysLink };
	deletedBy?: { sys: ContentfulSysLink };
	revision: number;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string;
}

export interface ContentfulResponse {
	metadata: ContentfulMetadata;
	fields?: ContentfulFields;
	sys: ContentfulSys;
}
