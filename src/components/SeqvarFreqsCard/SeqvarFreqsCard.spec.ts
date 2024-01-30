import { describe, expect, it } from 'vitest'

import * as BRCA1VariantInfo from '@/assets/__tests__/BRCA1VariantInfo.json'
import Freqs from '@/components/SeqvarDetails/FreqsCard.vue'
import VariantDetailsFreqsAutosomal from '@/components/SeqvarDetails/FreqsCard/AutosomalFreqs.vue'
import VariantDetailsFreqsMitochondrial from '@/components/SeqvarDetails/FreqsCard/MitochondrialFreqs.vue'
import type { Seqvar } from '../../lib/genomicVars'
import { setupMountedComponents } from '../../lib/testUtils'

/** Example Sequence Variant */
const seqvarInfo: Seqvar = {
  genomeBuild: 'grch37',
  chrom: '17',
  pos: 41215920,
  del: 'G',
  ins: 'T',
  userRepr: 'grch37-17-41215920-G-T'
}

/** Example Mitochondrial Sequence Variant */
const seqvarInfoMitochondrial = {
  genomeBuild: 'grch37',
  chrom: 'MT',
  pos: 7497,
  del: 'G',
  ins: 'A',
  userRepr: 'grch37-MT-7497-G-A'
}

describe.concurrent('Freqs', async () => {
  it('renders the Freqs info for Autosonmal Variants', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: Freqs },
      {
        props: {
          seqvar: seqvarInfo,
          varAnnos: BRCA1VariantInfo
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    const freqsAutosomal = wrapper.findComponent(VariantDetailsFreqsAutosomal)
    expect(freqsAutosomal.exists()).toBe(true)
  })

  it('renders the Freqs info for Mitochondrial Variants', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: Freqs },
      {
        props: {
          seqvar: seqvarInfoMitochondrial,
          varAnnos: BRCA1VariantInfo
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    const freqsMitochondrial = wrapper.findComponent(VariantDetailsFreqsMitochondrial)
    expect(freqsMitochondrial.exists()).toBe(true)
  })
})
