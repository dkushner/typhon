import { serializable as Serializable, list, primitive, date, object, alias, PropSchema } from 'serializr'
import { KeySet } from './crypto';

export const anyType = (): PropSchema => ({
  serializer: value => value,
  deserializer: value => value
})

export type GrantType = 'client_credentials' | 'authorize_code' | 'implicit' | 'refresh_token' 
export type ResponseType = 'id_token' | 'code' | 'token'

export class Client {
  @Serializable(alias('allowed_cors_origins', list(primitive())))
  allowedOrigins?: string[]

  @Serializable(alias('client_name'))
  name?: string

  @Serializable(alias('client_secret'))
  secret?: string

  @Serializable(alias('client_secret_expires_at', date()))
  secretExpiry?: Date

  @Serializable(alias('client_uri'))
  uri?: string

  @Serializable(list(primitive()))
  contacts?: string[]

  @Serializable(alias('grant_types', list(primitive())))
  grantTypes?: GrantType[]

  @Serializable(alias('jwks', object(KeySet)))
  keys?: KeySet

  @Serializable(alias('jwks_uri'))
  keysUri?: string

  @Serializable(alias('logo_uri'))
  logoUri?: string

  @Serializable
  owner?: string

  @Serializable(alias('policy_uri'))
  policyUri?: string

  @Serializable(alias('redirect_uris', list(primitive())))
  redirectUris?: string[]

  @Serializable(alias('request_object_signing_alg'))
  signingAlgorithm?: string

  @Serializable(alias('request_uris', list(primitive())))
  requestUris?: string[]

  @Serializable(alias('response_types', list(primitive())))
  responseTypes?: ResponseType[]

  @Serializable(alias('scope', list(primitive())))
  scope?: string[]

  @Serializable(alias('sector_identifier_uri'))
  sectorUri?: string

  @Serializable(alias('subject_type'))
  subjectType?: string

  @Serializable(alias('tos_uri'))
  termsUri?: string

  @Serializable(alias('userinfo_signed_response_alg'))
  userInfoAlgorithm?: string
}

export class OpenIdContext {
  @Serializable(alias('acr_values', list(primitive())))
  acrValues?: string[]

  @Serializable
  display?: string

  @Serializable(alias('id_token_hint_claims', anyType()))
  tokenHintClaims?: { [key: string]: any }

  @Serializable(alias('login_hint'))
  loginHint?: string

  @Serializable(alias('ui_locales', list(primitive())))
  locales?: string[]
}

export class Consent {
  @Serializable
  challenge?: string

  @Serializable(object(Client))
  client?: Client

  @Serializable(alias('login_challenge'))
  loginChallenge?: string

  @Serializable(alias('login_session_id'))
  loginSession?: string

  @Serializable(alias('oidc_context', object(OpenIdContext)))
  openIdContext?: OpenIdContext

  @Serializable(alias('request_url'))
  requestUrl?: string

  @Serializable(alias('requested_scope', list(primitive())))
  requestedScope?: string[]

  @Serializable
  skip?: boolean

  @Serializable
  subject?: string
}

export class ConsentSession {
  @Serializable(alias('access_token', anyType()))
  accessToken?: { [key: string]: any }

  @Serializable(alias('id_token', anyType()))
  idToken?: { [key: string]: any }
}

export class ConsentAcceptance {
  @Serializable(alias('grant_scope', list(primitive())))
  grantScope?: string[]

  @Serializable
  remember?: boolean

  @Serializable(alias('remember_for'))
  rememberTimeout?: number

  @Serializable(object(ConsentSession))
  session?: ConsentSession
}

export class ConsentRejection {
  @Serializable
  error?: string

  @Serializable(alias('error_debug'))
  debug?: string

  @Serializable(alias('error_description'))
  description?: string

  @Serializable(alias('error_hint'))
  hint?: string

  @Serializable(alias('status_code'))
  status?: number
}

export class ConsentCompletion {
  @Serializable(alias('redirect_to'))
  redirect?: string
}