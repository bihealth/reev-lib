/**
 * Search via Pubtator3 API.
 */
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue } from 'vue'

import { publicationsExportBiocjsonOptions } from '../../ext/pubtator3-api/src/lib/@tanstack/vue-query.gen'

/** Enumeration for genome assembly. */
export type Assembly = 'grch37' | 'grch38'

/**
 * Export one or more PubTator3 publications in BioC JSON format.
 *
 * @param pmids Pubmed identifiers.
 * @returns Search results.
 */
export const usePubtator3PublicationsExportBiocjsonQuery = (
  {
    pmids
  }: {
    pmids: MaybeRefOrGetter<number[] | undefined>
  },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...publicationsExportBiocjsonOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          pmids: (toValue(pmids) ?? []).map((value) => `${value}`).join(',')
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () => !!toValue(pmids)
    },
    queryClient
  )
