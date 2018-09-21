import { alias, serializable as Serializable } from 'serializr'

export class ConsentCompletion {
  @Serializable(alias('redirect_to'))
  redirect?: string
}
