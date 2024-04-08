import { chunks } from '@reactgular/chunks'

import type { Seqvar, Strucvar } from '../../lib/genomicVars'
import { urlConfig } from '../../lib/urlConfig'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { ConfigError, InvalidResponseContent, StatusCodeNotOk } from '../common'
import {
  ClinvarSvQueryResponse,
  GeneInfoResult,
  GeneSearchResponse,
  SeqvarInfoResponse
} from './types'

/**
 * Client for accessing annonars REST API.
 */
export class AnnonarsClient {
  private apiBaseUrl: string

  /**
   * @param apiBaseUrl
   *            API base to the backend, excluding trailing `/`.
   *            The default is declared in '@/lib/urlConfig`.
   * @throws ConfigError if the API base URL is not configured.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlAnnonars !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlAnnonars
    } else {
      throw new ConfigError('Configuration error: API base URL not configured')
    }
  }

  /**
   * Fetch gene information via annonars REST API.
   *
   * @param hgncId HGNC ID, e.g., `"HGNC:26467"`.
   * @returns Promise with gene information.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async fetchGeneInfo(hgncId: string): Promise<GeneInfoResult> {
    const response = await fetch(`${this.apiBaseUrl}/genes/info?hgnc_id=${hgncId}`, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new StatusCodeNotOk(`failed to fetch gene info: ${response.statusText}`)
    }
    try {
      const responseJson = await response.json()
      return GeneInfoResult.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse gene info response: ${e}`)
    }
  }

  /**
   * Fetch variant information via annonars and mehari REST APIs.
   *
   * @param seqvar The variant to retrieve the information for.
   * @returns Promise with variant information.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async fetchVariantInfo(seqvar: Seqvar): Promise<SeqvarInfoResponse> {
    const { genomeBuild, chrom, pos, del, ins } = seqvar
    let chromosome = chrom
    if (chromosome.startsWith('chr')) {
      chromosome = chromosome.substring(3)
    }

    if (genomeBuild !== 'grch37') {
      chromosome = `chr${chromosome}`
    }

    const url =
      `${this.apiBaseUrl}/annos/variant?genome_release=${genomeBuild}&` +
      `chromosome=${chromosome}&pos=${pos}&reference=${del}&` +
      `alternative=${ins}`

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new StatusCodeNotOk(`failed to fetch variant info: ${response.statusText}`)
    }
    try {
      const responseJson = await response.json()
      return SeqvarInfoResponse.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse variant info response: ${e}`)
    }
  }

  /**
   * Fetch per-gene ClinVar information via annonars REST API.
   *
   * @param hgncId HGNC ID, e.g., `"HGNC:26467"`.
   * @returns Promise with per-gene ClinVar information.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async fetchGeneClinvarInfo(hgncId: string): Promise<ClinvarPerGeneRecord> {
    const response = await fetch(`${this.apiBaseUrl}/genes/clinvar?hgnc_id=${hgncId}`, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new StatusCodeNotOk(`failed to fetch gene clinvar info: ${response.statusText}`)
    }
    const responseJson = await response.json()
    if (responseJson?.genes && responseJson?.genes[hgncId]) {
      try {
        return ClinvarPerGeneRecord.fromJson(responseJson.genes[hgncId])
      } catch (e) {
        throw new InvalidResponseContent(`failed to parse gene clinvar info response: ${e}`)
      }
    } else {
      throw new InvalidResponseContent(`failed to fetch gene clinvar info for HGNC ID: ${hgncId}`)
    }
  }

  /**
   * Search for genes, e.g., by symbol, via annonars REST API.
   *
   * @param query Query string to search for.
   * @returns Promise with gene search response.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async fetchGenes(query: string): Promise<GeneSearchResponse> {
    const response = await fetch(`${this.apiBaseUrl}/genes/search?q=${query}`, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new StatusCodeNotOk(`failed to fetch genes: ${response.statusText}`)
    }
    try {
      const responseJson = await response.json()
      return GeneSearchResponse.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse gene search response: ${e}`)
    }
  }

  /**
   * Fetch gene informations via annonars REST API.
   *
   * @param hgncIds Array of HGNC IDs to use, e.g., `["HGNC:26467"]`.
   * @param chunkSize How many IDs to send in one request.
   * @returns Promise with an array of gene information objects.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async fetchGeneInfos(hgncIds: string[], chunkSize?: number): Promise<GeneInfoRecord[]> {
    const hgncIdChunks = chunks(hgncIds, chunkSize ?? 10)

    const promises = hgncIdChunks.map(async (chunk) => {
      const url = `${this.apiBaseUrl}/genes/info?hgnc_id=${chunk.join(',')}`

      const response = await fetch(url, {
        method: 'GET'
      })
      if (!response.ok) {
        throw new StatusCodeNotOk(`failed to fetch gene infos: ${response.statusText}`)
      }
      return response
    })

    try {
      const responses = await Promise.all(promises)
      const resultJsons = await Promise.all(responses.map((response) => response.json()))

      const result: GeneInfoRecord[] = []
      resultJsons.forEach((chunk: any) => {
        for (const value of Object.values(chunk.genes)) {
          // @ts-ignore
          result.push(GeneInfoRecord.fromJson(value as JsonValue))
        }
      })
      return result
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse gene infos response: ${e}`)
    }
  }

  /**
   * Fetch overlapping ClinVar strucvars via annonars REST API.
   *
   * @param strucvar The structural variant to retrieve the information for.
   * @param pageSize The maximum number of records to return.
   * @param minOverlap The minimum overlap required for a record to be returned.
   * @returns Promise with ClinVar structural variant query response.
   */
  async fetchClinvarStrucvars(
    strucvar: Strucvar,
    pageSize: number = 1000,
    minOverlap: number = 0.1
  ): Promise<ClinvarSvQueryResponse> {
    // First, check if we can handle the SV type.
    const { svType } = strucvar
    if (svType === 'BND' || svType === 'INS') {
      // We don't properly support ClinVar INS/BNDs (and there will be few..)
      return { records: [] }
    }
    // Then, extract coordinates of linear strucvar.
    const { genomeBuild, chrom, start, stop } = strucvar

    const url =
      `${this.apiBaseUrl}/clinvar-sv/query?genomeRelease=${genomeBuild}&` +
      `chromosome=${chrom}&start=${start}&stop=${stop}&pageSize=${pageSize}&` +
      `minOverlap=${minOverlap}`

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new StatusCodeNotOk(`failed to fetch clinvar strucvars: ${response.statusText}`)
    }
    try {
      const responseJson = await response.json()
      return ClinvarSvQueryResponse.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse clinvar strucvars response: ${e}`)
    }
  }
}
