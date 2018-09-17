import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { serialize, deserialize, Clazz, getDefaultModelSchema } from 'serializr'
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

class ClientBase {
  protected client!: AxiosInstance

  constructor (base: string, options: HydraClientOptions = { }) {
    this.client = getClient(base, options.overrides)
  }

  protected inflate<T extends Serializable<T>> (data: any | any[], clazz: T): T {
    return new clazz().inflate(data)
  }

  protected deflate<T> (data: T): any {
    return serialize(data)
  }
}

export class HydraClient extends ClientBase {
  async getClients (limit: number, offset: number): Promise<Hydra.Client[]> {
    const { data } = await this.client.get('/clients', {
      params: { limit, offset }
    })

    return deserialize(Hydra.Client, [].concat(data))
  }

  async createClient (client: Hydra.Client): Promise<Hydra.Client> {
    const { data } = await this.client.post('/clients', serialize(client))
    return deserialize(Hydra.Client, data)
  }

  async getClient (id: string): Promise<Hydra.Client> {
    const { data } = await this.client.get(`/clients/${id}`)
    return deserialize(Hydra.Client, data)
  }

  async updateClient (id: string, patch: Hydra.Client): Promise<Hydra.Client> {
    const { data } = await this.client.put(`/clients/${id}`, serialize(patch))
    return deserialize(Hydra.Client, data)
  }

  async deleteClient (id: string): Promise<void> {
    await this.client.delete(`/clients/${id}`)
  }

  async getConsent (challenge: string): Promise<Hydra.Consent> {
    const { data } = await this.client.get(`/oauth2/auth/requests/consent/${challenge}`)
    return deserialize(Hydra.Consent, data)
  }

  async acceptConsent (challenge: string, acceptance: Hydra.ConsentAcceptance): Promise<Hydra.ConsentCompletion> {
    const { data } = await this.client.put(`/oauth2/auth/requests/consent/${challenge}/accept`, serialize(acceptance))
    return deserialize(Hydra.ConsentCompletion, data)
  }

  async rejectConsent (challenge: string, rejection: Hydra.ConsentRejection): Promise<

  async getLogin (challenge: string): Promise<Hydra.Login> {

  }

  async acceptLogin (challenge: string, )
}