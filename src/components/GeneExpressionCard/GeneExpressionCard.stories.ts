import { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import geneInfoBrca1Json from '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'
import geneInfoTgdsJson from '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'
import GeneExpressionCard from './GeneExpressionCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const geneInfoTgds = GeneInfoRecord.fromJson(geneInfoTgdsJson as JsonValue)
// @ts-ignore
const geneInfoBrca1 = GeneInfoRecord.fromJson(geneInfoBrca1Json as JsonValue)

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
    ensemblGeneId: geneInfoBrca1.hgnc!.ensemblGeneId
  }
} satisfies Meta<typeof GeneExpressionCard>

export default meta
type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    geneSymbol: geneInfoTgds.hgnc!.symbol,
    expressionRecords: geneInfoTgds.gtex!.records,
    ensemblGeneId: geneInfoTgds.hgnc!.ensemblGeneId
  }
}

export const BRCA1: Story = {
  args: {
    geneSymbol: geneInfoBrca1.hgnc!.symbol,
    expressionRecords: geneInfoBrca1.gtex!.records,
    ensemblGeneId: geneInfoBrca1.hgnc!.ensemblGeneId
  }
}

export const UndefinedGeneSymbol: Story = {
  args: {
    ensemblGeneId: undefined
  }
}
