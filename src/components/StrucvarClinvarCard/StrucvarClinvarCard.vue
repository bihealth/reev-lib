<!--
This component displays overlapping structural variants in ClinVar.
-->
<script setup lang="ts">
import { computed, ref } from 'vue'

import { type Strucvar } from '../../lib/genomicVars'
import { roundIt } from '../../lib/utils'
import { ResponseRecord as ClinvarSvRecord } from '../../pbs/annonars/clinvar/sv'
import { AggregateClassificationSet } from '../../pbs/annonars/clinvar_data/clinvar_public'
import DocsLink from '../DocsLink/DocsLink.vue'
import {
  AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL,
  AGGREGATE_GERMLINE_REVIEW_STATUS_STARS,
  AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL,
  AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS,
  AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL,
  AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS
} from '../SeqvarClinvarCard/constants'
import { clinsigColor } from '../SeqvarClinvarCard/helpers'

/** This component's props. */
const props = defineProps<{
  /** Structural variant to display the card for. */
  strucvar?: Strucvar
  /** ClinVar records to display for. */
  clinvarSvRecords?: ClinvarSvRecord[]
}>()

const vcvUrl = (vcv: string): string => {
  const stripped = vcv.replace(/^VCV0+/, '')
  return `https://www.ncbi.nlm.nih.gov/clinvar/variation/${stripped}/`
}

const rcvUrl = (rcv: string): string => {
  return `https://www.ncbi.nlm.nih.gov/clinvar/${rcv}/?redir=rcv`
}

/** Return coordinates for ClinVar link-out */
const clinvarRange = computed<string>(() => {
  if (props.strucvar === undefined) {
    return ''
  }
  const release = props.strucvar.genomeBuild === 'grch37' ? 'GRCh37' : 'GRCh38'
  const { svType, chrom, start } = props.strucvar
  if (svType === 'BND' || svType === 'INS') {
    return `${release}:${chrom.replace('chr', '')}:${start}-${start}`
  } else {
    const { stop } = props.strucvar
    return `${release}:${chrom.replace('chr', '')}:${start}-${stop}`
  }
})

const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([{ key: 'overlap', order: 'desc' }])

/** Compute maximal number of stars over `AggregateClassificationSet`. */
const maxStars = (acs: AggregateClassificationSet) => {
  const starsGermline = acs.germlineClassification?.reviewStatus
    ? AGGREGATE_GERMLINE_REVIEW_STATUS_STARS[acs.germlineClassification?.reviewStatus]
    : 0
  const starsOncogenicity = acs.oncogenicityClassification?.reviewStatus
    ? AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS[acs.oncogenicityClassification?.reviewStatus]
    : 0
  const starsClinicalImpact = acs.somaticClinicalImpact?.reviewStatus
    ? AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS[acs.somaticClinicalImpact?.reviewStatus]
    : 0
  return Math.max(starsGermline, starsOncogenicity, starsClinicalImpact)
}

const headers = [
  { title: 'Accession', key: 'accession', sortable: true, align: 'start' },
  { title: 'Significance', key: 'clinSig', sortable: true, align: 'start' },
  {
    title: 'Status',
    key: 'reviewStatus',
    sortRaw(a: ClinvarSvRecord, b: ClinvarSvRecord) {
      return maxStars(b.record!.classifications!) - maxStars(a.record!.classifications!)
    },
    align: 'start'
  },
  { title: 'Condition', key: 'condition' },
  { title: 'overlap', value: 'overlap', sortable: true, align: 'end' }
]

const expanded = ref<string[]>([])
</script>

<template>
  <v-card class="mt-3">
    <v-card-title class="pb-0 pr-2">
      ClinVar
      <DocsLink anchor="doc-manual-strucvar-clinvar" />
    </v-card-title>
    <v-card-subtitle class="text-overline"> Matching Variants in ClinVar </v-card-subtitle>
    <v-card-text>
      <v-data-table
        v-model:expanded="expanded"
        v-model:sort-by="sortBy"
        density="compact"
        :headers="headers as any"
        :items="clinvarSvRecords ?? []"
        item-value="record.accession.accession"
        :must-sort="true"
        show-expand
      >
        <!-- eslint-disable vue/valid-v-slot -->
        <template #item.accession="{ item: { record } }">
          <!-- eslint-enable -->
          <a :href="vcvUrl(`${record!.accession!.accession}`)" target="_blank">
            {{ record!.accession!.accession }}.{{ record!.accession!.version }}
            <small><v-icon>mdi-launch</v-icon></small>
          </a>
        </template>
        <!-- eslint-disable vue/valid-v-slot -->
        <template #item.clinSig="{ item: { record } }">
          <!-- eslint-enable -->
          <div v-if="record!.classifications?.germlineClassification">
            <v-chip
              bg-color="grey-darken-4"
              title="germline"
              rounded="sm"
              class="mr-2 pl-1 pr-1"
              density="compact"
            >
              G
            </v-chip>
            <v-chip
              density="compact"
              :class="`bg-${clinsigColor(
                record!.classifications!.germlineClassification!.description
              )}`"
            >
              {{ record!.classifications!.germlineClassification!.description }}
            </v-chip>
          </div>
          <div v-if="record!.classifications?.somaticClinicalImpact">
            <v-chip
              bg-color="grey-darken-4"
              title="somatic clinical impact"
              rounded="sm"
              class="mr-2 pl-1 pr-1"
              density="compact"
            >
              I
            </v-chip>
            <v-chip
              density="compact"
              :class="`bg-${clinsigColor(record!.classifications?.somaticClinicalImpact.description)}`"
            >
              {{ record!.classifications?.somaticClinicalImpact.description }}
            </v-chip>
          </div>
          <div v-if="record!.classifications?.oncogenicityClassification">
            <v-chip
              bg-color="grey-darken-4"
              title="oncogenicity"
              rounded="sm"
              class="mr-2 pl-1 pr-1"
              density="compact"
            >
              O
            </v-chip>
            <v-chip
              density="compact"
              :class="`bg-${clinsigColor(
                record!.classifications!.oncogenicityClassification!.description
              )}`"
            >
              {{ record!.classifications!.oncogenicityClassification!.description }}
            </v-chip>
          </div>
        </template>
        <template #item.reviewStatus="{ item: { record } }">
          <div v-if="record!.classifications?.germlineClassification">
            <v-chip
              bg-color="grey-darken-4"
              title="germline"
              rounded="sm"
              class="mr-2 pl-1 pr-1"
              density="compact"
            >
              G
            </v-chip>

            <span
              :title="
                AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL[
                  record!.classifications!.germlineClassification!.reviewStatus
                ]
              "
            >
              <span v-for="i of [1, 2, 3, 4]" :key="i">
                <span
                  v-if="
                    i <=
                    AGGREGATE_GERMLINE_REVIEW_STATUS_STARS[
                      record!.classifications!.germlineClassification!.reviewStatus
                    ]
                  "
                >
                  <v-icon>mdi-star</v-icon>
                </span>
                <span v-else>
                  <v-icon>mdi-star-outline</v-icon>
                </span>
              </span>
            </span>
          </div>
          <div v-if="record!.classifications?.somaticClinicalImpact">
            <v-chip
              bg-color="grey-darken-4"
              title="somatic clinical impact"
              rounded="sm"
              class="mr-2 pl-1 pr-1"
              density="compact"
            >
              I
            </v-chip>

            <span
              :title="
                AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL[
                  record!.classifications?.somaticClinicalImpact.reviewStatus
                ]
              "
            >
              <span v-for="i of [1, 2, 3, 4]" :key="i">
                <span
                  v-if="
                    i <=
                    AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS[
                      record!.classifications?.somaticClinicalImpact.reviewStatus
                    ]
                  "
                >
                  <v-icon>mdi-star</v-icon>
                </span>
                <span v-else>
                  <v-icon>mdi-star-outline</v-icon>
                </span>
              </span>
            </span>
          </div>
          <div v-if="record!.classifications?.oncogenicityClassification">
            <v-chip
              bg-color="grey-darken-4"
              title="oncogenicity"
              rounded="sm"
              class="mr-2 pl-1 pr-1"
              density="compact"
            >
              O
            </v-chip>

            <span
              :title="
                AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL[
                  record!.classifications!.oncogenicityClassification!.reviewStatus
                ]
              "
            >
              <span v-for="i of [1, 2, 3, 4]" :key="i">
                <span
                  v-if="
                    i <=
                    AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS[
                      record!.classifications!.oncogenicityClassification!.reviewStatus
                    ]
                  "
                >
                  <v-icon>mdi-star</v-icon>
                </span>
                <span v-else>
                  <v-icon>mdi-star-outline</v-icon>
                </span>
              </span>
            </span>
          </div>
        </template>
        <!-- eslint-disable vue/valid-v-slot -->
        <template #item.condition="{ item: { record } }">
          <!-- eslint-enable -->
          {{ record!.rcvs.map((rcv) => rcv.title.split('AND ')[1]).join(', ') }}
        </template>
        <!-- eslint-disable vue/valid-v-slot -->
        <template #item.overlap="{ item: { overlap } }">
          <!-- eslint-enable -->
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="roundIt(overlap)" />
          <!-- eslint-enable -->
        </template>

        <!-- eslint-disable vue/valid-v-slot -->
        <template #expanded-row="{ item }">
          <!-- eslint-enable -->
          <tr v-for="rcv in item.record!.rcvs" :key="rcv.accession!.accession">
            <td class="text-no-wrap bg-grey-lighten-5">
              <v-icon>mdi-circle-small</v-icon>

              <a :href="rcvUrl(rcv.accession!.accession)" target="_blank">
                {{ rcv.accession!.accession }}.{{ rcv.accession!.version }}
                <small><v-icon>mdi-launch</v-icon></small>
              </a>
            </td>
            <td>
              <div v-if="rcv.classifications?.germlineClassification?.description?.value?.length">
                <v-chip
                  bg-color="grey-darken-4"
                  title="germline"
                  rounded="sm"
                  class="mr-2 pl-1 pr-1"
                  density="compact"
                >
                  G
                </v-chip>
                <v-chip
                  density="compact"
                  :class="`bg-${clinsigColor(
                    rcv.classifications!.germlineClassification!.description!.value
                  )}`"
                >
                  {{ rcv.classifications?.germlineClassification!.description!.value }}
                </v-chip>
                ({{
                  rcv.classifications?.germlineClassification!.description!.submissionCount ?? 0
                }})
              </div>
              <div
                v-for="(description, idx) in rcv.classifications!.somaticClinicalImpact
                  ?.descriptions ?? []"
                :key="idx"
              >
                <v-chip
                  bg-color="grey-darken-4"
                  title="somatic clinical impact"
                  rounded="sm"
                  class="mr-2 pl-1 pr-1"
                  density="compact"
                >
                  I
                </v-chip>
                <v-chip density="compact" :class="`bg-${clinsigColor(description.value)}`">
                  {{ description.value }}
                </v-chip>
                ({{ description.submissionCount ?? 0 }})
              </div>
              <div
                v-if="rcv.classifications?.oncogenicityClassification?.description?.value?.length"
              >
                <v-chip
                  bg-color="grey-darken-4"
                  title="oncogenicity"
                  rounded="sm"
                  class="mr-2 pl-1 pr-1"
                  density="compact"
                >
                  O
                </v-chip>
                <v-chip
                  density="compact"
                  :class="`bg-${clinsigColor(
                    rcv.classifications?.oncogenicityClassification?.description.value
                  )}`"
                >
                  {{ rcv.classifications?.oncogenicityClassification?.description.value }}
                </v-chip>
                ({{
                  rcv.classifications?.oncogenicityClassification!.description!.submissionCount ??
                  0
                }})
              </div>
            </td>
            <td colspan="3">
              <div v-if="rcv.classifications?.germlineClassification?.reviewStatus">
                <v-chip
                  bg-color="grey-darken-4"
                  title="germline"
                  rounded="sm"
                  class="mr-2 pl-1 pr-1"
                  density="compact"
                >
                  G
                </v-chip>

                <span
                  :title="
                    AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL[
                      rcv.classifications?.germlineClassification?.reviewStatus
                    ]
                  "
                >
                  <span v-for="i of [1, 2, 3, 4]" :key="i">
                    <span
                      v-if="
                        i <=
                        AGGREGATE_GERMLINE_REVIEW_STATUS_STARS[
                          rcv.classifications?.germlineClassification?.reviewStatus
                        ]
                      "
                    >
                      <v-icon>mdi-star</v-icon>
                    </span>
                    <span v-else>
                      <v-icon>mdi-star-outline</v-icon>
                    </span>
                  </span>
                </span>
              </div>
              <div v-if="rcv.classifications?.somaticClinicalImpact?.reviewStatus">
                <v-chip
                  bg-color="grey-darken-4"
                  title="somatic clinical impact"
                  rounded="sm"
                  class="mr-2 pl-1 pr-1"
                  density="compact"
                >
                  I
                </v-chip>

                <span
                  :title="
                    AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL[
                      rcv.classifications?.somaticClinicalImpact?.reviewStatus
                    ]
                  "
                >
                  <span v-for="i of [1, 2, 3, 4]" :key="i">
                    <span
                      v-if="
                        i <=
                        AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS[
                          rcv.classifications?.somaticClinicalImpact?.reviewStatus
                        ]
                      "
                    >
                      <v-icon>mdi-star</v-icon>
                    </span>
                    <span v-else>
                      <v-icon>mdi-star-outline</v-icon>
                    </span>
                  </span>
                </span>
              </div>
              <div v-if="rcv.classifications?.oncogenicityClassification?.reviewStatus">
                <v-chip
                  bg-color="grey-darken-4"
                  title="oncogenicity"
                  rounded="sm"
                  class="mr-2 pl-1 pr-1"
                  density="compact"
                >
                  O
                </v-chip>

                <span
                  :title="
                    AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL[
                      rcv.classifications?.oncogenicityClassification?.reviewStatus
                    ]
                  "
                >
                  <span v-for="i of [1, 2, 3, 4]" :key="i">
                    <span
                      v-if="
                        i <=
                        AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS[
                          rcv.classifications?.oncogenicityClassification?.reviewStatus
                        ]
                      "
                    >
                      <v-icon>mdi-star</v-icon>
                    </span>
                    <span v-else>
                      <v-icon>mdi-star-outline</v-icon>
                    </span>
                  </span>
                </span>
              </div>
            </td>
          </tr>
        </template>

        <template #no-data>
          <v-sheet class="pa-3 text-center font-italic border"> No overlapping ClinVar SV </v-sheet>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn :href="`https://www.ncbi.nlm.nih.gov/clinvar/?term=${clinvarRange}`" target="blank">
        <v-icon>mdi-launch</v-icon>
        Locus in ClinVar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
