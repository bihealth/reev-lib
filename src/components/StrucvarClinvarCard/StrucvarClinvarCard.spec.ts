import type { JsonValue } from '@protobuf-ts/runtime'
import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import type { Strucvar } from '../../lib/genomicVars'
import { setupMountedComponents } from '../../lib/testUtils'
import { ResponseRecord as ClinvarSvRecord } from '../../pbs/annonars/clinvar/sv'
import StrucvarClinvarCard from './StrucvarClinvarCard.vue'

/** Example Strucvar */
const strucvarInfo: Strucvar = {
  genomeBuild: 'grch37',
  svType: 'DEL',
  chrom: '17',
  start: 41176312,
  stop: 41277500,
  userRepr: 'DEL-grch37-17-41176312-41277500'
}
const clinvarSvRecords = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.clinvarSvRecords.BRCA1.json'), 'utf8')
).map((record: JsonValue) => ClinvarSvRecord.fromJson(record))

describe.concurrent('StrucvarClinvarCard.vue', async () => {
  it('renders the info', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: StrucvarClinvarCard },
      {
        props: {
          genomeRelease: 'grch37'
        },
        initialStoreState: {
          svInfo: {
            currentSvRecord: structuredClone(strucvarInfo),
            clinvarSvRecords
          }
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('ClinVar')
    const dataTable = wrapper.findComponent({ name: 'VDataTable' })
    expect(dataTable.exists()).toBe(true)
  })
})
