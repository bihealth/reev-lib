<script setup lang="ts">
import { computed } from 'vue'

import { AggregatedSomaticClinicalImpact } from '../../pbs/annonars/clinvar_data/clinvar_public'
import {
  AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL,
  AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS
} from './constants'

/** This component's props */
const props = defineProps<{
  /** ClinVar record from annonars */
  oncogenicity?: AggregatedSomaticClinicalImpact
}>()

/* The number of stars for the classification. */
const classificationStars = computed<number>(() => {
  if (props.oncogenicity?.reviewStatus) {
    return AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS[props.oncogenicity?.reviewStatus]
  } else {
    return 0
  }
})

/* The label to display for for the classification. */
const classificationLabel = computed<string>(() => {
  if (props.oncogenicity?.reviewStatus) {
    return AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL[props.oncogenicity?.reviewStatus]
  } else {
    return 'UNSPECIFIED'
  }
})
</script>

<template>
  <div v-if="oncogenicity">
    <v-row no-gutters class="flex-nowrap">
      <v-col cols="3" class="font-weight-bold"> Oncogenicity </v-col>
      <v-col cols="9">
        {{ oncogenicity?.description ?? 'UNSPECIFIED' }}
      </v-col>
    </v-row>
    <v-row no-gutters calss="flex-nowrap">
      <v-col cols="3">
        <span v-for="i of [1, 2, 3, 4]" :key="i">
          <span v-if="i <= classificationStars">
            <v-icon>mdi-star</v-icon>
          </span>
          <span v-else>
            <v-icon>mdi-star-outline</v-icon>
          </span>
        </span>
      </v-col>
      <v-col cols="9">
        {{ classificationLabel }}
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-row no-gutters class="flex-nowrap">
      <v-col> No data submitted for oncogenicity </v-col>
    </v-row>
  </div>
</template>
