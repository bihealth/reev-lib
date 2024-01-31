import type { Seqvar } from '../../lib/genomicVars'
import { Response as VariantValidatorResponse } from './types'

/** Base URL for VariantValidator. */
const API_BASE_URL = `/remote/variantvalidator`

/**
 * Client for the VariantValidator API.
 */
export class VariantValidatorClient {
  private apiBaseUrl: string

  constructor(apiBaseUrl?: string) {
    this.apiBaseUrl = apiBaseUrl ?? API_BASE_URL
  }

  /**
   * Call variant validator API via proxy.
   *
   * @param seqvar The `Seqvar` object to be validated.
   * @returns The response from the API.
   * @throws Error if the API call fails.
   */
  async fetchVvResults(seqvar: Seqvar): Promise<VariantValidatorResponse> {
    const { genomeBuild, chrom, pos, del, ins } = seqvar
    const release = genomeBuild === 'grch37' ? 'hg19' : 'hg38'
    const url =
      `${this.apiBaseUrl}/${release}/` +
      `${chrom}-${pos}-${del}-${ins}/mane?content-type=application%2Fjson`

    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      throw new Error(`Failed to fetch ACMG rating for ${seqvar.userRepr}`)
    }
    const responseJson = await response.json()
    return VariantValidatorResponse.fromJson(responseJson)
  }
}
