<script setup lang="ts">
import { computed, ref } from 'vue'

import { SeqvarInfoResult } from '../../api/annonars/types'
import { type Seqvar } from '../../lib/genomicVars'
import { roundIt, separateIt as sep } from '../../lib/utils'
import {
  CohortAlleleCounts as Gnomad2CohortAlleleCounts,
  PopulationAlleleCounts as Gnomad2PopulationAlleleCounts,
  Record as Gnomad2Record
} from '../../pbs/annonars/gnomad/gnomad2'
import {
  CohortAlleleCounts as Gnomad3CohortAlleleCounts,
  PopulationAlleleCounts as Gnomad3PopulationAlleleCounts,
  Record as Gnomad3Record
} from '../../pbs/annonars/gnomad/gnomad3'
import {
  AncestryGroupAlleleCounts as Gnomad4AncestryGroupAlleleCounts,
  CohortAlleleCounts as Gnomad4CohortAlleleCounts,
  Record as Gnomad4Record
} from '../../pbs/annonars/gnomad/gnomad4'

const props = defineProps<{
  /** Annotated sequence variant. */
  seqvar?: Seqvar
  /** Annotations. */
  varAnnos?: SeqvarInfoResult
  /** Dataset to use. */
  dataset: 'gnomadExomes' | 'gnomadGenomes'
}>()

const FREQ_DIGITS = 5

const selAnnos = computed<Gnomad2Record | Gnomad3Record | Gnomad4Record | undefined>(() => {
  if (!props.varAnnos) {
    return undefined
  } else {
    return props.varAnnos[props.dataset]
  }
})

const noCohort = computed<
  Gnomad2CohortAlleleCounts | Gnomad3CohortAlleleCounts | Gnomad4CohortAlleleCounts | undefined
>(() => {
  for (const elem of selAnnos.value?.alleleCounts ?? []) {
    if (!elem.cohort) {
      return elem
    }
  }
  return undefined
})

type ByPop = {
  [key: string]:
    | Gnomad2PopulationAlleleCounts
    | Gnomad3PopulationAlleleCounts
    | Gnomad4AncestryGroupAlleleCounts
}

const byPop = computed<ByPop>(() => {
  const res: ByPop = {}
  // @ts-ignore
  for (const record of noCohort.value?.byPopulation ?? noCohort.value?.byAncestryGroup ?? []) {
    res[record.population ?? record.ancestryGroup] = record
  }
  return res
})

const allPopLabels = {
  afr: 'African-American/African',
  asj: 'Ashkenazy Jewish',
  eas: 'East Asian',
  fin: 'European (Finnish)',
  nfe: 'European (North-Western)',
  amr: 'Latino/Admixed American',
  sas: 'South Asian',
  oth: 'Other',
  remaining: 'Remaining'
}

const idKey = (token: string): string => {
  return `id-${props.dataset}-${token}`
}

const sexExpanded = ref<{ [key: string]: boolean }>({})
</script>

<template>
  <template v-if="!seqvar">
    <v-skeleton-loader type="table" />
  </template>
  <template v-else>
    <div>
      <div>
        <v-card-subtitle class="px-0 mb-3 text-overline">
          <template v-if="props.dataset === 'gnomadExomes'"> gnomAD Exomes </template>
          <template v-if="props.dataset === 'gnomadGenomes'"> gnomAD Genomes </template>
          <a
            v-if="seqvar.genomeBuild == 'grch37'"
            :href="`https://gnomad.broadinstitute.org/variant/${seqvar.chrom.replace(/^chr/, '')}-${
              seqvar.pos
            }-${seqvar.del}-${seqvar.ins}?dataset=gnomad_r2_1`"
            target="_blank"
          >
            <v-icon>mdi-launch</v-icon>
            @gnomAD
          </a>
          <a
            v-if="seqvar.genomeBuild == 'grch38'"
            :href="`https://gnomad.broadinstitute.org/variant/${seqvar.chrom.replace(/^chr/, '')}-${
              seqvar.pos
            }-${seqvar.del}-${seqvar.ins}?dataset=gnomad_r4`"
            target="_blank"
          >
            <v-icon>mdi-launch</v-icon>
            @gnomAD
          </a>
        </v-card-subtitle>
      </div>
      <v-table v-if="selAnnos">
        <thead>
          <tr>
            <th>Population</th>
            <th />
            <th class="text-right text-no-wrap">
              <abbr title="total number of alleles"> Allele Count </abbr>
            </th>
            <th class="text-right text-no-wrap">
              <abbr title="variant alleles in high-quality calls"> Allele Number </abbr>
            </th>
            <th class="text-right text-no-wrap">
              <abbr title="number of individuals with homozygote alleles"> Homozygotes </abbr>
            </th>
            <th class="text-right text-no-wrap">
              <abbr title="frequency of variant alleles called with high quality">
                Allele Frequency
              </abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(label, key) of allPopLabels" :key="key">
            <template v-if="byPop[key]?.counts?.overall?.an">
              <tr @click.prevent="sexExpanded[key] = !sexExpanded[key]">
                <td colspan="2">
                  {{ label }}
                  <a>
                    <v-btn size="40" color="" icon>
                      <v-icon>
                        {{ sexExpanded[key] ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
                      </v-icon>
                    </v-btn>
                  </a>
                  <!-- <a v-if="!sexExpanded[key]">
                    <v-icon>mdi-chevron-right</v-icon>
                  </a>
                  <a v-else>
                    <v-icon>mdi-chevron-down</v-icon>
                  </a> -->
                </td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key]?.counts?.overall?.an ?? 0) }}
                </td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key]?.counts?.overall?.ac ?? 0) }}
                </td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key]?.counts?.overall?.nhomalt ?? 0) }}
                </td>
                <!-- eslint-disable vue/no-v-html -->
                <td
                  class="text-right text-no-wrap"
                  v-html="roundIt(byPop[key]?.counts?.overall?.af, FREQ_DIGITS)"
                />
                <!-- eslint-enable -->
              </tr>
              <tr :id="idKey(key) + '-xx'" :class="{ 'd-none': !sexExpanded[key] }">
                <td />
                <td class="text-right text-no-wrap">XX</td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key]?.counts?.xx?.an ?? 0) }}
                </td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key]?.counts?.xx?.ac ?? 0) }}
                </td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key]?.counts?.xx?.nhomalt ?? 0) }}
                </td>
                <!-- eslint-disable vue/no-v-html -->
                <td
                  class="text-right text-no-wrap"
                  v-html="roundIt(byPop[key]?.counts?.xx?.af, FREQ_DIGITS)"
                />
                <!-- eslint-enable -->
              </tr>
              <tr :id="idKey(key) + '-xy'" :class="{ 'd-none': !sexExpanded[key] }">
                <td />
                <td class="text-right text-no-wrap">XY</td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key].counts?.xy?.an ?? 0) }}
                </td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key].counts?.xy?.ac ?? 0) }}
                </td>
                <td class="text-right text-no-wrap">
                  {{ sep(byPop[key].counts?.xy?.nhomalt ?? 0) }}
                </td>
                <!-- eslint-disable vue/no-v-html -->
                <td
                  class="text-right text-no-wrap"
                  v-html="roundIt(byPop[key].counts?.xy?.af, FREQ_DIGITS)"
                />
                <!-- eslint-enable -->
              </tr>
            </template>
          </template>

          <tr class="table-info">
            <th>Total</th>
            <td />
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.overall?.an ?? 0) }}
            </td>
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.overall?.ac ?? 0) }}
            </td>
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.overall?.nhomalt ?? 0) }}
            </td>
            <!-- eslint-disable vue/no-v-html -->
            <td
              class="text-right text-no-wrap"
              v-html="roundIt(noCohort?.bySex?.overall?.af ?? 0.0, FREQ_DIGITS)"
            />
            <!-- eslint-enable -->
          </tr>

          <tr>
            <td />
            <td class="text-right text-no-wrap">XX</td>
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.xx?.an ?? 0) }}
            </td>
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.xx?.ac ?? 0) }}
            </td>
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.xx?.nhomalt ?? 0) }}
            </td>
            <!-- eslint-disable vue/no-v-html -->
            <td
              class="text-right text-no-wrap"
              v-html="roundIt(noCohort?.bySex?.xx?.af ?? 0.0, FREQ_DIGITS)"
            />
            <!-- eslint-enable -->
          </tr>

          <tr>
            <td />
            <td class="text-right text-no-wrap">XY</td>
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.xy?.an ?? 0) }}
            </td>
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.xy?.ac ?? 0) }}
            </td>
            <td class="text-right text-no-wrap">
              {{ sep(noCohort?.bySex?.xy?.nhomalt ?? 0) }}
            </td>
            <!-- eslint-disable vue/no-v-html -->
            <td
              class="text-right text-no-wrap"
              v-html="roundIt(noCohort?.bySex?.xy?.af ?? 0.0, FREQ_DIGITS)"
            />
            <!-- eslint-enable -->
          </tr>
        </tbody>
      </v-table>

      <div v-else>
        No allele frequency information available in local database. Try to lookup the variant
        directly:
        <a
          v-if="seqvar.genomeBuild == 'grch37'"
          :href="`https://gnomad.broadinstitute.org/variant/${seqvar.chrom.replace(/^chr/, '')}-${
            seqvar.pos
          }-${seqvar.del}-${seqvar.ins}?dataset=gnomad_r2_1`"
        >
          <v-icon>mdi-launch</v-icon>
          gnomAD
        </a>
        <a
          v-if="seqvar.genomeBuild == 'grch38'"
          :href="`https://gnomad.broadinstitute.org/variant/${seqvar.chrom.replace(/^chr/, '')}-${
            seqvar.pos
          }-${seqvar.del}-${seqvar.ins}?dataset=gnomad_r4`"
        >
          <v-icon>mdi-launch</v-icon>
          gnomAD
        </a>
      </div>
    </div>
  </template>
</template>
