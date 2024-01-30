<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onMounted } from 'vue'

import DocsLink from '../DocsLink/DocsLink.vue'
import GeneListEntry from './GeneListEntry.vue'
import { type Strucvar } from '../../lib/genomicVars'
import { StoreState } from '../../store'
import type { GeneTranscriptEffects, TranscriptEffect } from '../../api/mehari/types'
import { TX_EFFECT_LABELS } from '../../api/mehari/constants'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'

/** This component's props. */
const props = withDefaults(defineProps<{
  /** Strucvar to be displayed for. */
  currentStrucvarRecord?: Strucvar
  /** The consequences to be displayed. */
  csq?: GeneTranscriptEffects[],
  /** Gene info records to list for. */
  genesInfos?: GeneInfoRecord[]
  /** The state of the store that we display for. */
  storeState?: StoreState
  /** The HGNC ID of the selected gene. */
  selectedGeneHgncId?: string
}>(), {
  currentStrucvarRecord: undefined,
  csq: undefined,
  genesInfos: undefined,
  storeState: StoreState.Initial,
  selectedGeneHgncId: undefined
})

/** This component's emits. */
const emit = defineEmits(['update:selectedGeneHgncId'])

/** Available items per page. */
const itemsPerPageChoices = [5, 10, 20, 50]
/** Items per page for data iterator. */
const itemsPerPage = ref<number>(10)
/** Current page. */
const currentPage = ref<number>(1)

/** Whether the list of genes is currently loading. */
const isLoading = computed<boolean>(() => {
  return (
    props.storeState === undefined ||
    [StoreState.Initial, StoreState.Loading].includes(props.storeState)
  )
})


/** Helper mapping from gene HGNC ID to worst transcript effect. */
const hgncToEffect = computed<{ [key: string]: string }>(() => {
  const hgncToEffect: { [key: string]: string } = {}
  for (const result of props.csq ?? []) {
    const txEffect = result.transcriptEffects[0]
    if (txEffect) {
      hgncToEffect[result.hgncId] = TX_EFFECT_LABELS[txEffect]
    }
  }
  return hgncToEffect
})

/** `v-model` for the selected effect */
// TODO: also display regions and filter
/** `v-model` for the sort key, order */
const sortKey = ref<string>('hgnc.symbol')
const sortOrder = ref<'asc' | 'desc'>('asc')
const sortItems = [
  {
    label: 'symbol',
    key: 'hgnc.symbol'
  },
  {
    label: 'ClinGen Haplo.',
    key: 'clingen.haploinsufficiencyScore'
  },
  {
    label: 'ClinGen Triplo.',
    key: 'clingen.triplosensitivityScore'
  },
  {
    label: 'gnomAD pLI',
    key: 'gnomadConstraints.pli'
  },
  {
    label: 'gnomAD LOEUF',
    key: 'gnomadConstraints.oeLofUpper'
  },
  {
    label: 'DECIPHER HI',
    key: 'decipherHi.pHi'
  },
  {
    label: 'RCNV pHaplo',
    key: 'rcnv.pHaplo'
  },
  {
    label: 'RCNV pTriplo',
    key: 'rcnv.pTriplo'
  }
]

/** Custom key sorting, undefined is `+infinity` */
const _sortNumberNaGreater = (a: number | undefined, b: number | undefined): number => {
  if (a === undefined && b === undefined) {
    return 0
  } else if (a === undefined) {
    return 1
  } else if (b === undefined) {
    return -1
  } else {
    return a - b
  }
}

/** Custom key sorting, undefined is `-infinity` */
const _sortNumberNaLess = (a: number | undefined, b: number | undefined): number => {
  if (a === undefined && b === undefined) {
    return 0
  } else if (a === undefined) {
    return -1
  } else if (b === undefined) {
    return 1
  } else {
    return a - b
  }
}
type DataTableCompareFunction<T = any> = (a: T, b: T) => number
const customKeySort: { [key: string]: DataTableCompareFunction } = {
  'gnomadConstraints.pli': _sortNumberNaGreater,
  'gnomadConstraints.oeLofUpper': _sortNumberNaGreater,
  'decipherHi.pHi': _sortNumberNaLess,
  'rcnv.pHaplo': _sortNumberNaLess,
  'rcnv.pTriplo': _sortNumberNaLess
}

/** State for selected item in iterator */
const selectedItems = computed<any[]>({
  get() {
    return [props.selectedGeneHgncId]
  },
  set(arr) {
    emit('update:selectedGeneHgncId', arr[0])
  }
})

/** Select first element in iterator */
const selectFirst = (storeState: StoreState | undefined) => {
  if (storeState === StoreState.Active && props.genesInfos?.length) {
    selectedItems.value = [props.genesInfos[0].hgnc!.hgncId]
  }
}

/** Watch store for state change to active */
watch(
  () => props.storeState,
  (newStoreState) => selectFirst(newStoreState)
)

/** Select first on being mounted if the store is already active */
onMounted(() => selectFirst(props.storeState))
</script>

<template>
  <v-card>
    <v-card-title class="pb-0 pr-2">
      Gene List
      <DocsLink anchor="gene-list" />
    </v-card-title>
    <v-card-subtitle class="text-overline"> Overlapping and Contained Genes </v-card-subtitle>
    <v-card-text>
      <v-data-iterator
        v-model="selectedItems"
        v-model:items-per-page="itemsPerPage"
        :items="genesInfos"
        item-value="hgnc.agr"
        :loading="isLoading"
        :page="currentPage"
        :sort-by="[{ key: sortKey, order: sortOrder }]"
        :custom-key-sort="customKeySort"
        :must-sort="true"
        select-strategy="single"
        loading-text="foo"
        buttons-pagination
        show-index
        item-key="dbnsfp.geneName"
      >
        <template #header>
          <v-toolbar class="px-2 rounded-t-lg border" color="background">
            <v-spacer></v-spacer>
            <div style="width: 220px">
              <v-select
                v-model="sortKey"
                label="sort by"
                item-title="label"
                item-value="key"
                :items="sortItems"
                density="compact"
                :hide-details="true"
                variant="outlined"
              />
            </div>
            <v-btn @click="sortOrder = sortOrder == 'asc' ? 'desc' : 'asc'">
              {{ sortOrder }}
              <v-icon
                :icon="sortOrder == 'asc' ? 'mdi-sort-ascending' : 'mdi-sort-descending'"
                class="pl-3"
              />
            </v-btn>
          </v-toolbar>
        </template>

        <template #default="{ items, isSelected, toggleSelect }">
          <template v-for="item in items" :key="item.raw.hgnc.agr">
            <GeneListEntry
              :item="item"
              :hgnc-to-effect="hgncToEffect"
              :sort-key="sortKey"
              :sort-order="sortOrder"
              :is-selected="isSelected(item as any)"
              :genome-build="currentStrucvarRecord?.genomeBuild ?? 'grch37'"
              @toggle-selected="() => toggleSelect(item as any)"
            />
          </template>
        </template>
        <template #no-data>
          <template v-if="isLoading">
            <v-skeleton-loader class="mt-3 mx-auto border" type="heading,subtitle" />
            <v-skeleton-loader class="mt-3 mx-auto border" type="heading,subtitle" />
            <v-skeleton-loader class="mt-3 mx-auto border" type="heading,subtitle" />
          </template>
          <template v-else>
            <v-sheet class="pa-3 text-center font-italic border"> No overlapping gene. </v-sheet>
          </template>
        </template>

        <template #footer="{ pageCount }">
          <v-toolbar
            class="d-flex align-center justify-center pa-3 mt-1 rounded-b-lg border"
            color="background"
          >
            <v-spacer />
            <v-select
              v-model="itemsPerPage"
              class="d-inline-flex flex-grow-0"
              label="page size"
              :items="itemsPerPageChoices"
              variant="outlined"
              density="compact"
              :hide-details="true"
            ></v-select>
            <v-pagination
              v-model="currentPage"
              :length="pageCount"
              :total-visible="7"
              density="compact"
            ></v-pagination>
          </v-toolbar>
        </template>
      </v-data-iterator>
    </v-card-text>
  </v-card>
</template>
