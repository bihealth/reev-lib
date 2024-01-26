import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { setupMountedComponents } from '../../lib/testUtils'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import GenePathogenicityCard from './GenePathogenicityCard.vue'

// Load fixture data for gene TGDS (little data) and BRCA1 (lots of data).
const geneInfoTgds = GeneInfoRecord.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.geneInfo.TGDS.json'), 'utf8')
)
const geneInfoBrca1 = GeneInfoRecord.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.geneInfo.BRCA1.json'), 'utf8')
)

describe.concurrent('GenePathogenicityCard.vue', async () => {
  it('renders correctly with TGDS for certain key aspects', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: GenePathogenicityCard },
      {
        props: {
          geneInfo: geneInfoTgds
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('Gene Pathogenicity')
    expect(wrapper.text()).toContain('Intolerance Constraints and Annotations')
    expect(wrapper.text()).toContain('pLI 0.00')
    expect(wrapper.text()).toContain('LOEUF 1.19')
    expect(wrapper.text()).toContain('Missense o/e (upper) 0.96')
    expect(wrapper.text()).toContain('o/e Z-score 0.82')
    expect(wrapper.text()).toContain('DECIPHER  %HI  N/A')
    expect(wrapper.text()).toContain('sHet0.00pHaplo0.76pTriplo0.33')
    // Find v-sheet components
    const vSheets = wrapper.findAllComponents({ name: 'VSheet' })
    expect(vSheets.length).toBe(3)
  })

  it('renders correctly with BRCA1 for certain key aspects', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: GenePathogenicityCard },
      {
        props: {
          geneInfo: geneInfoBrca1
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('Gene Pathogenicity')
    expect(wrapper.text()).toContain('Intolerance Constraints and Annotations')
    expect(wrapper.text()).toContain('pLI 0.00')
    expect(wrapper.text()).toContain('LOEUF 0.89')
    expect(wrapper.text()).toContain('Missense o/e (upper) 0.90')
    expect(wrapper.text()).toContain('o/e Z-score 2.32')
    expect(wrapper.text()).toContain('DECIPHER  %HI  N/A')
    expect(wrapper.text()).toContain('sHet0.01pHaplo0.28pTriplo0.62')
    // Find v-sheet components
    const vSheets = wrapper.findAllComponents({ name: 'VSheet' })
    expect(vSheets.length).toBe(3)
  })
})
