import { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import { StrucvarResult } from '../../api/mehari'
import strucvarResultBrca1Json from '../../api/mehari/fixture.strucvarCsqResponse.BRCA1.json'
import geneInfoBrca1Json from '../../components/GenePathogenicityCard/fixture.geneInfo.BRCA1.json'
import { Strucvar } from '../../lib/genomicVars'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { StoreState } from '../../store'
import StrucvarGeneListCard from './StrucvarGeneListCard.vue'

// We define the fixtures inline here as they are small.
const delBrca1: Strucvar = {
  svType: 'DEL',
  genomeBuild: 'grch37',
  chrom: '17',
  start: 41176312,
  stop: 41277500,
  userRepr: 'DEL:chr17:41176312:41277500'
}

// @ts-ignore
const geneInfoBrca1 = GeneInfoRecord.fromJson(geneInfoBrca1Json as JsonValue)
// @ts-ignore
const strucvarResultBrca1 = StrucvarResult.fromJson(strucvarResultBrca1Json as JsonValue)

const meta = {
  title: 'Strucvar/StrucvarGeneListCard',
  component: StrucvarGeneListCard,
  tags: ['autodocs'],
  argTypes: {
    currentStrucvarRecord: { control: { type: 'object' } },
    csq: { control: { type: 'object' } },
    genesInfos: { control: { type: 'object' } },
    storeState: { control: { type: 'object' } },
    selectedGeneHgncId: { control: { type: 'object' } }
  },
  args: {
    currentStrucvarRecord: delBrca1,
    csq: strucvarResultBrca1.result,
    genesInfos: [geneInfoBrca1],
    storeState: StoreState.Active,
    selectedGeneHgncId: undefined
  }
} satisfies Meta<typeof StrucvarGeneListCard>

export default meta

type Story = StoryObj<typeof meta>

export const DelBRCA1: Story = {
  args: {
    currentStrucvarRecord: delBrca1
  }
}
