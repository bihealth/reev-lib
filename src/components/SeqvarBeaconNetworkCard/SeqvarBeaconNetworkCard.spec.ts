import { describe, expect, it } from 'vitest'
import { VBtn } from 'vuetify/components'

import type { Seqvar } from '../../lib/genomicVars'
import { setupMountedComponents } from '../../lib/testUtils'
import SeqvarBeaconNetworkCard from './SeqvarBeaconNetworkCard.vue'

// Sequence Variant in BRCA1
const seqvarBrca1: Seqvar = {
  genomeBuild: 'grch37',
  chrom: '17',
  pos: 41215920,
  del: 'G',
  ins: 'T',
  userRepr: 'grch37-17-41215920-G-T'
}

describe.concurrent('SeqvarBeaconNetworkCard.vue', async () => {
  it('renders the card without iframe', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarBeaconNetworkCard },
      {
        props: {
          seqvar: seqvarBrca1
        }
      }
    )

    // act: nothing

    // assert:
    // look for the search button
    expect(wrapper.text()).toContain('Query Beacon')
    const refreshButton = wrapper.findComponent(VBtn)
    expect(refreshButton.exists()).toBe(true)
    // no iframe yet
    expect(wrapper.html()).not.toContain('<iframe')
  })

  it('correctly loads the iframe on click', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarBeaconNetworkCard },
      {
        props: {
          seqvar: seqvarBrca1
        }
      }
    )

    // act:
    const refreshButton = wrapper.findComponent(VBtn)
    await refreshButton.trigger('click')
    await wrapper.vm.$nextTick()

    // assert:
    // look for the search button
    expect(wrapper.text()).not.toContain('Query Beacon')
    expect(refreshButton.exists()).not.toBe(true)
    // iframe after click
    expect(wrapper.html()).toContain('<iframe')
  })
})
