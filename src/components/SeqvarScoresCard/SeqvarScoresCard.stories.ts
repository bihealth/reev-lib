import type { Meta, StoryObj } from '@storybook/vue3'

import fixtureSeqvarInfoBrca1Json from '../../api/annonars/fixture.variantInfo.BRCA1.json'
import { SeqvarsAnnoResponseRecord, SeqvarsAnnosResponse } from '../../ext/annonars-api/src/lib'
import SeqvarScoresCard from './SeqvarScoresCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const seqvarInfoResponseBrca1 = fixtureSeqvarInfoBrca1Json as SeqvarsAnnosResponse

const meta = {
  title: 'Seqvar/SeqvarScoresCard',
  component: SeqvarScoresCard,
  tags: ['autodocs'],
  argTypes: {
    varAnnos: { control: { type: 'object' } }
  },
  args: { varAnnos: seqvarInfoResponseBrca1.result }
} satisfies Meta<typeof SeqvarScoresCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    varAnnos: seqvarInfoResponseBrca1.result
  }
}
