import { serializable as Serializable, alias } from "serializr";

export class Error {
  @Serializable
  error: string

  @Serializable(alias('error_code'))
  code: number

  @Serializable(alias('error_debug'))
  debug: number

  @Serializable(alias('error_hint'))
  hint: string
}