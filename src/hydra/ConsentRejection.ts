import { alias, serializable as Serializable } from 'serializr'

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
