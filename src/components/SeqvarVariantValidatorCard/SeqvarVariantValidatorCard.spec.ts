import fs from 'fs'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'
import { nextTick } from 'vue'

import { setupMountedComponents } from '@/lib/testUtils'

import type { Seqvar } from '../../lib/genomicVars'
import SeqvarVariantValidatorCard from './SeqvarVariantValidatorCard.vue'

/** Example Sequence Variant */
const seqvar: Seqvar = {
  genomeBuild: 'grch37',
  chrom: '17',
  pos: 43044295,
  del: 'G',
  ins: 'A',
  userRepr: 'grch37-17-43044295-G-A'
}
/** Fixture with response from API. */
const responseManeBrca1Json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../api/variantValidator/fixture.maneResponse.BRCA1.json'),
    'utf8'
  )
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

describe.concurrent('SeqvarVariantValidatorCard.vue', async () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('renders the card on success', async () => {
    // arrange:
    // mock `fetch()`
    fetchMocker.mockResponseOnce(JSON.stringify(responseManeBrca1Json))
    // mount the component
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarVariantValidatorCard },
      {
        props: {
          seqvar: structuredClone(seqvar)
        }
      }
    )

    // act:
    expect(wrapper.text()).toContain('Retrieve Predictions from VariantValidator.org') // guard
    const submitButton = wrapper.find('button')
    expect(submitButton.exists()).toBe(true) // guard
    submitButton.trigger('click')
    await nextTick()

    // assert:
    expect(wrapper.text()).toContain('Loading...')
    const icon = wrapper.find('.v-progress-circular')
    expect(icon.exists()).toBe(true)
  })

  it('renders the card with invalid data', async () => {
    // arrange:
    // mock `fetch()`
    fetchMocker.mockResponseOnce(JSON.stringify({ foo: 'foo' }))
    // mount the component
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarVariantValidatorCard },
      {
        props: {
          seqvar: structuredClone(seqvar)
        }
      }
    )

    // act:
    expect(wrapper.text()).toContain('Retrieve Predictions from VariantValidator.org') // guard
    const submitButton = wrapper.find('button')
    expect(submitButton.exists()).toBe(true) // guard
    submitButton.trigger('click')
    await nextTick()

    // assert:
    expect(wrapper.text()).toContain('Loading...')
    const icon = wrapper.find('.v-progress-circular')
    expect(icon.exists()).toBe(true)
  })

  it('renders the card with response', async () => {
    // arrange:
    // mock `fetch()`
    fetchMocker.mockRejectOnce(new Error('failed to fetch from VariantValidator'))
    // mount the component
    const { wrapper } = await setupMountedComponents(
      { component: SeqvarVariantValidatorCard },
      {
        props: {
          seqvar: structuredClone(seqvar)
        }
      }
    )

    // act:
    expect(wrapper.text()).toContain('Retrieve Predictions from VariantValidator.org') // guard
    const submitButton = wrapper.find('button')
    expect(submitButton.exists()).toBe(true) // guard
    submitButton.trigger('click')
    await nextTick()

    // assert:
    expect(wrapper.text()).toContain('Loading...')
    const icon = wrapper.find('.v-progress-circular')
    expect(icon.exists()).toBe(true)
  })
})
