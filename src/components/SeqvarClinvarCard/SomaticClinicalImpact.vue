<script setup lang="ts">
import { computed } from 'vue'

import { AggregatedSomaticClinicalImpact } from '../../pbs/annonars/clinvar_data/clinvar_public'
import {
  AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL,
  AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS
} from './constants'
import { clinsigColor } from './helpers'

/** This component's props */
const props = defineProps<{
  /** ClinVar record from annonars */
  clinicalImpact?: AggregatedSomaticClinicalImpact
}>()

/* The number of stars for the classification. */
const classificationStars = computed<number>(() => {
  if (props.clinicalImpact?.reviewStatus) {
    return AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS[props.clinicalImpact?.reviewStatus]
  } else {
    return 0
  }
})

/* The label to display for for the classification. */
const classificationLabel = computed<string>(() => {
  if (props.clinicalImpact?.reviewStatus) {
    return AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL[props.clinicalImpact?.reviewStatus]
  } else {
    return 'UNSPECIFIED'
  }
})
</script>

<template>
  <div v-if="clinicalImpact">
    <v-row no-gutters class="flex-nowrap">
      <v-col cols="3" class="font-weight-bold">
        <v-chip
          bg-color="grey-darken-4"
          title="somatic clinical impact"
          rounded="sm"
          class="mr-2 pl-1 pr-1"
          density="compact"
        >
          I
        </v-chip>
        Clinical Impact
      </v-col>
      <v-col cols="9">
        <v-chip :color="clinsigColor(clinicalImpact?.description)">
          {{ clinicalImpact?.description ?? 'UNSPECIFIED' }}
        </v-chip>
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
      <v-col> No data submitted for somatic clinical impact </v-col>
    </v-row>
  </div>
</template>
