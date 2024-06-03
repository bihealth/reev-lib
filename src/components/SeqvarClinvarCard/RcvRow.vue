<script setup lang="ts">
import { computed } from 'vue'

import { ExtractedRcvRecord } from '../../pbs/annonars/clinvar_data/extracted_vars'
import {
  AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL,
  AGGREGATE_GERMLINE_REVIEW_STATUS_STARS,
  AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL,
  AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS,
  AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL,
  AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS
} from './constants'

/** This component's props */
const props = defineProps<{
  /** RCV record from annonars */
  rcv: ExtractedRcvRecord
}>()

/** Whether or not has more than one of germline/clinical impact/oncogenicity. */
const isMultiRecord = computed<boolean>(() => {
  const sum =
    (props.rcv.classifications?.germlineClassification ? 1 : 0) +
    (props.rcv.classifications?.somaticClinicalImpact ? 1 : 0) +
    (props.rcv.classifications?.oncogenicityClassification ? 1 : 0)
  return sum > 1
})
</script>

<template>
  <tr v-if="rcv.classifications?.germlineClassification">
    <td>
      <v-chip v-if="isMultiRecord" rounded="xl" class="tonal mr-2" size="small"> germline </v-chip>
      {{ (rcv.title ?? 'AND not provided').split('AND')[1] }}
    </td>
    <td>
      <template v-if="rcv.classifications?.germlineClassification!.description">
        {{ rcv.classifications?.germlineClassification!.description.value }}
        ({{ rcv.classifications?.germlineClassification!.description.submissionCount }})
      </template>
      <template v-else> UNSPECIFIED </template>
    </td>
    <td>
      <span
        class="text-no-wrap"
        :title="
          AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL[
            rcv.classifications?.germlineClassification!.reviewStatus
          ]
        "
      >
        <span v-for="i of [1, 2, 3, 4]" :key="i">
          <span
            v-if="
              i <=
              AGGREGATE_GERMLINE_REVIEW_STATUS_STARS[
                rcv.classifications?.germlineClassification!.reviewStatus
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
    </td>
    <td>
      <a
        :href="`https://www.ncbi.nlm.nih.gov/clinvar/?term=${rcv.accession!.accession}.${rcv.accession!.version}`"
        target="_blank"
        class="text-no-wrap"
      >
        <v-icon>mdi-launch</v-icon>
        {{ rcv.accession!.accession }}.{{ rcv.accession!.version }}
      </a>
    </td>
  </tr>

  <tr v-if="rcv.classifications?.somaticClinicalImpact">
    <td>
      <v-chip v-if="isMultiRecord" rounded="xl" class="tonal mr-2" size="small">
        oncogenicity
      </v-chip>
      {{ (rcv.title ?? 'AND not provided').split('AND')[1] }}
    </td>
    <td>
      <template v-if="rcv.classifications?.somaticClinicalImpact?.descriptions?.length">
        <span
          v-for="(description, idx) in rcv.classifications?.somaticClinicalImpact?.descriptions ??
          []"
          :key="idx"
        >
          {{ description.value }}
          ({{ description.submissionCount }})
        </span>
      </template>
      <template v-else> UNSPECIFIED </template>
    </td>
    <td>
      <span
        class="text-no-wrap"
        :title="
          AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL[
            rcv.classifications!.somaticClinicalImpact!.reviewStatus
          ]
        "
      >
        <span v-for="i of [1, 2, 3, 4]" :key="i">
          <span
            v-if="
              i <=
              AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS[
                rcv.classifications!.somaticClinicalImpact!.reviewStatus
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
    </td>
    <td>
      <a
        :href="`https://www.ncbi.nlm.nih.gov/clinvar/?term=${rcv.accession!.accession}.${rcv.accession!.version}`"
        target="_blank"
        class="text-no-wrap"
      >
        <v-icon>mdi-launch</v-icon>
        {{ rcv.accession!.accession }}.{{ rcv.accession!.version }}
      </a>
    </td>
  </tr>

  <tr v-if="rcv.classifications?.oncogenicityClassification">
    <td>
      <v-chip v-if="isMultiRecord" rounded="xl" class="tonal mr-2" size="small">
        oncogenicity
      </v-chip>
      {{ (rcv.title ?? 'AND not provided').split('AND')[1] }}
    </td>
    <td>
      <template v-if="rcv.classifications?.oncogenicityClassification?.description">
        {{ rcv.classifications?.oncogenicityClassification!.description.value }}
        ({{ rcv.classifications?.oncogenicityClassification!.description.submissionCount }})
      </template>
      <template v-else> UNSPECIFIED </template>
    </td>
    <td>
      <span
        class="text-no-wrap"
        :title="
          AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL[
            rcv.classifications?.oncogenicityClassification!.reviewStatus
          ]
        "
      >
        <span v-for="i of [1, 2, 3, 4]" :key="i">
          <span
            v-if="
              i <=
              AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS[
                rcv.classifications?.oncogenicityClassification!.reviewStatus
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
    </td>
    <td>
      <a
        :href="`https://www.ncbi.nlm.nih.gov/clinvar/?term=${rcv.accession!.accession}.${rcv.accession!.version}`"
        target="_blank"
        class="text-no-wrap"
      >
        <v-icon>mdi-launch</v-icon>
        {{ rcv.accession!.accession }}.{{ rcv.accession!.version }}
      </a>
    </td>
  </tr>
</template>
