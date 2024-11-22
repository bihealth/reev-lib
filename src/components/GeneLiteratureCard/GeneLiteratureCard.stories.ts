import type { Meta, StoryObj } from '@storybook/vue3'

import { GenesGeneInfoRecord } from '@/ext/annonars-api/src/lib'

import { StoreState } from '../../stores'
import { usePubtatorStore } from '../../stores/pubtator'
import geneInfoBrca1Json from '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'
import geneInfoTgdsJson from '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'
import GeneLiteratureCard from './GeneLiteratureCard.vue'
import searchResultsBrca1Json from './fixture.pubtatorResults.BRCA1.json'
import searchResultsTgdsJson from './fixture.pubtatorResults.TGDS.json'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

const geneInfoTgds = geneInfoTgdsJson as GenesGeneInfoRecord
const geneInfoBrca1 = geneInfoBrca1Json as GenesGeneInfoRecord

const meta = {
  title: 'Gene/GeneLiteratureCard',
  component: GeneLiteratureCard,
  tags: ['autodocs'],
  argTypes: {
    hgncSymbol: { control: { type: 'text' } }
  },
  args: {
    hgncSymbol: geneInfoTgds.hgnc!.symbol
  }
} satisfies Meta<typeof GeneLiteratureCard>

export default meta

type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    hgncSymbol: geneInfoTgds.hgnc!.symbol
  },
  play: async () => {
    // Setup the store contents after story selection.
    const pubtatorStore = usePubtatorStore()
    pubtatorStore.storeState = StoreState.Loading
    pubtatorStore.hgncSymbol = 'TGDS'
    pubtatorStore.searchResults = searchResultsTgdsJson
    pubtatorStore.storeState = StoreState.Active
  }
}

export const BRCA1: Story = {
  args: {
    hgncSymbol: geneInfoTgds.hgnc!.symbol
  },
  play: async () => {
    // Setup the store contents after story selection.
    const pubtatorStore = usePubtatorStore()
    pubtatorStore.storeState = StoreState.Loading
    pubtatorStore.hgncSymbol = 'BRCA1'
    pubtatorStore.searchResults = searchResultsBrca1Json
    pubtatorStore.storeState = StoreState.Active
  }
}
