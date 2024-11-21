<script setup lang="ts">
import { computed } from 'vue'

import {
  AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL,
  AGGREGATE_GERMLINE_REVIEW_STATUS_STARS,
  AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL,
  AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS,
  AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL,
  AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS
} from './constants'
import { ClinvarExtractedRcvRecord } from '../../ext/annonars-api/src/lib';

/** This component's props */
const props = defineProps<{
  /** RCV record from annonars */
  rcv: ClinvarExtractedRcvRecord
}>()

/** Whether or not has more than one of germline/clinical impact/oncogenicity. */
const isMultiRecord = computed<boolean>(() => {
  const sum =
    (props.rcv.classifications?.germline_classification ? 1 : 0) +
    (props.rcv.classifications?.somatic_clinical_impact ? 1 : 0) +
    (props.rcv.classifications?.oncogenicity_classification ? 1 : 0)
  return sum > 1
})
</script>

<template>
  <tr v-if="rcv.classifications?.germline_classification">
    <td>
      <v-chip v-if="isMultiRecord" class="tonal mr-2" size="small"> germline </v-chip>
      {{ (rcv.title ?? 'AND not provided').split('AND')[1] }}
    </td>
    <td>
      <template v-if="rcv.classifications?.germline_classification!.description">
        {{ rcv.classifications?.germline_classification!.description.value }}
        ({{ rcv.classifications?.germline_classification!.description.submission_count }})
      </template>
      <template v-else> UNSPECIFIED </template>
    </td>
    <td>
      <span
        class="text-no-wrap"
        :title="
          AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL[
            rcv.classifications?.germline_classification!.review_status
          ]
        "
      >
        <span v-for="i of [1, 2, 3, 4]" :key="i">
          <span
            v-if="
              i <=
              AGGREGATE_GERMLINE_REVIEW_STATUS_STARS[
                rcv.classifications?.germline_classification!.review_status
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

  <tr v-if="rcv.classifications?.somatic_clinical_impact">
    <td>
      <v-chip v-if="isMultiRecord" class="tonal mr-2" size="small"> oncogenicity </v-chip>
      {{ (rcv.title ?? 'AND not provided').split('AND')[1] }}
    </td>
    <td>
      <template v-if="rcv.classifications?.somatic_clinical_impact?.descriptions?.length">
        <span
          v-for="(description, idx) in rcv.classifications?.somatic_clinical_impact?.descriptions ??
          []"
          :key="idx"
        >
          {{ description.value }}
          ({{ description.submission_count }})
        </span>
      </template>
      <template v-else> UNSPECIFIED </template>
    </td>
    <td>
      <span
        class="text-no-wrap"
        :title="
          AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL[
            rcv.classifications!.somatic_clinical_impact!.review_status
          ]
        "
      >
        <span v-for="i of [1, 2, 3, 4]" :key="i">
          <span
            v-if="
              i <=
              AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS[
                rcv.classifications!.somatic_clinical_impact!.review_status
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

  <tr v-if="rcv.classifications?.oncogenicity_classification">
    <td>
      <v-chip v-if="isMultiRecord" class="tonal mr-2" size="small"> oncogenicity </v-chip>
      {{ (rcv.title ?? 'AND not provided').split('AND')[1] }}
    </td>
    <td>
      <template v-if="rcv.classifications?.oncogenicity_classification?.description">
        {{ rcv.classifications?.oncogenicity_classification!.description.value }}
        ({{ rcv.classifications?.oncogenicity_classification!.description.submission_count }})
      </template>
      <template v-else> UNSPECIFIED </template>
    </td>
    <td>
      <span
        class="text-no-wrap"
        :title="
          AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL[
            rcv.classifications?.oncogenicity_classification!.review_status
          ]
        "
      >
        <span v-for="i of [1, 2, 3, 4]" :key="i">
          <span
            v-if="
              i <=
              AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS[
                rcv.classifications?.oncogenicity_classification!.review_status
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
