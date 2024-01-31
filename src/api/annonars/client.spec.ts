import fs from 'fs'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { LinearStrucvarImpl, SeqvarImpl } from '../../lib/genomicVars'
import { AnnonarsClient } from './client'
import { ClinvarSvQueryResponse, GeneSearchResponse, SeqvarInfoResponse } from './types'

const geneInfoBrca1Json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../components/GenePathogenicityCard/fixture.geneInfo.BRCA1.json'),
    'utf8'
  )
)
const variantInfoBrca1Json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.variantInfo.BRCA1.json'), 'utf8')
)
const searchInfoInfoEmpJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.searchInfo.EMP.json'), 'utf8')
)
const clinvarStrucvarResponseBrca1Json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.strucvarClinvarResponse.BRCA1.json'), 'utf8')
)

const fetchMocker = createFetchMock(vi)

/** Example Sequence Variant */
const seqvar = new SeqvarImpl('grch37', '1', 123, 'A', 'G')

describe.concurrent('AnnonarsClient.fetchGeneInfo()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('fetches gene info correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify({ genes: { 'HGNC:1100': geneInfoBrca1Json } }))

    // act:
    const client = new AnnonarsClient()
    const result = await client.fetchGeneInfo('BRCA1')

    // assert:
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify({ genes: { 'HGNC:1100': geneInfoBrca1Json } })
    )
  })

  it('fails to fetch gene info with wrong HGNC id', async () => {
    // arrange:
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('hgnc_id=BRCA1')) {
        return Promise.resolve(JSON.stringify(geneInfoBrca1Json))
      }
      return Promise.reject(new Error('failed to fetch gene info'))
    })

    // act:
    const client = new AnnonarsClient()
    // (guarded)
    await expect(async () => await client.fetchGeneInfo('123')).rejects.toThrow(
      'failed to fetch gene info'
    )

    // assert:
  })
})

describe.concurrent('AnnonarsClient.fetchVariantInfo()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('fetches variant info correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(variantInfoBrca1Json))

    // act:
    const client = new AnnonarsClient()
    const result = await client.fetchVariantInfo(seqvar)

    // assert:
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(SeqvarInfoResponse.fromJson(variantInfoBrca1Json))
    )
  })

  it('do removes chr prefix from chromosome if genome release is grch38', async () => {
    // arrange:
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('chr')) {
        return Promise.resolve(JSON.stringify(variantInfoBrca1Json))
      }
      return Promise.reject(new Error('failed to fetch variant info'))
    })

    // act:
    const client = new AnnonarsClient()
    const result = await client.fetchVariantInfo(seqvar)

    // assert:
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(SeqvarInfoResponse.fromJson(variantInfoBrca1Json))
    )
  })

  it('fails to fetch variant info with wrong variant', async () => {
    // arrange:
    const seqVarInvalid = new SeqvarImpl('grch37', '1', 123, 'A', 'T')
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('alternative=G')) {
        return Promise.resolve(JSON.stringify(variantInfoBrca1Json))
      }
      return Promise.reject(new Error('failed to fetch variant info'))
    })

    // act:
    const client = new AnnonarsClient()
    // (guarded)
    await expect(async () => await client.fetchVariantInfo(seqVarInvalid)).rejects.toThrow(
      'failed to fetch variant info'
    )

    // assert:
  })
})

describe.concurrent('AnnonarsClient.fetchGeneClinvarInfo()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('fetches gene clinvar info correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(geneInfoBrca1Json))

    // act:
    const client = new AnnonarsClient()
    const result = await client.fetchGeneClinvarInfo('BRCA1')

    // assert:
    expect(JSON.stringify(result)).toEqual(JSON.stringify(geneInfoBrca1Json))
  })

  it('fails to fetch gene clinvar info with wrong HGNC id', async () => {
    // arrange:
    const seqVarInvalid = new SeqvarImpl('grch37', '1', 123, 'A', 'T')
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('hgnc_id=BRCA1')) {
        return Promise.resolve(JSON.stringify(geneInfoBrca1Json))
      }
      return Promise.reject(new Error('failed to fetch gene clinvar info'))
    })

    // act:
    const client = new AnnonarsClient()
    // (guarded)
    await expect(async () => await client.fetchVariantInfo(seqVarInvalid)).rejects.toThrow(
      'failed to fetch gene clinvar info'
    )

    // assert:
  })
})

describe.concurrent('AnnonarsClient.fetchGenes()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('fetches genes correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(searchInfoInfoEmpJson))

    // act:
    const client = new AnnonarsClient()
    const result = await client.fetchGenes(
      'q=BRCA1&fields=hgnc_id,ensembl_gene_id,ncbi_gene_id,symbol'
    )

    // assert:
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(GeneSearchResponse.fromJson(searchInfoInfoEmpJson))
    )
  })

  it('fails to fetch genes with wrong query', async () => {
    // arrange:
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('q=BRCA1')) {
        return Promise.resolve(JSON.stringify(searchInfoInfoEmpJson))
      }
      return Promise.reject(new Error('failed to fetch genes'))
    })

    // act:
    const client = new AnnonarsClient()
    // (guarded)
    await expect(
      async () =>
        await client.fetchGenes('BRCA2&fields=hgnc_id,ensembl_gene_id,ncbi_gene_id,symbol')
    ).rejects.toThrow('failed to fetch genes')

    // assert:
  })
})

describe.concurrent('AnnonarsClient.fetchGeneInfos()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('fetches gene infos correctly', async () => {
    // arrange:
    fetchMocker.mockResponse(JSON.stringify({ genes: { 'HGNC:1100': geneInfoBrca1Json } }))

    // act:
    const client = new AnnonarsClient()
    const result = await client.fetchGeneInfos(['BRCA1', 'BRCA2'])

    // assert:
    expect(JSON.stringify(result)).toMatch(JSON.stringify([geneInfoBrca1Json]))
  })

  it('fails to fetch gene infos with wrong HGNC id', async () => {
    // arrange:
    fetchMocker.mockResponse(() => {
      return Promise.reject(new Error('failed to fetch gene infos'))
    })

    // act:
    const client = new AnnonarsClient()
    // (guarded)
    await expect(async () => await client.fetchGeneInfos(['123', 'BRCA2'])).rejects.toThrow(
      'failed to fetch gene infos'
    )

    // assert:
  })
})

describe.concurrent('AnnonarsClient.fetchClinvarStrucvars()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('fetches overlapping ClinVar Strucvars correctly', async () => {
    // arrange:
    const strucVar = new LinearStrucvarImpl('DEL', 'grch37', '17', 41176312, 41277500)
    fetchMocker.mockResponse(JSON.stringify(clinvarStrucvarResponseBrca1Json))

    // act:
    const client = new AnnonarsClient()
    const result = await client.fetchClinvarStrucvars(strucVar)

    // assert:
    expect(JSON.stringify(result)).toMatch(
      JSON.stringify(ClinvarSvQueryResponse.fromJson(clinvarStrucvarResponseBrca1Json))
    )
  })

  it('fails to overlapping ClinVar Strucvars if query fails', async () => {
    // arrange:
    const strucVar = new LinearStrucvarImpl('DEL', 'grch37', '17', 41176312, 41277500)
    fetchMocker.mockResponse(() => {
      return Promise.reject(new Error('failed to fetch overlapping strucvars'))
    })

    // act:
    const client = new AnnonarsClient()
    // (guarded)
    await expect(async () => await client.fetchClinvarStrucvars(strucVar)).rejects.toThrow(
      'failed to fetch overlapping strucvars'
    )

    // assert:
  })
})
