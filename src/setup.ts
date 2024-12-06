import { createOrGetWebhook, removeWebhook } from "./misc/ops";
import type { RegisterFunction, UnregisterFunction } from "./misc/types";

export const register: RegisterFunction = async ({
	ctx,
	logger,
	webhookUrl,
}) => {
	const { token, wyvernURL } = ctx.configuration;

	await createOrGetWebhook(webhookUrl, token, wyvernURL);

	logger.forBot().info("Webook successfully created in Saleor");
};

export const unregister: UnregisterFunction = async ({
	ctx,
	logger,
	webhookUrl,
}) => {
	const { token, wyvernURL } = ctx.configuration;

	await removeWebhook(webhookUrl, token, wyvernURL);

	logger.forBot().info("Webook successfully removed from Saleor");
};
