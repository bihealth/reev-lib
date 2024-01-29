import fs from 'fs'
import path from 'path'
import { describe, expect, it, test } from 'vitest'

import { setupMountedComponents } from '../../lib/testUtils'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import GeneOverviewCard from './GeneOverviewCard.vue'

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

describe.concurrent('OverviewCard', async () => {
  test.each([
    ['TGDS', geneInfoTgds],
    ['BRCA1', geneInfoBrca1]
  ])(
    'renders the OverviewCard information for %s',
    async (geneSymbol: string, geneInfo: GeneInfoRecord) => {
      // arrange:
      const { wrapper } = await setupMountedComponents(
        { component: GeneOverviewCard },
        {
          props: {
            geneInfo
          }
        }
      )

      // act: nothing, only test rendering

      // assert:
      expect(wrapper.text()).toContain(geneSymbol)
    }
  )

  it('expands the OverviewCard information (BRCA1)', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: GeneOverviewCard },
      {
        props: {
          geneInfo: geneInfoBrca1
        }
      }
    )

    // act:
    expect(wrapper.text()).not.toContain('Alternative Identifiers') // guard
    const expandButton = wrapper.find('#overview-card-expand-button')
    expect(expandButton.exists()).toBe(true)
    await expandButton.trigger('click')

    // assert:
    expect(wrapper.text()).toContain('Alternative Identifiers')
    expect(wrapper.text()).toContain('External Resources')
    expect(wrapper.text()).toContain('Locus-Specific Databases')
    expect(wrapper.text()).toContain('NCBI References Into Function')
  })

  it('expands the OverviewCard information (TGDS)', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: GeneOverviewCard },
      {
        props: {
          geneInfo: geneInfoTgds
        }
      }
    )

    // act:
    expect(wrapper.text()).not.toContain('Alternative Identifiers') // guard
    const expandButton = wrapper.find('#overview-card-expand-button')
    expect(expandButton.exists()).toBe(true)
    await expandButton.trigger('click')

    // assert:
    expect(wrapper.text()).toContain('Alternative Identifiers')
    expect(wrapper.text()).toContain('External Resources')
    expect(wrapper.text()).toContain('Locus-Specific Databases')
    expect(wrapper.text()).toContain('NCBI References Into Function')
  })
})
