import fs from 'fs'
import path from 'path'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import type { Strucvar } from '../../lib/genomicVars'
import { StoreState } from '../../store'
import { useStrucvarInfoStore } from './store'

/** Fixtures loaded from JSON files. */
const geneInfoBrca1Json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../components/GenePathogenicityCard/fixture.geneInfo.BRCA1.json'),
    'utf8'
  )
)
const responseClinvarSvRecordsBrca1 = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../../components/StrucvarClinvarCard/fixture.clinvarSvRecords.BRCA1.json'
    ),
    'utf8'
  )
)
const responseCsqDelBrca1Json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.responseCsqDel.BRCA1.json'), 'utf8')
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

/** Example Structure Variant */
const strucvarInfo: Strucvar = {
  genomeBuild: 'grch37',
  svType: 'DEL',
  chrom: '17',
  start: 41176312,
  stop: 41277500,
  userRepr: 'DEL-grch37-17-41176312-41277500'
}

describe('svInfo store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('should have initial state', () => {
    // arrange:
    const store = useStrucvarInfoStore()

    // act: nothing to do

    // assert:
    expect(store.storeState).toBe(StoreState.Initial)
    expect(store.strucvar).toBe(undefined)
    expect(store.genesInfos).toStrictEqual(undefined)
  })

  it('should clear state', () => {
    // arrange:
    const store = useStrucvarInfoStore()
    store.storeState = StoreState.Active
    store.strucvar = structuredClone(strucvarInfo)
    store.genesInfos = [structuredClone(geneInfoBrca1Json)]

    // act:
    store.clearData()

    // assert:
    expect(store.storeState).toBe(StoreState.Initial)
    expect(store.strucvar).toBe(undefined)
    expect(store.genesInfos).toStrictEqual(undefined)
  })

  it('should load data', async () => {
    // arrange:
    fetchMocker.mockResponse((req) => {
      const mehariCsqUrl =
        '/internal/proxy/mehari/strucvars/csq?genome_release=grch37&' +
        'chromosome=17&start=41176312&stop=41277500&sv_type=DEL'
      const annonarsClinvarUrl =
        '/internal/proxy/annonars/clinvar-sv/query?genomeRelease=grch37&' +
        'chromosome=17&start=41176312&stop=41277500&pageSize=1000&minOverlap=0.1'
      const annonarsGeneInfoUrl =
        '/internal/proxy/annonars/genes/info?hgnc_id=' +
        'HGNC:16919,HGNC:1100,HGNC:20691,HGNC:18315'
      switch (req.url) {
        case mehariCsqUrl:
          return Promise.resolve(JSON.stringify(responseCsqDelBrca1Json))
        case annonarsClinvarUrl:
          return Promise.resolve(JSON.stringify(responseClinvarSvRecordsBrca1))
        case annonarsGeneInfoUrl:
          return Promise.resolve(JSON.stringify({ genes: { 'HGNC:1100': geneInfoBrca1Json } }))
        default:
          return Promise.reject(new Error(`Unexpected URL: ${req.url}`))
      }
    })
    const store = useStrucvarInfoStore()

    // act:
    await store.loadData(structuredClone(strucvarInfo))

    // assert:
    expect(store.storeState).toBe(StoreState.Active)
    expect(store.strucvar).toStrictEqual(strucvarInfo)
    expect(store.genesInfos).toStrictEqual([geneInfoBrca1Json])
  })

  it('should correctly handle errors', async () => {
    // arrange:
    // Disable console.error
    const spy = vi.spyOn(console, 'error')
    spy.mockImplementation(() => {})
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('csq')) {
        return Promise.resolve(JSON.stringify({ status: 400 }))
      } else {
        return Promise.resolve(JSON.stringify({ status: 400 }))
      }
    })
    const store = useStrucvarInfoStore()

    // act:
    await store.loadData(structuredClone(strucvarInfo))

    // assert:
    expect(store.storeState).toBe(StoreState.Error)
    expect(store.strucvar).toBe(undefined)
    expect(store.genesInfos).toStrictEqual(undefined)
  })
})
