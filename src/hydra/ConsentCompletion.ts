import { alias, serializable as Serializable } from 'serializr'

export default class ConsentCompletion {
  @Serializable(alias('redirect_to'))
  redirect?: string
}
