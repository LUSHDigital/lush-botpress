import { request } from 'graphql-request';
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
	return request<App>(process.env.WYVERN_URL!, query, undefined, {
		authorization: `Bearer ${token}`
	});
}