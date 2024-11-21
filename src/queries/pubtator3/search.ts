/**
 * Search via Pubtator3 API.
 */
import { searchOptions } from '../../ext/pubtator3-api/src/lib/@tanstack/vue-query.gen'
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue } from 'vue'

/** Enumeration for genome assembly. */
export type Assembly = 'grch37' | 'grch38'

/**
 * Search with Pubtator3
 *
 * @param text Text to search for, e.g., `@GENE_BRCA1`.
 * @param page Page to retrieve (starts at 1, default)
 * @returns Search results.
 */
export const usePubtator3SearchQuery = (
  {
    text,
    page,

  }: {
    text: MaybeRefOrGetter<string | undefined>;
    page?: MaybeRefOrGetter<number | undefined>;
  },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...searchOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          text: toValue(text),
          page: toValue(page ?? (() => undefined)),
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () => !!toValue(text)
    },
    queryClient
  )
