import type { LinearStrucvar, Seqvar } from '../../lib/genomicVars'
import { SeqvarResult, StrucvarResult } from './types'

/** API base URL to use. */
const API_BASE_URL = '/internal/proxy/pubtator3-api'

/**
 * Client for Mehari API requests.
 */
export class MehariClient {
  private apiBaseUrl: string

  constructor(apiBaseUrl?: string) {
    this.apiBaseUrl = apiBaseUrl ?? API_BASE_URL
  }

  /**
   * Retrieve consequences for sequence variants.
   *
   * @param seqvar Sequence variant to retrieve consequences for.
   * @param hgncId HGNC ID of gene to restrict results to.
   * @returns The response from the API.
   * @throws Error if the API request fails.
   */
  async retrieveSeqvarsCsq(seqvar: Seqvar, hgncId?: string): Promise<SeqvarResult> {
    const { genomeBuild, chrom, pos, del, ins } = seqvar
    const hgncSuffix = hgncId ? `&hgnc_id=${hgncId}` : ''
    const url =
      `${this.apiBaseUrl}seqvars/csq?genome_release=${genomeBuild}&` +
      `chromosome=${chrom}&position=${pos}&reference=${del}&` +
      `alternative=${ins}${hgncSuffix}`

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch sequence variant consequences: ${response.statusText}`)
    }
    const responseJson = await response.json()
    return SeqvarResult.fromJson(responseJson)
  }

  /**
   * Retrieve consequences for structural variants.
   *
   * @param strucvar Structural variant to retrieve consequences for.
   * @returns The response from the API.
   * @throws Error if the API request fails.
   */
  async retrieveStrucvarsCsq(strucvar: LinearStrucvar): Promise<StrucvarResult> {
    const { genomeBuild, chrom, start, stop, svType } = strucvar
    const url =
      `${this.apiBaseUrl}strucvars/csq?genome_release=${genomeBuild}&` +
      `chromosome=${chrom}&start=${start}&stop=${stop}&sv_type=${svType}`

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch structural variant consequences: ${response.statusText}`)
    }
    const responseJson = await response.json()
    return StrucvarResult.fromJson(responseJson)
  }
}
