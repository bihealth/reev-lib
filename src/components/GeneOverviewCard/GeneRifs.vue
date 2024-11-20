<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { GenesNcbiRecord, GenesRifEntry } from '@/ext/annonars-api/src/lib';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    /** NCBI information to use for display */
    ncbi?: GenesNcbiRecord
  }>()

// The data to display.
const items = ref<GenesRifEntry[]>([])

// Initialize `items`.
const initializeItems = () => {
  if (props.ncbi?.rif_entries?.length) {
    items.value = props.ncbi.rif_entries.slice(0, 10)
  }
}

// Initialize items on mounted and change of `ncbi.rif_entries`.
onMounted(initializeItems)
watch(() => props.ncbi?.rif_entries, initializeItems)

// Load more items.
type Done = (status: 'error' | 'loading' | 'empty' | 'ok') => void
type LoadItemsArgs = { done: Done }
const loadItems = async ({ done }: LoadItemsArgs) => {
  if (props.ncbi?.rif_entries?.length) {
    if (items.value.length === props.ncbi.rif_entries.length) {
      done('empty')
    } else {
      setTimeout(() => {
        const nextItems = (props.ncbi?.rif_entries ?? []).slice(
          items.value.length,
          items.value.length + 10
        )
        items.value = items.value.concat(nextItems)
        done('ok')
      }, 1000)
    }
  }
}
</script>

<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column">
      <div class="text-subtitle-1">
        NCBI References Into Function
        <small>({{ ncbi?.rif_entries?.length ?? 0 }})</small>
      </div>
    </div>
    <div v-if="ncbi?.rif_entries?.length" class="d-flex flex-column flex-grow-1">
      <v-infinite-scroll :height="200" style="font-size: 90%" :items="items" @load="loadItems">
        <template v-for="(item, index) in items" :key="index">
          <div v-if="item?.text?.length">
            {{ item.text }}
            <a
              :href="'https://www.ncbi.nlm.nih.gov/pubmed/?term=' + item.pmids.join('+')"
              target="_blank"
            >
              <v-icon>mdi-launch</v-icon>
              PubMed
            </a>
          </div>
        </template>

        <template #empty>
          <template v-if="items.length === 0">No GeneRIFs available for gene </template>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>
