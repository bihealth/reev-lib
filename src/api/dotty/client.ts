import { SpdiResult, TranscriptResult } from './types'

/** Default base AURL for dotty API. */
const API_BASE_URL = '/internal/proxy/dotty'

export class DottyClient {
  private apiBaseUrl: string

  constructor(apiBaseUrl?: string) {
    this.apiBaseUrl = apiBaseUrl ?? API_BASE_URL
  }

  /**
   * Convert the given query to SPDI notation.
   *
   * @param q Query to conert.
   * @param assembly Assembly to use.
   * @returns Promise with the response form dotty or null if the request failed.
   */
  async toSpdi(q: string, assembly: 'GRCh37' | 'GRCh38' = 'GRCh38'): Promise<SpdiResult | null> {
    const escapedQ = encodeURIComponent(q)
    const url = `${this.apiBaseUrl}/api/v1/to-spdi?q=${escapedQ}&assembly=${assembly}`
    const response = await fetch(url, {
      method: 'GET'
    })
    if (response.status == 200) {
      const responseJson = await response.json()
      return SpdiResult.fromJson(responseJson)
    } else {
      return null
    }
  }

  /**
   * Fetch transcripts for the given HGNC ID.
   *
   * @param hgncId HGNC ID to fetch transcripts for.
   * @param assembly Assembly to use.
   * @returns Promise with the response form dotty or null if the request failed.
   */
  async fetchTranscripts(
    hgncId: string,
    assembly: 'GRCh37' | 'GRCh38' = 'GRCh38'
  ): Promise<TranscriptResult | null> {
    const url = `${this.apiBaseUrl}/api/v1/find-transcripts?hgnc_id=${hgncId}&assembly=${assembly}`
    const response = await fetch(url, {
      method: 'GET'
    })
    if (response.status == 200) {
      const responseJson = await response.json()
      return TranscriptResult.fromJson(responseJson)
    } else {
      return null
    }
  }
}
