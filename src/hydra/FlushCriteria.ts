import { alias, date, serializable as Serializable } from 'serializr'

export default class FlushCriteria {
  @Serializable(alias('notAfter', date()))
  until?: Date
}
