import type { Seqvar, Strucvar } from '../../lib/genomicVars'
import { urlConfig } from '../../lib/urlConfig'
import { GeneTranscriptsResponse } from '../../pbs/mehari/server'
import { GenomeBuild } from '../../pbs/mehari/txs'
import { ConfigError, InvalidResponseContent, StatusCodeNotOk } from '../common'
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
   * @throws ConfigError if the API base URL is not configured.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlMehari !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlMehari
    } else {
      throw new ConfigError('Configuration error: API base URL not configured')
    }
  }

  /**
   * Retrieve consequences for sequence variants.
   *
   * @param seqvar Sequence variant to retrieve consequences for.
   * @param hgncId HGNC ID of gene to restrict results to.
   * @returns Promise with the response from the API.
   * @throws StatusCodeNotOk if the API request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
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
      throw new StatusCodeNotOk(
        `Failed to fetch sequence variant consequences: ${response.statusText}`
      )
    }
    try {
      const responseJson = await response.json()
      return SeqvarResult.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(
        `Failed to parse sequence variant consequences response: ${e}`
      )
    }
  }

  /**
   * Retrieve consequences for structural variants.
   *
   * @param strucvar Structural variant to retrieve consequences for.
   * @returns Promise with the response from the API.
   * @throws StatusCodeNotOk if the API request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async retrieveStrucvarsCsq(strucvar: Strucvar): Promise<StrucvarResult> {
    let url: string
    const { svType, genomeBuild, chrom, start } = strucvar
    if (svType === 'BND' || svType === 'INS') {
      url =
        `${this.apiBaseUrl}/strucvars/csq?genome_release=${genomeBuild}&` +
        `chromosome=${chrom}&start=${start}&stop=${start + 1}&sv_type=${svType}`
    } else {
      const { stop } = strucvar
      url =
        `${this.apiBaseUrl}/strucvars/csq?genome_release=${genomeBuild}&` +
        `chromosome=${chrom}&start=${start}&stop=${stop}&sv_type=${svType}`
    }

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new StatusCodeNotOk(
        `Failed to fetch structural variant consequences: ${response.statusText}`
      )
    }
    try {
      const responseJson = await response.json()
      return StrucvarResult.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(
        `Failed to parse structural variant consequences response: ${e}`
      )
    }
  }

  /**
   * Retrieve transcripts given a HGNC ID.
   *
   * @param hgncId HGNC ID of gene to retrieve transcripts for.
   * @param genomeBuild Genome build to restrict results to.
   * @param pageSize Number of results to return per page.
   * @param nextPageToken Token to retrieve the next page of results.
   * @returns Promise with the response from the API.
   * @throws StatusCodeNotOk if the API request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async retrieveGeneTranscripts(
    hgncId: string,
    genomeBuild: GenomeBuild,
    pageSize: number = 1000,
    nextPageToken?: string
  ): Promise<GeneTranscriptsResponse> {
    const urlGenomeBuild = GenomeBuild[genomeBuild]
    const url =
      `${this.apiBaseUrl}/genes/txs?hgncId=${hgncId}&` +
      `genomeBuild=${urlGenomeBuild}&pageSize=${pageSize}` +
      (nextPageToken ? `&next_page_token=${nextPageToken}` : '')

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new StatusCodeNotOk(`Failed to fetch transcripts: ${response.statusText}`)
    }
    try {
      const responseJson = await response.json()
      return GeneTranscriptsResponse.fromJson(responseJson, { ignoreUnknownFields: true })
    } catch (e) {
      throw new InvalidResponseContent(`Failed to parse transcript response: ${e}`)
    }
  }
}
