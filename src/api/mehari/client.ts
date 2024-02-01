import type { LinearStrucvar, Seqvar } from '../../lib/genomicVars'
import { urlConfig } from '../../lib/urlConfig'
import { SeqvarResult, StrucvarResult } from './types'

/**
 * Client for Mehari API requests.
 */
export class MehariClient {
  private apiBaseUrl: string

  /**
   * @param apiBaseUrl
   *            API base to the backend, excluding trailing `/`.
   *            The default is declared in '@/lib/urlConfig`.
   * @throws Error if the API base URL is not configured.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlMehari !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlMehari
    } else {
      throw new Error('Configuration error: API base URL not configured')
    }
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
      `${this.apiBaseUrl}/seqvars/csq?genome_release=${genomeBuild}&` +
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
      `${this.apiBaseUrl}/strucvars/csq?genome_release=${genomeBuild}&` +
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
