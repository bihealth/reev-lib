import fs from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'

import { setupMountedComponents } from '../../lib/testUtils'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import ClinvarImpact from './ClinvarImpact.vue'

// Load fixture data for gene TGDS (little data) and BRCA1 (lots of data).
const clinvarPerGeneTgds = ClinvarPerGeneRecord.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.clinvarPerGene.TGDS.json'), 'utf8')
)
const clinvarPerGeneBrca1 = ClinvarPerGeneRecord.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.clinvarPerGene.BRCA1.json'), 'utf8')
)

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
