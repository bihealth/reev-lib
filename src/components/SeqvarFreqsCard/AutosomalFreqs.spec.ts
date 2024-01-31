import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { SeqvarInfoResponse } from '../../api/annonars/types'
import { setupMountedComponents } from '../../lib/testUtils'
import AutosomalFreqs from './AutosomalFreqs.vue'

/** Fixtures */
const seqvarInfoResponseBrca1 = SeqvarInfoResponse.fromJson(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../api/annonars/fixture.variantInfo.BRCA1.json'),
      'utf-8'
    )
  )
)

// Sequence Variant in BRCA1
const seqvarBrca1: Seqvar = {
  genomeBuild: 'grch37',
  chrom: '17',
  pos: 41215920,
  del: 'G',
  ins: 'T',
  userRepr: 'grch37-17-41215920-G-T'
}

describe.concurrent('AutosomalFreqs.vue', async () => {
  it('renders the info', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: AutosomalFreqs },
      {
        props: {
          seqvar: seqvarBrca1,
          varAnnos: seqvarInfoResponseBrca1.result,
          dataset: 'gnomadExomes'
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('gnomAD Exomes')
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
  })

  it('renders the info with no data', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: AutosomalFreqs },
      {
        props: {
          seqvar: seqvarBrca1,
          varAnnos: undefined,
          dataset: 'gnomadGenomes'
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('gnomAD Genomes')
    expect(wrapper.text()).toContain('No allele frequency information available in local database.')
  })
})
