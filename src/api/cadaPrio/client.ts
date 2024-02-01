import { urlConfig } from '../../lib/urlConfig'
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
   * @throws Error if the API base URL is not configured.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlCadaPrio !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlCadaPrio
    } else {
      throw new Error('Configuration error: API base URL not configured')
    }
  }

  /**
   * Predict similarity of genes with list of HPO terms.
   *
   * @param hpoTerms HPO term IDs (e.g. `HP:0000001`)
   * @param geneSymbols Gene symbols (e.g. `BRCA1`)
   * @returns Promise with response of impact prediction.
   * @throws Error if the API returns an error.
   */
  async predictGeneImpact(hpoTerms: string[], geneSymbols?: string[]): Promise<Response> {
    const geneSuffix = geneSymbols ? `&gene_symbols=${geneSymbols.join(',')}` : ''
    const url = `${this.apiBaseUrl}/api/v1/predict?hpo_terms=${hpoTerms.join(',')}${geneSuffix}`

    const response = await fetch(url, {
      method: 'GET'
    })
    const responseJson = await response.json()
    return Response.fromJson(responseJson)
  }
}
