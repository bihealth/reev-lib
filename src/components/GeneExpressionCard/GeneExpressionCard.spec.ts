import { describe, expect, it, vi } from 'vitest'

import { setupMountedComponents } from '../../lib/testUtils'
import { GtexTissueRecord } from '../../pbs/annonars/genes/base'
import GeneExpressionCard from './GeneExpressionCard.vue'

// A few GtexTissueRecords as test data
const fixtureGtexTissueRecords = [
  {
    tissue: 'GTEX_TISSUE_ADIPOSE_TISSUE',
    tissueDetailed: 'GTEX_TISSUE_DETAILED_ADIPOSE_SUBCUTANEOUS',
    tpms: [7.357, 12.695, 14.5, 16.74, 31.88]
  },
  {
    tissue: 'GTEX_TISSUE_ADIPOSE_TISSUE',
    tissueDetailed: 'GTEX_TISSUE_DETAILED_ADIPOSE_VISCERAL_OMENTUM',
    tpms: [1.562, 12.45, 15.63, 19.15, 31.99]
  },
  {
    tissue: 'GTEX_TISSUE_ADRENAL_GLAND',
    tissueDetailed: 'GTEX_TISSUE_DETAILED_ADRENAL_GLAND',
    tpms: [2.171, 10.375, 12.23, 14.1975, 32.68]
  }
].map((record) => GtexTissueRecord.fromJson(record))

describe.concurrent('GeneExpressionCard', async () => {
  it('renders the GeneExpressionCard with data', async () => {
    // arrange:
    // Disable warinings, because of invalid test data
    console.warn = vi.fn()
    const { wrapper } = await setupMountedComponents(
      { component: GeneExpressionCard },
      {
        props: {
          geneSymbol: 'BRCA1',
          expressionRecords: fixtureGtexTissueRecords,
          ensemblGeneId: 'ENSG00000012048'
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('Tissue-Specific Gene Expression from GTeX')
    const vegaPlot = wrapper.findComponent({ name: 'VegaPlot' })
    expect(vegaPlot.exists()).toBe(true)
    // Find gtex linkout
    const gtexLink = wrapper.find('#expression-card-gtex-portal')
    expect(gtexLink.exists()).toBe(true)
    expect(gtexLink.attributes('href')).toBe('https://gtexportal.org/home/gene/ENSG00000012048')
  })

  it('renders skelleton loader if ENSEMBL gene ID is undefined', async () => {
    // arrange:
    // Disable warinings, because of invalid test data
    console.warn = vi.fn()
    const { wrapper } = await setupMountedComponents(
      { component: GeneExpressionCard },
      {
        props: {
          geneSymbol: 'BRCA1',
          expressionRecords: fixtureGtexTissueRecords,
          ensemblGeneId: undefined
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).not.toContain('Tissue-Specific Gene Expression from GTeX')
    const vegaPlot = wrapper.findComponent({ name: 'VegaPlot' })
    expect(vegaPlot.exists()).toBe(false)
    // Find VSkeletonLoader
    const skeletonLoader = wrapper.findComponent({ name: 'VSkeletonLoader' })
    expect(skeletonLoader.exists()).toBe(true)
  })

  it('does not blow up with undefined data', async () => {
    // arrange:
    // Disable warinings, because of invalid test data
    console.warn = vi.fn()
    const { wrapper } = await setupMountedComponents(
      { component: GeneExpressionCard },
      {
        props: {
          geneSymbol: 'BRCA1',
          expressionRecords: undefined,
          ensemblGeneId: 'ENSG00000012048'
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('Tissue-Specific Gene Expression from GTeX')
    const vegaPlot = wrapper.findComponent({ name: 'VegaPlot' })
    expect(vegaPlot.exists()).toBe(true)
    // Find gtex linkout
    const gtexLink = wrapper.find('#expression-card-gtex-portal')
    expect(gtexLink.exists()).toBe(true)
    expect(gtexLink.attributes('href')).toBe('https://gtexportal.org/home/gene/ENSG00000012048')
  })
})
