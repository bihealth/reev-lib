import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { SeqvarResult } from '../../api/mehari/types'
import { setupMountedComponents } from '../../lib/testUtils'
import SeqvarConsequencesCard from './SeqvarConsequencesCard.vue'

/** Fixtures */
const seqvarCsqResult = SeqvarResult.fromJson(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../api/mehari/fixture.seqvarCsqResponse.BRCA1.json'),
      'utf-8'
    )
  )
)

describe.concurrent('SeqvarConsequencesCard.vue', async () => {
  it('renders the consequence info', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarConsequencesCard },
      {
        props: {
          consequences: seqvarCsqResult.result
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
    const headers = table.findAll('th')
    expect(headers.length).toBe(6)
    expect(headers[0].text()).toBe('Gene')
    expect(headers[1].text()).toBe('Transcript')
    expect(headers[2].text()).toBe('Consequence')
    expect(headers[3].text()).toBe('HGVS.t')
    expect(headers[4].text()).toBe('HGVS.p')
    expect(headers[5].text()).toBe('Exon/Intron')
  })
})
