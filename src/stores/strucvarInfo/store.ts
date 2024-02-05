/**
 * Store for variant details.
 *
 * This includes the data retrieved from the APIs.
 */
import equal from 'fast-deep-equal'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { StoreState } from '..'
import { AnnonarsClient } from '../../api/annonars'
import { MehariClient } from '../../api/mehari'
import { GeneTranscriptEffects } from '../../api/mehari/types'
import { type Strucvar } from '../../lib/genomicVars'
import { ResponseRecord as ClinvarStrucvarResponseRecord } from '../../pbs/annonars/clinvar/sv'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'

export const useStrucvarInfoStore = defineStore('strucvarInfo', () => {
  /** The current store state. */
  const storeState = ref<StoreState>(StoreState.Initial)

  /** The current SV record. */
  const strucvar = ref<Strucvar | undefined>(undefined)

  /** The consequences of the `currentStrucvar` */
  const csq = ref<GeneTranscriptEffects[] | undefined>(undefined)

  /** Infos on the variants of the record. */
  const genesInfos = ref<GeneInfoRecord[] | undefined>(undefined)

  /** The ClinVar SV records. */
  const clinvarSvRecords = ref<ClinvarStrucvarResponseRecord[] | undefined>(undefined)

  function clearData() {
    storeState.value = StoreState.Initial
    csq.value = undefined
    strucvar.value = undefined
    genesInfos.value = undefined
  }

  /**
   * Initialize and load data from the server.
   *
   * @param strucvar$ The structural variant to use for the query.
   * @param forceReload Whether to force-reload in case the variant is the same.
   */
  const initialize = async (strucvar$: Strucvar, forceReload: boolean = false) => {
    // Protect against loading multiple times.
    if (
      !forceReload &&
      storeState.value !== StoreState.Initial &&
      equal(strucvar$, strucvar.value)
    ) {
      return
    }

    // Clear old store contents
    clearData()

    // Load data via API
    storeState.value = StoreState.Loading
    const annonarsClient = new AnnonarsClient()
    const mehariClient = new MehariClient()
    try {
      // Fetch SV record
      const mehariResult = await mehariClient.retrieveStrucvarsCsq(strucvar$)
      // Fetch ClinVar SV records
      const { records: responseRecords } = await annonarsClient.fetchClinvarStrucvars(strucvar$)
      clinvarSvRecords.value = responseRecords ?? []

      // Fetch gene infos
      const hgncIds = []
      for (const txEffect of mehariResult.result) {
        if (txEffect.hgncId) {
          hgncIds.push(txEffect.hgncId)
        }
      }
      if (hgncIds.length) {
        genesInfos.value = await annonarsClient.fetchGeneInfos(hgncIds)
      } else {
        genesInfos.value = []
      }

      // Sort by gene symbol
      genesInfos.value!.sort((a, b) =>
        (a?.hgnc!.hgncId ?? 'ZZZ').localeCompare(b?.hgnc!.hgncId ?? 'ZZZ')
      )

      csq.value = mehariResult.result
      strucvar.value = strucvar$
      storeState.value = StoreState.Active
    } catch (e) {
      console.error('There was an error loading the SV data.', e)
      storeState.value = StoreState.Error
    }
  }

  return {
    storeState,
    strucvar,
    csq,
    genesInfos,
    clinvarSvRecords,
    clearData,
    initialize
  }
})
