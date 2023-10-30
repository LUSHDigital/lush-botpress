import { request } from 'graphql-request';
import query from './query';

interface Webhook {
  webhook: { 
		id: string;
		isActive: boolean;
		name: string;
		targetUrl: string;
	}
}

type WebhookCreateInput = {
  input: {
    asyncEvents: ["ANY_EVENTS"];
    isActive: true;
    name: string;
    targetUrl: string;
  }
}

export default async function createWebhook(variables: WebhookCreateInput, token: string) {
	return request<Webhook>(process.env.WYVERN_URL!, query, variables, {
		authorization: `Bearer ${token}`
	});
}