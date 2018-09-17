import { alias, list, primitive, serializable as Serializable } from 'serializr'

export default class Key {
  @Serializable(alias('kid'))
  id?: string

  /**
   * Identifies the cryptographic algorithm family used with the key.
   */
  @Serializable(alias('kty'))
  type?: string

  /**
   * Identifies the intended use of the public key.
   */
  @Serializable(alias('use'))
  use?: string

  /**
   * Identifies operations for which this key is intended to be used.
   */
  @Serializable(alias('key_ops', list(primitive())))
  operations?: string[]

  /**
   * Identifies the algorithm inteded for use with the key.
   */
  @Serializable(alias('alg'))
  algorithm?: string

  /**
   * URL reference to an x509 certificate chain in PEM format.
   */
  @Serializable(alias('x5u'))
  certificateReference?: string

  /**
   * List of base64 encoded x509 PKIX DER format certificates.
   */
  @Serializable(alias('x5c'))
  certificates?: string[]

  /**
   * A base64-encoded SHA-1 fingerprint of the x509 certificate.
   */
  @Serializable(alias('x5t'))
  fingerprint?: string

  /**
   * A base64-encoded SHA-256 fingerprint of the x509 certificate.
   */
  @Serializable(alias('x5t#S256'))
  thumbprint?: string
}