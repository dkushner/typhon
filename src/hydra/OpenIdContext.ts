import { alias, list, primitive, serializable as Serializable } from 'serializr'
import { anyType } from '../utilities'

export default class OpenIdContext {
  @Serializable(alias('acr_values', list(primitive())))
  authenticationClassReferences?: string[]

  @Serializable
  display?: string

  @Serializable(alias('id_token_hint_claims', anyType()))
  tokenHintClaims?: { [key: string]: any }

  @Serializable(alias('login_hint'))
  loginHint?: string

  @Serializable(alias('ui_locales', list(primitive())))
  locales?: string[]
}