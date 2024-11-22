import fs from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'

import { setupMountedComponents } from '../../lib/testUtils'
import { GenesClinvarPerGeneRecord } from '../../ext/annonars-api/src/lib'
import ClinvarImpact from './ClinvarImpact.vue'

// Load fixture data for gene TGDS (little data) and BRCA1 (lots of data).
const clinvarPerGeneTgds = JSON.parse(fs.readFileSync(path.resolve(__dirname, './fixture.clinvarPerGene.TGDS.json'), 'utf8')) as GenesClinvarPerGeneRecord
const clinvarPerGeneBrca1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, './fixture.clinvarPerGene.BRCA1.json'), 'utf8')) as GenesClinvarPerGeneRecord

describe.concurrent('ClinvarImpact.vue', async () => {
  test.each([
    ['TGDS', clinvarPerGeneTgds],
    ['BRCA1', clinvarPerGeneBrca1]
  ])(
    'renders the ClinvarImpact information for %s.',
    async (geneSymbol: string, clinvarPerGene: ClinvarPerGeneRecord) => {
      const _ = geneSymbol
      // arrange:
      const { wrapper } = await setupMountedComponents(
        { component: ClinvarImpact },
        {
          props: {
            clinvarPerGene
          }
        }
      )

      // act: nothing, only test rendering

      // assert:
      expect(wrapper.text()).toContain('Impact Counts')
    }
  )
})
