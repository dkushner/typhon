import { deserialize, serialize } from 'serializr'
import { ClientBase } from '../index'
import { Client } from './Client'
import { Consent } from './Consent'
import { ConsentAcceptance } from './ConsentAcceptance'
import { ConsentCompletion } from './ConsentCompletion'
import { ConsentRecord } from './ConsentRecord'
import { ConsentRejection } from './ConsentRejection'
import { ConsentSession } from './ConsentSession'
import { Error } from './Error'
import { FlushCriteria } from './FlushCriteria'
import { GrantType } from './GrantType'
import { Key } from './Key'
import { KeyGenerationParameters } from './KeyGenerationParameters'
import { KeySet } from './KeySet'
import { Login } from './Login'
import { LoginAcceptance } from './LoginAcceptance'
import { LoginCompletion } from './LoginCompletion'
import { LoginRejection } from './LoginRejection'
import { OpenIdContext } from './OpenIdContext'
import { ResponseType } from './ResponseType'
import { TokenIntrospection } from './TokenIntrospection'
import { UserInfo } from './UserInfo'
import { Version } from './Version'

export class HydraClient extends ClientBase {
  async getClients(limit: number, offset: number): Promise<Client[]> {
    const { data } = await this.client.get('/clients', {
      params: { limit, offset },
    })

    return deserialize(Client, [].concat(data))
  }

  async createClient(client: Client): Promise<Client> {
    const { data } = await this.client.post('/clients', serialize(client))
    return deserialize(Client, data)
  }

  async getClient(id: string): Promise<Client> {
    const { data } = await this.client.get(`/clients/${id}`)
    return deserialize(Client, data)
  }

  async updateClient(id: string, patch: Client): Promise<Client> {
    const { data } = await this.client.put(`/clients/${id}`, serialize(patch))
    return deserialize(Client, data)
  }

  async deleteClient(id: string): Promise<void> {
    await this.client.delete(`/clients/${id}`)
  }

  async getConsent(challenge: string): Promise<Consent> {
    const { data } = await this.client.get(`/oauth2/auth/requests/consent/${challenge}`)
    return deserialize(Consent, data)
  }

  async acceptConsent(challenge: string, acceptance: ConsentAcceptance): Promise<ConsentCompletion> {
    const { data } = await this.client.put(`/oauth2/auth/requests/consent/${challenge}/accept`, serialize(acceptance))
    return deserialize(ConsentCompletion, data)
  }

  async rejectConsent(challenge: string, rejection: ConsentRejection): Promise<ConsentCompletion> {
    const { data } = await this.client.put(`/oauth2/auth/requests/consent/${challenge}/reject`, serialize(rejection))
    return deserialize(ConsentCompletion, data)
  }

  async getLogin(challenge: string): Promise<Login> {
    const { data } = await this.client.get(`/oauth2/auth/requests/login/${challenge}`)
    return deserialize(Login, data)
  }

  async acceptLogin(challenge: string, acceptance: LoginAcceptance): Promise<LoginCompletion> {
    const { data } = await this.client.put(`/oauth2/auth/requests/login/${challenge}/accept`, serialize(acceptance))
    return deserialize(LoginCompletion, data)
  }

  async rejectLogin(challenge: string, rejection: LoginRejection): Promise<LoginCompletion> {
    const { data } = await this.client.put(`/oauth2/auth/requests/login/${challenge}/reject`, serialize(rejection))
    return deserialize(LoginCompletion, data)
  }

  async getSessions(user: string): Promise<ConsentRecord[]> {
    const { data } = await this.client.get(`/oauth2/auth/sessions/consent/${user}`)
    return deserialize(ConsentRecord, [].concat(data))
  }

  async revokeConsent(user: string): Promise<void> {
    await this.client.delete(`/oauth2/auth/sessions/consent/${user}`)
  }

  async revokeClientConsent(user: string, client: string): Promise<void> {
    await this.client.delete(`/oauth2/auth/sessions/consent/${user}/${client}`)
  }

  async revokeLogin(user: string): Promise<void> {
    await this.client.delete(`/oauth2/auth/sessions/login/${user}`)
  }

  async flushTokens(criteria: FlushCriteria): Promise<void> {
    await this.client.post(`/oauth2/flush`, serialize(criteria))
  }

  async introspectToken(token: string, scope?: string | string[]): Promise<TokenIntrospection> {
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
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return deserialize(TokenIntrospection, data)
  }

  async revokeToken(token: string): Promise<void> {
    const form = new FormData()
    form.set('token', token)

    await this.client.post(`/oauth2/revoke`, form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  async getUserInfo(token: string): Promise<UserInfo> {
    const { data } = await this.client.post(`/userinfo`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return deserialize(UserInfo, data)
  }

  async getKeys(set: string): Promise<KeySet> {
    const { data } = await this.client.get(`/keys/${set}`)
    return deserialize(KeySet, data)
  }

  async updateKeys(set: string, patch: KeySet): Promise<KeySet> {
    const { data } = await this.client.put(`/keys/${set}`, serialize(patch))
    return deserialize(KeySet, data)
  }

  async generateKey(set: string, parameters: KeyGenerationParameters): Promise<KeySet> {
    const { data } = await this.client.post(`/keys/${set}`, serialize(parameters))
    return deserialize(KeySet, data)
  }

  async deleteKeys(set: string): Promise<void> {
    await this.client.delete(`/keys/${set}`)
  }

  async getKey(set: string, id: string): Promise<Key> {
    const { data } = await this.client.get(`/key/${set}/${id}`)
    return deserialize(Key, data)
  }

  async updateKey(set: string, id: string, patch: Key): Promise<Key> {
    const { data } = await this.client.put(`/key/${set}/${id}`, serialize(patch))
    return deserialize(Key, data)
  }

  async deleteKey(set: string, id: string): Promise<void> {
    await this.client.delete(`/key/${set}/${id}`)
  }

  async version(): Promise<Version> {
    const { data } = await this.client.get(`/version`)
    return deserialize(Version, data)
  }
}

export {
  Client,
  Consent,
  ConsentAcceptance,
  ConsentCompletion,
  ConsentRecord,
  ConsentRejection,
  ConsentSession,
  Error,
  FlushCriteria,
  GrantType,
  Key,
  KeyGenerationParameters,
  KeySet,
  Login,
  LoginAcceptance,
  LoginCompletion,
  LoginRejection,
  OpenIdContext,
  ResponseType,
  TokenIntrospection,
  UserInfo,
  Version,
}
