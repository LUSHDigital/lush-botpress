export type BallisticsMarketTarget = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	manufacturingMarket?: string | ManufacturingMarket | null;
	packTargetPercentage?: number | null;
	pressTargetPercentage?: number | null;
	sort?: number | null;
	startDate?: string | null;
	status: string;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type BallisticsStack = {
	ballisticsStackMix: any[] | BallisticsStackMix[];
	ballisticsStackStatuses: any[] | BallisticsStackStatus[];
	compoundedOn?: string | null;
	compounder?: string | Staff | null;
	date_created?: string | null;
	date_updated?: string | null;
	dryWeightAverage?: number | null;
	id: number;
	managerTestStack?: boolean | null;
	market?: string | ManufacturingMarket | null;
	naBatch?: string | null;
	pj?: string | null;
	product?: string | ProductVariant | null;
	shift?: string | null;
	sort?: number | null;
	stackDeclaredTime?: string | null;
	stackPrinted?: string | null;
	stackTunnelTime?: string | null;
	stackWeighed?: string | null;
	table?: string | BallisticsTable | null;
	teamLeader?: string | Staff | null;
	trainer?: string | Staff | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
	wetWeightAverage?: number | null;
};

export type BallisticsStackStaff = {
	ballisticsStack_id?: number | BallisticsStack | null;
	id: number;
	staff_id?: string | Staff | null;
};

export type BallisticsStackMix = {
	date_created?: string | null;
	id: number;
	lotNumber?: string | null;
	mixType?: string | null;
	parentStack?: number | BallisticsStack | null;
};

export type BallisticsStackStatus = {
	ballisticsStack?: number | BallisticsStack | null;
	ballisticsStackStatusAdjustments: any[] | BallisticsStackStatusAdjustment[];
	ballisticsStackStatusParent?: string | BallisticsStackStatus | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	staff: any[] | BallisticsStackStatusStaff[];
	timestamp?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type BallisticsStackStatusStaff = {
	ballisticsStackStatus_id?: string | BallisticsStackStatus | null;
	id: number;
	staff_id?: string | Staff | null;
};

export type BallisticsStackStatusAdjustment = {
	adjustmentQuantity?: number | null;
	adjustmentQuantityCheck?: number | null;
	adjustmentReason?: string | null;
	ballisticsStackStatus?: string | BallisticsStackStatus | null;
	booked?: boolean | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	sort?: number | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type BallisticsTable = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	market?: string | ManufacturingMarket | null;
	number?: number | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type BallisticsTableRota = {
	date?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	pressers: any[] | BallisticsTableRotaStaff[];
	product?: string | ProductVariant | null;
	shift?: string | null;
	sort?: number | null;
	status?: string | null;
	table?: string | BallisticsTable | null;
	trainer?: string | Staff | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type BallisticsTableRotaStaff = {
	ballisticsTableRota_id?: string | BallisticsTableRota | null;
	id: number;
	staff_id?: string | Staff | null;
};

export type Company = {
	date_created?: string | null;
	date_updated?: string | null;
	departments: any[] | CompanyDepartment[];
	id: string;
	name?: string | null;
	sort?: number | null;
	status: string;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type CompanyDepartment = {
	company?: string | Company | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type Countr = {
	id: number;
};

export type DirectusAccess = {
	id: string;
	policy: string | DirectusPolicies;
	role?: string | DirectusRoles | null;
	sort?: number | null;
	user?: string | DirectusUsers | null;
};

export type DirectusActivity = {
	action: string;
	collection: string;
	id: number;
	ip?: string | null;
	item: string;
	origin?: string | null;
	revisions: any[] | DirectusRevisions[];
	timestamp: string;
	user?: string | DirectusUsers | null;
	user_agent?: string | null;
};

export type DirectusCollections = {
	accountability?: string | null;
	archive_app_filter: boolean;
	archive_field?: string | null;
	archive_value?: string | null;
	collapse: string;
	collection: string;
	color?: string | null;
	display_template?: string | null;
	group?: string | DirectusCollections | null;
	hidden: boolean;
	icon?: string | null;
	item_duplication_fields?: unknown | null;
	note?: string | null;
	preview_url?: string | null;
	singleton: boolean;
	sort?: number | null;
	sort_field?: string | null;
	translations?: unknown | null;
	unarchive_value?: string | null;
	versioning: boolean;
};

export type DirectusComments = {
	collection: string | DirectusCollections;
	comment: string;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	item: string;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type DirectusDashboards = {
	color?: string | null;
	date_created?: string | null;
	icon: string;
	id: string;
	name: string;
	note?: string | null;
	panels: any[] | DirectusPanels[];
	user_created?: string | DirectusUsers | null;
};

export type DirectusExtensions = {
	bundle?: string | null;
	enabled: boolean;
	folder: string;
	id: string;
	source: string;
};

export type DirectusFields = {
	collection: string | DirectusCollections;
	conditions?: unknown | null;
	display?: string | null;
	display_options?: unknown | null;
	field: string;
	group?: string | DirectusFields | null;
	hidden: boolean;
	id: number;
	interface?: string | null;
	note?: string | null;
	options?: unknown | null;
	readonly: boolean;
	required?: boolean | null;
	sort?: number | null;
	special?: unknown | null;
	translations?: unknown | null;
	validation?: unknown | null;
	validation_message?: string | null;
	width?: string | null;
};

export type DirectusFiles = {
	charset?: string | null;
	created_on: string;
	description?: string | null;
	duration?: number | null;
	embed?: string | null;
	filename_disk?: string | null;
	filename_download: string;
	filesize?: number | null;
	focal_point_x?: number | null;
	focal_point_y?: number | null;
	folder?: string | DirectusFolders | null;
	height?: number | null;
	id: string;
	location?: string | null;
	metadata?: unknown | null;
	modified_by?: string | DirectusUsers | null;
	modified_on: string;
	storage: string;
	tags?: unknown | null;
	title?: string | null;
	tus_data?: unknown | null;
	tus_id?: string | null;
	type?: string | null;
	uploaded_by?: string | DirectusUsers | null;
	uploaded_on?: string | null;
	width?: number | null;
};

export type DirectusFlows = {
	accountability?: string | null;
	color?: string | null;
	date_created?: string | null;
	description?: string | null;
	icon?: string | null;
	id: string;
	name: string;
	operation?: string | DirectusOperations | null;
	operations: any[] | DirectusOperations[];
	options?: unknown | null;
	status: string;
	trigger?: string | null;
	user_created?: string | DirectusUsers | null;
};

export type DirectusFolders = {
	id: string;
	name: string;
	parent?: string | DirectusFolders | null;
};

export type DirectusMigrations = {
	name: string;
	timestamp?: string | null;
	version: string;
};

export type DirectusNotifications = {
	collection?: string | null;
	id: number;
	item?: string | null;
	message?: string | null;
	recipient: string | DirectusUsers;
	sender?: string | DirectusUsers | null;
	status?: string | null;
	subject: string;
	timestamp?: string | null;
};

export type DirectusOperations = {
	date_created?: string | null;
	flow: string | DirectusFlows;
	id: string;
	key: string;
	name?: string | null;
	options?: unknown | null;
	position_x: number;
	position_y: number;
	reject?: string | DirectusOperations | null;
	resolve?: string | DirectusOperations | null;
	type: string;
	user_created?: string | DirectusUsers | null;
};

export type DirectusPanels = {
	color?: string | null;
	dashboard: string | DirectusDashboards;
	date_created?: string | null;
	height: number;
	icon?: string | null;
	id: string;
	name?: string | null;
	note?: string | null;
	options?: unknown | null;
	position_x: number;
	position_y: number;
	show_header: boolean;
	type: string;
	user_created?: string | DirectusUsers | null;
	width: number;
};

export type DirectusPermissions = {
	action: string;
	collection: string;
	fields?: unknown | null;
	id: number;
	permissions?: unknown | null;
	policy: string | DirectusPolicies;
	presets?: unknown | null;
	validation?: unknown | null;
};

export type DirectusPolicies = {
	admin_access: boolean;
	app_access: boolean;
	description?: string | null;
	enforce_tfa: boolean;
	icon: string;
	id: string;
	ip_access?: unknown | null;
	name: string;
	permissions: any[] | DirectusPermissions[];
	roles: any[] | DirectusAccess[];
	users: any[] | DirectusAccess[];
};

export type DirectusPresets = {
	bookmark?: string | null;
	collection?: string | null;
	color?: string | null;
	filter?: unknown | null;
	icon?: string | null;
	id: number;
	layout?: string | null;
	layout_options?: unknown | null;
	layout_query?: unknown | null;
	refresh_interval?: number | null;
	role?: string | DirectusRoles | null;
	search?: string | null;
	user?: string | DirectusUsers | null;
};

export type DirectusRelations = {
	id: number;
	junction_field?: string | null;
	many_collection: string;
	many_field: string;
	one_allowed_collections?: unknown | null;
	one_collection?: string | null;
	one_collection_field?: string | null;
	one_deselect_action: string;
	one_field?: string | null;
	sort_field?: string | null;
};

export type DirectusRevisions = {
	activity: number | DirectusActivity;
	collection: string;
	data?: unknown | null;
	delta?: unknown | null;
	id: number;
	item: string;
	parent?: number | DirectusRevisions | null;
	version?: string | DirectusVersions | null;
};

export type DirectusRoles = {
	children: any[] | DirectusRoles[];
	description?: string | null;
	icon: string;
	id: string;
	name: string;
	parent?: string | DirectusRoles | null;
	policies: any[] | DirectusAccess[];
	users: any[] | DirectusUsers[];
	users_group: string;
};

export type DirectusSessions = {
	expires: string;
	ip?: string | null;
	next_token?: string | null;
	origin?: string | null;
	share?: string | DirectusShares | null;
	token: string;
	user?: string | DirectusUsers | null;
	user_agent?: string | null;
};

export type DirectusSettings = {
	auth_login_attempts?: number | null;
	auth_password_policy?: string | null;
	basemaps?: unknown | null;
	custom_aspect_ratios?: unknown | null;
	custom_css?: string | null;
	default_appearance: string;
	default_language: string;
	default_theme_dark?: string | null;
	default_theme_light?: string | null;
	id: number;
	mapbox_key?: string | null;
	module_bar?: unknown | null;
	project_color: string;
	project_descriptor?: string | null;
	project_logo?: string | DirectusFiles | null;
	project_name: string;
	project_url?: string | null;
	public_background?: string | DirectusFiles | null;
	public_favicon?: string | DirectusFiles | null;
	public_foreground?: string | DirectusFiles | null;
	public_note?: string | null;
	public_registration: boolean;
	public_registration_email_filter?: unknown | null;
	public_registration_role?: string | DirectusRoles | null;
	public_registration_verify_email: boolean;
	report_bug_url?: string | null;
	report_error_url?: string | null;
	report_feature_url?: string | null;
	storage_asset_presets?: unknown | null;
	storage_asset_transform?: string | null;
	storage_default_folder?: string | DirectusFolders | null;
	theme_dark_overrides?: unknown | null;
	theme_light_overrides?: unknown | null;
	theming_group: string;
};

export type DirectusShares = {
	collection: string | DirectusCollections;
	date_created?: string | null;
	date_end?: string | null;
	date_start?: string | null;
	id: string;
	item: string;
	max_uses?: number | null;
	name?: string | null;
	password?: string | null;
	role?: string | DirectusRoles | null;
	times_used?: number | null;
	user_created?: string | DirectusUsers | null;
};

export type DirectusTranslations = {
	id: string;
	key: string;
	language: string;
	value: string;
};

export type DirectusUsers = {
	appearance?: string | null;
	auth_data?: unknown | null;
	avatar?: string | DirectusFiles | null;
	description?: string | null;
	email?: string | null;
	email_notifications?: boolean | null;
	external_identifier?: string | null;
	first_name?: string | null;
	id: string;
	language?: string | null;
	last_access?: string | null;
	last_name?: string | null;
	last_page?: string | null;
	location?: string | null;
	password?: string | null;
	policies: any[] | DirectusAccess[];
	provider: string;
	role?: string | DirectusRoles | null;
	status: string;
	tags?: unknown | null;
	tfa_secret?: string | null;
	theme_dark?: string | null;
	theme_dark_overrides?: unknown | null;
	theme_light?: string | null;
	theme_light_overrides?: unknown | null;
	title?: string | null;
	token?: string | null;
};

export type DirectusVersions = {
	collection: string | DirectusCollections;
	date_created?: string | null;
	date_updated?: string | null;
	delta?: unknown | null;
	hash?: string | null;
	id: string;
	item: string;
	key: string;
	name?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type DirectusWebhooks = {
	actions: unknown;
	collections: unknown;
	data: boolean;
	headers?: unknown | null;
	id: number;
	method: string;
	migrated_flow?: string | DirectusFlows | null;
	name: string;
	status: string;
	url: string;
	was_active_before_deprecation: boolean;
};

export type Ingredient = {
	availability: string;
	availableTo: any[] | IngredientDirectusRoles2[];
	benefits: string;
	benefitText?: string | null;
	categories: string;
	categoriesGroup: string;
	category?: string | IngredientCategory | null;
	colour?: string | null;
	colourCategories: any[] | IngredientIngredientColour[];
	completeness?: number | null;
	date_created?: string | null;
	date_updated?: string | null;
	documents: any[] | IngredientFiles2[];
	family?: string | IngredientFamily | null;
	files: string;
	id: string;
	images: any[] | IngredientFiles[];
	ingredientBenefit: any[] | IngredientIngredientBenefit[];
	lifecycleStatus?: string | null;
	materialOriginType?: string | null;
	name?: string | null;
	overview?: string | null;
	primaryImage?: string | DirectusFiles | null;
	regulatoryComplianceCompleteness?: number | null;
	scent?: string | null;
	scentCategories: any[] | IngredientIngredientScentCategory[];
	sort?: number | null;
	status?: string | null;
	subCategory?: string | IngredientSubcategory | null;
	supplyChainImpactCompleteness?: number | null;
	synonyms?: unknown | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
	variants: any[] | IngredientVariant[];
	videos: any[] | IngredientFiles1[];
};

export type IngredientDirectusFiles = {
	directus_files_id?: string | DirectusFiles | null;
	id: number;
	ingredient_id?: string | Ingredient | null;
};

export type IngredientDirectusRoles = {
	directus_roles_id?: string | DirectusRoles | null;
	id: number;
	ingredient_id?: string | Ingredient | null;
};

export type IngredientDirectusRoles1 = {
	directus_roles_id?: string | DirectusRoles | null;
	id: number;
	ingredient_id?: string | Ingredient | null;
};

export type IngredientDirectusRoles2 = {
	directus_roles_id?: string | DirectusRoles | null;
	id: number;
	ingredient_id?: string | Ingredient | null;
};

export type IngredientFiles = {
	directus_files_id?: string | DirectusFiles | null;
	id: number;
	ingredient_id?: string | Ingredient | null;
};

export type IngredientFiles1 = {
	directus_files_id?: string | DirectusFiles | null;
	id: number;
	ingredient_id?: string | Ingredient | null;
};

export type IngredientFiles2 = {
	directus_files_id?: string | DirectusFiles | null;
	id: number;
	ingredient_id?: string | Ingredient | null;
};

export type IngredientIngredientDirectusRoles = {
	id: number;
	ingredient_directus_roles_id?: number | IngredientDirectusRoles | null;
	ingredient_id?: string | Ingredient | null;
};

export type IngredientIngredientBenefit = {
	id: number;
	ingredient_id?: string | Ingredient | null;
	ingredientBenefit_id?: string | IngredientBenefit | null;
};

export type IngredientIngredientColour = {
	id: number;
	ingredient_id?: string | Ingredient | null;
	ingredientColour_id?: string | IngredientColour | null;
};

export type IngredientIngredientFunction = {
	id: number;
	ingredient_id?: string | Ingredient | null;
	ingredientFunction_id?: string | IngredientFunction | null;
};

export type IngredientIngredientScentCategory = {
	id: number;
	ingredient_id?: string | Ingredient | null;
	ingredientScentCategory_id?: string | IngredientScentCategory | null;
};

export type IngredientIngredientVariant = {
	id: number;
	ingredient_id?: string | Ingredient | null;
	ingredientVariant_id?: string | IngredientVariant | null;
};

export type IngredientBenefit = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientCategory = {
	authenticateId?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientColour = {
	date_created?: string | null;
	date_updated?: string | null;
	hexCode?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientFamily = {
	benefits: any[] | IngredientFamilyIngredientBenefit[];
	date_created?: string | null;
	date_updated?: string | null;
	description?: string | null;
	id: string;
	ingredient: any[] | Ingredient[];
	name: string;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientFamilyIngredientBenefit = {
	id: number;
	ingredientBenefit_id?: string | IngredientBenefit | null;
	ingredientFamily_id?: string | IngredientFamily | null;
};

export type IngredientFunction = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSample = {
	attachments: any[] | IngredientSampleFiles1[];
	batchSampleNumber?: string | null;
	checkedBy?: string | DirectusUsers | null;
	date_created?: string | null;
	date_updated?: string | null;
	fragranceComments?: string | null;
	gcMsComments?: string | null;
	gcMsNumber?: string | null;
	gcMsTrace?: string | DirectusFiles | null;
	generalComments?: string | null;
	id: string;
	ingredientSource?: string | IngredientSource | null;
	result?: string | null;
	sampleDate?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSampleFiles = {
	directus_files_id?: string | DirectusFiles | null;
	id: number;
	ingredientSample_id?: string | IngredientSample | null;
};

export type IngredientSampleFiles1 = {
	directus_files_id?: string | DirectusFiles | null;
	id: number;
	ingredientSample_id?: string | IngredientSample | null;
};

export type IngredientScentCategory = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	internalName?: string | null;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSource = {
	availability: string;
	buyer?: string | DirectusUsers | null;
	buyersComments?: string | null;
	Buying: string;
	buyingStatement?: string | null;
	buyingStory?: string | null;
	cites?: boolean | null;
	cmr?: boolean | null;
	co2e?: number | null;
	commodityCode?: string | null;
	countryOfOrigin: any[] | IngredientSourceIngredientSourceCountryOfOrigin[];
	date_created?: string | null;
	date_updated?: string | null;
	declarations?: unknown | null;
	environmentalNotes?: string | null;
	eudr?: string | null;
	externalCertificates: any[] | IngredientSourceFiles[];
	externalPackaging?: string | null;
	extraction?: unknown | null;
	feedstockOperations?: unknown | null;
	feedstockOrigins: any[] | IngredientSourceIngredientSourceCountryOfOrigin2[];
	form?: string | null;
	gmo?: boolean | null;
	grade?: string | null;
	id: string;
	ifraCertificate?: boolean | null;
	importsExports: string;
	ingredientSupplier?: string | IngredientSupplier | null;
	ingredientVariant?: string | IngredientVariant | null;
	intendedApplication?: string | null;
	isDangerousGoods?: boolean | null;
	issuesOrControversies?: string | null;
	leadTime?: string | null;
	legislation: string;
	lifecycleStatus?: string | null;
	liquidDensity?: number | null;
	manuFlowchartFile?: string | DirectusFiles | null;
	microplastics?: boolean | null;
	minimumOrderQuantity?: number | null;
	nagoya?: boolean | null;
	nagoyaDocs?: boolean | null;
	nanomaterials?: boolean | null;
	Notes: string;
	packSizes?: string | null;
	petrochemical?: boolean | null;
	pfas?: boolean | null;
	phStabilityMax?: number | null;
	phStabilityMin?: number | null;
	priceBreaks?: string | null;
	process?: string | null;
	requiresExternalDocumentation?: string | null;
	salesTerm?: string | null;
	sdsFile?: string | DirectusFiles | null;
	seasonality: any[] | IngredientSourceIngredientSourceSeason[];
	shelfLife?: string | null;
	sort?: number | null;
	stableTemperatureMax?: number | null;
	stableTemperatureMin?: number | null;
	status: string;
	supplierRequests: any[] | IngredientSupplierRequests[];
	supports: any[] | IngredientSourceIngredientSourceSupport[];
	svhc?: boolean | null;
	tradeName?: string | null;
	usedAtLocations: any[] | IngredientSourceLocation[];
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
	vegan?: boolean | null;
};

export type IngredientSourceFiles = {
	directus_files_id?: string | DirectusFiles | null;
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
};

export type IngredientSourceIngredientSourceCertification = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	ingredientSourceCertification_id?:
		| string
		| IngredientSourceCertification
		| null;
};

export type IngredientSourceIngredientSourceCountryOfOrigin = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	ingredientSourceCountryOfOrigin_id?:
		| string
		| IngredientSourceCountryOfOrigin
		| null;
};

export type IngredientSourceIngredientSourceCountryOfOrigin1 = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	ingredientSourceCountryOfOrigin_id?:
		| string
		| IngredientSourceCountryOfOrigin
		| null;
};

export type IngredientSourceIngredientSourceCountryOfOrigin2 = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	ingredientSourceCountryOfOrigin_id?:
		| string
		| IngredientSourceCountryOfOrigin
		| null;
};

export type IngredientSourceIngredientSourceHazardousStatement = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	ingredientSourceHazardousStatement_id?:
		| string
		| IngredientSourceHazardousStatement
		| null;
};

export type IngredientSourceIngredientSourceIngredientCompliance = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	ingredientSourceIngredientCompliance_id?:
		| string
		| IngredientSourceIngredientCompliance
		| null;
};

export type IngredientSourceIngredientSourceSeason = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	ingredientSourceSeason_id?: string | IngredientSourceSeason | null;
};

export type IngredientSourceIngredientSourceSupport = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	ingredientSourceSupport_id?: string | IngredientSourceSupport | null;
};

export type IngredientSourceLocation = {
	id: number;
	ingredientSource_id?: string | IngredientSource | null;
	location_id?: string | Location | null;
};

export type IngredientSourceCertification = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSourceCountryOfOrigin = {
	alpha2Code?: string | null;
	alpha3Code?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	latLong?: string | null;
	name?: string | null;
	numericCode?: number | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSourceHazardousStatement = {
	code?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	description?: string | null;
	germanHazardOrdinance?: string | null;
	id: string;
	pictogram?: string | DirectusFiles | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSourceIngredientCompliance = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSourceSeason = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSourceSupport = {
	date_created?: string | null;
	date_updated?: string | null;
	description?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSubcategory = {
	authenticateID?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientSupplier = {
	accountHolderName?: string | null;
	accountNumber?: string | null;
	accountSortCode?: string | null;
	bankAddress?: string | null;
	bankName?: string | null;
	businessAddress?: string | null;
	complianceContactEmail?: string | null;
	complianceContactFirstName?: string | null;
	complianceContactLastName?: string | null;
	complianceContactPhone?: string | null;
	contacts: string;
	currency?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	description?: string | null;
	eoriNumber?: string | null;
	externalId?: string | null;
	freightAddress?: string | null;
	iban?: string | null;
	id: string;
	incoTerms?: string | null;
	keyContactEmail?: string | null;
	keyContactFirstName?: string | null;
	keyContactLastName?: string | null;
	logisticsContactEmail?: string | null;
	logisticsContactFirstName?: string | null;
	logisticsContactLastName?: string | null;
	logisticsContactPhone?: string | null;
	name?: string | null;
	NAT_status?: string | null;
	natDocument?: string | DirectusFiles | null;
	orderingContactEmail?: string | null;
	orderingContactFirstName?: string | null;
	orderingContactLastName?: string | null;
	orderingContactPhone?: string | null;
	payment: string;
	paymentTerms?: string | null;
	purchasingTermsFile?: string | DirectusFiles | null;
	rexNumber?: string | null;
	sort?: number | null;
	sources: any[] | IngredientSource[];
	status?: string | null;
	supplierCode?: string | null;
	supplierRequests: any[] | IngredientSupplierRequests[];
	swift?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
	validBuyingPolicy?: boolean | null;
	vatNumber?: string | null;
};

export type IngredientSupplierConfiguration = {
	id: number;
	materialOnboardingFormID?: string | null;
	nonAnimalTestingFormID?: string | null;
	sampleOnboardingFormID?: string | null;
	supplierFolderID?: string | null;
	supplierOnboardingFormID?: string | null;
};

export type IngredientSupplierRequests = {
	date_created?: string | null;
	date_updated?: string | null;
	form?: string | null;
	id: string;
	source?: string | IngredientSource | null;
	status?: string | null;
	supplier?: string | IngredientSupplier | null;
	user_created?: string | DirectusUsers | null;
};

export type IngredientVariant = {
	authenticateProductId?: string | null;
	bathProductLimit?: number | null;
	blueScreenRisk?: string | null;
	bodyConditionerLimit?: number | null;
	bodyLotionLimit?: number | null;
	bodySprayLimit?: number | null;
	cas?: unknown | null;
	citesAppendix?: string | null;
	citesControl?: unknown | null;
	cleanserLimit?: number | null;
	composition: any[] | IngredientVariantComposition[];
	containsPalm?: boolean | null;
	copyStatement?: string | null;
	currentPrice?: number | null;
	currentPriceCurrency?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	dpraResult?: string | null;
	faceCreamLimit?: number | null;
	faceMaskLimit?: number | null;
	genotoxTest?: string | null;
	hairConditionerLimit?: number | null;
	hairStylingLimit?: number | null;
	handCreamLimit?: number | null;
	handSoapLimit?: number | null;
	hazards: any[] | IngredientVariantIngredientSourceHazardousStatement[];
	hclatResult?: string | null;
	id: string;
	InciName?: string | null;
	ingredient?: string | Ingredient | null;
	ingredientSources: string;
	internalLimits: string;
	isOverstocked?: boolean | null;
	keratinoSensResult?: string | null;
	labelNames?: unknown | null;
	limits: any[] | IngredientVariantRestrictedCountryComments2[];
	lipscrubLimit?: number | null;
	massageBarLimit?: number | null;
	name?: string | null;
	perfumeAlcoholLimit?: number | null;
	perfumeOilLimit?: number | null;
	Price: string;
	primaryImage?: string | DirectusFiles | null;
	QAD: string;
	qadLastUpdated?: string | null;
	quantity?: number | null;
	regulatoryCompliance: string;
	shampooLimit?: number | null;
	showerGelLimit?: number | null;
	sku?: string | null;
	solidPerfumeLimit?: number | null;
	sort?: number | null;
	sources: any[] | IngredientSource[];
	standardPrice?: number | null;
	standardPriceCurrency?: string | null;
	status: string;
	stock: string;
	suitableForEyeArea?: string | null;
	suncareLimit?: number | null;
	toxicology: string;
	unitOfMeasure?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
	value?: number | null;
};

export type IngredientVariantComposition = {
	composition_percentage?: number | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: number;
	ingredient_id?: string | IngredientVariant | null;
	sub_ingredient_id?: string | IngredientVariant | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type IngredientVariantDirectusRoles = {
	directus_roles_id?: string | DirectusRoles | null;
	id: number;
	ingredientVariant_id?: string | IngredientVariant | null;
};

export type IngredientVariantIngredientSourceCountryOfOrigin = {
	id: number;
	ingredientSourceCountryOfOrigin_id?:
		| string
		| IngredientSourceCountryOfOrigin
		| null;
	ingredientVariant_id?: string | IngredientVariant | null;
};

export type IngredientVariantIngredientSourceHazardousStatement = {
	id: number;
	ingredientSourceHazardousStatement_id?:
		| string
		| IngredientSourceHazardousStatement
		| null;
	ingredientVariant_id?: string | IngredientVariant | null;
};

export type IngredientVariantRestrictedCountryComments = {
	id: number;
	ingredientVariant_id?: string | IngredientVariant | null;
	restrictedCountryComments_id?: number | RestrictedCountryComments | null;
};

export type IngredientVariantRestrictedCountryComments2 = {
	id: number;
	ingredientVariant_id?: string | IngredientVariant | null;
	restrictedCountryComments_id?: number | RestrictedCountryComments | null;
};

export type IngredientVariantTradeCountriesAndRegions = {
	id: number;
	ingredientVariant_id?: string | IngredientVariant | null;
	tradeCountriesAndRegions_id?: number | TradeCountriesAndRegions | null;
};

export type Languages = {
	code: string;
	direction?: string | null;
	name?: string | null;
};

export type Location = {
	buildingPhoto?: string | DirectusFiles | null;
	date_created?: string | null;
	date_updated?: string | null;
	departments?: unknown | null;
	id: string;
	insurance: string;
	landlord?: string | null;
	leaseBreak?: string | null;
	leaseEnd?: string | null;
	leaseStart?: string | null;
	location?: string | null;
	market?: string | null;
	name?: string | null;
	rates1StMonth?: string | null;
	ratesCurrency?: string | null;
	ratesEnd?: string | null;
	ratesFrequency?: string | null;
	ratesGrossValue?: number | null;
	ratesGrossValueGBP?: number | null;
	ratesNetValue?: number | null;
	ratesNetValueGBP?: number | null;
	ratesStart?: string | null;
	rent: string;
	rent1StMonth?: string | null;
	rentCurrency?: string | null;
	rentFrequency?: string | null;
	rentGrossValue?: number | null;
	rentGrossValueGBP?: number | null;
	rentNetValue?: number | null;
	rentNetValueGBP?: number | null;
	service: string;
	service1StMonth?: string | null;
	serviceBreak?: string | null;
	serviceCurrency?: string | null;
	serviceEnd?: string | null;
	serviceFrequency?: string | null;
	serviceGrossValue?: number | null;
	serviceGrossValueGBP?: number | null;
	serviceNetValue?: number | null;
	serviceNetValueGBP?: number | null;
	serviceProvider?: string | null;
	serviceStart?: string | null;
	siteAddress?: string | null;
	sort?: number | null;
	sqm?: number | null;
	sqmBreakdown?: unknown | null;
	status: string;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type LocationInsurance = {
	firstMonth?: string | null;
	currency?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	endDate?: string | null;
	frequency?: string | null;
	grossValue?: number | null;
	grossValueGBP?: number | null;
	id: string;
	netValue?: number | null;
	netValueGBP?: number | null;
	provider?: string | null;
	sort?: number | null;
	startDate?: string | null;
	status: string;
	type?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type ManufacturingMarket = {
	alpha2Code?: string | null;
	ballisticsMarketTargets: any[] | BallisticsMarketTarget[];
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	name?: string | null;
	sort?: number | null;
	status: string;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type ManufacturingProductTarget = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	packTargetPh?: number | null;
	pressTargetPh?: number | null;
	productVariant?: string | ProductVariant | null;
	sort?: number | null;
	startDate?: string | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type ManufacturingProductTargetLocation = {
	id: number;
	location_id?: string | Location | null;
	manufacturingProductTarget_id?: string | ManufacturingProductTarget | null;
};

export type ManufacturingProductTargetManufacturingMarket = {
	id: number;
	manufacturingMarket_id?: string | ManufacturingMarket | null;
	manufacturingProductTarget_id?: string | ManufacturingProductTarget | null;
};

export type Market = {
	id: number;
	name?: string | null;
	slug?: string | null;
};

export type Packaging = {
	date_created?: string | null;
	date_updated?: string | null;
	description?: string | null;
	greenClaims?: string | null;
	id: number;
	name: any[] | PackagingTranslations[];
	products?: string | Product | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type PackagingTranslations = {
	id: number;
	languages_code?: string | Languages | null;
	packaging_id?: number | Packaging | null;
};

export type Product = {
	abrasivityLevel?: string | null;
	benefits?: unknown | null;
	bestseller?: boolean | null;
	bringItBackEligible?: number | Market | null;
	celebration?: unknown | null;
	certifications?: unknown | null;
	colours?: unknown | null;
	commerceImage?: string | DirectusFiles | null;
	containsFluoride?: boolean | null;
	date_created?: string | null;
	date_updated?: string | null;
	description?: string | null;
	duration?: number | null;
	giftGroup: string;
	howToStore?: string | null;
	howToUse?: string | null;
	id: string;
	inventionStory?: string | null;
	keyIngredients: any[] | ProductIngredientFamily[];
	latherLevel?: number | null;
	love?: string | null;
	media: any[] | ProductFiles[];
	meltable?: boolean | null;
	modestyLevel?: number | null;
	moods?: unknown | null;
	name?: string | null;
	need?: string | null;
	oralGroup: string;
	pH?: number | null;
	pliancy?: string | null;
	ranges?: unknown | null;
	relatedProducts: any[] | ProductRelations[];
	reportingCategory: any[] | ProductReportingCategory[];
	richnessScale?: number | null;
	saleorId?: string | null;
	scentDetails?: string | null;
	scents?: unknown | null;
	scrubbinessScale?: number | null;
	selfPreserving?: boolean | null;
	shadesLighter?: number | null;
	skincareGroup: string;
	sku?: string | null;
	soapGroup: string;
	sort?: number | null;
	spaGroup: string;
	spf?: number | null;
	starSigns?: unknown | null;
	status: string;
	strapline?: string | null;
	suitableForBath?: boolean | null;
	suitableForMinors?: string | null;
	suitableForPregnancy?: unknown | null;
	suitableForShower?: boolean | null;
	toggle?: boolean | null;
	type?: number | ProductType | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
	variants: any[] | ProductVariant[];
	vaultedSince?: string | null;
	want?: string | null;
	weighted?: boolean | null;
};

export type ProductFiles = {
	directus_files_id?: string | DirectusFiles | null;
	id: number;
	product_id?: string | Product | null;
};

export type ProductIngredient = {
	id: number;
	ingredient_id?: string | Ingredient | null;
	product_id?: string | Product | null;
};

export type ProductIngredient1 = {
	id: number;
	ingredient_id?: string | Ingredient | null;
	product_id?: string | Product | null;
};

export type ProductIngredientFamily = {
	id: number;
	ingredientFamily_id?: string | IngredientFamily | null;
	product_id?: string | Product | null;
};

export type ProductReportingCategory = {
	collection?: string | null;
	id: number;
	item?: string | any | null;
	product_id?: string | Product | null;
};

export type ProductCategory = {
	id: number;
	name: string;
};

export type ProductLaunch = {
	date_created?: string | null;
	date_updated?: string | null;
	dates: any[] | ProductLaunchMarket[];
	description?: string | null;
	id: number;
	name?: string | null;
	products: any[] | ProductLaunchProduct[];
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type ProductLaunchProduct = {
	id: number;
	product_id?: string | Product | null;
	productLaunch_id?: number | ProductLaunch | null;
};

export type ProductLaunchMarket = {
	endDate?: string | null;
	id: number;
	market?: number | Market | null;
	productLaunch?: number | ProductLaunch | null;
	startDate?: string | null;
};

export type ProductQi = {
	Boms?: unknown | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	productQiIngredients: any[] | ProductQiIngredient[];
	productVariant?: string | ProductVariant | null;
	sort?: number | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type ProductQiIngredient = {
	date_created?: string | null;
	date_updated?: string | null;
	displayName?: string | null;
	id: string;
	ingredient?: string | IngredientVariant | null;
	productQi?: string | ProductQi | null;
	show?: boolean | null;
	sort?: number | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type ProductRelations = {
	id: number;
	product?: string | Product | null;
	reason?: string | null;
	relatedProduct?: string | Product | null;
};

export type ProductRoutineBuilderProduct = {
	id: number;
	product_id?: string | Product | null;
};

export type ProductSubcategory = {
	category: number | ProductCategory;
	id: number;
	name: string;
};

export type ProductType = {
	context?: string | null;
	howToUse?: string | null;
	id: number;
	inventionStory?: string | null;
	name: string;
};

export type ProductVariant = {
	ballisticsAvailability?: boolean | null;
	date_created?: string | null;
	date_updated?: string | null;
	dryWeight?: number | null;
	id: string;
	itemType?: string | null;
	mainProcessVideoLink?: string | null;
	manufacturingProductTargets: any[] | ManufacturingProductTarget[];
	name?: string | null;
	pressingSuffix?: string | null;
	product?: string | Product | null;
	Qis: any[] | ProductQi[];
	sku: string;
	sort?: number | null;
	status: string;
	thumbnailUrl?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
	wetWeightMax?: number | null;
	wetWeightMin?: number | null;
};

export type RestrictedCountryComments = {
	comment?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: number;
	region?: number | TradeCountriesAndRegions | null;
	selection?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type Staff = {
	date_created?: string | null;
	date_updated?: string | null;
	defaultProductiveHours?: number | null;
	departments: any[] | StaffCompanyDepartment[];
	finishTime?: string | null;
	firstName?: string | null;
	id: string;
	lastName?: string | null;
	leaveDate?: string | null;
	leaveReason?: string | StaffLeaveReason | null;
	payBonusOverride?: boolean | null;
	payrollNumber?: number | null;
	role?: string | StaffRole | null;
	sort?: number | null;
	startDate?: string | null;
	startTime?: string | null;
	status?: string | null;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type StaffCompanyDepartment = {
	companyDepartment_id?: string | CompanyDepartment | null;
	id: number;
	staff_id?: string | Staff | null;
};

export type StaffUndefined = {
	collection?: string | null;
	id: number;
	item?: string | null;
	staff_id?: string | null;
};

export type StaffLeaveReason = {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	reason?: string | null;
	sort?: number | null;
	status: string;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type StaffRole = {
	date_created?: string | null;
	date_updated?: string | null;
	fixed_management_cost: boolean;
	id: string;
	name?: string | null;
	sort?: number | null;
	status: string;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type StaffShift = {
	bonusOverride?: boolean | null;
	date?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	hours?: number | null;
	id: string;
	paidBreak?: number | null;
	performanceBonusOverride?: boolean | null;
	shift?: string | null;
	sort?: number | null;
	staff?: string | Staff | null;
	status: string;
	user_created?: string | DirectusUsers | null;
	user_updated?: string | DirectusUsers | null;
};

export type Test = {
	id: string;
};

export type TradeCountriesAndRegions = {
	alpha2Code?: string | null;
	alpha3Code?: string | null;
	code?: string | null;
	countries: any[] | TradeCountriesAndRegionsTradeCountriesAndRegions[];
	id: number;
	latLong?: string | null;
	name?: string | null;
	numericCode?: string | null;
	sort?: number | null;
};

export type TradeCountriesAndRegionsTradeCountriesAndRegions = {
	id: number;
	related_tradeCountriesAndRegions_id?:
		| number
		| TradeCountriesAndRegions
		| null;
	tradeCountriesAndRegions_id?: number | TradeCountriesAndRegions | null;
};

export type CustomDirectusTypes = {
	ballisticsMarketTarget: BallisticsMarketTarget[];
	ballisticsStack: BallisticsStack[];
	ballisticsStack_staff: BallisticsStackStaff[];
	ballisticsStackMix: BallisticsStackMix[];
	ballisticsStackStatus: BallisticsStackStatus[];
	ballisticsStackStatus_staff: BallisticsStackStatusStaff[];
	ballisticsStackStatusAdjustment: BallisticsStackStatusAdjustment[];
	ballisticsTable: BallisticsTable[];
	ballisticsTableRota: BallisticsTableRota[];
	ballisticsTableRota_staff: BallisticsTableRotaStaff[];
	company: Company[];
	companyDepartment: CompanyDepartment[];
	countr: Countr[];
	directus_access: DirectusAccess[];
	directus_activity: DirectusActivity[];
	directus_collections: DirectusCollections[];
	directus_comments: DirectusComments[];
	directus_dashboards: DirectusDashboards[];
	directus_extensions: DirectusExtensions[];
	directus_fields: DirectusFields[];
	directus_files: DirectusFiles[];
	directus_flows: DirectusFlows[];
	directus_folders: DirectusFolders[];
	directus_migrations: DirectusMigrations[];
	directus_notifications: DirectusNotifications[];
	directus_operations: DirectusOperations[];
	directus_panels: DirectusPanels[];
	directus_permissions: DirectusPermissions[];
	directus_policies: DirectusPolicies[];
	directus_presets: DirectusPresets[];
	directus_relations: DirectusRelations[];
	directus_revisions: DirectusRevisions[];
	directus_roles: DirectusRoles[];
	directus_sessions: DirectusSessions[];
	directus_settings: DirectusSettings;
	directus_shares: DirectusShares[];
	directus_translations: DirectusTranslations[];
	directus_users: DirectusUsers[];
	directus_versions: DirectusVersions[];
	directus_webhooks: DirectusWebhooks[];
	ingredient: Ingredient[];
	ingredient_directus_files: IngredientDirectusFiles[];
	ingredient_directus_roles: IngredientDirectusRoles[];
	ingredient_directus_roles_1: IngredientDirectusRoles1[];
	ingredient_directus_roles_2: IngredientDirectusRoles2[];
	ingredient_files: IngredientFiles[];
	ingredient_files_1: IngredientFiles1[];
	ingredient_files_2: IngredientFiles2[];
	ingredient_ingredient_directus_roles: IngredientIngredientDirectusRoles[];
	ingredient_ingredientBenefit: IngredientIngredientBenefit[];
	ingredient_ingredientColour: IngredientIngredientColour[];
	ingredient_ingredientFunction: IngredientIngredientFunction[];
	ingredient_ingredientScentCategory: IngredientIngredientScentCategory[];
	ingredient_ingredientVariant: IngredientIngredientVariant[];
	ingredientBenefit: IngredientBenefit[];
	ingredientCategory: IngredientCategory[];
	ingredientColour: IngredientColour[];
	ingredientFamily: IngredientFamily[];
	ingredientFamily_ingredientBenefit: IngredientFamilyIngredientBenefit[];
	ingredientFunction: IngredientFunction[];
	ingredientSample: IngredientSample[];
	ingredientSample_files: IngredientSampleFiles[];
	ingredientSample_files_1: IngredientSampleFiles1[];
	ingredientScentCategory: IngredientScentCategory[];
	ingredientSource: IngredientSource[];
	ingredientSource_files: IngredientSourceFiles[];
	ingredientSource_ingredientSourceCertification: IngredientSourceIngredientSourceCertification[];
	ingredientSource_ingredientSourceCountryOfOrigin: IngredientSourceIngredientSourceCountryOfOrigin[];
	ingredientSource_ingredientSourceCountryOfOrigin_1: IngredientSourceIngredientSourceCountryOfOrigin1[];
	ingredientSource_ingredientSourceCountryOfOrigin_2: IngredientSourceIngredientSourceCountryOfOrigin2[];
	ingredientSource_ingredientSourceHazardousStatement: IngredientSourceIngredientSourceHazardousStatement[];
	ingredientSource_ingredientSourceIngredientCompliance: IngredientSourceIngredientSourceIngredientCompliance[];
	ingredientSource_ingredientSourceSeason: IngredientSourceIngredientSourceSeason[];
	ingredientSource_ingredientSourceSupport: IngredientSourceIngredientSourceSupport[];
	ingredientSource_location: IngredientSourceLocation[];
	ingredientSourceCertification: IngredientSourceCertification[];
	ingredientSourceCountryOfOrigin: IngredientSourceCountryOfOrigin[];
	ingredientSourceHazardousStatement: IngredientSourceHazardousStatement[];
	ingredientSourceIngredientCompliance: IngredientSourceIngredientCompliance[];
	ingredientSourceSeason: IngredientSourceSeason[];
	ingredientSourceSupport: IngredientSourceSupport[];
	ingredientSubcategory: IngredientSubcategory[];
	ingredientSupplier: IngredientSupplier[];
	ingredientSupplierConfiguration: IngredientSupplierConfiguration;
	ingredientSupplierRequests: IngredientSupplierRequests[];
	ingredientVariant: IngredientVariant[];
	ingredientVariant_composition: IngredientVariantComposition[];
	ingredientVariant_directus_roles: IngredientVariantDirectusRoles[];
	ingredientVariant_ingredientSourceCountryOfOrigin: IngredientVariantIngredientSourceCountryOfOrigin[];
	ingredientVariant_ingredientSourceHazardousStatement: IngredientVariantIngredientSourceHazardousStatement[];
	ingredientVariant_restrictedCountryComments: IngredientVariantRestrictedCountryComments[];
	ingredientVariant_restrictedCountryComments_2: IngredientVariantRestrictedCountryComments2[];
	ingredientVariant_tradeCountriesAndRegions: IngredientVariantTradeCountriesAndRegions[];
	languages: Languages[];
	location: Location[];
	locationInsurance: LocationInsurance[];
	manufacturingMarket: ManufacturingMarket[];
	manufacturingProductTarget: ManufacturingProductTarget[];
	manufacturingProductTarget_location: ManufacturingProductTargetLocation[];
	manufacturingProductTarget_manufacturingMarket: ManufacturingProductTargetManufacturingMarket[];
	market: Market[];
	packaging: Packaging[];
	packaging_translations: PackagingTranslations[];
	product: Product[];
	product_files: ProductFiles[];
	product_ingredient: ProductIngredient[];
	product_ingredient_1: ProductIngredient1[];
	product_ingredientFamily: ProductIngredientFamily[];
	product_reportingCategory: ProductReportingCategory[];
	productCategory: ProductCategory[];
	productLaunch: ProductLaunch[];
	productLaunch_product: ProductLaunchProduct[];
	productLaunchMarket: ProductLaunchMarket[];
	productQi: ProductQi[];
	productQiIngredient: ProductQiIngredient[];
	productRelations: ProductRelations[];
	productRoutineBuilder_product: ProductRoutineBuilderProduct[];
	productSubcategory: ProductSubcategory[];
	productType: ProductType[];
	productVariant: ProductVariant[];
	restrictedCountryComments: RestrictedCountryComments[];
	staff: Staff[];
	staff_companyDepartment: StaffCompanyDepartment[];
	staff_undefined: StaffUndefined[];
	staffLeaveReason: StaffLeaveReason[];
	staffRole: StaffRole[];
	staffShift: StaffShift[];
	test: Test[];
	tradeCountriesAndRegions: TradeCountriesAndRegions[];
	tradeCountriesAndRegions_tradeCountriesAndRegions: TradeCountriesAndRegionsTradeCountriesAndRegions[];
};
