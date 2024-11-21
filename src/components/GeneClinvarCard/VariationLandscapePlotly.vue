<script setup lang="ts">
/**
 * This component shows the ClinVar "variation landscape".
 */
import Plotly from 'plotly.js-dist'
import { computed, onMounted, ref, watch } from 'vue'

import type { GenomeBuild } from '../../lib/genomeBuilds'
import { CLINVAR_SIGNIFICANCE_TO_INT, convertClinvarSignificance } from './lib'
import { type PlotlyDataPoint, downsample } from './lib'
import { ClinvarExtractedVcvRecord, GenesClinvarPerGeneRecord } from '../../ext/annonars-api/src/lib'
import { Transcript } from '../../ext/mehari-api/src/lib/types.gen'

/** This component's props. */
const props = withDefaults(
  defineProps<{
    /** Gene information from annonars. */
    clinvarPerGene?: GenesClinvarPerGeneRecord
    /** Transctipts information. */
    transcripts?: Transcript[]
    /** The genome release. */
    genomeBuild?: GenomeBuild
    /** Gene symbol */
    geneSymbol?: string
  }>(),
  { genomeBuild: 'grch37' }
)

/** The current plot boundaries. */
const currentPlotBoundaries = ref({
  minX: 0,
  maxX: 0
})

/* Helper function to compute color for point value. */
const markerColor = (value: number) => {
  if (value === 2) {
    return 'red'
  } else if (value === 1) {
    return 'orange'
  } else if (value === 0) {
    return 'yellow'
  } else if (value === -1) {
    return 'lightgreen'
  } else if (value === -2) {
    return 'green'
  } else {
    return 'grey'
  }
}

/** Compute the min and max values for the plot */
const clinvarData = computed<PlotlyDataPoint[]>(() => {
  if (!props.clinvarPerGene) {
    return []
  }
  let clinvarInfo: ClinvarExtractedVcvRecord[] = []
  for (const perRelease of props.clinvarPerGene.per_release_vars) {
    if (perRelease.release!.toLowerCase() == props.genomeBuild) {
      clinvarInfo = perRelease.variants.sort(
        (a: ClinvarExtractedVcvRecord, b: ClinvarExtractedVcvRecord) =>
          a.sequence_location!.start! - b.sequence_location!.start!
      )
    }
  }
  if (clinvarInfo.length === 0) {
    return []
  }
  // Update plot boundaries
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  currentPlotBoundaries.value = {
    minX: clinvarInfo[0].sequence_location!.start!,
    maxX: clinvarInfo[clinvarInfo.length - 1].sequence_location!.start!
  }
  return clinvarInfo
    .filter(
      (variant: ClinvarExtractedVcvRecord) =>
        variant.classifications?.germline_classification?.description?.length
    )
    .map((variant: ClinvarExtractedVcvRecord) => ({
      x: variant.sequence_location!.start!,
      y: CLINVAR_SIGNIFICANCE_TO_INT[
        convertClinvarSignificance(variant.classifications?.germline_classification?.description ?? undefined)
      ],
      count: 1
    }))
})

/** Downsampled data. */
const plotlyData = computed(() => {
  // If there are less then 700 variants, return the data TODO
  if (clinvarData.value.length < 700) {
    return clinvarData.value
  }
  const windowSize = (currentPlotBoundaries.value.maxX - currentPlotBoundaries.value.minX) / 700
  return downsample(
    clinvarData.value,
    windowSize,
    currentPlotBoundaries.value.minX,
    currentPlotBoundaries.value.maxX
  ) as PlotlyDataPoint[]
  // DEBUG: Uncomment the line below to return the full data and compare with the original plot
  // return clinvarData.value
})

/** Plotly trace */
const trace = {
  uid: 'fc47f27b-f3b0-4d31-8dac-9782780ba6b8',
  mode: 'markers',
  type: 'scatter',
  xsrc: 'caiotaniguchi:3:45beec',
  x: plotlyData.value ? plotlyData.value.map((item) => item.x) : [],
  ysrc: 'caiotaniguchi:3:9f1314',
  y: plotlyData.value ? plotlyData.value.map((item) => item.y) : [],
  text: plotlyData.value ? plotlyData.value.map((item) => `Count: ${item.count}`) : [], // Hover text
  marker: {
    color: plotlyData.value ? plotlyData.value.map((item) => markerColor(item.y)) : [],
    size: 10
  },
  scaleanchor: 'y'
}

/** Initial Lollipop sticks for each variant */
const initiallollipopSticks = computed(() => {
  if (!props.clinvarPerGene) {
    return []
  }
  const sticks = []
  for (const variant of plotlyData.value) {
    sticks.push({
      x0: variant.x,
      x1: variant.x,
      y0: 0,
      y1: variant.y,
      line: {
        color: markerColor(variant.y),
        width: 0.2
      },
      type: 'line',
      xref: 'x',
      yref: 'y'
    })
  }
  return sticks
})

/** Exons for the gene */
const exons = computed(() => {
  if (!props.transcripts) {
    return []
  }
  const exons = []
  for (const transcript of props.transcripts) {
    for (const ga of transcript.genome_alignments) {
      for (const exon of ga.exons) {
        exons.push({
          start: exon.alt_start_i,
          stop: exon.alt_end_i
        })
      }
    }
  }
  return exons
})

// Horizontal line at y=3
const horizontalLine = {
  type: 'line',
  x0: 0,
  y0: 3,
  x1: 1,
  y1: 3,
  xref: 'paper', // This makes the line span the entire width of the plot area
  yref: 'y',
  line: {
    color: 'grey',
    width: 2
  }
}

// Grey rectangles for exons
const exonShapes = exons.value.map((exon) => ({
  type: 'rect',
  x0: exon.start,
  x1: exon.stop,
  y0: 2.9, // Slightly below y=3 for visualization
  y1: 3.1, // Slightly above y=3 for visualization
  xref: 'x',
  yref: 'y',
  fillcolor: 'grey',
  line: {
    width: 0
  }
}))

/** Plot layout */
const layout = {
  title: 'Variation Landscape',
  xaxis: {
    type: 'linear',
    autorange: true
  },
  yaxis: {
    type: 'linear',
    autorange: false,
    range: [-3.5, 3.5],
    tickvals: [3, 2, 1, 0, -1, -2, -3],
    ticktext: [
      'Exons',
      'Pathogenic',
      'Likely pathogenic',
      'Uncertain significance',
      'Likely benign',
      'Benign',
      'Unknown'
    ],
    fixedrange: true
  },
  shapes: [...initiallollipopSticks.value, ...exonShapes, horizontalLine],
  autosize: true,
  margin: {
    l: 150,
    r: 50,
    b: 50,
    t: 50,
    pad: 4
  }
}

/** Method to update plot with new data based on zoom or pan */
const updatePlotData = (minX: number, maxX: number) => {
  // Filter clinvarData for new boundaries and compute new downsampled data
  const windowSize = (maxX - minX) / 700
  const newDownsampledData = downsample(clinvarData.value, windowSize, minX, maxX)
  trace.x = newDownsampledData.map((item) => item.x)
  trace.y = newDownsampledData.map((item) => item.y)
  trace.marker.color = newDownsampledData.map((item) => markerColor(item.y))
  // Update lollipopSticks
  const newLollipopSticks = []
  for (const variant of newDownsampledData) {
    newLollipopSticks.push({
      x0: variant.x,
      x1: variant.x,
      y0: 0,
      y1: variant.y,
      line: {
        color: markerColor(variant.y),
        width: 0.2
      },
      type: 'line',
      xref: 'x',
      yref: 'y'
    })
  }
  layout.shapes = [...newLollipopSticks, ...exonShapes, horizontalLine]
  // Re-render plot with new data
  Plotly.react('plot', [trace], layout)
}

onMounted(() => {
  const plotElement = document.getElementById('plot')
  if (plotElement) {
    Plotly.newPlot('plot', [trace], layout, { scrollZoom: true }).then(() => {
      // @ts-expect-error Property 'on' seems to exist on type 'HTMLElement'
      document.getElementById('plot')?.on('plotly_relayout', (eventdata: any) => {
        if (eventdata['xaxis.range[0]'] && eventdata['xaxis.range[1]']) {
          // Update plot boundaries based on zoom or pan
          const minX = parseFloat(eventdata['xaxis.range[0]'])
          const maxX = parseFloat(eventdata['xaxis.range[1]'])
          currentPlotBoundaries.value = { minX, maxX }
          updatePlotData(minX, maxX)
        }
      })
      // @ts-expect-error Property 'on' seems to exist on type 'HTMLElement'
      document.getElementById('plot')?.on('plotly_doubleclick', () => {
        const minX = clinvarData.value[0].x
        const maxX = clinvarData.value[clinvarData.value.length - 1].x
        currentPlotBoundaries.value = { minX, maxX }
        updatePlotData(minX, maxX)
      })
    })
  }
})

watch(
  clinvarData,
  (newValue, oldValue) => {
    const plotElement = document.getElementById('plot')
    if (plotElement && newValue !== oldValue) {
      updatePlotData(currentPlotBoundaries.value.minX, currentPlotBoundaries.value.maxX)
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="pt-3">
    <template v-if="!clinvarPerGene">
      <v-skeleton-loader class="mt-3 mx-auto border" type="text,image,text" />
    </template>
    <v-sheet v-else color="background" class="pa-3 mt-3 h-100">
      <div id="plot"></div>
      <div>
        <p class="mt-3">
          The plot above shows the sequence variants in the ClinVar database that are that are
          located in the gene <span class="font-italic"> {{ geneSymbol ?? 'UNDEFINED' }} </span>.
        </p>
        <p class="mt-3">
          You can zoom in by holding by moving the mouse cursor to the start position, keep the left
          mouse button pressed, and dragging to the end position to zoom in. Use double-click for
          zooming out.
        </p>
      </div>
    </v-sheet>
  </div>
</template>
