import { serializable as Serializable, list, primitive, date, object, alias } from 'serializr'
import { anyType, timestamp } from './utilities'

export class Key {
  @Serializable(alias('kid'))
  id?: string

  /**
   * Identifies the cryptographic algorithm family used with the key.
   */
  @Serializable(alias('kty'))
  type?: string

  /**
   * Identifies the intended use of the public key.
   */
  @Serializable(alias('use'))
  use?: string

  /**
   * Identifies operations for which this key is intended to be used.
   */
  @Serializable(alias('key_ops', list(primitive())))
  operations?: string[]

  /**
   * Identifies the algorithm inteded for use with the key.
   */
  @Serializable(alias('alg'))
  algorithm?: string

  /**
   * URL reference to an x509 certificate chain in PEM format.
   */
  @Serializable(alias('x5u'))
  certificateReference?: string

  /**
   * List of base64 encoded x509 PKIX DER format certificates.
   */
  @Serializable(alias('x5c'))
  certificates?: string[]

  /**
   * A base64-encoded SHA-1 fingerprint of the x509 certificate.
   */
  @Serializable(alias('x5t'))
  fingerprint?: string

  /**
   * A base64-encoded SHA-256 fingerprint of the x509 certificate.
   */
  @Serializable(alias('x5t#S256'))
  thumbprint?: string
}

export class KeySet {
  @Serializable(list(object(Key)))
  keys?: Key[]
}

export class KeyGenerationParameters {
  @Serializable(alias('alg'))
  algorithm?: string

  @Serializable(alias('kid'))
  id?: string

  @Serializable(alias('use'))
  use?: string
}

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

export class OpenIdContext {
  @Serializable(alias('acr_values', list(primitive())))
  authenticationClassReferences?: string[]

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
  context?: OpenIdContext

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

export class ConsentRecord extends ConsentAcceptance {
  @Serializable(alias('consent_request', object(Consent)))
  request?: Consent
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

export class Login {
  @Serializable
  challenge?: string

  @Serializable(object(Client))
  client?: Client

  @Serializable(object(OpenIdContext))
  context?: OpenIdContext

  @Serializable(alias('request_url'))
  requestUrl?: string

  @Serializable(alias('requested_scope', list(primitive())))
  requestedScope?: string[]

  @Serializable(alias('session_id'))
  sessionId?: string

  @Serializable
  skip?: boolean

  @Serializable
  subject?: string
}

export class LoginAcceptance {
  @Serializable(alias('acr'))
  authenticationClassReference?: string

  @Serializable(alias('force_subject_identifier'))
  forceSubjectIdentifier?: string

  @Serializable
  remember?: boolean

  @Serializable(alias('remember_for'))
  rememberTimeout?: number

  @Serializable
  subject?: string
}

export class LoginRejection {
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

export class LoginCompletion {
  @Serializable(alias('redirect_to'))
  redirect?: string
}

export class FlushCriteria {
  @Serializable(alias('notAfter', date()))
  until?: Date
}

export class TokenIntrospection {
  /**
   * Whether or not the token is currently active.
   */
  @Serializable
  active?: boolean

  /**
   * Intended audiences for this token.
   */
  @Serializable(alias('aud', list(primitive())))
  audiences?: string[]

  /**
   * The identifier of the client with which this token is associated.
   */
  @Serializable(alias('client_id'))
  clientId?: string

  /**
   * Date and time at which this token expires.
   */
  @Serializable(alias('exp', timestamp()))
  expiresAt?: Date

  /**
   * External data associated with the token session.
   */
  @Serializable(alias('ext', anyType()))
  external?: { [key: string]: any }

  /**
   * Date and time at which this token was originally issued.
   */
  @Serializable(alias('iat', timestamp()))
  issuedAt?: Date

  /**
   * A URL indicating the original issuer of this token.
   */
  @Serializable(alias('iss'))
  issuer?: string

  /**
   * Indicates the date and time at which this token becomes valid.
   */
  @Serializable(alias('nbf', timestamp()))
  validAfter?: Date

  @Serializable(alias('obfuscated_subject'))
  obfuscatedSubject?: string

  @Serializable(list(primitive()))
  scope?: string[]

  @Serializable(alias('sub'))
  subject?: string

  @Serializable(alias('token_type'))
  type?: string

  /**
   * Human-readable identifier for the resource owner who issued the token.
   */
  @Serializable(alias('username'))
  userId?: string
}

export class UserInfo {
  @Serializable(date())
  birthdate?: Date

  @Serializable
  email?: string

  @Serializable(alias('email_verified'))
  emailVerified?: boolean

  @Serializable(alias('family_name'))
  familyName?: string

  @Serializable
  gender?: string

  @Serializable(alias('given_name'))
  givenName?: string
  
  @Serializable
  locale?: string

  @Serializable(alias('middle_name'))
  middleName?: string

  @Serializable
  name?: string

  @Serializable
  nickname?: string

  @Serializable(alias('phone_number'))
  phoneNumber?: string

  @Serializable(alias('phone_number_verified'))
  phoneNumberVerified?: boolean

  @Serializable
  picture?: string

  @Serializable(alias('preferred_username'))
  preferredUsername?: string

  @Serializable
  profile?: string

  @Serializable(alias('sub'))
  subject?: string

  @Serializable(alias('updated_at', timestamp()))
  updatedAt?: Date

  @Serializable
  website?: string

  @Serializable
  timeZone?: string
}

export class Version {
  @Serializable
  version?: string
}

export class Error {
  @Serializable
  error?: string

  @Serializable(alias('error_code'))
  code?: number

  @Serializable(alias('error_debug'))
  debug?: number

  @Serializable(alias('error_hint'))
  hint?: string
}