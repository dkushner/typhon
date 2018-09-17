import { alias, list, primitive, serializable as Serializable } from 'serializr'
import { anyType, timestamp } from '../utilities'

export default class TokenIntrospection {
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