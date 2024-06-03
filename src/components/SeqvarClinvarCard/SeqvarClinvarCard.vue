<script setup lang="ts">
import { computed, ref } from 'vue'

import { ExtractedVcvRecordList } from '../../pbs/annonars/clinvar/minimal'
import { AggregatedSomaticClinicalImpact } from '../../pbs/annonars/clinvar_data/clinvar_public'
import DocsLink from '../DocsLink/DocsLink.vue'
import GermlineClassification from './GermlineClassification.vue'
import RcvRow from './RcvRow.vue'
import SomaticClinicalImpact from './SomaticClinicalImpact.vue'
import SomaticOncongenicity from './SomaticOncogenicity.vue'

/** This component's props */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  /** ClinVar record from annonars */
  clinvarRecords?: ExtractedVcvRecordList
}>()

type AggregatedSomaticClinicalImpactU = AggregatedSomaticClinicalImpact | undefined
const clinicalImpacts = computed<AggregatedSomaticClinicalImpactU[]>(() => {
  if (!props.clinvarRecords?.records?.length) {
    return [undefined]
  } else if (props.clinvarRecords?.records[0].classifications?.somaticClinicalImpacts?.length) {
    return props.clinvarRecords?.records[0].classifications?.somaticClinicalImpacts
  } else {
    return [undefined]
  }
})

/** Whether the card is expanded; component state. */
const expand = ref<boolean>(false)
</script>

<template>
  <template v-if="!clinvarRecords">
    <v-skeleton-loader type="card" />
  </template>
  <template v-else>
    <v-card v-if="clinvarRecords?.records?.length">
      <v-card-title class="pb-0 pr-2">
        ClinVar
        <DocsLink anchor="clinvar" />
      </v-card-title>
      <v-card-subtitle>
        <template
          v-for="clinvarRecord in clinvarRecords?.records ?? []"
          :key="clinvarRecord.accession!.accession"
        >
          <a
            :href="`https://www.ncbi.nlm.nih.gov/clinvar/?term=${clinvarRecord.accession!.accession}.${clinvarRecord.accession!.version}`"
            target="_blank"
          >
            <v-icon>mdi-launch</v-icon>
            <span class="text-no-wrap">
              {{ clinvarRecord.accession!.accession }}.{{ clinvarRecord.accession!.version }}
            </span>
          </a>
        </template>
      </v-card-subtitle>
      <template
        v-for="clinvarRecord in clinvarRecords?.records ?? []"
        :key="clinvarRecord.accession!.accession"
      >
        <v-row>
          <v-col cols="6" class="ml-4 mb-3">
            <GermlineClassification
              :germline-classification="clinvarRecord?.classifications?.germlineClassification"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="ml-4 mb-2">
          <v-col cols="6">
            <template
              v-for="somaticClinicalImpact in clinicalImpacts"
              :key="somaticClinicalImpact?.description"
            >
              <SomaticClinicalImpact :clinical-impact="somaticClinicalImpact" />
            </template>
          </v-col>
          <v-col cols="6">
            <SomaticOncongenicity
              :oncogenicity-classification="
                clinvarRecord?.classifications?.oncogenicityClassification
              "
            />
          </v-col>
        </v-row>
      </template>
      <v-expand-transition>
        <div v-show="expand">
          <v-divider />

          <template
            v-for="clinvarRecord in clinvarRecords?.records ?? []"
            :key="clinvarRecord.accession!.accession"
          >
            <v-card-title> ClinVar Variant / Condition Records </v-card-title>
            <v-card-subtitle v-if="(clinvarRecords?.records?.length ?? 0) > 1">
              <a
                :href="`https://www.ncbi.nlm.nih.gov/clinvar/?term=${clinvarRecord.accession!.accession}.${clinvarRecord.accession!.version}`"
                target="_blank"
              >
                <v-icon>mdi-launch</v-icon>
                <span class="text-no-wrap">
                  {{ clinvarRecord.accession!.accession }}.{{ clinvarRecord.accession!.version }}
                </span>
              </a>
            </v-card-subtitle>
            <v-card-text>
              <p>
                Below are all variant/condition records for all assessed conditions from ClinVar.
              </p>
              <v-table density="compact" class="mt-3">
                <thead>
                  <tr>
                    <th>Condition</th>
                    <th>Classification (# of submissions)</th>
                    <th>Review Status</th>
                    <th>Variant / Condition Record</th>
                  </tr>
                </thead>
                <tbody>
                  <RcvRow
                    v-for="rcvRecord of clinvarRecord.rcvs"
                    :key="rcvRecord.accession!.accession"
                    :rcv="rcvRecord"
                  />
                </tbody>
              </v-table>
            </v-card-text>
          </template>
        </div>
      </v-expand-transition>

      <v-divider />

      <v-card-actions>
        <v-btn @click="expand = !expand">
          {{ !expand ? 'Show Variant / Condition Records' : 'Hide Variant / Condition Records' }}
        </v-btn>
        <v-spacer />
        <v-btn :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="expand = !expand" />
      </v-card-actions>
    </v-card>

    <v-card v-else variant="elevated">
      <v-card-text> No ClinVar information available. </v-card-text>
    </v-card>
  </template>
</template>
