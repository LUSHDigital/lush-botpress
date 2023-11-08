import { request } from 'graphql-request';
import query from './query';

interface Response {
	errors: {
		message: string;
		code: string;
	}[]
}

type AddressInput = {
	firstName: string;
	lastName: string;
	streetAddress1: string;
	streetAddress2: string;
	city: string;
	postalCode: string;
	country: string;
}

export default async function updateBillingAddress(checkoutId: string, billingAddress: AddressInput, token: string, wyvernURL: string) {
	return request<Response>(wyvernURL, query, { checkoutId, billingAddress }, {
		authorization: `Bearer ${token}`
	});
}