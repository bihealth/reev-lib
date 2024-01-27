<script setup lang="ts">
import { computed } from 'vue'

import { TranscriptResult } from '../../api/dotty'
import type { GenomeBuild } from '../../lib/genomeBuilds'
import { ClinicalSignificance, type Record } from '../../pbs/annonars/clinvar/minimal'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import VegaPlot from '../VegaPlot/VegaPlot.vue'

/** This component's props. */
const props = withDefaults(
  defineProps<{
    /** Gene information from annonars. */
    clinvarPerGene?: ClinvarPerGeneRecord
    /** Transctipts information. */
    transcripts?: TranscriptResult
    /** The genome release. */
    genomeBuild?: GenomeBuild
    /** Gene symbol */
    geneSymbol?: string
  }>(),
  {
    clinvarPerGene: undefined,
    transcripts: undefined,
    genomeBuild: 'grch37',
    geneSymbol: undefined
  }
)

const clinvarSignificanceMapping: { [Key in ClinicalSignificance]: number } = {
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_UNKNOWN]: -3,
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_PATHOGENIC]: 2,
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_LIKELY_PATHOGENIC]: 1,
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_UNCERTAIN_SIGNIFICANCE]: 0,
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_LIKELY_BENIGN]: -1,
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_BENIGN]: -2
}

const convertClinvarSignificance = (input: ClinicalSignificance): number => {
  if (input in clinvarSignificanceMapping) {
    return clinvarSignificanceMapping[input]
  } else {
    return -4
  }
}

const minMax = computed(() => {
  if (!props.clinvarPerGene) {
    return []
  }
  let min = null
  let max = null
  for (const item of props.clinvarPerGene.variants) {
    if (item.genomeRelease.toLowerCase() == props.genomeBuild) {
      // Go through all variants and find the min and max pos.
      for (const variant of item.variants ?? []) {
        if (min === null || variant.start < min) {
          min = variant.start
        }
        if (max === null || variant.start > max) {
          max = variant.start
        }
      }
    }
  }
  for (const exon of exons.value) {
    if (min === null || exon.start < min) {
      min = exon.start
    }
    if (max === null || exon.stop > max) {
      max = exon.stop
    }
  }
  if (min === null || max === null) {
    return [0, 1]
  } else {
    const totalLength = max - min
    const padding = Math.round(totalLength * 0.05)
    return [min - padding, max + padding]
  }
})

const paddedMinMax = computed(() => {
  const [min, max] = minMax.value
  const totalLength = max - min
  const padding = Math.round(totalLength * 0.05)
  return [min - padding, max + padding]
})

const exons = computed(() => {
  if (!props.transcripts?.transcripts?.length) {
    return []
  }
  const exons = []
  for (const transcript of props.transcripts.transcripts) {
    for (const alignment of transcript.alignments) {
      for (const exon of alignment.exons) {
        exons.push({
          start: exon.refStart,
          stop: exon.refEnd
        })
      }
    }
  }
  return exons
})

const vegaData = computed(() => {
  if (!props.clinvarPerGene) {
    return []
  }
  let clinvarInfo: Record[] = []
  for (const item of props.clinvarPerGene.variants ?? []) {
    if (item.genomeRelease.toLowerCase() == props.genomeBuild) {
      clinvarInfo = item.variants
    }
  }

  return clinvarInfo.map((variant: Record) => ({
    pos: variant.start,
    clinsig: convertClinvarSignificance(variant.referenceAssertions[0].clinicalSignificance)
  }))
})

const vegaEncoding = {}

const vegaLayer = [
  {
    description: 'gray baseline',
    data: { values: [{}] },
    mark: { type: 'rule', stroke: 'lightgray', size: 3 },
    encoding: { y: { datum: 'Uncertain significance' } }
  },
  {
    description: 'lollipop heads',
    transform: [
      {
        lookup: 'clinsig',
        from: {
          data: {
            values: [
              { clinsig: -5, clinsigLabel: 'other' },
              { clinsig: -4, clinsigLabel: 'Not provided' },
              { clinsig: -3, clinsigLabel: 'Conflicting' },
              { clinsig: -2, clinsigLabel: 'Benign' },
              { clinsig: -1, clinsigLabel: 'Likely benign' },
              { clinsig: 0, clinsigLabel: 'Uncertain significance' },
              { clinsig: 1, clinsigLabel: 'Likely pathogenic' },
              { clinsig: 2, clinsigLabel: 'Pathogenic' },
              { clinsig: 3, clinsigLabel: 'Gene' }
            ]
          },
          key: 'clinsig',
          fields: ['clinsigLabel']
        }
      }
    ],
    mark: { type: 'circle', opacity: 0.8 },
    encoding: {
      x: {
        field: 'pos',
        type: 'quantitative',
        scale: { domain: paddedMinMax.value },
        axis: { grid: false, zindex: 1000 },
        title: null
      },
      y: {
        field: 'clinsigLabel',
        type: 'nominal',
        scale: {
          domain: [
            'Gene',
            'Pathogenic',
            'Likely pathogenic',
            'Uncertain significance',
            'Likely benign',
            'Benign'
          ]
        },
        axis: { grid: false },
        title: null
      },
      color: {
        field: 'clinsigLabel',
        type: 'nominal',
        scale: {
          domain: [
            'Gene',
            'Pathogenic',
            'Likely pathogenic',
            'Uncertain significance',
            'Likely benign',
            'Benign'
          ],
          range: ['gray', 'darkred', 'orange', 'yellow', 'green', 'darkgreen']
        },
        legend: null
      },
      size: { value: 100 }
    }
  },
  {
    description: 'lollipop sticks',
    transform: [
      {
        lookup: 'clinsig',
        from: {
          data: {
            values: [
              {
                clinsig: -5,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'other'
              },
              {
                clinsig: -4,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'Not provided'
              },
              {
                clinsig: -3,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'Conflicting'
              },
              {
                clinsig: -2,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'Benign'
              },
              {
                clinsig: -1,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'Likely benign'
              },
              {
                clinsig: 0,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'Uncertain significance'
              },
              {
                clinsig: 1,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'Likely pathogenic'
              },
              {
                clinsig: 2,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'Pathogenic'
              },
              {
                clinsig: 3,
                clinsigBaseline: 'Uncertain significance',
                clinsigLabel: 'Gene'
              }
            ]
          },
          key: 'clinsig',
          fields: ['clinsigBaseline', 'clinsigLabel']
        }
      }
    ],
    mark: { type: 'rule', opacity: 0.8 },
    encoding: {
      x: {
        field: 'pos',
        type: 'quantitative',
        scale: { domain: paddedMinMax.value },
        axis: { grid: false },
        title: null
      },
      y: {
        field: 'clinsigLabel',
        type: 'nominal',
        scale: {
          domain: [
            'Gene',
            'Pathogenic',
            'Likely pathogenic',
            'Uncertain significance',
            'Likely benign',
            'Benign'
          ]
        },
        axis: { grid: false, zindex: 1000 },
        title: null
      },
      y2: { field: 'clinsigBaseline' },
      color: {
        field: 'clinsigLabel',
        type: 'nominal',
        scale: {
          domain: [
            'Gene',
            'Pathogenic',
            'Likely pathogenic',
            'Uncertain significance',
            'Likely benign',
            'Benign'
          ],
          range: ['gray', 'darkred', 'orange', 'yellow', 'green', 'darkgreen']
        },
        legend: null
      },
      size: { value: 1 }
    }
  },
  {
    description: 'gene - line',
    data: { values: [{ pos: minMax.value[0] }, { pos: minMax.value[1] }] },
    mark: { type: 'line', stroke: 'black', size: 1, opacity: 0.5 },
    encoding: {
      x: {
        field: 'pos',
        type: 'quantitative',
        scale: { domain: paddedMinMax.value },
        axis: { grid: false },
        title: null
      },
      y: { datum: 'Gene' }
    }
  },
  {
    description: 'gene - exons',
    data: {
      values: exons.value
    },
    mark: {
      type: 'rect',
      stroke: 'black',
      height: 10,
      fill: 'black',
      opacity: 0.5
    },
    encoding: {
      x: {
        field: 'start',
        type: 'quantitative',
        scale: { domain: paddedMinMax.value },
        axis: { grid: false },
        title: null
      },
      x2: { field: 'stop' },
      y: { datum: 'Gene' }
    }
  }
]
</script>

<template>
  <div class="pt-3">
    <template v-if="!clinvarPerGene">
      <v-skeleton-loader class="mt-3 mx-auto border" type="text,image,text" />
    </template>
    <v-sheet v-else class="pa-3 mt-3 h-100" color="background">
      <div class="text-subtitle-1 text-center">Variation Lanscape</div>
      <VegaPlot
        :data-values="vegaData"
        :encoding="vegaEncoding"
        :layer="vegaLayer"
        :width="1200"
        :height="300"
        background="#eeeeee"
        renderer="canvas"
      />
      <div>
        The plot above shows the sequence variants in the ClinVar database that are that are located
        in the gene <span class="font-italic"> {{ geneSymbol }} </span>.
      </div>
    </v-sheet>
  </div>
</template>
