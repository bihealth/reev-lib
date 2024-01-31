import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { SeqvarInfoResponse } from '../../api/annonars/types'
import type { Seqvar } from '../../lib/genomicVars'
import { setupMountedComponents } from '../../lib/testUtils'
import SeqvarToolsCard from './SeqvarToolsCard.vue'

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

describe.concurrent('SeqvarToolsCard', async () => {
  it('renders the card', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarToolsCard },
      {
        props: {
          seqvar: seqvarBrca1,
          varAnnos: seqvarInfoResponseBrca1.result
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('Genome Browsers')
    expect(wrapper.text()).toContain('Other Resources')
    expect(wrapper.text()).toContain('Local IGV')
    const launchIcons = wrapper.findAll('.mdi-launch')
    expect(launchIcons.length).toBe(9)
  })

  it('renders skeleton loader with undefined seqvar', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarToolsCard },
      {
        props: {
          seqvar: undefined,
          varAnnos: seqvarInfoResponseBrca1.result
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    const loader = wrapper.findComponent({ name: 'VSkeletonLoader' })
    expect(loader.exists()).toBe(true)
  })

  it('renders skeleton loader undefined varAnnos', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarToolsCard },
      {
        props: {
          seqvar: seqvarInfoResponseBrca1,
          varAnnos: undefined
        }
      }
    )

    // act: nothing, only test rendering

    // assert:VSkeletonLoader
    const loader = wrapper.findComponent({ name: 'VSkeletonLoader' })
    expect(loader.exists()).toBe(true)
  })
})
