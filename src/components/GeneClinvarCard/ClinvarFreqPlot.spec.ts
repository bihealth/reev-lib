import fs from 'fs'
import path from 'path'
import { describe, expect, it, test } from 'vitest'

import { setupMountedComponents } from '../../lib/testUtils'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import ClinvarFreqPlot from './ClinvarFreqPlot.vue'

// Load fixture data for gene TGDS (little data) and BRCA1 (lots of data).
const clinvarPerGeneTgds = ClinvarPerGeneRecord.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.clinvarPerGene.TGDS.json'), 'utf8')
)
const clinvarPerGeneBrca1 = ClinvarPerGeneRecord.fromJsonString(
  fs.readFileSync(path.resolve(__dirname, './fixture.clinvarPerGene.BRCA1.json'), 'utf8')
)

describe.concurrent('ClinvarFreqPlot.vue', async () => {
  test.each([
    ['TGDS', clinvarPerGeneTgds],
    ['BRCA1', clinvarPerGeneBrca1]
  ])(
    'renders the ClinvarFreqPlot for %s',
    async (geneSymbol: string, clinvarPerGene: ClinvarPerGeneRecord) => {
      // arrange:
      const { wrapper } = await setupMountedComponents(
        { component: ClinvarFreqPlot },
        {
          props: {
            geneSymbol,
            clinvarPerGene
          }
        }
      )

      // act: nothing, only test rendering

      // assert:
      expect(wrapper.text()).toContain('Impact / Frequency')
      const vegaPlot = wrapper.findComponent({ name: 'VegaPlot' })
      expect(vegaPlot.exists()).toBe(true)
    }
  )

  it('renders VSkeletonLoader when no data is available', async () => {
    const { wrapper } = await setupMountedComponents(
      { component: ClinvarFreqPlot },
      {
        props: {
          geneSymbol: 'TGDS',
          clinvarPerGene: undefined
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    const vegaPlot = wrapper.findComponent({ name: 'VegaPlot' })
    expect(vegaPlot.exists()).toBe(false)
    const skeletonLoader = wrapper.findComponent({ name: 'VSkeletonLoader' })
    expect(skeletonLoader.exists()).toBe(true)
  })
})
