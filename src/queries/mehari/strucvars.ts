/**
 * Queries for seqvars information powered by TanStack Query.
 */
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue } from 'vue'

import { strucvarsCsqOptions } from '../../ext/mehari-api/src/lib/@tanstack/vue-query.gen'
import { StrucvarsSvType } from '../../ext/mehari-api/src/lib'

/**
 * Query for the consequence of a seqvar.
 *
 * @param genome_release The genome release to use.
 * @param chromosome The chromosome to use.
 * @param position The position to use.
 * @param reference The reference to use.
 * @param alternative The alternative to use.
 * @param hgnc_id The HGNC ID to use; optional.
 * @returns The query result.
 */
export const useMehariStrucvarsCsqQuery = (
  {
    genome_release,
    chromosome,
    start,
    stop,
    sv_type,
  }: {
    genome_release: MaybeRefOrGetter<string | undefined>
    chromosome: MaybeRefOrGetter<string | undefined>
    start: MaybeRefOrGetter<number | undefined>
    stop?: MaybeRefOrGetter<number | undefined>
    sv_type: MaybeRefOrGetter<StrucvarsSvType | undefined>
  },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...strucvarsCsqOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          genome_release: toValue(genome_release),
          chromosome: toValue(chromosome),
          start: toValue(start),
          stop: toValue(stop ?? (() => undefined)),
          sv_type: toValue(sv_type)
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () =>
        !!toValue(genome_release) &&
        !!toValue(chromosome) &&
        !!toValue(start) &&
        !!toValue(sv_type)
    },
    queryClient
  )
