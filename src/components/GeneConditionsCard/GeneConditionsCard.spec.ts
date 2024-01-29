import fs from 'fs'
import path from 'path'
import { describe, expect, it, test } from 'vitest'
import { nextTick } from 'vue'

import { setupMountedComponents } from '../../lib/testUtils'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import GeneConditionsCard from './GeneConditionsCard.vue'

// Load fixture data for gene TGDS (little data) and BRCA1 (lots of data).
const geneInfoTgds = GeneInfoRecord.fromJsonString(
  fs.readFileSync(
    path.resolve(__dirname, '../GenePathogenicityCard/fixture.geneInfo.TGDS.json'),
    'utf8'
  )
)
const geneInfoBrca1 = GeneInfoRecord.fromJsonString(
  fs.readFileSync(
    path.resolve(__dirname, '../GenePathogenicityCard/fixture.geneInfo.BRCA1.json'),
    'utf8'
  )
)

describe.concurrent('GeneConditionsCard.vue', async () => {
  test.each([
    ['TGDS', geneInfoTgds],
    ['BRCA1', geneInfoBrca1]
  ])(
    'renders the ConditionsCard information for %s',
    async (_geneSymbol: string, geneInfo: GeneInfoRecord) => {
      // arrange:
      const { wrapper } = await setupMountedComponents(
        { component: GeneConditionsCard },
        {
          props: {
            geneInfo,
            hpoTerms: []
          }
        }
      )

      // act: nothing, only test rendering

      // assert:
      expect(wrapper.text()).toContain('Associated Conditions')
    }
  )

  it('expands via "More".', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: GeneConditionsCard },
      {
        props: {
          geneInfo: geneInfoTgds,
          hpoTerms: []
        }
      }
    )

    // act:
    expect(wrapper.text()).not.toContain('Orphanet Disorders') // guard
    expect(wrapper.text()).not.toContain('OMIM Diseases') // guard
    const expandButton = wrapper.find('#conditions-card-expand-button')
    expect(expandButton.exists()).toBe(true) // guard
    await expandButton.trigger('click')

    // assert:
    expect(wrapper.text()).toContain('Orphanet Disorders')
    expect(wrapper.text()).toContain('OMIM Diseases')
  })

  // skipping this test as we cannot properly emit for VSwitch
  it.skip('shows numerical values for HPO terms.', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: GeneConditionsCard },
      {
        props: {
          geneInfo: geneInfoTgds,
          hpoTerms: [
            {
              term_id: 'HP:0000001',
              name: 'Example HPO Term'
            },
            {
              term_id: 'HP:0000002',
              name: 'Example HPO Term 2'
            }
          ]
        }
      }
    )

    // act:
    expect(wrapper.text()).toContain('Example HPO Term') // guard
    expect(wrapper.text()).toContain('Example HPO Term 2') // guard
    expect(wrapper.text()).not.toContain('HP:0000001') // guard
    expect(wrapper.text()).not.toContain('HP:0000002') // guard

    const vSwitches = wrapper.findAllComponents({ name: 'VSwitch' })
    expect(vSwitches.length).toBe(2) // guard
    const showTermsIdSwitch = vSwitches.find((vSwitch) => vSwitch.text() === 'numeric terms')
    expect(showTermsIdSwitch?.exists()).toBe(true) // guard

    await showTermsIdSwitch!.trigger('click')
    await showTermsIdSwitch!.vm.$emit('change', true)
    await showTermsIdSwitch!.vm.$emit('click')
    await nextTick()

    // assert:
    expect(showTermsIdSwitch?.vm.$props.value).toBe(true)
    console.log(wrapper.text())
    expect(wrapper.text()).toContain('HP:0000001')
    expect(wrapper.text()).toContain('HP:0000002')
  })

  // skipping this test as we cannot properly emit for VSwitch
  it.skip('shows links for HPO terms.', async () => {
    // arrange:
    const { wrapper } = await setupMountedComponents(
      { component: GeneConditionsCard },
      {
        props: {
          geneInfo: geneInfoBrca1,
          hpoTerms: [
            {
              term_id: 'HP:0000001',
              name: 'Example HPO Term'
            },
            {
              term_id: 'HP:0000002',
              name: 'Example HPO Term 2'
            }
          ]
        }
      }
    )

    // act:
    expect(wrapper.text()).toContain('Example HPO Term') // guard
    expect(wrapper.text()).toContain('Example HPO Term 2') // guard
    expect(wrapper.html()).toContain('https://hpo.jax.org/app/browse/term/HP:0000001') // guard

    const vSwitches = wrapper.findAllComponents({ name: 'VSwitch' })
    expect(vSwitches.length).toBe(2) // guard
    const showTermsIdSwitch = vSwitches.find((vSwitch) => vSwitch.text() === 'show links')
    expect(showTermsIdSwitch?.exists()).toBe(true) // guard

    await showTermsIdSwitch?.vm.$emit('change', false)
    await showTermsIdSwitch?.vm.$emit('click')

    // assert:
    expect(showTermsIdSwitch?.vm.$props.value).toBe(false)
    expect(wrapper.html()).not.toContain('https://hpo.jax.org/app/browse/term/HP:0000001')
  })
})
