import type { Seqvar } from '../../lib/genomicVars'
import { urlConfig } from '../../lib/urlConfig'
import { ConfigError, InvalidResponseContent, StatusCodeNotOk } from '../common'
import { Response as VariantValidatorResponse } from './types'

/**
 * Client for the VariantValidator API.
 */
export class VariantValidatorClient {
  private apiBaseUrl: string

  /**
   * @param apiBaseUrl
   *            API base to the backend, excluding trailing `/`.
   *            The default is declared in '@/lib/urlConfig`.
   * @throws ConfigError if the API base URL is not configured.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlVariantValidator !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlVariantValidator
    } else {
      throw new ConfigError('Configuration error: API base URL not configured')
    }
  }

  /**
   * Call variant validator API via proxy.
   *
   * @param seqvar The `Seqvar` object to be validated.
   * @returns The response from the API.
   * @throws StatusCodeNotOk if the API request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async fetchVvResults(seqvar: Seqvar): Promise<VariantValidatorResponse> {
    const { genomeBuild, chrom, pos, del, ins } = seqvar
    const release = genomeBuild === 'grch37' ? 'hg19' : 'hg38'
    const url =
      `${this.apiBaseUrl}/${release}/` +
      `${chrom}-${pos}-${del}-${ins}/mane/?content-type=application%2Fjson`

    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      throw new StatusCodeNotOk(`Failed to fetch ACMG rating for ${seqvar.userRepr}`)
    }
    try {
      const responseJson = await response.json()
      return VariantValidatorResponse.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`Invalid response content from VariantValidator: ${e}`)
    }
  }
}
