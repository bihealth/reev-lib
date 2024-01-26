import { describe, expect, it } from 'vitest'

import { setupMountedComponents } from '../../lib/testUtils'
import DocsLink from './DocsLink.vue'

describe.concurrent('DocsLink.vue', async () => {
  it('uses the correct default prop.baseUrl', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: DocsLink },
      {
        props: {
          anchor: 'the-anchor'
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.find('a').attributes('href')).toEqual(
      'https://reev.readthedocs.io/en/latest/doc_manual.html#the-anchor'
    )
  })

  it('allows to override the prop.baseUrl', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: DocsLink },
      {
        props: {
          anchor: 'the-anchor',
          baseUrl: 'https://example.com'
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.find('a').attributes('href')).toEqual('https://example.com#the-anchor')
  })
})
