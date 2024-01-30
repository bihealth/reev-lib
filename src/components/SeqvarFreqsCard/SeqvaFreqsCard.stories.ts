import { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import fixtureSeqvarInfoBrca1Json from '../../api/annonars/fixture.variantInfo.BRCA1.json'
import fixtureSeqvarInfoChrMtJson from '../../api/annonars/fixture.variantInfo.chrMT.json'
import { SeqvarInfoResponse, SeqvarInfoResult } from '../../api/annonars/types'
import SeqvarFreqsCard from './SeqvarFreqsCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const seqvarInfoResponseBrca1 = SeqvarInfoResponse.fromJson(fixtureSeqvarInfoBrca1Json as JsonValue)
// @ts-ignore
const seqvarInfoResponseChrMt = SeqvarInfoResponse.fromJson(fixtureSeqvarInfoChrMtJson as JsonValue)

const meta = {
  title: 'Seqvar/SeqvarFreqsCard',
  component: SeqvarFreqsCard,
  tags: ['autodocs'],
  argTypes: {
    varAnnos: SeqvarInfoResult
  },
  args: { varAnnos: seqvarInfoResponseBrca1.result }
} satisfies Meta<typeof SeqvarFreqsCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    varAnnos: seqvarInfoResponseBrca1.result
  }
}

export const MT: Story = {
  args: {
    varAnnos: seqvarInfoResponseChrMt.result
  }
}
