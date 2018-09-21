import { alias, list, object, primitive, serializable as Serializable } from 'serializr'
import { Client } from './Client'
import { OpenIdContext } from './OpenIdContext'

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
