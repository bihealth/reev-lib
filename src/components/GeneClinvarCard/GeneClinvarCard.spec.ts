import fs from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'

import { GenesClinvarPerGeneRecord } from '../../ext/annonars-api/src/lib'
import { setupMountedComponents } from '../../lib/testUtils'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { GeneTranscriptsResponse } from '../../pbs/mehari/server'
import { type Transcript } from '../../pbs/mehari/txs'
import GeneClinvarCard from './GeneClinvarCard.vue'

// Load fixture data for gene TGDS (little data) and BRCA1 (lots of data).
const geneInfoTgds = GeneInfoRecord.fromJsonString(
  fs.readFileSync(
    path.resolve(__dirname, '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'),
    'utf8'
  )
)
const geneInfoBrca1 = GeneInfoRecord.fromJsonString(
  fs.readFileSync(
    path.resolve(__dirname, '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'),
    'utf8'
  )
)
const clinvarPerGeneTgds = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.clinvarPerGene.TGDS.json'), 'utf8')
) as GenesClinvarPerGeneRecord
const clinvarPerGeneBrca1 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.clinvarPerGene.BRCA1.json'), 'utf8')
) as GenesClinvarPerGeneRecord
const genesTxsTgds37 = GeneTranscriptsResponse.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.genesTxs.TGDS.37.json'), 'utf8')
)
const genesTxsTgds38 = GeneTranscriptsResponse.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.genesTxs.TGDS.38.json'), 'utf8')
)
const genesTxsBrca137 = GeneTranscriptsResponse.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.genesTxs.BRCA1.37.json'), 'utf8')
)

describe.concurrent('GeneClinvarCard.vue', async () => {
  test.each([
    ['TGDS', 'grch37', genesTxsTgds37.transcripts, clinvarPerGeneTgds, geneInfoTgds],
    ['TGDS', 'grch38', genesTxsTgds38.transcripts, clinvarPerGeneTgds, geneInfoBrca1],
    ['BRCA1', 'grch37', genesTxsBrca137.transcripts, clinvarPerGeneBrca1, geneInfoBrca1]
  ])(
    'renders the GeneClinvarCard for %s, %s',
    async (
      _geneSymbol: string,
      genomeBuild: string,
      transcripts: Transcript[],
      clinvarPerGene: GenesClinvarPerGeneRecord,
      geneInfo: GeneInfoRecord
    ) => {
      // arrange:
      const { wrapper } = await setupMountedComponents(
        { component: GeneClinvarCard, shallow: true, stubs: { GeneClinvarCard: false } },
        {
          props: {
            clinvarPerGene,
            geneInfo,
            genomeBuild,
            transcripts
          }
        }
      )

      // act: nothing, only test rendering

      // assert:
      expect(wrapper.text()).toContain('ClinVar Information')
      const clinvarImpact = wrapper.findComponent({ name: 'ClinvarImpact' })
      expect(clinvarImpact.exists()).toBe(true)
      const variationLandscape = wrapper.findComponent({ name: 'VariationLandscapePlotly' })
      expect(variationLandscape.exists()).toBe(true)
      const clinvarFreqPlot = wrapper.findComponent({ name: 'ClinvarFreqPlot' })
      expect(clinvarFreqPlot.exists()).toBe(true)
    }
  )
})
