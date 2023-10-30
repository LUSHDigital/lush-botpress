import { request } from 'graphql-request';
import query from './query';

interface Response {
	errors: {
		message: string;
		code: string;
	}[]
}

export default async function deleteWebhook(webhookDeleteId: string, token: string) {
	return request<Response>(process.env.WYVERN_URL!, query, { webhookDeleteId }, {
		authorization: `Bearer ${token}`
	});
}