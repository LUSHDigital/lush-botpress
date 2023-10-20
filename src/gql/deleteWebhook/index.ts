import { request } from 'graphql-request';
import { WYVERN_URL } from 'src/const';
import query from './query';

interface Response {
	errors: {
		message: string;
		code: string;
	}[]
}

export default async function deleteWebhook(webhookDeleteId: string, token: string) {
	return request<Response>(WYVERN_URL, query, { webhookDeleteId }, {
		authorization: `Bearer ${token}`
	});
}