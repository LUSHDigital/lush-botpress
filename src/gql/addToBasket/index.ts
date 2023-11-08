import { request } from 'graphql-request';
import query from './query';

interface Response {
	errors: {
		message: string;
		code: string;
	}[]
}

type CheckoutLineInput = {
	quantity: number;
	variantId: string;
	price?: number;
	metadata?: any;
	forceNewLine?: string;
}[]

export default async function addToBasket(checkoutId: string, lines: CheckoutLineInput, token: string, wyvernURL: string) {
	return request<Response>(wyvernURL, query, { checkoutId, lines }, {
		authorization: `Bearer ${token}`
	});
}