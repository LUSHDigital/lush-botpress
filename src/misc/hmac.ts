import type { Request } from '@botpress/sdk';
import * as jose from 'jose';
import { SALEOR_DOMAIN, SALEOR_SIGNATURE_HEADER } from '../const';

const JWKS = jose.createRemoteJWKSet(
  new URL(`${SALEOR_DOMAIN}/.well-known/jwks.json`)
);

export async function verifyWebhook(req: Request) {
  const jws = req.headers[SALEOR_SIGNATURE_HEADER]!;

  try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [header, _, signature] = jws.split(".");

		if (!signature) {
			throw new Error('JWS is malformed');
		}

    return jose.flattenedVerify({
      protected: header,
      payload: req.body || '',
      signature
    }, JWKS);
  } catch (e) {
    return false;
  }
}