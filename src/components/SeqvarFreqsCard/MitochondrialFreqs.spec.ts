import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { SeqvarInfoResponse } from '../../api/annonars/types'
import { setupMountedComponents } from '../../lib/testUtils'
import MitochondrialFreqs from './MitochondrialFreqs.vue'

/** Fixtures */
const seqvarInfoResponseChrMt = SeqvarInfoResponse.fromJson(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../api/annonars/fixture.variantInfo.chrMT.json'),
      'utf-8'
    )
  )
)

// Mitochondrial Sequence Variant
const seqvarChrMt = {
  genomeBuild: 'grch37',
  chrom: 'MT',
  pos: 7497,
  del: 'G',
  ins: 'A',
  userRepr: 'grch37-MT-7497-G-A'
}

describe.concurrent('MitochondrialFreqs.vue', async () => {
  it('renders the info', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: MitochondrialFreqs },
      {
        props: {
          seqvar: seqvarChrMt,
          varAnnos: seqvarInfoResponseChrMt.result
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.html()).toContain('HelixMTdb')
    expect(wrapper.html()).toContain('gnomAD-MT')
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
  })

  it('renders the info with no helixmtdb', async () => {
    // arrange:
    const variantInfoNoHelixmtdb = structuredClone(seqvarInfoResponseChrMt.result)
    // @ts-ignore
    variantInfoNoHelixmtdb.helixmtdb = {}
    const { wrapper } = await setupMountedComponents(
      { component: MitochondrialFreqs },
      {
        props: {
          seqvar: seqvarChrMt,
          varAnnos: variantInfoNoHelixmtdb
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.html()).toContain('HelixMTdb')
    expect(wrapper.html()).toContain('gnomAD-MT')
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
  })

  it('renders the info with no gnomad-mtdna', async () => {
    // arrange:
    const variantInfoNoGnomad = structuredClone(seqvarInfoResponseChrMt.result)
    // @ts-ignore
    variantInfoNoGnomad['gnomad-mtdna'] = {}
    const { wrapper } = await setupMountedComponents(
      { component: MitochondrialFreqs },
      {
        props: {
          seqvar: seqvarChrMt,
          varAnnos: variantInfoNoGnomad
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.html()).toContain('HelixMTdb')
    expect(wrapper.html()).toContain('gnomAD-MT')
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
  })

  it('renders the info with no data', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: MitochondrialFreqs },
      {
        props: {
          seqVar: seqvarChrMt,
          varAnnos: undefined
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    const alertIcon = wrapper.findComponent({ name: 'VSkeletonLoader' })
    expect(alertIcon.exists()).toBe(true)
  })
})
