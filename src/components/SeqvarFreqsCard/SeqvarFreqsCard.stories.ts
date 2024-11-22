import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import fixtureSeqvarInfoBrca1Json from '../../api/annonars/fixture.variantInfo.BRCA1.json'
import fixtureSeqvarInfoChrMtJson from '../../api/annonars/fixture.variantInfo.chrMT.json'
import { SeqvarsAnnosResponse } from '../../ext/annonars-api/src/lib'
import { SeqvarImpl } from '../../lib/genomicVars'
import SeqvarFreqsCard from './SeqvarFreqsCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

const seqvarInfoResponseBrca1 = fixtureSeqvarInfoBrca1Json as SeqvarsAnnosResponse
const seqvarInfoResponseChrMt = fixtureSeqvarInfoChrMtJson as SeqvarsAnnosResponse

const seqvarBrca1 = new SeqvarImpl('grch37', '18', 41215920, 'G', 'T')
const seqvarChrMt = new SeqvarImpl('grch37', 'MT', 7497, 'G', 'A')

const meta = {
  title: 'Seqvar/SeqvarFreqsCard',
  component: SeqvarFreqsCard,
  tags: ['autodocs'],
  argTypes: {
    seqvar: { control: { type: 'object' } },
    varAnnos: { control: { type: 'object' } }
  },
  args: { varAnnos: seqvarInfoResponseBrca1.result }
} satisfies Meta<typeof SeqvarFreqsCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    seqvar: seqvarBrca1,
    varAnnos: seqvarInfoResponseBrca1.result
  }
}

export const MT: Story = {
  args: {
    seqvar: seqvarChrMt,
    varAnnos: seqvarInfoResponseChrMt.result
  }
}
