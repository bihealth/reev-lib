import type { Meta, StoryObj } from '@storybook/vue3'

import { SeqvarImpl } from '../../lib/genomicVars'
import SeqvarToolsCard from './SeqvarToolsCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

const seqvarBrca1 = new SeqvarImpl('grch37', '18', 41215920, 'G', 'T')

const meta = {
  title: 'Seqvar/SeqvarToolsCard',
  component: SeqvarToolsCard,
  tags: ['autodocs'],
  argTypes: {
    seqvar: { control: { type: 'object' } }
  },
  args: { seqvar: seqvarBrca1 }
} satisfies Meta<typeof SeqvarToolsCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    seqvar: seqvarBrca1
  }
}
