/**
 * Store for variant details.
 *
 * This includes the data retrieved from the APIs.
 */
import equal from 'fast-deep-equal'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { AnnonarsClient, SeqvarInfoResult } from '../../api/annonars'
import { MehariClient, SeqvarResultEntry } from '../../api/mehari'
import { type HpoTerm, VigunoClient } from '../../api/viguno'
import { type Seqvar } from '../../lib/genomicVars'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { StoreState } from '../../store'

export const useSeqvarInfoStore = defineStore('seqvarInfo', () => {
  /** The current store state. */
  const storeState = ref<StoreState>(StoreState.Initial)

  /** The Seqvar that the previous record has been retrieved for. */
  const seqvar = ref<Seqvar | undefined>(undefined)

  /** Variant-related information from annonars. */
  const varAnnos = ref<SeqvarInfoResult | undefined>(undefined)

  /** ClinVar gene-related information from annoars. */
  const geneClinvar = ref<ClinvarPerGeneRecord | undefined>(undefined)

  /** Information about related gene. */
  const geneInfo = ref<GeneInfoRecord | undefined>(undefined)

  /** The HPO terms retrieved from viguno. */
  const hpoTerms = ref<HpoTerm[]>([])

  /** Transcript consequence information from mehari. */
  const txCsq = ref<SeqvarResultEntry[] | undefined>(undefined)

  /** Promise for initialization of the store. */
  const initializeRes = ref<Promise<any> | undefined>(undefined)

  /** Clear all data in the store. */
  const clearData = () => {
    storeState.value = StoreState.Initial
    seqvar.value = undefined
    varAnnos.value = undefined
    txCsq.value = undefined
    geneInfo.value = undefined
    geneClinvar.value = undefined
  }

  /**
   * Initialize and oad data from the server.
   *
   * @param seqvar$ The sequence variant to use for the query.
   * @param forceReload Whether to force-reload in case the variant is the same.
   * @returns
   */
  const initialize = async (seqvar$: Seqvar, forceReload: boolean = false) => {
    // Protect against loading multiple times.
    if (!forceReload && storeState.value !== StoreState.Initial && equal(seqvar$, seqvar.value)) {
      return initializeRes.value
    }

    // Clear against artifact
    clearData()

    // Load data via API
    storeState.value = StoreState.Loading
    const annonarsClient = new AnnonarsClient()
    const mehariClient = new MehariClient()
    const vigunoClient = new VigunoClient()
    let hgncId = ''

    // Retrieve variant information from annonars and mehari.
    initializeRes.value = Promise.all([
      annonarsClient.fetchVariantInfo(seqvar$).then((data) => {
        varAnnos.value = data.result
      }),
      mehariClient.retrieveSeqvarsCsq(seqvar$).then((data) => {
        txCsq.value = data.result ?? []
      })
    ])
      .then((): Promise<any> => {
        if (txCsq.value !== undefined && txCsq.value.length !== 0) {
          hgncId = txCsq.value[0].geneId
          return Promise.all([
            annonarsClient.fetchGeneInfo(hgncId).then((data) => {
              for (const gene of data.genes) {
                if (gene.hgnc!.hgncId === hgncId) {
                  geneInfo.value = gene
                }
              }
            }),
            annonarsClient.fetchGeneClinvarInfo(hgncId).then((data) => {
              geneClinvar.value = data
            }),
            vigunoClient.fetchHpoTermsForHgncId(hgncId).then((data) => {
              if (!data.results.length) {
                throw new Error('No HPO terms found.')
              }
              hpoTerms.value = data.results
            })
          ])
        } else {
          return Promise.resolve()
        }
      })
      .then(() => {
        seqvar.value = seqvar$
        storeState.value = StoreState.Active
      })
      .catch((err) => {
        console.error('There was an error loading the variant data.', err)
        clearData()
        storeState.value = StoreState.Error
      })

    return initializeRes.value
  }

  return {
    initializeRes,
    storeState,
    seqvar,
    varAnnos,
    geneClinvar,
    geneInfo,
    hpoTerms,
    txCsq,
    initialize,
    clearData
  }
})
