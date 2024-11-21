<script setup lang="ts">
import { computed } from 'vue'

import { type Seqvar } from '../../lib/genomicVars'
import { roundIt, separateIt as sep } from '../../lib/utils'
import { isVariantMtHomopolymer } from './lib'
import { GnomadMtdnaRecord, HelixMtDbRecord, SeqvarsAnnoResponseRecord } from '../../ext/annonars-api/src/lib'

/** This component's props. */
const props = defineProps<{
  /** Annotated sequence variant. */
  seqvar?: Seqvar
  /** Annotations. */
  varAnnos?: SeqvarsAnnoResponseRecord
}>()

const helixMtDb = computed<HelixMtDbRecord | undefined>(() => {
  return props?.varAnnos?.helixmtdb ?? undefined
})

const gnomadMtDna = computed<GnomadMtdnaRecord | undefined>(() => {
  return props?.varAnnos?.gnomad_mtdna ?? undefined
})
</script>

<template>
  <template v-if="seqvar === undefined || varAnnos === undefined">
    <v-skeleton-loader type="table" />
  </template>
  <template v-else>
    <div>
      <div v-if="!isVariantMtHomopolymer(seqvar as Seqvar)">
        <small>
          <v-icon>mdi-alert-circle-outline</v-icon>
          Variant in homopolymeric region
        </small>
      </div>

      <v-table>
        <thead>
          <tr class="text-center">
            <th>Database</th>
            <th>Total Alleles</th>
            <th>Alt Alleles</th>
            <th>Heteroplasmic</th>
            <th>Homoplasmic</th>
            <th>Allele Frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-nowrap">gnomAD-MT</td>
            <td class="text-right">
              {{ sep(gnomadMtDna?.an ?? 0) }}
            </td>
            <td class="text-right">
              {{ sep((gnomadMtDna?.ac_het ?? 0) + (gnomadMtDna?.ac_hom ?? 0)) }}
            </td>
            <td class="text-right">
              {{ sep(gnomadMtDna?.ac_het ?? 0) }}
            </td>
            <td class="text-right">
              {{ sep(gnomadMtDna?.ac_hom ?? 0) }}
            </td>
            <!-- eslint-disable vue/no-v-html -->
            <td
              class="text-right"
              v-html="
                roundIt(
                  ((gnomadMtDna?.ac_het ?? 0) + (gnomadMtDna?.ac_hom ?? 0)) / (gnomadMtDna?.an ?? 0),
                  4
                )
              "
            />
            <!-- eslint-enable -->
          </tr>
          <tr>
            <td>HelixMTdb</td>
            <td class="text-right">
              {{ sep(helixMtDb?.num_total ?? 0) }}
            </td>
            <td class="text-right">
              {{ sep((helixMtDb?.num_het ?? 0) + (helixMtDb?.num_hom ?? 0)) }}
            </td>
            <td class="text-right">
              {{ sep(helixMtDb?.num_het ?? 0) }}
            </td>
            <td class="text-right">
              {{ sep(helixMtDb?.num_hom ?? 0) }}
            </td>
            <!-- eslint-disable vue/no-v-html -->
            <td
              class="text-right"
              v-html="
                roundIt(
                  ((helixMtDb?.num_het ?? 0) + (helixMtDb?.num_hom ?? 0)) /
                    (helixMtDb?.num_total ?? 0),
                  4
                )
              "
            />
            <!-- eslint-enable -->
          </tr>
        </tbody>
      </v-table>
    </div>
  </template>
</template>
