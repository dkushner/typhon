import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import * as Hydra from './hydra'

export type ClientOptions = AxiosRequestConfig

export interface HydraClientOptions {
  overrides?: ClientOptions
}

const getClient = (base: string, overrides: ClientOptions = { }): AxiosInstance => {
  const options: ClientOptions = {
    baseURL: base,
    ...overrides
  }

  return axios.create(options)
}

export class ClientBase {
  protected client!: AxiosInstance

  constructor (base: string, options: HydraClientOptions = { }) {
    this.client = getClient(base, options.overrides)
  }
}

export { Hydra }