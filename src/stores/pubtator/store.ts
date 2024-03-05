/**
 * Store wrapping the PubTator access.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { PubtatorClient } from '../../api/pubtator'
import { StoreState } from '../types'
import { type SearchResults } from './types'

export const usePubtatorStore = defineStore('pubtator', () => {
  /** The current store state. */
  const storeState = ref<StoreState>(StoreState.Initial)

  /** The HGNC symbol currently loaded for. */
  const hgncSymbol = ref<string | undefined>(undefined)

  /** Detailed result information. */
  const searchResults = ref<SearchResults>({})

  /**
   * Initialize the store for the given HGNC symbol.
   *
   * @param hgncSymbol$ HGNC symbol to initialize the store for.
   * @param force Whether to force re-initialization.
   * @throws Error if the search fails.
   */
  const initialize = async (hgncSymbol$?: string, force: boolean = false) => {
    // Skip if already loaded
    if (!force && hgncSymbol$ === hgncSymbol.value) {
      return
    }

    // Clear against artifacts.
    clearData()

    storeState.value = StoreState.Loading

    // Bail out if no HGNC symbol is available.
    if (!hgncSymbol$) {
      storeState.value = StoreState.Active
      return
    }

    // "Just" lookup via PubTator client.
    const client = new PubtatorClient()
    try {
      searchResults.value = await client.performSearch(hgncSymbol$)
      storeState.value = StoreState.Active
    } catch (err) {
      storeState.value = StoreState.Error
      throw new Error(`Error running PubTator 3 search: ${err}`)
    }
  }

  /** Clear the store. */
  const clearData = () => {
    storeState.value = StoreState.Initial
    hgncSymbol.value = undefined
    searchResults.value = {}
  }

  /** The current gene Ranking. */
  return {
    storeState,
    hgncSymbol,
    searchResults,
    initialize,
    clearData
  }
})
