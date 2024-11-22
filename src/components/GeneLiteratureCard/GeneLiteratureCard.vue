<!--
This component displays related literature using the PubTator 3 API.
-->
<script setup lang="ts">
import { DateTime } from 'luxon'
import { computed, ref, watch } from 'vue'
import { useTheme } from 'vuetify'

import {
  PublicationsExportBiocjsonResponseEntryPassageAnnotationInfonsBiotype as AnnotationInfonsBiotype,
  PublicationsExportBiocjsonResponseEntryPassage as Passage,
  PublicationsExportBiocjsonResponseEntryPassageAnnotationLocation as PassageAnnotationLocation,
  PublicationsExportBiocjsonResponseEntry,
  SearchResponseArticle
} from '../../ext/pubtator3-api/src/lib'
import { usePubtator3PublicationsExportBiocjsonQuery } from '../../queries/pubtator3/publications'
import { usePubtator3SearchQuery } from '../../queries/pubtator3/search'
import DocsLink from '../DocsLink/DocsLink.vue'

/** This component's props. */
const props = defineProps<{
  /** HGNC symbol */
  hgncSymbol?: string
}>()

/** This component's emits. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  /** An error occured, e.g., communicating with server. */
  error: [msg: string]
}>()

/** Vuetify theme. */
const theme = useTheme()

/** Show all results */
const showAllResults = ref(false)

/** Query text to search for. */
const pubtator3QueryText = computed(() => {
  if (!!props.hgncSymbol) {
    return `@GENE_${props.hgncSymbol}`
  } else {
    return undefined
  }
})
/** The query to list PMIDs with for the gene. */
const pubtator3SearchQuery = usePubtator3SearchQuery({
  text: pubtator3QueryText
})
/** Pubmed IDs from Pubtator3. */
const pubtator3Pmids = computed<number[] | undefined>(() => {
  if (!!pubtator3SearchQuery.data?.value) {
    return pubtator3SearchQuery.data?.value!.results!.map((doc: SearchResponseArticle) => doc.pmid)
  } else {
    return undefined
  }
})
/** Query for export to JSON. */
const pubtator3PublicationsExportBiocjsonQuery = usePubtator3PublicationsExportBiocjsonQuery({
  pmids: pubtator3Pmids
})
/** Easy access to list of biocjson query results. */
const queryResults = computed<PublicationsExportBiocjsonResponseEntry[] | undefined>(() => {
  if (showAllResults.value) {
    return pubtator3PublicationsExportBiocjsonQuery.data.value?.PubTator3
  } else {
    return pubtator3PublicationsExportBiocjsonQuery.data.value?.PubTator3?.slice(0, 3)
  }
})

/** Any error message to display. */
const errorMessage = ref<string | undefined>(undefined)

/** Mapping from annotation type to VChip color. */
const TYPE_TO_CHIP_COLOR: { [key in AnnotationInfonsBiotype]: string } = {
  disease: 'orange',
  gene: '#8B2595',
  chemical: 'green',
  species: 'blue',
  variant: 'red',
  cellline: 'teal'
}

/** Mapping from annotation type to raw CSS color in light mode. */
const TYPE_TO_RAW_COLOR_LIGHT: { [key in AnnotationInfonsBiotype]: string } = {
  disease: '#ffe0b2',
  gene: '#e1bee7',
  chemical: '#c8e6c9',
  species: '#dcf1fc',
  variant: '#d7ccc8',
  cellline: '#b2ebf2'
}

/** Mapping from annotation type to raw CSS color in dark mode. */
const TYPE_TO_RAW_COLOR_DARK: { [key in AnnotationInfonsBiotype]: string } = {
  disease: '#9c6b24',
  gene: '#743d7d',
  chemical: '#5c7d5e',
  species: '#577c99',
  variant: '#853a3a',
  cellline: '#4e8c94'
}

/** Mapping from annotation type to raw CSS color. */
let TYPE_TO_RAW_COLOR =
  theme.global.current.value.dark === true
    ? { ...TYPE_TO_RAW_COLOR_DARK }
    : { ...TYPE_TO_RAW_COLOR_LIGHT }

/** Mapping from annotation type to CSS font color in light mode. */
const TYPE_TO_FONT_COLOR_LIGHT: { [key in AnnotationInfonsBiotype]: string } = {
  disease: '#ff9800',
  gene: '#673ab7',
  chemical: '#4caf50',
  species: '#2196f3',
  variant: '#5d4037',
  cellline: '#50b4b4'
}
/** Mapping from annotation type to CSS font color in dark mode. */
const TYPE_TO_FONT_COLOR_DARK: { [key in AnnotationInfonsBiotype]: string } = {
  disease: '#e8d4b7',
  gene: '#edcef2',
  chemical: '#caedcc',
  species: '#bedef7',
  variant: '#fcd7d7',
  cellline: '#c1f1f7'
}

/** Mapping from annotation type to CSS font color. */
let TYPE_TO_FONT_COLOR =
  theme.global.current.value.dark === true
    ? { ...TYPE_TO_FONT_COLOR_DARK }
    : { ...TYPE_TO_FONT_COLOR_LIGHT }

/** Information extracted from annotations. */
type Annotation = {
  biotype: AnnotationInfonsBiotype
  name: string
  text: string
  locations: PassageAnnotationLocation[]
}

/** Extract and normalize annotation from passage. */
const extractPassageAnnotations = (passage: Passage): Annotation[] => {
  const result: Annotation[] = []
  for (const annotation of passage.annotations ?? []) {
    if (!!annotation.infons.biotype && !!annotation.infons.name) {
      result.push({
        biotype: annotation.infons.biotype,
        name: annotation.infons.name,
        text: annotation.text,
        locations: annotation.locations
      })
    }
  }
  return result
}

/** Extract and normalize annotations from abstract. */
const extractAnnotations = (entry: PublicationsExportBiocjsonResponseEntry): Annotation[] => {
  const seen: Set<string> = new Set()
  const annotations: Annotation[] = []
  for (const passage of entry?.passages ?? []) {
    for (const annotation of extractPassageAnnotations(passage)) {
      if (seen.has(annotation.name ?? annotation.text ?? '')) {
        continue
      }
      annotations.push(annotation)
      seen.add(annotation.name ?? annotation.text ?? '')
    }
  }
  return annotations
}

/** Local type for storing Location and annotation, location on top level. */
interface LocationAnnotation {
  /** The location of the annotation. */
  location: PassageAnnotationLocation
  /** The annotation. */
  annotation: Annotation
}

/** Returns "inner" HTML with highlighting for annotation. */
const highlight = (text: string, annotations: Annotation[], baseOffset: number): string => {
  // get list of all annotations
  const locationAnnotations: LocationAnnotation[] = []
  for (const annotation of annotations) {
    for (const location of annotation.locations) {
      locationAnnotations.push({
        location: location,
        annotation: annotation
      })
    }
  }
  locationAnnotations.sort((a, b) => a.location.offset - b.location.offset)

  // now process all annotations
  const arr: string[] = []
  let prevEnd = 0
  for (const locationAnnotation of locationAnnotations) {
    if (prevEnd > locationAnnotation.location.offset) {
      continue // skip overlapping annotations
    }

    // push text before annotation
    const textStart = prevEnd
    const textEnd = locationAnnotation.location.offset
    if (textStart != textEnd) {
      arr.push(text.slice(textStart - baseOffset, textEnd - baseOffset))
    }

    // push annotation
    const annoStart = locationAnnotation.location.offset
    const annoEnd = locationAnnotation.location.offset + locationAnnotation.location.length
    arr.push(
      `<span style="
        background-color: ${TYPE_TO_RAW_COLOR[locationAnnotation.annotation.biotype]};
        color: ${TYPE_TO_FONT_COLOR[locationAnnotation.annotation.biotype]};
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;">`
    )
    arr.push(text.slice(annoStart - baseOffset, annoEnd - baseOffset))
    arr.push('</span>')

    prevEnd = annoEnd
  }

  // push remaining text
  if (prevEnd < text.length) {
    arr.push(text.slice(prevEnd - baseOffset))
  }

  return arr.join('')
}

// Reload template when theme changes.
watch(
  () => theme.global.current.value,
  () => {
    TYPE_TO_RAW_COLOR =
      theme.global.current.value.dark === true
        ? { ...TYPE_TO_RAW_COLOR_DARK }
        : { ...TYPE_TO_RAW_COLOR_LIGHT }
    TYPE_TO_FONT_COLOR =
      theme.global.current.value.dark === true
        ? { ...TYPE_TO_FONT_COLOR_DARK }
        : { ...TYPE_TO_FONT_COLOR_LIGHT }
  }
)
</script>

<template>
  <!-- no HGNC symbol => display loader -->
  <template v-if="!hgncSymbol">
    <v-skeleton-loader class="mt-3 mx-auto border" type="heading,subtitle,text,text" />
  </template>

  <!-- otherwise, display actual card -->
  <template v-else>
    <v-card>
      <v-card-title class="pb-0 pr-2">
        Literature
        <DocsLink anchor="literature" />
      </v-card-title>
      <v-card-subtitle class="text-overline"> Top results from PubTator 3 </v-card-subtitle>
      <v-card-text class="pt-3">
        <v-alert v-if="errorMessage" type="error" dismissible>
          {{ errorMessage }}
        </v-alert>
        <div v-if="!errorMessage && !queryResults" class="text-center">
          <v-progress-circular indeterminate />
        </div>
        <div v-else>
          <div
            v-for="(entry, idx) in queryResults"
            :key="idx"
            :class="{ 'mt-3 pt-3 border-top': idx > 0 }"
          >
            <span>
              #{{ idx + 1 }}
              &middot;
              <a :href="`https://pubmed.ncbi.nlm.nih.gov/${entry.pmid}/`" target="_blank">
                {{ entry.pmid }}
                <small><v-icon>mdi-launch</v-icon></small>
              </a>
              &middot;
              {{ entry.journal }}
              &middot;
              {{ DateTime.fromISO(entry.date).toFormat('yyyy/MM/dd') }}
            </span>

            <div v-for="(passage, innerIdx) in entry.passages" :key="innerIdx">
              <div v-if="passage.infons?.type === 'title'">
                <div class="text-h6">
                  <!-- eslint-disable vue/no-v-html -->
                  <span
                    v-if="!!passage.text && passage.offset !== undefined"
                    v-html="
                      highlight(passage.text, extractPassageAnnotations(passage), passage.offset)
                    "
                  />
                  <!-- eslint-enable -->
                </div>
                <div
                  class="text-body-2"
                  :class="{
                    'text-grey-lighten-1': theme.global.current.value.dark,
                    'text-grey-darken-1': !theme.global.current.value.dark
                  }"
                >
                  {{ entry.authors.join(', ') }}
                </div>
              </div>
              <div v-else-if="passage.infons?.type === 'abstract'">
                <div class="text-body-2">
                  <!-- eslint-disable vue/no-v-html -->
                  <span
                    v-if="!!passage.text && passage.offset !== undefined"
                    v-html="
                      highlight(passage.text, extractPassageAnnotations(passage), passage.offset)
                    "
                  />
                  <!-- eslint-enable -->
                </div>
              </div>
            </div>

            <div v-if="extractAnnotations(entry).length > 0">
              <template v-for="(annotation, idxInner) in extractAnnotations(entry)" :key="idxInner">
                <v-chip
                  :text="annotation.name"
                  :title="`'${annotation.text}' (${annotation.biotype})`"
                  :color="TYPE_TO_CHIP_COLOR[annotation.biotype]"
                  class="mt-3"
                  :class="{ 'ml-1': idxInner > 0 }"
                />
              </template>
            </div>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          :append-icon="showAllResults ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showAllResults = !showAllResults"
        >
          {{ showAllResults ? 'Show less' : 'Show more' }}
        </v-btn>
        <v-btn
          :href="`https://www.ncbi.nlm.nih.gov/research/pubtator3/docsum?text=@GENE_${hgncSymbol}`"
          target="_blank"
          prepend-icon="mdi-launch"
        >
          PubTator 3
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
</template>

<style scoped>
.border-top {
  border-top: 1px solid #bbb;
}
</style>
