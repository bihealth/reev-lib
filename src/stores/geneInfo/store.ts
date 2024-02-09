/**
 * Store for gene details.
 *
 * This includes the data retrieved from the APIs.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { AnnonarsClient } from '../../api/annonars'
import { MehariClient } from '../../api/mehari'
import { type HpoTerm, VigunoClient } from '../../api/viguno'
import { type GenomeBuild } from '../../lib/genomeBuilds'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { GenomeBuild as MehariGenomeBuild, Transcript } from '../../pbs/mehari/txs'
import { StoreState } from '../types'

export const useGeneInfoStore = defineStore('geneInfo', () => {
  /** The current store state. */
  const storeState = ref<StoreState>(StoreState.Initial)

  /** The current gene query. */
  const hgncId = ref<string | undefined>(undefined)

  /** The retrieved gene data from annonars. */
  const geneInfo = ref<GeneInfoRecord | undefined>(undefined)

  /** The HPO terms retrieved from viguno. */
  const hpoTerms = ref<HpoTerm[]>([])

  /** ClinVar gene-related information from annoars. */
  const geneClinvar = ref<ClinvarPerGeneRecord | undefined>(undefined)

  /** Transcript information from dotty (unless dotty API not available). */
  const transcripts = ref<Transcript[] | undefined>(undefined)

  function clearData() {
    storeState.value = StoreState.Initial
    hgncId.value = undefined
    geneInfo.value = undefined
    geneClinvar.value = undefined
    transcripts.value = undefined
  }

  const initialize = async (hgncIdQuery: string, genomeBuild: GenomeBuild) => {
    // Do not re-load data if the gene symbol is the same
    if (hgncIdQuery === hgncId.value) {
      return
    }

    // Clear against artifact
    clearData()

    // Load data via API
    storeState.value = StoreState.Loading
    try {
      const annonarsClient = new AnnonarsClient()
      const data = await annonarsClient.fetchGeneInfo(hgncIdQuery)
      geneInfo.value = undefined
      for (const gene of data.genes) {
        if (gene.hgnc!.hgncId === hgncIdQuery) {
          geneInfo.value = gene
          break
        }
      }
      if (geneInfo.value === undefined) {
        throw new Error(`No gene data found for HGNC ID ${hgncIdQuery}`)
      }

      try {
        geneClinvar.value = await annonarsClient.fetchGeneClinvarInfo(hgncIdQuery)
      } catch (e) {
        throw new Error(`No gene clinvar data found: ${e}`)
      }

      const vigunoClient = new VigunoClient()
      const hpoTermsData = await vigunoClient.fetchHpoTermsForHgncId(hgncIdQuery)
      if (hpoTermsData === null) {
        throw new Error('Problem querying HPO terms data.')
      }
      hpoTerms.value = hpoTermsData.result

      hgncId.value = hgncIdQuery
      storeState.value = StoreState.Active

      const mehariClient = new MehariClient()
      const transcriptsData = await mehariClient.retrieveGeneTranscripts(
        hgncIdQuery,
        genomeBuild === 'grch37'
          ? MehariGenomeBuild.GENOME_BUILD_GRCH37
          : MehariGenomeBuild.GENOME_BUILD_GRCH38
      )
      transcripts.value = transcriptsData.transcripts ?? undefined
    } catch (e) {
      console.error('There was an error loading the gene data.', e)
      clearData()
      storeState.value = StoreState.Error
    }
  }

  return {
    storeState,
    hgncId,
    geneInfo,
    geneClinvar,
    hpoTerms,
    transcripts,
    initialize,
    clearData
  }
})
