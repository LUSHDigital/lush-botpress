import type { Request } from '@botpress/sdk'
import * as jose from 'jose'
import { SALEOR_SIGNATURE_HEADER } from '../const'

export async function verifyWebhook (req: Request, saleorDomain: string): Promise<Boolean | Object> {
  const JWKS = jose.createRemoteJWKSet(
    new URL(`${saleorDomain}/.well-known/jwks.json`)
  )

  try {
    const jws = req.headers[`x-${SALEOR_SIGNATURE_HEADER}`] || req.headers[SALEOR_SIGNATURE_HEADER]

    if (jws === undefined) {
      return false
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [header, _, signature] = jws.split('.')

    if (signature === null || signature === undefined) {
      throw new Error('JWS is malformed')
    }
    if (req.body === null || req.body === undefined) {
      throw new Error('Missing body')
    }

    return await jose.flattenedVerify({
      protected: header,
      payload: req.body,
      signature
    }, JWKS)
  } catch (e) {
    return false
  }
}
