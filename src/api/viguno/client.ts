import { urlConfig } from '../../lib/urlConfig'
import { HpoGenesResult, HpoOmimsResult, HpoTermResult } from './types'

export class VigunoClient {
  private apiBaseUrl: string

  /**
   * @param apiBaseUrl
   *            API base to the backend, excluding trailing `/`.
   *            The default is declared in '@/lib/urlConfig`.
   * @throws Error if the API base URL is not configured.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlViguno !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlViguno
    } else {
      throw new Error('Configuration error: API base URL not configured')
    }
  }

  async resolveOmimTermById(id: string): Promise<HpoOmimsResult> {
    const url = `${this.apiBaseUrl}/hpo/omims?omim_id=${id}`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(errorBody.msg || response.statusText)
    }

    const responseJson = await response.json()
    return HpoOmimsResult.fromJson(responseJson)
  }

  async queryOmimTermsByName(
    query: string,
    matchType: string = 'contains'
  ): Promise<HpoOmimsResult> {
    const url = `${this.apiBaseUrl}/hpo/omims?name=${query}&match=${matchType}`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(errorBody.msg || response.statusText)
    }

    const responseJson = await response.json()
    return HpoOmimsResult.fromJson(responseJson)
  }

  async resolveHpoTermById(id: string): Promise<HpoTermResult> {
    const url = `${this.apiBaseUrl}/hpo/terms?term_id=${id}`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(errorBody.msg || response.statusText)
    }

    const responseJson = await response.json()
    return HpoTermResult.fromJson(responseJson)
  }

  async queryHpoTermsByName(query: string): Promise<HpoTermResult> {
    const url = `${this.apiBaseUrl}/hpo/terms?name=${query}`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(errorBody.msg || response.statusText)
    }

    const responseJson = await response.json()
    return HpoTermResult.fromJson(responseJson)
  }

  /**
   * Retrieves HPO terms associated with a gene.
   *
   * @param hgncId HGNC ID of the gene to query for.
   * @returns Response of the server
   */
  async fetchHpoTermsForHgncId(hgncId: string): Promise<HpoGenesResult> {
    const url = `${this.apiBaseUrl}/hpo/genes?gene_id=${hgncId}&hpo_terms=true`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(errorBody.msg || response.statusText)
    }

    const responseJson = await response.json()
    return HpoGenesResult.fromJson(responseJson)
  }
}
