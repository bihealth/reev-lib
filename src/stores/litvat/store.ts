/**
 * Store wrapping the LitVar access.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { LitVarClient } from '../../api/litvar'
import { StoreState } from '../types'
import { type SearchResults } from './types'

export const useLitVarStore = defineStore('litvar', () => {
  /** The current store state. */
  const storeState = ref<StoreState>(StoreState.Initial)

  /** The Seqvar name currently loaded for. */
  const seqVar = ref<string | undefined>(undefined)

  /** Detailed result information. */
  const searchResults = ref<SearchResults>({})

  /** Initialize the store for the given SeqVar name. */
  const initialize = async (seqVar$?: string, force: boolean = false) => {
    // Skip if already loaded
    if (!force && seqVar$ === seqVar.value) {
      return
    }

    // Clear against artifacts.
    clearData()

    storeState.value = StoreState.Loading

    // Bail out if no SeqVar name is available.
    if (!seqVar$) {
      storeState.value = StoreState.Active
      return
    }

    // "Just" lookup via LitVar client.
    const client = new LitVarClient()
    try {
      searchResults.value = await client.performSearch(seqVar$)
      storeState.value = StoreState.Active
    } catch (err) {
      storeState.value = StoreState.Error
      throw new Error(`Error running LitVar search: ${err}`)
    }
  }

  /** Clear the store. */
  const clearData = () => {
    storeState.value = StoreState.Initial
    seqVar.value = undefined
    searchResults.value = {}
  }

  /** The current gene Ranking. */
  return {
    storeState,
    seqVar,
    searchResults,
    initialize,
    clearData
  }
})