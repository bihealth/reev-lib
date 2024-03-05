<script setup lang="ts">
import { ref } from 'vue'

import {
  Entry,
  Metadata,
  PrimaryAssemblyLoci,
  VariantValidatorClient
} from '../../api/variantValidator'
import { type Seqvar } from '../../lib/genomicVars'
import DocsLink from '../DocsLink/DocsLink.vue'

enum VariantValidatorStates {
  Initial = 0,
  Running = 1,
  Done = 2,
  Error = 3
}

interface Props {
  seqvar?: Seqvar
}

const props = defineProps<Props>()

/** This component's emits. */
const emit = defineEmits<{
  /** An error occured, e.g., communicating with server. */
  error: [msg: string]
}>()

const variantValidatorState = ref<VariantValidatorStates>(VariantValidatorStates.Initial)

interface KeyValue {
  key: string
  value: Entry
}

interface Results {
  items: KeyValue[]
  metadata?: Metadata
}

const variantValidatorResults = ref<Results | undefined>(undefined)

const primaryAssemblyLoci = ref<PrimaryAssemblyLoci | undefined>(undefined)

const variantValidatorClient = new VariantValidatorClient()

const queryVariantValidatorApi = async () => {
  if (!props.seqvar) {
    // Short-circuit unless `props.seqvar` is defined.
    return
  }

  variantValidatorState.value = VariantValidatorStates.Running
  variantValidatorResults.value = undefined
  primaryAssemblyLoci.value = undefined

  try {
    const res = await variantValidatorClient.fetchVvResults(props.seqvar)

    const items: KeyValue[] = []
    const metadata = res.metadata
    for (const key in res.entries) {
      const value = res.entries[key]
      if (primaryAssemblyLoci.value === undefined) {
        primaryAssemblyLoci.value = value.primaryAssemblyLoci
      }
      items.push({
        key,
        value
      })
    }
    variantValidatorResults.value = { items, metadata }
    variantValidatorState.value = VariantValidatorStates.Done
  } catch (err) {
    variantValidatorState.value = VariantValidatorStates.Error
    emit('error', `There was an error when communicating with VariantValidator API: ${err}`)
    return
  }
}
</script>

<template>
  <template v-if="!seqvar">
    <v-skeleton-loader type="card" />
  </template>
  <v-card v-else>
    <v-card-title class="pb-0 pr-2">
      Variant Validator
      <DocsLink anchor="variant-validator" />
    </v-card-title>
    <v-card-subtitle class="text-overline">
      Retrieve Predictions from VariantValidator.org
    </v-card-subtitle>
    <v-card-text class="mt-0 pt-0">
      <div v-if="variantValidatorState === VariantValidatorStates.Running">
        <div class="alert alert-info pt-3">
          <v-progress-circular indeterminate class="mr-3" />
          Loading...
        </div>
      </div>
      <template v-else-if="variantValidatorState === VariantValidatorStates.Done">
        <v-list class="d-flex flex-row">
          <v-list-item class="px-0 mr-6">
            <v-list-item-title> VariantValidator HGVS Version </v-list-item-title>
            <v-list-item-subtitle>
              {{ variantValidatorResults?.metadata?.variantvalidatorHgvsVersion ?? 'N/A' }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-title> VariantValidator Version </v-list-item-title>
            <v-list-item-subtitle>
              {{ variantValidatorResults?.metadata?.variantvalidatorVersion ?? 'N/A' }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <div class="text-overline">Transcript Variants</div>

        <v-table density="compact">
          <thead>
            <tr>
              <th class="font-weight-bold">Gene Symbol</th>
              <th class="font-weight-bold">Transcript Variant</th>
              <th class="font-weight-bold">Protein Variant</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="{ key, value } in variantValidatorResults?.items ?? []" :key="key">
              <template v-if="!value.geneSymbol?.length && value.validationWarnings?.length">
                <tr>
                  <td colspan="3" class="font-italic text-center">
                    {{ value.validationWarnings.join(', ') }}
                  </td>
                </tr>
              </template>
              <tr>
                <td>{{ value.geneSymbol }}</td>
                <td>{{ value.hgvsTranscriptVariant }}</td>
                <td>{{ value.hgvsPredictedProteinConsequence?.slr || '&mdash;' }}</td>
              </tr>
            </template>
          </tbody>
        </v-table>

        <div class="text-overline">Genomic Variants</div>

        <v-table density="compact">
          <thead>
            <tr>
              <th class="font-weight-bold">Variant Description</th>
              <th class="font-weight-bold">VCF Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="primaryAssemblyLoci?.grch37?.hgvsGenomicDescription">
              <td>
                {{ primaryAssemblyLoci?.grch37.hgvsGenomicDescription }}
              </td>
              <td>
                GRCh37:{{ primaryAssemblyLoci?.grch37?.vcf?.chr }}:{{
                  primaryAssemblyLoci?.grch37?.vcf?.pos
                }}:{{ primaryAssemblyLoci?.grch37?.vcf?.ref }}:{{
                  primaryAssemblyLoci?.grch37?.vcf?.alt
                }}
              </td>
            </tr>
            <tr v-if="primaryAssemblyLoci?.grch38?.hgvsGenomicDescription">
              <td>
                {{ primaryAssemblyLoci?.grch38.hgvsGenomicDescription }}
              </td>
              <td>
                GRCh38:{{ primaryAssemblyLoci?.grch38?.vcf?.chr }}:{{
                  primaryAssemblyLoci?.grch38?.vcf?.pos
                }}:{{ primaryAssemblyLoci?.grch38?.vcf?.ref }}:{{
                  primaryAssemblyLoci?.grch38?.vcf?.alt
                }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>
      <div v-else-if="variantValidatorState === VariantValidatorStates.Error">
        <v-alert color="error" icon="$error" title="Problem Querying VariantValidator.org">
          An error occurred while querying the VariantValidator API. Please try again later.
        </v-alert>
      </div>
      <div class="mt-3">
        <v-btn
          prepend-icon="mdi-cloud-upload-outline"
          variant="tonal"
          rounded="sm"
          @click="queryVariantValidatorApi()"
        >
          Submit to VariantValidator.org
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.variant-validator-result-tab {
  float: left;
}
</style>
