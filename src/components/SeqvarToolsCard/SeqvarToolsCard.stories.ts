import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import fixtureSeqvarInfoBrca1Json from '../../api/annonars/fixture.variantInfo.BRCA1.json'
import { SeqvarInfoResponse, SeqvarInfoResult } from '../../api/annonars/types'
import { SeqvarImpl } from '../../lib/genomicVars'
import SeqvarToolsCard from './SeqvarToolsCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const seqvarInfoResponseBrca1 = SeqvarInfoResponse.fromJson(fixtureSeqvarInfoBrca1Json as JsonValue)

const seqvarBrca1 = new SeqvarImpl('grch37', '18', 41215920, 'G', 'T')

const meta = {
  title: 'Seqvar/SeqvarToolsCard',
  component: SeqvarToolsCard,
  tags: ['autodocs'],
  argTypes: {
    varAnnos: SeqvarInfoResult
  },
  args: { varAnnos: seqvarInfoResponseBrca1.result }
} satisfies Meta<typeof SeqvarToolsCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    seqvar: seqvarBrca1,
    varAnnos: seqvarInfoResponseBrca1.result
  }
}
