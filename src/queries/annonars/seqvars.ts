/**
 * Queries for seqvars information powered by TanStack Query.
 */
import { seqvarsAnnosQueryOptions } from '../../ext/annonars-api/src/lib/@tanstack/vue-query.gen'
import { QueryClient, useQuery } from '@tanstack/vue-query'
import { ComputedRef, MaybeRefOrGetter, toValue } from 'vue'

/**
 * Query for information related to sequence variants.
 *
 * @param genome_release The genome release to use.
 * @param chromosome The chromosome to use.
 * @param position The position to use.
 * @param reference The reference to use.
 * @param alternative The alternative to use.
 * @returns The query result.
 */
export const useAnnonarsSeqvarsAnnosQuery = (
  {
    genome_release,
    chromosome,
    position,
    reference,
    alternative
  }: {
    genome_release: MaybeRefOrGetter<string | undefined>
    chromosome: MaybeRefOrGetter<string | undefined>
    position: MaybeRefOrGetter<number | undefined>
    reference: MaybeRefOrGetter<string | undefined>
    alternative: MaybeRefOrGetter<string | undefined>
  },
  queryClient?: QueryClient
) =>
  useQuery(
    {
      ...seqvarsAnnosQueryOptions({
        // @ts-ignore // https://github.com/hey-api/openapi-ts/issues/653#issuecomment-2314847011
        query: () => ({
          genome_release: toValue(genome_release),
          chromosome: toValue(chromosome),
          pos: toValue(position),
          reference: toValue(reference),
          alternative: toValue(alternative)
        })
      }),
      enabled: () =>
        !!toValue(genome_release) &&
        !!toValue(chromosome) &&
        !!toValue(position) &&
        !!toValue(reference) &&
        !!toValue(alternative)
    },
    queryClient
  )
