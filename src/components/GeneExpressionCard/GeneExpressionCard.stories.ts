import type { Meta, StoryObj } from '@storybook/vue3'

import { GenesGeneInfoRecord } from '@/ext/annonars-api/src/lib'

import geneInfoBrca1Json from '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'
import geneInfoTgdsJson from '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'
import GeneExpressionCard from './GeneExpressionCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

const geneInfoTgds = geneInfoTgdsJson as GenesGeneInfoRecord
const geneInfoBrca1 = geneInfoBrca1Json as GenesGeneInfoRecord

const meta = {
  title: 'Gene/GeneExpressionCard',
  component: GeneExpressionCard,
  tags: ['autodocs'],
  argTypes: {
    geneSymbol: { control: 'text' },
    expressionRecords: { control: 'object' },
    ensemblGeneId: { control: 'text' }
  },
  args: {
    geneSymbol: geneInfoBrca1.hgnc!.symbol,
    expressionRecords: geneInfoBrca1.gtex!.records,
    ensemblGeneId: geneInfoBrca1.hgnc!.ensembl_gene_id!
  }
} satisfies Meta<typeof GeneExpressionCard>

export default meta
type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    geneSymbol: geneInfoTgds.hgnc!.symbol,
    expressionRecords: geneInfoTgds.gtex!.records,
    ensemblGeneId: geneInfoTgds.hgnc!.ensembl_gene_id!
  }
}

export const BRCA1: Story = {
  args: {
    geneSymbol: geneInfoBrca1.hgnc!.symbol,
    expressionRecords: geneInfoBrca1.gtex!.records,
    ensemblGeneId: geneInfoBrca1.hgnc!.ensembl_gene_id!
  }
}

export const UndefinedGeneSymbol: Story = {
  args: {
    ensemblGeneId: undefined
  }
}
