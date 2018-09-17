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

  async rejectConsent (challenge: string, rejection: Hydra.ConsentRejection): Promise<Hydra.ConsentCompletion> {
    const { data } = await this.client.put(`/oauth2/auth/requests/consent/${challenge}/reject`, serialize(rejection))
    return deserialize(Hydra.ConsentCompletion, data)
  }

  async getLogin (challenge: string): Promise<Hydra.Login> {
    const { data } = await this.client.get(`/oauth2/auth/requests/login/${challenge}`)
    return deserialize(Hydra.Login, data)
  }

  async acceptLogin (challenge: string, acceptance: Hydra.LoginAcceptance): Promise<Hydra.LoginCompletion> {
    const { data } = await this.client.put(`/oauth2/auth/requests/login/${challenge}/accept`, serialize(acceptance))
    return deserialize(Hydra.LoginCompletion, data)
  }

  async rejectLogin (challenge: string, rejection: Hydra.LoginRejection): Promise<Hydra.LoginCompletion> {
    const { data } = await this.client.put(`/oauth2/auth/requests/login/${challenge}/reject`, serialize(rejection))
    return deserialize(Hydra.LoginCompletion, data)
  }

  async getSessions (user: string): Promise<Hydra.ConsentRecord[]> {
    const { data } = await this.client.get(`/oauth2/auth/sessions/consent/${user}`)
    return deserialize(Hydra.ConsentRecord, [].concat(data))
  }

  async revokeConsent (user: string): Promise<void> {
    await this.client.delete(`/oauth2/auth/sessions/consent/${user}`)
  }

  async revokeClientConsent (user: string, client: string): Promise<void> {
    await this.client.delete(`/oauth2/auth/sessions/consent/${user}/${client}`)
  }

  async revokeLogin (user: string): Promise<void> {
    await this.client.delete(`/oauth2/auth/sessions/login/${user}`)
  }

  async flushTokens (criteria: Hydra.FlushCriteria): Promise<void> {
    await this.client.post(`/oauth2/flush`, serialize(criteria))
  }

  async introspectToken (token: string, scope?: string | string[]): Promise<Hydra.TokenIntrospection> {
    const form = new FormData()
    form.set('token', token)

    if (scope) {
      if (Array.isArray(scope)) {
        form.set('scope', scope.join(' '))
      } else {
        form.set('scope', scope)
      }
    }

    const { data } = await this.client.post(`/oauth2/introspect`, form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return deserialize(Hydra.TokenIntrospection, data)
  }

  async revokeToken (token: string): Promise<void> {
    const form = new FormData()
    form.set('token', token)

    await this.client.post(`/oauth2/revoke`, form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  async getUserInfo (token: string): Promise<Hydra.UserInfo> {
    const { data } = await this.client.post(`/userinfo`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return deserialize(Hydra.UserInfo, data)
  }

  async getKeys (set: string): Promise<Hydra.KeySet> {
    const { data } = await this.client.get(`/keys/${set}`)
    return deserialize(Hydra.KeySet, data)
  }

  async updateKeys (set: string, patch: Hydra.KeySet): Promise<Hydra.KeySet> {
    const { data } = await this.client.put(`/keys/${set}`, serialize(patch))
    return deserialize(Hydra.KeySet, data)
  }

  async generateKey (set: string, parameters: Hydra.KeyGenerationParameters): Promise<Hydra.KeySet> {
    const { data } = await this.client.post(`/keys/${set}`, serialize(parameters))
    return deserialize(Hydra.KeySet, data)
  }

  async deleteKeys (set: string): Promise<void> {
    await this.client.delete(`/keys/${set}`)
  }

  async getKey (set: string, id: string): Promise<Hydra.Key> {
    const { data } = await this.client.get(`/key/${set}/${id}`)
    return deserialize(Hydra.Key, data)
  }

  async updateKey (set: string, id: string, patch: Hydra.Key): Promise<Hydra.Key> {
    const { data } = await this.client.put(`/key/${set}/${id}`, serialize(patch))
    return deserialize(Hydra.Key, data)
  }

  async deleteKey (set: string, id: string): Promise<void> {
    await this.client.delete(`/key/${set}/${id}`)
  }

  async version (): Promise<Hydra.Version> {
    const { data } = await this.client.get(`/version`)
    return deserialize(Hydra.Version, data)
  }
}