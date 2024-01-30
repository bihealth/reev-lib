import { Response } from './types'

/** Default API base URL to use. */
const API_BASE_URL = '/internal/proxy/cada-prio/'

/**
 * Client for the CADA-Prio API.
 */
export class CadaPrioClient {
  private apiBaseUrl: string

  constructor(apiBaseUrl?: string) {
    this.apiBaseUrl = apiBaseUrl ?? API_BASE_URL
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
    const url = `${this.apiBaseUrl}api/v1/predict?hpo_terms=${hpoTerms.join(',')}${geneSuffix}`

    const response = await fetch(url, {
      method: 'GET'
    })
    const responseJson = await response.json()
    return Response.fromJson(responseJson)
  }
}
