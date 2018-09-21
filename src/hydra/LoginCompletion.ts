import { alias, serializable as Serializable } from 'serializr'

export class LoginCompletion {
  @Serializable(alias('redirect_to'))
  redirect?: string
}
