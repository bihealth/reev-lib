import type { Meta, StoryObj } from '@storybook/vue3'

import { SeqvarImpl } from '../../lib/genomicVars'
import SeqvarBeaconNetworkCard from './SeqvarBeaconNetworkCard.vue'

const seqvarBrca1 = new SeqvarImpl('grch37', '18', 41215920, 'G', 'T')

const meta = {
  title: 'Seqvar/SeqvarBeaconNetworkCard',
  component: SeqvarBeaconNetworkCard,
  tags: ['autodocs'],
  argTypes: {
    seqvar: { control: { type: 'object' } }
  },
  args: { seqvar: seqvarBrca1 }
} satisfies Meta<typeof SeqvarBeaconNetworkCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    seqvar: seqvarBrca1
  }
}
