import type { Meta, StoryObj } from '@storybook/vue3'

import { GenesGeneInfoRecord } from '../../ext/annonars-api/src/lib'
import geneInfoBrca1Json from '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'
import geneInfoTgdsJson from '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'
import GeneOverviewCard from './GeneOverviewCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

const geneInfoTgds = geneInfoTgdsJson as GenesGeneInfoRecord
const geneInfoBrca1 = geneInfoBrca1Json as GenesGeneInfoRecord

const meta = {
  title: 'Gene/GeneOverviewCard',
  component: GeneOverviewCard,
  tags: ['autodocs'],
  argTypes: {
    geneInfo: { control: { type: 'object' } }
  },
  args: {
    geneInfo: geneInfoTgds
  }
} satisfies Meta<typeof GeneOverviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    geneInfo: geneInfoTgds
  }
}

export const BRCA1: Story = {
  args: {
    geneInfo: geneInfoBrca1
  }
}

export const Undefined: Story = {
  args: {
    geneInfo: undefined
  }
}
