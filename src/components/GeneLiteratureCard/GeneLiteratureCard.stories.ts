import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { StoreState } from '../../stores'
import { usePubtatorStore } from '../../stores/pubtator'
import geneInfoBrca1Json from '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'
import geneInfoTgdsJson from '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'
import GeneLiteratureCard from './GeneLiteratureCard.vue'
import searchResultsBrca1Json from './fixture.pubtatorResults.BRCA1.json'
import searchResultsTgdsJson from './fixture.pubtatorResults.TGDS.json'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const geneInfoTgds = GeneInfoRecord.fromJson(geneInfoTgdsJson as JsonValue)
// @ts-ignore
const geneInfoBrca1 = GeneInfoRecord.fromJson(geneInfoBrca1Json as JsonValue)

const meta = {
  title: 'Gene/GeneLiteratureCard',
  component: GeneLiteratureCard,
  tags: ['autodocs'],
  argTypes: {
    geneInfo: { control: { type: 'object' } }
  },
  args: {
    geneInfo: geneInfoTgds,
    skipLoadViaStore: true
  }
} satisfies Meta<typeof GeneLiteratureCard>

export default meta

type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    geneInfo: geneInfoTgds
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
    geneInfo: geneInfoBrca1
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
