import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import { GenesClinvarPerGeneRecord } from '../../ext/annonars-api/src/lib'
import { GeneTranscriptsResponse } from '../../pbs/mehari/server'
import VariationLandscapePlotly from './VariationLandscapePlotly.vue'
import geneClinvarBrca1Json from './fixture.clinvarPerGene.BRCA1.json'
import geneClinvarTgdsJson from './fixture.clinvarPerGene.TGDS.json'
import genesTxsBrca1Json37 from './fixture.genesTxs.BRCA1.37.json'
import genesTxsTgdsJson37 from './fixture.genesTxs.TGDS.37.json'
import genesTxsTgdsJson38 from './fixture.genesTxs.TGDS.38.json'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

const clinvarPerGeneTgds = geneClinvarTgdsJson as GenesClinvarPerGeneRecord
const clinvarPerGeneBrca1 = geneClinvarBrca1Json as GenesClinvarPerGeneRecord
// @ts-ignore
const genesTxsTgds37 = GeneTranscriptsResponse.fromJson(genesTxsTgdsJson37 as JsonValue)
// @ts-ignore
const genesTxsTgds38 = GeneTranscriptsResponse.fromJson(genesTxsTgdsJson38 as JsonValue)
// @ts-ignore
const genesTxsBrca137 = GeneTranscriptsResponse.fromJson(genesTxsBrca1Json37 as JsonValue)

const meta = {
  title: 'Gene/Clinvar/VariationLandscapePlotly',
  component: VariationLandscapePlotly,
  tags: ['autodocs'],
  argTypes: {
    geneSymbol: { control: 'text' },
    genomeBuild: { control: 'text' },
    transcripts: { control: 'object' },
    clinvarPerGene: { control: 'object' }
  },
  args: {
    geneSymbol: 'BRCA1',
    genomeBuild: 'grch37',
    transcripts: genesTxsBrca137.transcripts,
    clinvarPerGene: clinvarPerGeneBrca1
  }
} satisfies Meta<typeof VariationLandscapePlotly>

export default meta
type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    geneSymbol: 'TGDS',
    genomeBuild: 'grch37',
    transcripts: genesTxsTgds37.transcripts,
    clinvarPerGene: clinvarPerGeneTgds
  }
}

export const TGDSGrch38: Story = {
  args: {
    geneSymbol: 'TGDS',
    genomeBuild: 'grch38',
    transcripts: genesTxsTgds38.transcripts,
    clinvarPerGene: clinvarPerGeneTgds
  }
}

export const BRCA1: Story = {
  args: {
    geneSymbol: 'BRCA1',
    genomeBuild: 'grch37',
    transcripts: genesTxsBrca137.transcripts,
    clinvarPerGene: clinvarPerGeneBrca1
  }
}

export const UndefinedGeneSymbol: Story = {
  args: {
    geneSymbol: undefined,
    genomeBuild: 'grch37',
    transcripts: genesTxsBrca137.transcripts,
    clinvarPerGene: clinvarPerGeneBrca1
  }
}

export const UndefinedTranscripts: Story = {
  args: {
    geneSymbol: 'TGDS',
    genomeBuild: 'grch37',
    transcripts: undefined,
    clinvarPerGene: clinvarPerGeneTgds
  }
}

export const UndefinedPerGene: Story = {
  args: {
    geneSymbol: 'TGDS',
    genomeBuild: 'grch37',
    transcripts: genesTxsBrca137.transcripts,
    clinvarPerGene: undefined
  }
}
