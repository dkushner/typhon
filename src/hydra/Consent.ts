import { alias, list, object, primitive, serializable as Serializable } from 'serializr'
import { Client } from './Client'
import { OpenIdContext } from './OpenIdContext'

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
