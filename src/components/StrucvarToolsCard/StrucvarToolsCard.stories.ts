import type { Meta, StoryObj } from '@storybook/vue3'

import type { Strucvar } from '../../lib/genomicVars'
import StrucvarToolsCard from './StrucvarToolsCard.vue'

// We define the fixtures inline here as they are small.
const delBrca1: Strucvar = {
  svType: 'DEL',
  genomeBuild: 'grch37',
  chrom: '17',
  start: 41176312,
  stop: 41277500,
  userRepr: 'DEL:chr17:41176312:41277500'
}

const meta = {
  title: 'Strucvar/StrucvarToolsCard',
  component: StrucvarToolsCard,
  tags: ['autodocs'],
  argTypes: {
    strucvar: { control: { type: 'object' } }
  },
  args: {
    strucvar: delBrca1
  }
} satisfies Meta<typeof StrucvarToolsCard>

export default meta

type Story = StoryObj<typeof meta>

export const DelBRCA1: Story = {
  args: {
    strucvar: delBrca1
  }
}
