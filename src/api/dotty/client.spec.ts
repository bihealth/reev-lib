import fs from 'fs'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { DottyClient } from './client'

/** Fixtures with response from API. */
const toSpdiResponseLarp7 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.toSpdiResponse.LARP7.json'), 'utf8')
)
const findTranscriptsResponseBrca1 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.findTranscriptsResponse.BRCA1.json'), 'utf8')
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

describe.concurrent('DottyClient.toSpdi()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('should resolve to SPDI successfully', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(toSpdiResponseLarp7), { status: 200 })

    // act:
    const client = new DottyClient()
    const result = await client.toSpdi('NM_001267039.1(LARP7):c.855dup')

    // assert:
    expect(result).toStrictEqual({
      success: true,
      value: {
        assembly: 'GRCh37',
        contig: '4',
        pos: 113568536,
        referenceDeleted: 'G',
        alternateInserted: 'GA'
      },
      message: null
    })
  })
})

describe.concurrent('DottyClient.fetchTranscripts()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('should load transcripts successfully', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(findTranscriptsResponseBrca1), { status: 200 })

    // act:
    const client = new DottyClient()
    const result = await client.fetchTranscripts('HGNC:1100', 'GRCh37')

    // assert:
    expect(result).toMatchSnapshot()
  })
})
