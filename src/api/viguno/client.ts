import { HpoGenesResult, HpoOmimsResult, HpoTermResult } from './types'

/** Base URL for viguno API access */
const API_BASE_URL = '/internal/proxy/viguno/'

export class VigunoClient {
  private apiBaseUrl: string

  constructor(apiBaseUrl?: string) {
    this.apiBaseUrl = apiBaseUrl ?? API_BASE_URL
  }

  async resolveOmimTermById(id: string): Promise<HpoOmimsResult> {
    const url = `${this.apiBaseUrl}hpo/omims?omim_id=${id}`
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
    const url = `${this.apiBaseUrl}hpo/omims?name=${query}&match=${matchType}`
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
    const url = `${this.apiBaseUrl}hpo/terms?term_id=${id}`
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
    const url = `${this.apiBaseUrl}hpo/terms?name=${query}`
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
    const url = `${this.apiBaseUrl}hpo/genes?gene_id=${hgncId}&hpo_terms=true`
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
