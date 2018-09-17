import { alias, serializable as Serializable } from 'serializr'

export default class LoginCompletion {
  @Serializable(alias('redirect_to'))
  redirect?: string
}