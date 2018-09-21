import { alias, date, list, object, primitive, serializable as Serializable } from 'serializr'
import { GrantType } from './GrantType'
import { KeySet } from './KeySet'
import { ResponseType } from './ResponseType'

export class Client {
  @Serializable(alias('allowed_cors_origins', list(primitive())))
  allowedOrigins?: string[]

  @Serializable(alias('client_name'))
  name?: string

  @Serializable(alias('client_secret'))
  secret?: string

  @Serializable(alias('client_secret_expires_at', date()))
  secretExpiresAt?: Date

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
