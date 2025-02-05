import {
	basketUpdatedSchema,
	checkoutPaidSchema,
	checkoutUpdatedSchema,
	productCreatedSchema,
	productLaunchUpdatedSchema,
	productRelationshipUpdatedSchema,
	productUpdatedSchema,
} from "../schemas";

const basketUpdated = {
	schema: basketUpdatedSchema,
	ui: {},
};
const checkoutPaid = {
	schema: checkoutPaidSchema,
	ui: {},
};
const checkoutUpdated = {
	schema: checkoutUpdatedSchema,
	ui: {},
};
const productCreated = {
	schema: productCreatedSchema,
	ui: {},
};
const productUpdated = {
	schema: productUpdatedSchema,
	ui: {},
};
const productRelationshipUpdated = {
	schema: productRelationshipUpdatedSchema,
	ui: {},
};
const productLaunchUpdated = {
	schema: productLaunchUpdatedSchema,
	ui: {},
};

export const events = {
	basketUpdated,
	checkoutPaid,
	checkoutUpdated,
	productCreated,
	productUpdated,
	productLaunchUpdated,
	productRelationshipUpdated,
};
