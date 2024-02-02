import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import variantInfoBrca1Json from '../../api/annonars/fixture.variantInfo.BRCA1.json'
import { Record as ClinvarRecord } from '../../pbs/annonars/clinvar/minimal'
import SeqvarClinvarCard from './SeqvarClinvarCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
const clinvarRecordBrca1 = ClinvarRecord.fromJson(variantInfoBrca1Json.result.clinvar as JsonValue)

const meta = {
  title: 'Seqvar/SeqvarClinvarCard',
  component: SeqvarClinvarCard,
  tags: ['autodocs'],
  argTypes: {
    clinvarRecord: { control: { type: 'object' } }
  },
  args: { clinvarRecord: clinvarRecordBrca1 }
} satisfies Meta<typeof SeqvarClinvarCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    clinvarRecord: clinvarRecordBrca1
  }
}
