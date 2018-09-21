import { list, object, serializable as Serializable } from 'serializr'
import { Key } from './Key'

export class KeySet {
  @Serializable(list(object(Key)))
  keys?: Key[]
}
