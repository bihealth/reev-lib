// This file is auto-generated by @hey-api/openapi-ts
import { type Options, createClient, createConfig } from '@hey-api/client-fetch'

import type {
  PublicationsExportBiocjsonData,
  PublicationsExportBiocjsonError,
  PublicationsExportBiocjsonResponse2,
  SearchData,
  SearchError,
  SearchResponse2
} from './types.gen'

export const client = createClient(createConfig())

/**
 * Search PubTator articles
 * Search for PubTator articles and retrieve metadata like titles, journals, authors, and more.
 */
export const search = <ThrowOnError extends boolean = false>(
  options: Options<SearchData, ThrowOnError>
) => {
  return (options?.client ?? client).get<SearchResponse2, SearchError, ThrowOnError>({
    ...options,
    url: '/search/'
  })
}

/**
 * Export PubTator articles in BioC JSON format
 * Export PubTator articles in BioC JSON format.
 */
export const publicationsExportBiocjson = <ThrowOnError extends boolean = false>(
  options: Options<PublicationsExportBiocjsonData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    PublicationsExportBiocjsonResponse2,
    PublicationsExportBiocjsonError,
    ThrowOnError
  >({
    ...options,
    url: '/publications/export/biocjson'
  })
}
