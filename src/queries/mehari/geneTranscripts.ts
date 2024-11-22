/**
 * Queries for Mehari gene transcripts by TanStack Query.
 */
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue } from 'vue'

import { genesTranscriptsListOptions } from '../../ext/mehari-api/src/lib/@tanstack/vue-query.gen'

/** Enumeration for genome assembly. */
export type Assembly = 'grch37' | 'grch38'

/**
 * Query for the transcripts of a gene.
 *
 * @param genome_build The genome release to use.
 * @param hgnc_id HGNC ID of the gene.
 * @param next_page_token The next page token; optional.
 * @param page_size Number of items per page; optional.
 * @returns Transcript information for the gene.
 */
export const useMehariGeneTranscriptsListQuery = (
  {
    genome_build,
    hgnc_id,
    next_page_token,
    page_size
  }: {
    genome_build: MaybeRefOrGetter<'grch37' | 'grch38' | undefined>
    hgnc_id: MaybeRefOrGetter<string | undefined>
    next_page_token?: MaybeRefOrGetter<string | undefined>
    page_size?: MaybeRefOrGetter<number | undefined>
  },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...genesTranscriptsListOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          genome_build: toValue(genome_build),
          hgnc_id: toValue(hgnc_id),
          next_page_token: toValue(next_page_token ?? (() => undefined)),
          page_size: toValue(page_size ?? (() => undefined))
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () => !!toValue(genome_build) && !!toValue(hgnc_id)
    },
    queryClient
  )
