/**
 * Queries for seqvars information powered by TanStack Query.
 */
import { seqvarsCsqOptions } from '../../ext/mehari-api/src/lib/@tanstack/vue-query.gen'
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { MaybeRefOrGetter, toValue } from 'vue'

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
export const useMehariSeqvarsCsqQuery = (
  {
    genome_release,
    chromosome,
    position,
    reference,
    alternative,
    hgnc_id
  }: {
    genome_release: MaybeRefOrGetter<string | undefined>,
    chromosome: MaybeRefOrGetter<string | undefined>,
    position: MaybeRefOrGetter<number | undefined>,
    reference: MaybeRefOrGetter<string | undefined>,
    alternative: MaybeRefOrGetter<string | undefined>,
    hgnc_id: MaybeRefOrGetter<string | undefined>,
  },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...seqvarsCsqOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          genome_release: toValue(genome_release),
          chromosome: toValue(chromosome),
          position: toValue(position),
          reference: toValue(reference),
          alternative: toValue(alternative),
          hgnc_id: toValue(hgnc_id) ?? undefined
        })
      }),
      staleTime: Infinity, // static data so no need to refetch
      enabled: () =>
        !!toValue(genome_release) &&
        !!toValue(chromosome) &&
        !!toValue(position) &&
        !!toValue(reference) &&
        !!toValue(alternative)
    },
    queryClient
  )
