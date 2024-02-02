import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import { ClinvarPerGeneRecord } from '../../pbs/annonars/clinvar/per_gene'
import ClinvarFreqPlot from './ClinvarFreqPlot.vue'
import geneClinvarBrca1Json from './fixture.clinvarPerGene.BRCA1.json'
import geneClinvarTgdsJson from './fixture.clinvarPerGene.TGDS.json'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const clinvarPerGeneTgds = ClinvarPerGeneRecord.fromJson(geneClinvarTgdsJson as JsonValue)
// @ts-ignore
const clinvarPerGeneBrca1 = ClinvarPerGeneRecord.fromJson(geneClinvarBrca1Json as JsonValue)

const meta = {
  title: 'Gene/Clinvar/ClinvarFreqPlot',
  component: ClinvarFreqPlot,
  tags: ['autodocs'],
  argTypes: {
    clinvarPerGene: { control: 'object' }
  },
  args: {
    clinvarPerGene: clinvarPerGeneBrca1
  }
} satisfies Meta<typeof ClinvarFreqPlot>

export default meta
type Story = StoryObj<typeof meta>

export const TGDS: Story = {
  args: {
    clinvarPerGene: clinvarPerGeneTgds
  }
}

export const BRCA1: Story = {
  args: {
    clinvarPerGene: clinvarPerGeneBrca1
  }
}

export const Undefined: Story = {
  args: {
    clinvarPerGene: undefined
  }
}
