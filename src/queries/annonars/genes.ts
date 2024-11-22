/**
 * Queries for gene queries and related powered by TanStack Query.
 */
import { QueryClient, useQueries, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue, computed } from 'vue'

import {
  genesClinvarOptions,
  genesInfoOptions,
  genesLookupOptions
} from '../../ext/annonars-api/src/lib/@tanstack/vue-query.gen'

/**
 * Query for gene-related information from Annonars.
 *
 * @params hgnc_ids The HGNC IDs to use.
 * @returns The query result.
 */
export const useAnnonarsGenesInfoQuery = (
  { hgnc_ids }: { hgnc_ids: MaybeRefOrGetter<string[] | undefined> },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...genesInfoOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          hgnc_id: toValue(hgnc_ids) === undefined ? [] : toValue(hgnc_ids)?.join(",")
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () => !!toValue(hgnc_ids)
    },
    queryClient
  )

/**
 * Query for clinvar-related information from Annonars.
 *
 * @params hgnc_ids The HGNC ID to use.
 * @returns The query result.
 */
export const useAnnonarsGenesClinvarQuery = (
  { hgnc_ids }: { hgnc_ids: MaybeRefOrGetter<string[] | undefined> },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...genesClinvarOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          hgnc_id: toValue(hgnc_ids) === undefined ? [] : toValue(hgnc_ids)?.join(",")
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () => !!toValue(hgnc_ids)
    },
    queryClient
  )

/**
 * Query for looking up genes.
 *
 * @params query The queries to use.
 * @returns The query result.
 */
export const useAnnonarsGenesLookupQuery = (
  { query }: { query: MaybeRefOrGetter<string[] | undefined> },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...genesLookupOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          q: toValue(query) ?? []
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () => !!toValue(query)?.join(",")
    },
    queryClient
  )
