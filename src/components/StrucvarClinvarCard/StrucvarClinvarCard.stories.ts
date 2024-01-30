import { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import { Strucvar } from '../../lib/genomicVars'
import { ResponseRecord as ClinvarSvRecord } from '../../pbs/annonars/clinvar/sv'
import { StoreState } from '../../store'
import { useStrucvarInfoStore } from '../../store/strucvarInfo'
import StrucvarClinvarCard from './StrucvarClinvarCard.vue'
import clinvarSvRecordsJson from './fixture.clinvarSvRecords.BRCA1.json'

const strucvarBrca1: Strucvar = {
  svType: 'DEL',
  genomeBuild: 'grch37',
  chrom: '17',
  start: 41176312,
  stop: 41277500,
  userRepr: 'DEL:chr17:41176312:41277500'
}
// @ts-ignore
const clinvarSvRecords = clinvarSvRecordsJson.map((record) =>
  ClinvarSvRecord.fromJson(record as JsonValue)
)

const meta = {
  title: 'Strucvar/StrucvarClinvarCard',
  component: StrucvarClinvarCard,
  tags: ['autodocs'],
  argTypes: {
    strucvar: { control: { type: 'object' } },
    clinvarSvRecords: { control: { type: 'object' } }
  },
  args: {
    strucvar: strucvarBrca1,
    clinvarSvRecords
  }
} satisfies Meta<typeof StrucvarClinvarCard>

export default meta

type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    strucvar: strucvarBrca1
  },
  play: async () => {
    // Setup the store contents after story selection.
    const strucvarInfoStore = useStrucvarInfoStore()
    strucvarInfoStore.storeState = StoreState.Loading
    strucvarInfoStore.strucvar = strucvarBrca1
    strucvarInfoStore.csq = undefined
    strucvarInfoStore.genesInfos = undefined
    strucvarInfoStore.clinvarSvRecords = undefined
    strucvarInfoStore.storeState = StoreState.Active
  }
}
