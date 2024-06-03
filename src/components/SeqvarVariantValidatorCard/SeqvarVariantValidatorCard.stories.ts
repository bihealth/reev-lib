import type { Meta, StoryObj } from '@storybook/vue3'

import { SeqvarImpl } from '../../lib/genomicVars'
import { urlConfig } from '../../lib/urlConfig'
import SeqvarVariantValidatorCard from './SeqvarVariantValidatorCard.vue'

urlConfig.baseUrlVariantValidator =
  'https://rest.variantvalidator.org/VariantValidator/variantvalidator'

const seqvarBrca1 = new SeqvarImpl('grch37', '18', 41215920, 'G', 'T')

const meta = {
  title: 'Seqvar/SeqvarVariantValidatorCard',
  component: SeqvarVariantValidatorCard,
  tags: ['autodocs'],
  argTypes: {
    seqvar: { control: { type: 'object' } }
  },
  args: { seqvar: seqvarBrca1 }
} satisfies Meta<typeof SeqvarVariantValidatorCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    seqvar: seqvarBrca1
  }
}
