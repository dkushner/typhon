import { alias, serializable as Serializable } from 'serializr'
import { anyType } from '../utilities'

export default class ConsentSession {
  @Serializable(alias('access_token', anyType()))
  accessToken?: { [key: string]: any }

  @Serializable(alias('id_token', anyType()))
  idToken?: { [key: string]: any }
}
