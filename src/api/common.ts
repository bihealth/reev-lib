/** Common code for reev-frontend-lib/api */

/**
 * Thrown on API configuration errors.
 *
 * Such configuration errors are programming errors, e.g., when the
 * API base URL is not configured.
 */
export class ConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConfigurationError'
  }
}

/**
 * Thrown when the query to the API failed.
 */
export class CallError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiCallError'
  }
}

/**
 * Thrown when the API returned a non-OK status code (not 2xx).
 */
export class StatusCodeNotOk extends CallError {
  constructor(message: string) {
    super(message)
    this.name = 'StatusCodeNotOk'
  }
}

/**
 * Thrown when the resulting result was improperly formatted.
 *
 * E.g., when it was not valid JSON or did not have the expected
 * structure.
 */
export class InvalidResponseContent extends CallError {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidResponseContent'
  }
}
