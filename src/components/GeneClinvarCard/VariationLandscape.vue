<script setup lang="ts">
/**
 * This component shows the ClinVar "variation landscape".
 */
import { computed } from 'vue'

import type { GenomeBuild } from '../../lib/genomeBuilds'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import { ExtractedVcvRecord } from '../../pbs/annonars/clinvar_data/extracted_vars'
import { Transcript } from '../../pbs/mehari/txs'
import VegaPlot from '../VegaPlot/VegaPlot.vue'
import { CLINVAR_SIGNIFICANCE_TO_INT, convertClinvarSignificance } from './lib'

/** This component's props. */
const props = withDefaults(
  defineProps<{
    /** Gene information from annonars. */
    clinvarPerGene?: ClinvarPerGeneRecord
    /** Transctipts information. */
    transcripts?: Transcript[]
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

const minMax = computed(() => {
  if (!props.clinvarPerGene) {
    return []
  }
  let min: number | null = null
  let max: number | null = null
  for (const perRelease of props.clinvarPerGene.perReleaseVars) {
    if (perRelease.release!.toLowerCase() == props.genomeBuild) {
      // Go through all variants and find the min and max pos.
      for (const variant of perRelease.variants) {
        if (min === null || variant.sequenceLocation!.start! < min) {
          min = variant.sequenceLocation!.start!
        }
        if (max === null || variant.sequenceLocation!.start! > max) {
          max = variant.sequenceLocation!.start!
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

const paddedMinMax = computed<[number, number]>(() => {
  const [min, max] = minMax.value
  const totalLength = max - min
  const padding = Math.round(totalLength * 0.05)
  return [min - padding, max + padding]
})

const exons = computed<{ start: number; stop: number }[]>(() => {
  if (!props.transcripts?.length) {
    return []
  }
  const exons: { start: number; stop: number }[] = []
  for (const transcript of props.transcripts) {
    for (const ga of transcript.genomeAlignments) {
      for (const exon of ga.exons) {
        exons.push({
          start: exon.altStartI,
          stop: exon.altEndI
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
  let clinvarInfo: ExtractedVcvRecord[] = []
  for (const perRelease of props.clinvarPerGene.perReleaseVars) {
    if (perRelease.release!.toLowerCase() == props.genomeBuild) {
      clinvarInfo = perRelease.variants
    }
  }

  return clinvarInfo
    .filter(
      (variant: ExtractedVcvRecord) =>
        variant.classifications?.germlineClassification?.description?.length
    )
    .map((variant: ExtractedVcvRecord) => ({
      pos: variant.sequenceLocation!.start!,
      clinsig:
        CLINVAR_SIGNIFICANCE_TO_INT[
          convertClinvarSignificance(variant.classifications?.germlineClassification?.description)
        ]
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
        in the gene <span class="font-italic"> {{ geneSymbol ?? 'UNDEFINED' }} </span>.
      </div>
    </v-sheet>
  </div>
</template>
