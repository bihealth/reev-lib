import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import { GenesClinvarPerGeneRecord, GenesGeneInfoRecord } from '../../ext/annonars-api/src/lib'
import { GenesTranscriptsListResponse } from '../../ext/mehari-api/src/lib'
import geneInfoBrca1Json from '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'
import geneInfoTgdsJson from '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'
import GeneClinvarCard from './GeneClinvarCard.vue'
import geneClinvarBrca1Json from './fixture.clinvarPerGene.BRCA1.json'
import geneClinvarTgdsJson from './fixture.clinvarPerGene.TGDS.json'
import genesTxsBrca1Json37 from './fixture.genesTxs.BRCA1.37.json'
import genesTxsTgdsJson37 from './fixture.genesTxs.TGDS.37.json'
import genesTxsTgdsJson38 from './fixture.genesTxs.TGDS.38.json'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

const clinvarPerGeneTgds = geneClinvarTgdsJson as GenesClinvarPerGeneRecord
const clinvarPerGeneBrca1 = geneClinvarBrca1Json as GenesClinvarPerGeneRecord

const genesTxsTgds37 = genesTxsTgdsJson37 as GenesTranscriptsListResponse
const genesTxsTgds38 = genesTxsTgdsJson38 as GenesTranscriptsListResponse
const genesTxsBrca137 = genesTxsBrca1Json37 as GenesTranscriptsListResponse
const geneInfoTgds = geneInfoTgdsJson as GenesGeneInfoRecord
const geneInfoBrca1 = geneInfoBrca1Json as GenesGeneInfoRecord

const meta = {
  title: 'Gene/Clinvar/GeneClinvarCard',
  component: GeneClinvarCard,
  tags: ['autodocs'],
  argTypes: {
    clinvarPerGene: { control: 'object' },
    geneInfo: { control: { type: 'object' } },
    genomeBuild: { control: 'text' },
    transcripts: { control: 'object' }
  },
  args: {
    clinvarPerGene: clinvarPerGeneTgds,
    geneInfo: geneInfoTgds,
    genomeBuild: 'grch37',
    transcripts: genesTxsTgds37.transcripts
  }
} satisfies Meta<typeof GeneClinvarCard>

export default meta
type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    clinvarPerGene: clinvarPerGeneTgds,
    geneInfo: geneInfoTgds,
    genomeBuild: 'grch37',
    transcripts: genesTxsTgds37.transcripts
  }
}

export const TGDSGrch38: Story = {
  args: {
    clinvarPerGene: clinvarPerGeneTgds,
    geneInfo: geneInfoTgds,
    genomeBuild: 'grch38',
    transcripts: genesTxsTgds38.transcripts
  }
}

export const BRCA1: Story = {
  args: {
    clinvarPerGene: clinvarPerGeneBrca1,
    geneInfo: geneInfoBrca1,
    genomeBuild: 'grch37',
    transcripts: genesTxsBrca137.transcripts
  }
}

export const Undefined: Story = {
  args: {
    clinvarPerGene: undefined
  }
}
