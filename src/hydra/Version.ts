import { serializable as Serializable } from 'serializr'

export default class Version {
  @Serializable
  version?: string
}
