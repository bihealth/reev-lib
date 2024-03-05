import fs from 'fs'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { SeqvarImpl } from '../../lib/genomicVars'
import { LinearStrucvarImpl } from '../../lib/genomicVars'
import { setupUrlConfigForTesting, urlConfig } from '../../lib/urlConfig'
import { GenomeBuild } from '../../pbs/mehari/txs'
import { MehariClient } from './client'

/** Fixture Seqvar */
const seqvar = new SeqvarImpl('grch37', '1', 123, 'A', 'G')

/** Fixture with gene trancripts. */
const genesTxsBrca1 = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../components/GeneClinvarCard/fixture.genesTxs.BRCA1.37.json'),
    'utf8'
  )
)

/** Fixture with BRCA1 seqvar consequence. */
const seqvarCsqResponseBrca1 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.seqvarCsqResponse.BRCA1.json'), 'utf8')
)

/** Fixture Strucvar affecting BRCA1 */
const strucvar = new LinearStrucvarImpl('DEL', 'grch37', 'chr17', 43044295, 43044297)

/** Fixture with strucvar (BRCA1) consequence */
const strucvarCsqResponseBrca1 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.strucvarCsqResponse.BRCA1.json'), 'utf8')
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

describe.concurrent('MehariClient.construct()', () => {
  afterEach(() => {
    setupUrlConfigForTesting()
  })

  it('constructs correctly with default base URL', () => {
    // act:
    const client = new MehariClient()

    // assert:
    expect(client).toBeDefined()
  })

  it('constructs correctly with custom base URL', () => {
    // act:
    const client = new MehariClient('http://localhost:8080')

    // assert:
    expect(client).toBeDefined()
  })

  it('throws error if no base URL is configured', () => {
    // arrange:
    urlConfig.baseUrlMehari = undefined

    // (guarded)
    expect(() => new MehariClient(undefined)).toThrow(
      'Configuration error: API base URL not configured'
    )
  })
})

describe.concurrent('MehariClient', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('properly returns gene transcripts', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(genesTxsBrca1))

    // act:
    const client = new MehariClient()
    const result = await client.retrieveGeneTranscripts(
      'HGNC:1100',
      GenomeBuild.GENOME_BUILD_GRCH37
    )

    // assert:
    expect(JSON.stringify(result)).toMatchSnapshot()
  })
})

describe.concurrent('MehariClient/seqvar', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('fetches TxCsq info correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(seqvarCsqResponseBrca1))

    // act:
    const client = new MehariClient()
    const result = await client.retrieveSeqvarsCsq(seqvar, 'HGNC:1100')

    // assert:
    expect(JSON.stringify(result)).toMatchSnapshot()
  })

  it('fetches TxCsq info correctly without HGNC id', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(seqvarCsqResponseBrca1))

    // act:
    const client = new MehariClient()
    const result = await client.retrieveSeqvarsCsq(seqvar)

    // assert:
    expect(JSON.stringify(result)).toMatchSnapshot()
  })

  it('fails to fetch variant info with wrong variant', async () => {
    // arrange:
    const seqVarInvalid = new SeqvarImpl('grch37', '1', 123, 'A', 'T')
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('alternative=G')) {
        return Promise.resolve(JSON.stringify(seqvarCsqResponseBrca1))
      }
      return Promise.reject('failed to fetch seqvar')
    })

    // act:
    const client = new MehariClient()
    // (with guard)
    await expect(async () => await client.retrieveSeqvarsCsq(seqVarInvalid)).rejects.toThrow(
      'failed to fetch seqvar'
    )

    // assert:
  })
})

describe.concurrent('MehariClient/strucvar', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('fetches strucvar info correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(strucvarCsqResponseBrca1))

    // act:
    const client = new MehariClient()
    const result = await client.retrieveStrucvarsCsq(strucvar)

    // assert:
    expect(JSON.stringify(result)).toMatchSnapshot()
  })

  it('fails to fetch variant info with wrong variant', async () => {
    // arrange:
    const strucVarInvalid = new LinearStrucvarImpl('DUP', 'grch37', 'chr17', 43044295, 43044297)
    fetchMocker.mockResponse((req) => {
      if (req.url.includes('DEL')) {
        return Promise.resolve(JSON.stringify(strucvarCsqResponseBrca1))
      }
      return Promise.reject('failed to fetch strucvar')
    })

    // act:
    const client = new MehariClient()
    // (with guard)
    await expect(async () => await client.retrieveStrucvarsCsq(strucVarInvalid)).rejects.toThrow(
      'failed to fetch strucvar'
    )

    // assert:
  })
})
