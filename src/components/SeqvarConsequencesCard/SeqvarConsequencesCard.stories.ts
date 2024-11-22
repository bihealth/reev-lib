import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import seqvarCsqResultBrca1Json from '../../api/mehari/fixture.seqvarCsqResponse.BRCA1.json'
import { SeqvarsCsqResponse } from '../../ext/mehari-api/src/lib'
import SeqvarConsequencesCard from './SeqvarConsequencesCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const seqvarCsqResponseBrca1 = seqvarCsqResultBrca1Json as SeqvarsCsqResponse

const meta = {
  title: 'Seqvar/SeqvarConsequencesCard',
  component: SeqvarConsequencesCard,
  tags: ['autodocs'],
  argTypes: {
    consequences: { control: { type: 'object' } }
  },
  args: { consequences: seqvarCsqResponseBrca1.result }
} satisfies Meta<typeof SeqvarConsequencesCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    consequences: seqvarCsqResponseBrca1.result
  }
}
