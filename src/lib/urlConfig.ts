/**
 * Global configuration for calls to the backend.
 */

/**
 * Interface for the URL configuration.
 *
 * Configuration can be `undefined` to indicate that the service
 * is not available.
 */
export interface UrlConfig {
  /** Base URL to the annonars backend. */
  baseUrlAnnonars?: string
  /** Base URL to the autoACMG backend. */
  baseUrlAutoACMG?: string
  /** Base URL to the mehari backend. */
  baseUrlMehari?: string
  /** Base URL to the viguno backend. */
  baseUrlViguno?: string
  /** Base URL to the cadaPrio backend. */
  baseUrlCadaPrio?: string
  /** Base URL to the dotty backend. */
  baseUrlDotty?: string
  /** Base URL to nginx for serving tracks etc. */
  baseUrlNginx?: string

  /** Base URL to the variantValidator backend proxy. */
  baseUrlVariantValidator?: string
  /** Base URL to the pubtator backend proxy. */
  baseUrlPubtator?: string
  /** Base URL to the litVar backend proxy. */
  baseUrlLitVar?: string
}

/**
 * Global URL configuration instance.
 */
export const urlConfig: UrlConfig = {}

/**
 * Helper that performs setup of the global URL configuration for testing.
 */
export const setupUrlConfigForTesting = () => {
  urlConfig.baseUrlAnnonars = '/internal/proxy/annonars'
  urlConfig.baseUrlAutoACMG = '/internal/proxy/autoacmg'
  urlConfig.baseUrlMehari = '/internal/proxy/mehari'
  urlConfig.baseUrlViguno = '/internal/proxy/viguno'
  urlConfig.baseUrlCadaPrio = '/internal/proxy/cada-prio'
  urlConfig.baseUrlDotty = '/internal/proxy/dotty'
  urlConfig.baseUrlNginx = '/internal/proxy/nginx'
  urlConfig.baseUrlVariantValidator = '/remote/variantvalidator'
  urlConfig.baseUrlPubtator = '/remote/pubtator3-api'
}

/**
 * Helper that resets the global URL configuration for testing.
 */
export const resetUrlConfig = () => {
  urlConfig.baseUrlAnnonars = undefined
  urlConfig.baseUrlAutoACMG = undefined
  urlConfig.baseUrlMehari = undefined
  urlConfig.baseUrlViguno = undefined
  urlConfig.baseUrlCadaPrio = undefined
  urlConfig.baseUrlDotty = undefined
  urlConfig.baseUrlNginx = undefined
  urlConfig.baseUrlVariantValidator = undefined
  urlConfig.baseUrlPubtator = undefined
}
