import { alias, date, serializable as Serializable } from 'serializr'
import { timestamp } from '../utilities'

export class UserInfo {
  @Serializable(date())
  birthdate?: Date

  @Serializable
  email?: string

  @Serializable(alias('email_verified'))
  emailVerified?: boolean

  @Serializable(alias('family_name'))
  familyName?: string

  @Serializable
  gender?: string

  @Serializable(alias('given_name'))
  givenName?: string

  @Serializable
  locale?: string

  @Serializable(alias('middle_name'))
  middleName?: string

  @Serializable
  name?: string

  @Serializable
  nickname?: string

  @Serializable(alias('phone_number'))
  phoneNumber?: string

  @Serializable(alias('phone_number_verified'))
  phoneNumberVerified?: boolean

  @Serializable
  picture?: string

  @Serializable(alias('preferred_username'))
  preferredUsername?: string

  @Serializable
  profile?: string

  @Serializable(alias('sub'))
  subject?: string

  @Serializable(alias('updated_at', timestamp()))
  updatedAt?: Date

  @Serializable
  website?: string

  @Serializable
  timeZone?: string
}
