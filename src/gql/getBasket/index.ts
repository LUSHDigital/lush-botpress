import { request } from 'graphql-request';
import query from './query';

interface Response {
	errors: {
		message: string;
		code: string;
	}[]
}

export default async function getBasket(userId: string, token: string, wyvernURL: string) {
	return request<Response>(wyvernURL, query, { userId }, {
		authorization: `Bearer ${token}`
	});
}