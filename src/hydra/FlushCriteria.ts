import { alias, date, serializable as Serializable } from 'serializr'

export class FlushCriteria {
  @Serializable(alias('notAfter', date()))
  until?: Date
}
