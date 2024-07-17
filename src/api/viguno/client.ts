import { urlConfig } from '../../lib/urlConfig'
import { ConfigError, InvalidResponseContent, StatusCodeNotOk } from '../common'
import { HpoGenesResult, HpoOmimsResult, HpoTermResult } from './types'

export class VigunoClient {
  private apiBaseUrl: string

  /**
   * Construct Viguno client.
   *
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
      throw new ConfigError('Configuration error: API base URL not configured')
    }
  }

  /**
   * Resolve OMIM term by its ID.
   *
   * @param id OMIM ID to resolve.
   * @returns Promise with the response from the server.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async resolveOmimTermById(id: string): Promise<HpoOmimsResult> {
    const url = `${this.apiBaseUrl}/hpo/omims?omim_id=${id}`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new StatusCodeNotOk(errorBody.msg || response.statusText)
    }

    try {
      const responseJson = await response.json()
      return HpoOmimsResult.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse OMIM response: ${e}`)
    }
  }

  /**
   * Query OMIM term by name.
   *
   * @param query The query string.
   * @param matchType How to match the query.
   * @returns Promise with the response from the server.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async queryOmimTermsByName(
    query: string,
    matchType: string = 'contains',
    ignoreCase: boolean = true
  ): Promise<HpoOmimsResult> {
    const url = `${this.apiBaseUrl}/hpo/omims?name=${query}&match=${matchType}&ignore_case=${ignoreCase}`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new StatusCodeNotOk(errorBody.msg || response.statusText)
    }

    try {
      const responseJson = await response.json()
      return HpoOmimsResult.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse OMIM response: ${e}`)
    }
  }

  /**
   * Resolve HPO term by ID.
   *
   * @param id HPO ID to resolve.
   * @returns Promise with the resolution result.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async resolveHpoTermById(id: string): Promise<HpoTermResult> {
    const url = `${this.apiBaseUrl}/hpo/terms?term_id=${id}`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new StatusCodeNotOk(errorBody.msg || response.statusText)
    }

    try {
      const responseJson = await response.json()
      return HpoTermResult.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse HPO response: ${e}`)
    }
  }

  /**
   * Query HPO term by name.
   *
   * @param query The query string.
   * @returns Promise with the response from the server.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async queryHpoTermsByName(query: string): Promise<HpoTermResult> {
    const url = `${this.apiBaseUrl}/hpo/terms?name=${query}`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new StatusCodeNotOk(errorBody.msg || response.statusText)
    }

    try {
      const responseJson = await response.json()
      return HpoTermResult.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse HPO response: ${e}`)
    }
  }

  /**
   * Retrieves HPO terms associated with a gene.
   *
   * @param hgncId HGNC ID of the gene to query for.
   * @returns Promise with the response from the server.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async fetchHpoTermsForHgncId(hgncId: string): Promise<HpoGenesResult> {
    const url = `${this.apiBaseUrl}/hpo/genes?gene_id=${hgncId}&hpo_terms=true`
    const response = await fetch(url, {
      method: 'GET'
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new StatusCodeNotOk(errorBody.msg || response.statusText)
    }

    try {
      const responseJson = await response.json()
      return HpoGenesResult.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse HPO response: ${e}`)
    }
  }
}
