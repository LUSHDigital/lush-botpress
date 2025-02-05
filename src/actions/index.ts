import { addToBasket } from "./add-to-basket";
import { addUserToCheckout } from "./add-user-checkout";
import { fetchProducts } from "./fetch-products";
import { fetchReviews } from "./fetch-reviews";
import { findStores } from "./find-stores";
import { upsertBillingAddress } from "./upsert-billing-address";
import { upsertShippingAddress } from "./upsert-shipping-address";

export default {
	addToBasket,
	addUserToCheckout,
	fetchReviews,
	fetchProducts,
	findStores,
	upsertShippingAddress,
	upsertBillingAddress,
	getCustomerOrders: async () => ({}),
	removeFromBasket: async () => ({}),
	updateQuantity: async () => ({}),
};
