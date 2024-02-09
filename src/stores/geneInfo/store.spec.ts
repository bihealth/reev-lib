import fs from 'fs'
import path from 'path'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { StoreState } from '../types'
import { useGeneInfoStore } from './store'

/** Fixtures with response from API. */
const genesTxsResponseBrca1 = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../components/GeneClinvarCard/fixture.genesTxs.BRCA1.37.json'),
    'utf8'
  )
)
const geneClinvarResponseBrca1 = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../api/annonars/fixture.geneClinvar.BRCA1.json'),
    'utf8'
  )
)
const geneInfoResponseBrca1 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../api/annonars/fixture.geneInfo.BRCA1.json'), 'utf8')
)
const hpoTermsResponseBrca1 = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../api/viguno/fixture.resolveHpoTermByGene.BRCA1.json'),
    'utf8'
  )
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

describe('geneInfo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('should have initial state', () => {
    // arrange:
    const store = useGeneInfoStore()

    // act: nothing to do

    // assert:
    expect(store.storeState).toBe(StoreState.Initial)
    expect(store.hgncId).toBe(undefined)
    expect(store.geneInfo).toBe(undefined)
    expect(store.geneClinvar).toBe(undefined)
    expect(store.transcripts).toBe(undefined)
  })

  it('should clear state', () => {
    // arrange:
    const store = useGeneInfoStore()
    store.storeState = StoreState.Active
    store.hgncId = 'BRCA1'
    store.geneInfo = JSON.parse(JSON.stringify({ gene: 'info' }))

    // act:
    store.clearData()

    // assert:
    expect(store.storeState).toBe(StoreState.Initial)
    expect(store.hgncId).toBe(undefined)
    expect(store.geneInfo).toBe(undefined)
    expect(store.geneClinvar).toBe(undefined)
    expect(store.transcripts).toBe(undefined)
  })

  it('should load data', async () => {
    // arrange:
    const store = useGeneInfoStore()
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('info')) {
        return Promise.resolve(JSON.stringify(geneInfoResponseBrca1))
      } else if (req.url.includes('clinvar')) {
        return Promise.resolve(JSON.stringify(geneClinvarResponseBrca1))
      } else if (req.url.includes('genes/txs')) {
        return Promise.resolve(JSON.stringify(genesTxsResponseBrca1))
      } else if (req.url.includes('viguno')) {
        return Promise.resolve(JSON.stringify(hpoTermsResponseBrca1))
      } else {
        return Promise.reject(new Error('Invalid request'))
      }
    })

    // act:
    await store.initialize('HGNC:1100', 'grch37')

    // assert:
    expect(store.storeState).toBe(StoreState.Active)
    expect(store.hgncId).toBe('HGNC:1100')
    expect(store.geneInfo).toMatchSnapshot()
    expect(store.geneClinvar).toMatchSnapshot()
    expect(store.transcripts).toMatchSnapshot()
  })

  it('should fail to load data with invalid request to gene info', async () => {
    // arrange:
    // Disable error logging
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const store = useGeneInfoStore()
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('info')) {
        return Promise.resolve(JSON.stringify(geneInfoResponseBrca1))
      } else if (req.url.includes('clinvar')) {
        return Promise.resolve(JSON.stringify(geneClinvarResponseBrca1))
      } else if (req.url.includes('genes/txs')) {
        return Promise.resolve(JSON.stringify(genesTxsResponseBrca1))
      } else if (req.url.includes('viguno')) {
        return Promise.resolve(JSON.stringify(hpoTermsResponseBrca1))
      } else {
        return Promise.reject(new Error('Invalid request'))
      }
    })

    // act:
    await store.initialize('invalid', 'grch37')

    // assert:
    expect(store.storeState).toBe(StoreState.Error)
    expect(store.hgncId).toBe(undefined)
    expect(store.geneInfo).toBe(undefined)
    expect(store.geneClinvar).toBe(undefined)
    expect(store.transcripts).toBe(undefined)
  })

  it('should fail to load data with invalid request to clinvar info', async () => {
    // arrange:
    // Disable error logging
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const store = useGeneInfoStore()
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('info')) {
        return Promise.resolve(JSON.stringify(geneInfoResponseBrca1))
      } else if (req.url.includes('clinvar')) {
        return Promise.resolve(JSON.stringify(geneClinvarResponseBrca1))
      } else if (req.url.includes('genes/txs')) {
        return Promise.resolve(JSON.stringify(genesTxsResponseBrca1))
      } else if (req.url.includes('viguno')) {
        return Promise.resolve(JSON.stringify(hpoTermsResponseBrca1))
      } else {
        return Promise.reject(new Error('Invalid request'))
      }
    })

    // act:
    await store.initialize('invalid', 'grch37')

    // assert:
    expect(store.storeState).toBe(StoreState.Error)
    expect(store.hgncId).toBe(undefined)
    expect(store.geneInfo).toBe(undefined)
    expect(store.geneClinvar).toBe(undefined)
    expect(store.transcripts).toBe(undefined)
  })

  it('should not load data if gene symbol is the same', async () => {
    // arrange:
    const store = useGeneInfoStore()
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('info')) {
        return Promise.resolve(JSON.stringify(geneInfoResponseBrca1))
      } else if (req.url.includes('clinvar')) {
        return Promise.resolve(JSON.stringify(geneClinvarResponseBrca1))
      } else if (req.url.includes('genes/txs')) {
        return Promise.resolve(JSON.stringify(genesTxsResponseBrca1))
      } else if (req.url.includes('viguno')) {
        return Promise.resolve(JSON.stringify(hpoTermsResponseBrca1))
      } else {
        return Promise.reject(new Error('Invalid request'))
      }
    })

    // act:
    await store.initialize('HGNC:1100', 'grch37')

    // assert:
    expect(store.storeState).toBe(StoreState.Active)
    expect(store.hgncId).toBe('HGNC:1100')
    expect(store.geneInfo).toMatchSnapshot()
    expect(store.geneClinvar).toMatchSnapshot()
    expect(store.hgncId).toBe('HGNC:1100')

    // act2:
    await store.initialize('HGNC:1100', 'grch37')

    // assert2:
    expect(fetchMocker.mock.calls.length).toBe(4)
  })
})
