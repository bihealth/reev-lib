<script setup lang="ts">
/**
 * This component displays ClinVar variant counts per impact and variant
 * class.
 */
import { computed } from 'vue'

import { separateIt } from '../../lib/utils'
import { ClinvarPerGeneRecord, Impact } from '../../pbs/annonars/clinvar/per_gene'

const props = withDefaults(
  defineProps<{
    clinvarPerGene?: ClinvarPerGeneRecord
  }>(),
  {
    clinvarPerGene: undefined
  }
)

/** Enumeration fo coarser impacts. */
enum CoarseImpact {
  UNKNOWN = 'UNKNOWN',
  OTHER = 'OTHER',
  NONSENSE = 'NONSENSE',
  MISSENSE_INFRAME = 'MISSENSE_INFRAME',
  NON_CODING = 'NON_CODING',
  SYNONYMOUS = 'SYNONYMOUS',
  TOTAL = 'TOTAL'
}

/** Mapping from coarse impact to index. */
const COARSE_IMPACT_TO_INDEX: { [key in CoarseImpact]: number } = {
  [CoarseImpact.UNKNOWN]: -1,
  [CoarseImpact.OTHER]: -1,
  [CoarseImpact.NONSENSE]: 0,
  [CoarseImpact.MISSENSE_INFRAME]: 1,
  [CoarseImpact.NON_CODING]: 2,
  [CoarseImpact.SYNONYMOUS]: 3,
  [CoarseImpact.TOTAL]: 4
}

/** Labels for coarse impact. */
const COARSE_IMPACT_LABELS: { [key in CoarseImpact]: string } = {
  [CoarseImpact.UNKNOWN]: 'unknown',
  [CoarseImpact.OTHER]: 'other',
  [CoarseImpact.NONSENSE]: 'LoF',
  [CoarseImpact.MISSENSE_INFRAME]: 'missense / inframe',
  [CoarseImpact.NON_CODING]: 'non-coding',
  [CoarseImpact.SYNONYMOUS]: 'synonymous',
  [CoarseImpact.TOTAL]: 'total'
}

/** Mapping from raw to coarse impact.  */
const IMPACT_RAW_TO_COARSE: { [key in Impact]: CoarseImpact } = {
  [Impact.IMPACT_UNKNOWN]: CoarseImpact.UNKNOWN,
  [Impact.IMPACT_STOP_LOST]: CoarseImpact.OTHER,
  [Impact.IMPACT_NO_SEQUENCE_ALTERATION]: CoarseImpact.SYNONYMOUS,
  [Impact.IMPACT_SYNONYMOUS_VARIANT]: CoarseImpact.SYNONYMOUS,
  [Impact.IMPACT_THREE_PRIME_UTR_VARIANT]: CoarseImpact.NON_CODING,
  [Impact.IMPACT_FIVE_PRIME_UTR_VARIANT]: CoarseImpact.NON_CODING,
  [Impact.IMPACT_DOWNSTREAM_TRANSCRIPT_VARIANT]: CoarseImpact.NON_CODING,
  [Impact.IMPACT_INTRON_VARIANT]: CoarseImpact.NON_CODING,
  [Impact.IMPACT_NON_CODING_TRANSCRIPT_VARIANT]: CoarseImpact.NON_CODING,
  [Impact.IMPACT_UPSTREAM_TRANSCRIPT_VARIANT]: CoarseImpact.NON_CODING,
  [Impact.IMPACT_INFRAME_INDEL]: CoarseImpact.MISSENSE_INFRAME,
  [Impact.IMPACT_MISSENSE_VARIANT]: CoarseImpact.MISSENSE_INFRAME,
  [Impact.IMPACT_FRAMESHIFT_VARIANT]: CoarseImpact.NONSENSE,
  [Impact.IMPACT_START_LOST]: CoarseImpact.NONSENSE,
  [Impact.IMPACT_STOP_GAINED]: CoarseImpact.NONSENSE,
  [Impact.IMPACT_SPLICE_ACCEPTOR_VARIANT]: CoarseImpact.NONSENSE,
  [Impact.IMPACT_SPLICE_DONOR_VARIANT]: CoarseImpact.NONSENSE
}

/** Mapping from clinsig order to coarse order */
const CLINSIG_ORDER_TO_COARSE_ORDER = [
  2, // benign
  2, // likely benign
  1, // uncertain
  0, // likely pathogenic
  0 // pathogenic
]

/** Helper that returns all keys of enumeration `obj`. */
function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => !Number.isNaN(k)) as K[]
}

/** Labels of clinical significance by order in table. */
const COARSE_CLINSIG_LABELS = ['pathogenic', 'uncertain', 'benign', 'total']

/** Returns true for coarse impacts to show */
const showCoarseImpact = (key: CoarseImpact): boolean => COARSE_IMPACT_TO_INDEX[key] >= 0

/** Counts per coarse impact, `list[coarseImpact][coarseClinsig]` */
const perCoarseImpactCounts = computed(() => {
  const result = enumKeys(CoarseImpact)
    .filter((value) => showCoarseImpact(CoarseImpact[value]))
    .map(() => {
      return [0, 0, 0, 0]
    })

  if (props.clinvarPerGene?.perImpactCounts) {
    for (const perImpactCount of props.clinvarPerGene.perImpactCounts) {
      const coarseImpact = IMPACT_RAW_TO_COARSE[perImpactCount.impact]
      if (!showCoarseImpact(coarseImpact)) {
        continue
      }
      for (let i = 0; i < 5; ++i) {
        const idx = COARSE_IMPACT_TO_INDEX[coarseImpact]
        const idxTotal = COARSE_IMPACT_TO_INDEX[CoarseImpact.TOTAL]
        result[idx][CLINSIG_ORDER_TO_COARSE_ORDER[i]] += perImpactCount.counts[i]
        result[idxTotal][CLINSIG_ORDER_TO_COARSE_ORDER[i]] += perImpactCount.counts[i]
        result[idx][3] += perImpactCount.counts[i]
        result[idxTotal][3] += perImpactCount.counts[i]
      }
    }
  }

  return result
})

/** Return percent given the coarse impact and clinsig index */
const percent = (coarseImpact: CoarseImpact, coarseClinsigIdx: number): number => {
  const idx = COARSE_IMPACT_TO_INDEX[coarseImpact]
  const idxTotal = COARSE_IMPACT_TO_INDEX[CoarseImpact.TOTAL]
  return (
    Math.round(
      (1000 * perCoarseImpactCounts.value[idx][coarseClinsigIdx]) /
        perCoarseImpactCounts.value[idxTotal][3]
    ) / 10
  )
}

/** Return color given the coarse clinsig idx and percentage. */
const clinsigColor = (coarseClinsigIdx: number, percent: number): string => {
  const MAX_INTENSITY = 0.8
  const MAX_PERCENT = 20
  let intensity = MAX_INTENSITY
  if (percent < MAX_PERCENT) {
    intensity = (MAX_INTENSITY * percent) / MAX_PERCENT
  }

  switch (coarseClinsigIdx) {
    case 2:
      return `rgba(93, 153, 54, ${intensity})`
    case 1:
      return `rgba(245, 201, 100, ${intensity})`
    case 0:
      return `rgba(176, 84, 84, ${intensity})`
    default:
      return 'rgba(0, 0, 0, 0)'
  }
}
</script>

<template>
  <!-- no ClinVar data => display loader -->
  <template v-if="!clinvarPerGene?.perImpactCounts?.length">
    <v-skeleton-loader
      class="mt-3 mx-auto border"
      type="table-heading,table-row,table-row,table-row,table-row"
    />
  </template>
  <template v-else>
    <v-sheet class="pa-3 mt-3 mr-1 h-100" color="background">
      <v-table class="bg-transparent">
        <thead>
          <tr>
            <th width="20%" class="text-subtitle-1">Impact Counts</th>
            <th
              v-for="key of enumKeys(CoarseImpact).filter((value) =>
                showCoarseImpact(CoarseImpact[value])
              )"
              :key="key"
              class="font-weight-bold text-center"
            >
              {{ COARSE_IMPACT_LABELS[key] }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(label, idx) of COARSE_CLINSIG_LABELS" :key="idx">
            <td class="font-weight-bold">
              {{ label }}
            </td>
            <td
              v-for="key of enumKeys(CoarseImpact).filter((value) =>
                showCoarseImpact(CoarseImpact[value])
              )"
              :key="key"
              class="text-center"
              :title="`${percent(CoarseImpact[key], idx)} %`"
            >
              <span
                class="pa-3 rounded-lg text-no-wrap"
                :style="`background-color: ${clinsigColor(idx, percent(CoarseImpact[key], idx))}`"
              >
                {{ separateIt(perCoarseImpactCounts[COARSE_IMPACT_TO_INDEX[key]][idx]) }}
              </span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </template>
</template>
