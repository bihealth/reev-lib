/**
 * Queries for HPO queries and related powered by TanStack Query.
 */
import {
  hpoGenesOptions
} from '../../ext/viguno-api/src/lib/@tanstack/vue-query.gen'
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue } from 'vue'

/**
 * Query for gene-related information from Annonars.
 *
 * @params hgnc_id The HGNC ID to use.
 * @returns The query result.
 */
export const useVigunoHpoGenesQuery = (
  {
    gene_id,
    hpo_terms,
    max_results
  }:
  {
    gene_id: MaybeRefOrGetter<string | undefined>,
    hpo_terms?: MaybeRefOrGetter<boolean | undefined>,
    max_results?: MaybeRefOrGetter<number | undefined>
  },
  queryClient?: QueryClient
) =>
    useQuery(
      {
        ...hpoGenesOptions({
          // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
          query: () => ({
            gene_id: toValue(gene_id),
            hpo_terms: toValue(hpo_terms ?? (() => undefined)),
            max_results: toValue(max_results ?? (() => undefined))
          })
        }),
        enabled: () => !!toValue(gene_id)
      },
      queryClient
    )
