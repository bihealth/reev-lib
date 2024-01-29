import { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import { TranscriptResult } from '../../api/dotty'
import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import geneInfoBrca1Json from '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'
import geneInfoTgdsJson from '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'
import GeneClinvarCard from './GeneClinvarCard.vue'
import geneClinvarBrca1Json from './fixture.clinvarPerGene.BRCA1.json'
import geneClinvarTgdsJson from './fixture.clinvarPerGene.TGDS.json'
import transcriptsBrca1Json37 from './fixture.transcripts.BRCA1.37.json'
import transcriptsTgdsJson37 from './fixture.transcripts.TGDS.37.json'
import transcriptsTgdsJson38 from './fixture.transcripts.TGDS.38.json'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const clinvarPerGeneTgds = ClinvarPerGeneRecord.fromJson(geneClinvarTgdsJson as JsonValue)
// @ts-ignore
const clinvarPerGeneBrca1 = ClinvarPerGeneRecord.fromJson(geneClinvarBrca1Json as JsonValue)
// @ts-ignore
const transcriptsTgds37 = TranscriptResult.fromJson(transcriptsTgdsJson37 as JsonValue)
// @ts-ignore
const transcriptsTgds38 = TranscriptResult.fromJson(transcriptsTgdsJson38 as JsonValue)
// @ts-ignore
const transcriptsBrca137 = TranscriptResult.fromJson(transcriptsBrca1Json37 as JsonValue)
// @ts-ignore
const geneInfoTgds = GeneInfoRecord.fromJson(geneInfoTgdsJson as JsonValue)
// @ts-ignore
const geneInfoBrca1 = GeneInfoRecord.fromJson(geneInfoBrca1Json as JsonValue)

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
    transcripts: transcriptsTgds37
  }
} satisfies Meta<typeof GeneClinvarCard>

export default meta
type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    clinvarPerGene: clinvarPerGeneTgds,
    geneInfo: geneInfoTgds,
    genomeBuild: 'grch37',
    transcripts: transcriptsTgds37
  }
}

export const TGDSGrch38: Story = {
  args: {
    clinvarPerGene: clinvarPerGeneTgds,
    geneInfo: geneInfoTgds,
    genomeBuild: 'grch38',
    transcripts: transcriptsTgds38
  }
}

export const BRCA1: Story = {
  args: {
    clinvarPerGene: clinvarPerGeneBrca1,
    geneInfo: geneInfoBrca1,
    genomeBuild: 'grch37',
    transcripts: transcriptsBrca137
  }
}

export const Undefined: Story = {
  args: {
    clinvarPerGene: undefined
  }
}
