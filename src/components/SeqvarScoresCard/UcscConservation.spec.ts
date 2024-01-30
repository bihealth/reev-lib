import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { SeqvarInfoResponse } from '../../api/annonars/types'
import { setupMountedComponents } from '../../lib/testUtils'
import Conservation from './UcscConservation.vue'

/** Load fixtures from files */
const variantInfoBrca1 = SeqvarInfoResponse.fromJson(
  JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../api/annonars/fixture.variantInfo.BRCA1.json'),
      'utf8'
    )
  )
)

describe.concurrent('VariantConservation', async () => {
  it('renders the VariantConservation info', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: Conservation },
      {
        props: {
          varAnnos: variantInfoBrca1.result
        }
      }
    )

    // act: nothing, only test rendering

    // assert:
    expect(wrapper.text()).toContain('ENST00000309486')
  })
})
