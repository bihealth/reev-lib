<script setup lang="ts">
import { ref } from 'vue'

import { Record as ClinvarRecord } from '../../pbs/annonars/clinvar/minimal'
import DocsLink from '../DocsLink/DocsLink.vue'
import { CLINICAL_SIGNIFICANCE_LABEL, REVIEW_STATUS_LABEL, REVIEW_STATUS_STARS } from './constants'

/** This component's clinvarRecord */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  /** ClinVar record from annonars */
  clinvarRecord?: ClinvarRecord
}>()

/** Convert VCV to number. */
const vcvToNumber = (vcv: string): number => {
  return parseInt(vcv.substring(3))
}

/** Whether the card is expanded; component state. */
const expand = ref<boolean>(false)
</script>

<template>
  <v-card v-if="clinvarRecord?.vcv">
    <v-card-title class="pb-0 pr-2">
      ClinVar
      <DocsLink anchor="clinvar" />
    </v-card-title>
    <v-card-text>
      <v-row no-gutters class="flex-nowrap">
        <v-col cols="1" class="font-weight-black"> Significance </v-col>
        <v-col cols="1" style="min-width: 100px; max-width: 100%" class="flex-grow-1 flex-shrink-0">
          {{
            CLINICAL_SIGNIFICANCE_LABEL[clinvarRecord?.referenceAssertions[0]!.clinicalSignificance]
          }}
        </v-col>
      </v-row>

      <v-row no-gutters class="flex-nowrap">
        <v-col cols="1" class="font-weight-black"> Review Status </v-col>
        <v-col
          cols="1"
          style="min-width: 100px; max-width: 100%"
          class="flex-grow-1 flex-shrink-0 text-no-wrap"
        >
          <span v-for="i of [1, 2, 3, 4, 5]" :key="i">
            <span
              v-if="i <= REVIEW_STATUS_STARS[clinvarRecord?.referenceAssertions[0]!.reviewStatus]"
            >
              <v-icon>mdi-star</v-icon>
            </span>
            <span v-else>
              <v-icon>mdi-star-outline</v-icon>
            </span>
          </span>
          <span class="ml-3">
            {{ REVIEW_STATUS_LABEL[clinvarRecord?.referenceAssertions[0]!.reviewStatus] }}
          </span>
        </v-col>
      </v-row>

      <v-row no-gutters class="flex-nowrap">
        <v-col cols="1" class="font-weight-black"> Accession </v-col>
        <v-col cols="1" style="min-width: 100px; max-width: 100%" class="flex-grow-1 flex-shrink-0">
          <a
            :href="`https://www.ncbi.nlm.nih.gov/clinvar/variation/${vcvToNumber(
              clinvarRecord.vcv
            )}/?redir=vcv`"
            target="_blank"
          >
            <v-icon>mdi-launch</v-icon>
            {{ clinvarRecord.vcv }}
          </a>
        </v-col>
      </v-row>
    </v-card-text>

    <v-expand-transition>
      <div v-show="expand">
        <v-divider />

        <v-card-title> ClinVar Reference Assertions </v-card-title>
        <v-card-text>
          <p>Below are all reference assertions for all assessed conditions from ClinVar.</p>
          <v-table density="compact" class="mt-3">
            <thead>
              <tr>
                <th>Condition</th>
                <th>Significance</th>
                <th>Review Status</th>
                <th>RCV</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="assertion of clinvarRecord?.referenceAssertions" :key="assertion.rcv">
                <td>
                  {{ assertion.title.split('AND')[1] }}
                </td>
                <td>
                  {{ CLINICAL_SIGNIFICANCE_LABEL[assertion.clinicalSignificance] }}
                </td>
                <td>
                  <span v-for="i of [1, 2, 3, 4, 5]" :key="i">
                    <span v-if="i <= REVIEW_STATUS_STARS[assertion.reviewStatus]">
                      <v-icon>mdi-star</v-icon>
                    </span>
                    <span v-else>
                      <v-icon>mdi-star-outline</v-icon>
                    </span>
                  </span>
                  <span class="ml-3"> {{ REVIEW_STATUS_LABEL[assertion.reviewStatus] }} </span>
                </td>
                <td>
                  <a
                    :href="`https://www.ncbi.nlm.nih.gov/clinvar/${assertion.rcv}`"
                    target="_blank"
                  >
                    <v-icon>mdi-launch</v-icon>
                    {{ assertion.rcv }}
                  </a>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-divider />

    <v-card-actions>
      <v-btn @click="expand = !expand">
        {{ !expand ? 'Show Reference Assertions' : 'Hide Reference Assertions' }}
      </v-btn>
      <v-spacer />
      <v-btn :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="expand = !expand" />
    </v-card-actions>
  </v-card>

  <v-card v-else variant="elevated">
    <v-card-text> No ClinVar information available. </v-card-text>
  </v-card>
</template>
