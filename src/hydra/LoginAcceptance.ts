import { alias, serializable as Serializable } from 'serializr'

export class LoginAcceptance {
  @Serializable(alias('acr'))
  authenticationClassReference?: string

  @Serializable(alias('force_subject_identifier'))
  forceSubjectIdentifier?: string

  @Serializable
  remember?: boolean

  @Serializable(alias('remember_for'))
  rememberTimeout?: number

  @Serializable
  subject?: string
}
