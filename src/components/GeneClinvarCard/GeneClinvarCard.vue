<script setup lang="ts">
/**
 * This component displays a Card with ClinVar variant information aggregated
 * to the gene level.
 */
import { defineAsyncComponent } from 'vue'

import { TranscriptResult } from '../../api/dotty'
import type { GenomeBuild } from '../../lib/genomeBuilds'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import DocsLink from '../DocsLink/DocsLink.vue'
import ClinvarFreqPlot from './ClinvarFreqPlot.vue'
import ClinvarImpact from './ClinvarImpact.vue'

// The variation landascape is defined as an async component as rendering it
// may take a while.
const VariationLandscape = defineAsyncComponent(() => import('./VariationLandscape.vue'))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  /** Gene per clinvar */
  clinvarPerGene?: ClinvarPerGeneRecord
  /** Gene information, if any. */
  geneInfo?: GeneInfoRecord
  /** The genome build to display for. */
  genomeBuild?: GenomeBuild
  /** Transctipts information. */
  transcripts?: TranscriptResult
}>()
</script>

<template>
  <v-card class="mt-3">
    <v-card-title class="pb-0 pr-2">
      ClinVar Information
      <small>
        <a
          :href="`https://www.ncbi.nlm.nih.gov/clinvar/?term=${geneInfo?.hgnc?.symbol}[gene]`"
          target="_blank"
        >
          <v-icon>mdi-launch</v-icon>
        </a>
      </small>
      <DocsLink anchor="clinvar-information" />
    </v-card-title>
    <v-card-text class="pt-0">
      <v-row no-gutters>
        <v-col cols="6">
          <ClinvarImpact :clinvar-per-gene="clinvarPerGene" />
        </v-col>
        <v-col cols="6">
          <ClinvarFreqPlot :clinvar-per-gene="clinvarPerGene" />
        </v-col>
        <v-col cols="12">
          <VariationLandscape
            :clinvar-per-gene="clinvarPerGene"
            :transcripts="transcripts"
            :genome-build="genomeBuild"
            :gene-symbol="geneInfo?.hgnc?.symbol"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
