/**
 * Queries for strucvars information powered by TanStack Query.
 */
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue } from 'vue'

import { strucvarsClinvarQueryOptions } from '../../ext/annonars-api/src/lib/@tanstack/vue-query.gen'
import { ClinvarExtractedVariationType } from '../../ext/annonars-api/src/lib'

/**
 * Query for overlapping ClinVar structural variants.
 *
 * @param genome_release The genome release to use.
 * @param chromosome The chromosome to use.
 * @param start The start position to use (1-based).
 * @param stop The stop position to use (1-based).
 * @param variation_types The variation types to use; optional.
 * @param min_overlap The minimum overlap to use; optional.
 * @param page_no The page number to use; optional.
 * @param page_size The page size to use; optional.
 * @returns The query result.
 */
export const useAnnonarsStrucvarsClinvarQuery = (
  {
    genome_release,
    chromosome,
    start,
    stop,
    variation_types,
    min_overlap,
    page_no,
    page_size
  }: {
    genome_release: MaybeRefOrGetter<string | undefined>
    chromosome: MaybeRefOrGetter<string | undefined>
    start: MaybeRefOrGetter<number | undefined>
    stop: MaybeRefOrGetter<number | undefined>
    variation_types?: MaybeRefOrGetter<Array<ClinvarExtractedVariationType> | undefined>
    min_overlap?: MaybeRefOrGetter<number | undefined>
    page_no?: MaybeRefOrGetter<number | undefined>
    page_size?: MaybeRefOrGetter<number | undefined>
  },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...strucvarsClinvarQueryOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          genome_release: toValue(genome_release),
          chromosome: toValue(chromosome),
          start: toValue(start),
          stop: toValue(stop),
          variation_types: toValue(variation_types ?? (() => undefined)) === undefined ? undefined : toValue(variation_types)?.join(","),
          min_overlap: toValue(min_overlap ?? (() => undefined)),
          page_no: toValue(page_no ?? (() => undefined)),
          page_size: toValue(page_size ?? (() => undefined))
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () =>
        !!toValue(genome_release) &&
        !!toValue(chromosome) &&
        !!toValue(start) &&
        !!toValue(stop)
    },
    queryClient
  )
