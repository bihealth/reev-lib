import { chunks } from '@reactgular/chunks'

import type { LinearStrucvar, Seqvar } from '../../lib/genomicVars'
import { urlConfig } from '../../lib/urlConfig'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
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
   * @throws Error if the API base URL is not configured.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlAnnonars !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlAnnonars
    } else {
      throw new Error('Configuration error: API base URL not configured')
    }
  }

  /**
   * Fetch gene information via annonars REST API.
   *
   * @param hgncId HGNC ID, e.g., `"HGNC:26467"`.
   */
  async fetchGeneInfo(hgncId: string): Promise<GeneInfoResult> {
    const response = await fetch(`${this.apiBaseUrl}/genes/info?hgnc_id=${hgncId}`, {
      method: 'GET'
    })
    return await response.json()
  }

  /**
   * Fetch variant information via annonars and mehari REST APIs.
   *
   * @param seqvar The variant to retrieve the information for.
   */
  async fetchVariantInfo(seqvar: Seqvar): Promise<SeqvarInfoResponse> {
    const { genomeBuild, chrom, pos, del, ins } = seqvar
    let chromosome = chrom.replace('chr', '')
    if (genomeBuild !== 'grch37') {
      chromosome = `chr${chrom}`
    }

    const url =
      `${this.apiBaseUrl}/annos/variant?genome_release=${genomeBuild}&` +
      `chromosome=${chromosome}&pos=${pos}&reference=${del}&` +
      `alternative=${ins}`

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`failed to fetch variant info: ${response.statusText}`)
    }
    const responseJson = await response.json()
    return SeqvarInfoResponse.fromJson(responseJson)
  }

  /**
   * Fetch per-gene ClinVar information via annonars REST API.
   *
   * @param hgncId
   * @returns
   */
  async fetchGeneClinvarInfo(hgncId: string): Promise<ClinvarPerGeneRecord> {
    const response = await fetch(`${this.apiBaseUrl}/genes/clinvar?hgnc_id=${hgncId}`, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`failed to fetch gene clinvar info: ${response.statusText}`)
    }
    return await response.json()
  }

  /**
   * Search for genes, e.g., by symbol, via annonars REST API.
   *
   * @param query Query string to search for.
   * @returns Promise with gene search response.
   * @throws Error if the request fails.
   */
  async fetchGenes(query: string): Promise<GeneSearchResponse> {
    const response = await fetch(`${this.apiBaseUrl}/genes/search?q=${query}`, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`failed to fetch genes: ${response.statusText}`)
    }
    const responseJson = await response.json()
    return GeneSearchResponse.fromJson(responseJson)
  }

  /**
   * Fetch gene informations via annonars REST API.
   *
   * @param hgncIds Array of HGNC IDs to use, e.g., `["HGNC:26467"]`.
   * @param chunkSize How many IDs to send in one request.
   * @returns Promise with an array of gene information objects.
   */
  async fetchGeneInfos(hgncIds: string[], chunkSize?: number): Promise<GeneInfoRecord[]> {
    const hgncIdChunks = chunks(hgncIds, chunkSize ?? 10)

    const promises = hgncIdChunks.map(async (chunk) => {
      const url = `${this.apiBaseUrl}/genes/info?hgnc_id=${chunk.join(',')}`

      const response = await fetch(url, {
        method: 'GET'
      })
      if (!response.ok) {
        throw new Error(`failed to fetch gene infos: ${response.statusText}`)
      }
      return response
    })

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
  }

  /**
   * Fetch overlapping ClinVar strucvars via annonars REST API.
   */
  async fetchClinvarStrucvars(
    strucvar: LinearStrucvar,
    pageSize: number = 1000,
    minOverlap: number = 0.1
  ): Promise<ClinvarSvQueryResponse> {
    const { genomeBuild, chrom, start, stop } = strucvar
    const url =
      `${this.apiBaseUrl}/clinvar-sv/query?genomeRelease=${genomeBuild}&` +
      `chromosome=${chrom}&start=${start}&stop=${stop}&pageSize=${pageSize}&` +
      `minOverlap=${minOverlap}`

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`failed to fetch clinvar strucvars: ${response.statusText}`)
    }
    const responseJson = await response.json()
    return ClinvarSvQueryResponse.fromJson(responseJson)
  }
}
