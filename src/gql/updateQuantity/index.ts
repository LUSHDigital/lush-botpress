import { request } from 'graphql-request';
import query from './query';

interface Response {
	errors: {
		message: string;
		code: string;
	}[]
}

type CheckoutLineUpdateInput = {
	lineId: number;
	variantId: string;
	quantity: number;
	price?: number;
}[]

export default async function updateQuantity(checkoutId: string, lines: CheckoutLineUpdateInput, token: string, wyvernURL: string) {
	return request<Response>(wyvernURL, query, { checkoutId, lines }, {
		authorization: `Bearer ${token}`
	});
}