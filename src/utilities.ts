import { PropSchema } from 'serializr'


export const anyType = (): PropSchema => ({
  serializer: value => value,
  deserializer: value => value
})

export const timestamp = (): PropSchema => ({
  serializer: (value: Date) => Math.round(value.getTime() / 1000),
  deserializer: value => new Date(value * 1000)
})
