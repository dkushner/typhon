import { list, object, serializable as Serializable } from 'serializr'
import Key from './Key'

export default class KeySet {
  @Serializable(list(object(Key)))
  keys?: Key[]
}

