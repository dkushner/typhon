import { alias, serializable as Serializable } from 'serializr'

export class KeyGenerationParameters {
  @Serializable(alias('alg'))
  algorithm?: string

  @Serializable(alias('kid'))
  id?: string

  @Serializable(alias('use'))
  use?: string
}
