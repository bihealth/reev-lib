import fs from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'

import { setupMountedComponents } from '../../lib/testUtils'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { SearchResults } from '../../store/pubtator'
import { StoreState } from '../../store/types'
import GeneLiteratureCard from './GeneLiteratureCard.vue'

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
const searchResultsTgds = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.pubtatorResults.TGDS.json'), 'utf8')
) as SearchResults
const searchResultsBrca1 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.pubtatorResults.BRCA1.json'), 'utf8')
) as SearchResults

describe.concurrent('GeneLiteratureCard.vue', async () => {
  test.each([
    ['BRCA1', geneInfoBrca1, searchResultsBrca1],
    ['TGDS', geneInfoTgds, searchResultsTgds]
  ])(
    'renders for gene %s',
    async (hgncSymbol: string, geneInfo: GeneInfoRecord, searchResults: SearchResults) => {
      // arrange:
      const { wrapper } = await setupMountedComponents(
        { component: GeneLiteratureCard },
        {
          props: {
            geneInfo
          },
          initialStoreState: {
            pubtatorStore: {
              storeState: StoreState.Active,
              hgncSymbol,
              searchResults
            }
          }
        }
      )

      // act: nothing, only test rendering

      // assert:
      const vCards = wrapper.findAllComponents({ name: 'VCard' })
      expect(vCards.length).toBe(1)
    }
  )
})
