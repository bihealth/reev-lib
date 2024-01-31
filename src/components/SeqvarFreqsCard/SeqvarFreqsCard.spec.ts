import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { SeqvarInfoResponse } from '../../api/annonars/types'
import type { Seqvar } from '../../lib/genomicVars'
import { setupMountedComponents } from '../../lib/testUtils'
import SeqvarFreqsCard from './SeqvarFreqsCard.vue'

/** Fixtures */
const seqvarInfoResponseBrca1 = SeqvarInfoResponse.fromJson(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../api/annonars/fixture.variantInfo.BRCA1.json'),
      'utf-8'
    )
  )
)
const seqvarInfoResponseChrMt = SeqvarInfoResponse.fromJson(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../api/annonars/fixture.variantInfo.chrMT.json'),
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

// Mitochondrial Sequence Variant
const seqvarChrMt = {
  genomeBuild: 'grch37',
  chrom: 'MT',
  pos: 7497,
  del: 'G',
  ins: 'A',
  userRepr: 'grch37-MT-7497-G-A'
}

describe.concurrent('SeqvarFreqsCard.vue', async () => {
  it('renders the Freqs info for Autosonmal Variants', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarFreqsCard },
      {
        props: {
          seqvar: seqvarBrca1,
          varAnnos: seqvarInfoResponseBrca1.result
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    const freqsAutosomal = wrapper.findComponent({ name: 'AutosomalFreqs' })
    expect(freqsAutosomal.exists()).toBe(true)
  })

  it('renders the Freqs info for Mitochondrial Variants', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarFreqsCard },
      {
        props: {
          seqvar: seqvarChrMt,
          varAnnos: seqvarInfoResponseChrMt.result
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    const freqsMitochondrial = wrapper.findComponent({ name: 'MitochondrialFreqs' })
    expect(freqsMitochondrial.exists()).toBe(true)
  })
})
