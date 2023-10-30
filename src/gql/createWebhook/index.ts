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

export default async function createWebhook(wyvernURL: string, variables: WebhookCreateInput, token: string) {
	return request<Webhook>(wyvernURL, query, variables, {
		authorization: `Bearer ${token}`
	});
}