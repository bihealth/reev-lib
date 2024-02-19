import { urlConfig } from '../../lib/urlConfig'
import type { SearchResult } from './types'

/**
 * Client for the LitVar API.
 */
export class LitVarClient {
  /** API base URL to use in this client instance. */
  private apiBaseUrl: string

  /**
   * @param apiBaseUrl
   *            API base to the backend, excluding trailing `/`.
   *            The default is declared in '@/lib/urlConfig`.
   */
  constructor(apiBaseUrl?: string) {
    if (apiBaseUrl !== undefined || urlConfig.baseUrlLitVar !== undefined) {
      // @ts-ignore
      this.apiBaseUrl = apiBaseUrl ?? urlConfig.baseUrlLitVar
    } else {
      throw new Error('Configuration error: API base URL not configured')
    }
  }

  /**
   * Perform search for the given HGNC symbol.
   *
   * @param hgncSymbol HGNC symbol to search for.
   * @returns Promise for the search results.
   * @throws Error if the search fails.
   */
  async performSearch(seqVar: string): Promise<{ [key: string]: SearchResult }> {
    const url = `${this.apiBaseUrl}/${seqVar}`
    const searchRes = await fetch(url, {
      method: 'GET'
    })
    if (!searchRes.ok) {
      throw new Error(`Error running LitVar search: ${searchRes.statusText}`)
    }
    const searchData = await searchRes.json()

    // Then, extract PMID list and retrieve biocjson for the PMIDs
    // const pmids: string[] = searchData!.results!.map((doc: any) => doc.pmid)
    // const exportRes = await fetch(
    //   `${this.apiBaseUrl}/publications/export/biocjson` + `?pmids=${pmids.join(',')}`
    // )
    // if (!exportRes.ok) {
    //   throw new Error(`Error running LitVar export: ${exportRes.statusText}`)
    // }
    // const exportDataText = await exportRes.text()
    // const exportDataLines = exportDataText.split(/\n/)

    // // Zip search results and exports into searchResults
    // const searchaResults: { [key: string]: SearchResult } = {}
    // for (const searchDataRecord of searchData.results) {
    //   searchResults[searchDataRecord.pmid] = {
    //     searchResult: searchDataRecord,
    //     abstract: undefined
    //   }
    // }
    // for (const exportDataLine of exportDataLines) {
    //   if (exportDataLine) {
    //     const exportData = JSON.parse(exportDataLine)
    //     searchResults[exportData.pmid].abstract = exportData
    //   }
    // }

    return searchData
  }
}
