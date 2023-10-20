import { request } from 'graphql-request';
import { WYVERN_URL } from 'src/const';
import query from './query';

interface App {
	app: {
		webhooks: { 
			id: string;
			isActive: boolean;
			name: string;
			targetUrl: string;
		}[]
	}
}

export default async function app(token: string) {
	return request<App>(WYVERN_URL, query, undefined, {
		authorization: `Bearer ${token}`
	});
}