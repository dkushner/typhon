import { alias, object, serializable as Serializable } from 'serializr'
import Consent from './Consent'
import ConsentAcceptance from './ConsentAcceptance'

export default class ConsentRecord extends ConsentAcceptance {
  @Serializable(alias('consent_request', object(Consent)))
  request?: Consent
}
