<script setup lang="ts">
/**
 * This component shows the ClinVar variants by impact and frequency.
 */
import { computed } from 'vue'

import VegaPlot from '../VegaPlot/VegaPlot.vue'
import { GenesClinvarPerGeneRecord } from '../../ext/annonars-api/src/lib';

const props = defineProps<{
  /** Gene per clinvar */
  clinvarPerGene?: GenesClinvarPerGeneRecord
}>()

const COARSE_CLINSIG_LABELS = ['benign', 'uncertain', 'pathogenic', 'UNSPECIFIED']

const bucketLabels = [
  'no frequency',
  '<0.00001',
  '<0.00025',
  '<0.0005',
  '<0.0001',
  '<0.00025',
  '<0.0005',
  '<0.001',
  '<0.0025',
  '<0.005',
  '<0.01',
  '<0.025',
  '<0.05',
  '<0.1',
  '<0.25',
  '<0.5',
  '<1.0'
]

export interface CountsRecord {
  /** Coarse clinical significance ID */
  coarseClinsig: number
  /** Counts per bucket */
  counts: number[]
}

const vegaData = computed<any>(() => {
  const values: {
    coarseClinsig: string
    freqBucket: string
    freqBucketNo: number
    value: number
  }[] = []
  const benignCounts = props.clinvarPerGene?.per_freq_counts?.benign_counts ?? []
  for (let i = 0; i < benignCounts.length; i++) {
    if (benignCounts[i]) {
      values.push({
        coarseClinsig: 'benign',
        freqBucket: bucketLabels[i] ?? 'no frequency',
        freqBucketNo: i,
        value: benignCounts[i]
      })
    }
  }
  const uncertainCounts = props.clinvarPerGene?.per_freq_counts?.uncertain_counts ?? []
  for (let i = 0; i < uncertainCounts.length; i++) {
    if (uncertainCounts[i]) {
      values.push({
        coarseClinsig: 'uncertain',
        freqBucket: bucketLabels[i] ?? 'no frequency',
        freqBucketNo: i,
        value: uncertainCounts[i]
      })
    }
  }
  const pathogenicCounts = props.clinvarPerGene?.per_freq_counts?.pathogenic_counts ?? []
  for (let i = 0; i < pathogenicCounts.length; i++) {
    if (pathogenicCounts[i]) {
      values.push({
        coarseClinsig: 'pathogenic',
        freqBucket: bucketLabels[i] ?? 'no frequency',
        freqBucketNo: i,
        value: pathogenicCounts[i]
      })
    }
  }

  if (values.length) {
    return values
  } else {
    return null
  }
})

const vegaLayer = [
  {
    mark: { type: 'bar', tooltip: true }
  },
  {
    mark: {
      type: 'text',
      align: 'center',
      baseline: 'middle',
      dy: -10
    },
    encoding: {
      text: { field: 'value', type: 'quantitative', fontSize: 8 }
    }
  }
]

const vegaEncoding = {
  x: {
    field: 'freqBucket',
    title: 'population frequency',
    type: 'nominal',
    sort: bucketLabels,
    axis: { labelAngle: 45 }
  },
  y: {
    field: 'value',
    scale: { type: 'log' },
    title: 'variant count',
    axis: {
      grid: false,
      tickExtra: false
    }
  },
  xOffset: {
    field: 'coarseClinsig',
    title: 'clinical sig.',
    type: 'nominal',
    sort: COARSE_CLINSIG_LABELS
  },
  color: {
    field: 'coarseClinsig',
    title: 'clinical sig.',
    type: 'nominal',
    sort: COARSE_CLINSIG_LABELS,
    scale: {
      domain: COARSE_CLINSIG_LABELS.filter((label) => label !== 'UNSPECIFIED'),
      range: ['#5d9936', '#f5c964', '#b05454']
    }
  }
}

/** Ref to the VegaPlot (for testing). */
// const vegaPlotRef = ref(null)
</script>

<template>
  <template v-if="!clinvarPerGene">
    <v-skeleton-loader class="mt-3 mx-auto border" type="image,image" />
  </template>

  <v-sheet v-else class="pa-3 mt-3 ml-2 h-100" color="background">
    <div class="text-subtitle-1 text-center">Impact / Frequency</div>
    <VegaPlot
      :data-values="vegaData"
      :encoding="vegaEncoding"
      :mark="false"
      :layer="vegaLayer"
      :height="200"
      :width="550"
      background="#eeeeee"
      renderer="svg"
    />
  </v-sheet>
</template>
