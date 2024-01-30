import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { RouterView } from 'vue-router'

import { StrucvarResult } from '../../api/mehari/types'
import { type Strucvar } from '../../lib/genomicVars'
import { setupMountedComponents } from '../../lib/testUtils'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { StoreState } from '../../store'
import StrucvarGeneListCard from './StrucvarGeneListCard.vue'

/** Example Strucvar */
const strucvarInfo: Strucvar = {
  genomeBuild: 'grch37',
  svType: 'DEL',
  chrom: '17',
  start: 41176312,
  stop: 41277500,
  userRepr: 'DEL-grch37-17-41176312-41277500'
}

// Load fixture data.
const geneInfoBrca1 = GeneInfoRecord.fromJson(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../components/GenePathogenicityCard/fixture.geneInfo.BRCA1.json'),
      'utf8'
    )
  )
)
const strucvarResultBrca1 = StrucvarResult.fromJson(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../api/mehari/fixture.strucvarCsqResponse.BRCA1.json'),
      'utf8'
    )
  )
)

/** Routes to use in the tests. */
const routes = [
  {
    path: '/',
    name: 'home',
    component: h(RouterView)
  },
  {
    path: '/gene-details/:gene',
    name: 'gene-details',
    component: h(RouterView)
  }
]

describe.concurrent('StrucvarGeneListCard.vue', async () => {
  it('renders the table', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: StrucvarGeneListCard },
      {
        props: {
          currentStrucvarRecord: strucvarInfo,
          csq: strucvarResultBrca1.result,
          genesInfos: [geneInfoBrca1],
          storeState: StoreState.Active,
          selectGeneHgncId: undefined
        },
        routes
      }
    )

    // act: nothing, only test rendering

    // assert:
    const table = wrapper.findComponent({ name: 'VDataIterator' })
    expect(table.exists()).toBe(true)
    expect(wrapper.text()).toContain('Overlapping and Contained Genes')
  })

  it('shows the gene info on row click', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: StrucvarGeneListCard },
      {
        props: {
          currentStrucvarRecord: strucvarInfo,
          csq: strucvarResultBrca1.result,
          genesInfos: [geneInfoBrca1],
          storeState: StoreState.Active,
          selectGeneHgncId: undefined
        },
        routes
      }
    )

    // act:
    const table = wrapper.findComponent({ name: 'VDataIterator' })
    expect(table.exists()).toBe(true)
    // Click on the first gene
    await table.get('div.v-sheet div.v-row div.v-col').trigger('click')
    await nextTick()

    // assert:
    expect(table.emitted('update:options')).toBeTruthy()
  })
})
