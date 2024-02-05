import fs from 'fs'
import path from 'path'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { StoreState } from '..'
import { useCadaPrioStore } from './store'

const predictResponseJson = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../api/cadaPrio/fixture.predictResponse.json'),
    'utf8'
  )
)

const fetchMocker = createFetchMock(vi)

describe('Cada Prio Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('should have initial state', () => {
    // arrange:
    const store = useCadaPrioStore()

    // act: nothing to do

    // assert:
    expect(store.storeState).toEqual(StoreState.Initial)
    expect(store.geneRanking).toBe(undefined)
  })

  it('should predict gene impact', async () => {
    // arrange:
    fetchMocker.mockResponse(JSON.stringify(predictResponseJson))
    const store = useCadaPrioStore()

    // act:
    await store.loadData(['HP:0000001'])

    // assert:
    expect(store.storeState).toEqual(StoreState.Active)
    expect(store.geneRanking).toMatchSnapshot()
  })

  it('should handle error when predicting gene impact', async () => {
    // arrange:
    // Disable error logging
    vi.spyOn(console, 'error').mockImplementation(() => {})
    fetchMocker.mockReject(new Error('Internal Server Error'))
    const store = useCadaPrioStore()

    // act:
    await store.loadData(['HP:0000001'])

    // assert:
    expect(store.storeState).toEqual(StoreState.Error)
    expect(store.geneRanking).toBe(undefined)
  })
})
