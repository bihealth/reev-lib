import { SearchResult } from './types'

/** API base URL to use. */
const API_BASE_URL = '/internal/proxy/pubtator3-api'

/**
 * Client for PubTator V3 API queries.
 */
export class PubtatorClient {
  /** API base URL to use in this client instance. */
  private apiBaseUrl: string

  /**
   * Create a new PubTator client.
   *
   * @param apiBaseUrl The API base URL to use, defaults to `API_BASE_URL`.
   */
  constructor(apiBaseUrl?: string) {
    this.apiBaseUrl = apiBaseUrl ?? API_BASE_URL
  }

  /**
   * Perform search for the given HGNC symbol.
   *
   * @param hgncSymbol HGNC symbol to search for.
   * @returns Promise for the search results.
   * @throws Error if the search fails.
   */
  async performSearch(hgncSymbol: string): Promise<{ [key: string]: SearchResult }> {
    const url = `${this.apiBaseUrl}/search/?text=@GENE_${hgncSymbol}`
    const searchRes = await fetch(url, {
      method: 'GET'
    })
    if (!searchRes.ok) {
      throw new Error(`Error running PubTator 3 search: ${searchRes.statusText}`)
    }
    const searchData = await searchRes.json()

    // Then, extract PMID list and retrieve biocjson for the PMIDs
    const pmids: string[] = searchData!.results!.map((doc: any) => doc.pmid)
    const exportRes = await fetch(
      `${this.apiBaseUrl}}/publications/export/biocjson` + `?pmids=${pmids.join(',')}`
    )
    if (!exportRes.ok) {
      throw new Error(`Error running PubTator 3 export: ${exportRes.statusText}`)
    }
    const exportDataText = await exportRes.text()
    const exportDataLines = exportDataText.split(/\n/)

    // Zip search results and exports into searchResults
    const searchResults: { [key: string]: SearchResult } = {}
    for (const searchDataRecord of searchData.results) {
      searchResults[searchDataRecord.pmid] = {
        searchResult: searchDataRecord,
        abstract: undefined
      }
    }
    for (const exportDataLine of exportDataLines) {
      if (exportDataLine) {
        const exportDataRecord = JSON.parse(exportDataLine)
        searchResults[exportDataRecord.pmid].abstract = exportDataRecord
      }
    }

    return searchResults
  }
}
