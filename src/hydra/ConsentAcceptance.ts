import { alias, list, object, primitive, serializable as Serializable } from 'serializr'
import { ConsentSession } from './ConsentSession'

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
