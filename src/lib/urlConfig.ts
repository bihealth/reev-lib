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
