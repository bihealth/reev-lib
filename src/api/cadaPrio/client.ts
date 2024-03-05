import { urlConfig } from '../../lib/urlConfig'
import { ConfigError, InvalidResponseContent, StatusCodeNotOk } from '../common'
import { Response } from './types'

/**
 * Client for the CADA-Prio API.
 */
export class CadaPrioClient {
  private apiBaseUrl: string

  /**
   * @param apiBaseUrl
   *            API base to the backend, excluding trailing `/`.
   *            The default is declared in '@/lib/urlConfig`.
   * @throws ConfigError if the API base URL is not configured.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlCadaPrio !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlCadaPrio
    } else {
      throw new ConfigError('Configuration error: API base URL not configured')
    }
  }

  /**
   * Predict similarity of genes with list of HPO terms.
   *
   * @param hpoTerms HPO term IDs (e.g. `HP:0000001`)
   * @param geneSymbols Gene symbols (e.g. `BRCA1`)
   * @returns Promise with response of impact prediction.
   * @throws StatusCodeNotOk if the request fails.
   * @throws InvalidResponseContent if the response is not valid JSON.
   */
  async predictGeneImpact(hpoTerms: string[], geneSymbols?: string[]): Promise<Response> {
    const geneSuffix = geneSymbols ? `&gene_symbols=${geneSymbols.join(',')}` : ''
    const url = `${this.apiBaseUrl}/api/v1/predict?hpo_terms=${hpoTerms.join(',')}${geneSuffix}`

    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new StatusCodeNotOk(`failed to fetch gene impact prediction: ${response.statusText}`)
    }
    try {
      const responseJson = await response.json()
      return Response.fromJson(responseJson)
    } catch (e) {
      throw new InvalidResponseContent(`failed to parse gene impact prediction response: ${e}`)
    }
  }
}
