import type { Request } from '@botpress/sdk'
import * as jose from 'jose'
import { SALEOR_SIGNATURE_HEADER } from '../const'

export async function verifyWebhook (req: Request, saleorDomain: string) {
  const JWKS = jose.createRemoteJWKSet(
    new URL(`${saleorDomain}/.well-known/jwks.json`)
  )
  const jws = req.headers[SALEOR_SIGNATURE_HEADER]!

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [header, _, signature] = jws.split('.')

    if (!signature) {
      throw new Error('JWS is malformed')
    }

    return await jose.flattenedVerify({
      protected: header,
      payload: req.body || '',
      signature
    }, JWKS)
  } catch (e) {
    return false
  }
}
