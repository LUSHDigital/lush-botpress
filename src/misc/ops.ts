import type { Client } from ".botpress";

import app from "src/gql/app";
import createWebhook from "src/gql/createWebhook";
import deleteWebhook from "src/gql/deleteWebhook";
import { Checkout, Product } from "./types";
import { getUserAndConversation } from "./utils";

export async function createOrGetWebhook(url: string, token: string) {
	const data = await app(token);
	const previous = data.app.webhooks.find((webhook) => {
		return webhook.targetUrl === url
	});

	// Found a webhook with the same URL so no need to create a new one.
	if (previous) {
		return previous;
	}

	// New url, new hook.
	return createWebhook({
		input: {
			asyncEvents: ["ANY_EVENTS"],
			isActive: true,
			name: "Botpress",
			targetUrl: url
		}
	}, token)
}

export async function removeWebhook(url: string, token: string) {
	console.log('removeWebhook invoked')
	const data = await app(token);
	const previous = data.app.webhooks.find((webhook) => {
		return webhook.targetUrl === url
	});

	// Found a webhook with the same URL so no need to create a new one.
	if (previous) {
		console.log('found old webhook, will remove');
		const x = await deleteWebhook(previous.id, token);
		console.log('x', x);
		return x;
	}


	console.log('no webhook found');
	return;
}

interface productHandlerArgs {
	event: Product[],
	client: Client
}

interface checkoutHandlerArgs {
	event: Checkout[],
	client: Client
}

export async function handleProductCreated({event, client}: productHandlerArgs) {
	console.log('Not implemented', event)
} 
export async function handleProductUpdated({event, client}: productHandlerArgs) {
	console.log('Not implemented', event)
} 
export async function handleCheckoutCreated({event, client}: checkoutHandlerArgs) {
	console.log('Not implemented', event)
	const basket = event[0];
	if (!basket) {
		return;
	}
	const y = await client.createEvent({
    type: 'basketUpdated',
    payload: {
      id: basket.id,
      lines: basket.lines,
    },
		...(await getUserAndConversation({
          userId: basket.metadata.user_id || '',
          channelId: basket.id,
          channel: 'channel',
        }, client))
  });
	console.log('handleCheckoutCreated', y)
}

export async function handleCheckoutUpdated({event, client}: checkoutHandlerArgs) {
	console.log('Not implemented', event)
	const basket = event[0];
	if (!basket) {
		return;
	}
	const y = await client.createEvent({
    type: 'basketUpdated',
    payload: {
      id: basket.id,
      lines: basket.lines,
    },
		...(await getUserAndConversation({
          userId: basket.metadata.user_id || '',
          channelId: basket.id,
          channel: 'channel',
        }, client))
  });
	console.log('handleCheckoutCreated', y)
} 

export async function handleCheckoutPaid({event, client}: checkoutHandlerArgs) {
	console.log('Not implemented', event)
}