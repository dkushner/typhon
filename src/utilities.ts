import { PropSchema } from 'serializr'


export const anyType = (): PropSchema => ({
  deserializer: value => value,
  serializer: value => value
})

export const timestamp = (): PropSchema => ({
  deserializer: value => new Date(value * 1000),
  serializer: (value: Date) => Math.round(value.getTime() / 1000)
})
