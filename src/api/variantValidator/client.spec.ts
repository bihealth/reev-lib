import fs from 'fs'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { SeqvarImpl } from '../../lib/genomicVars'
import { setupUrlConfigForTesting, urlConfig } from '../../lib/urlConfig'
import { VariantValidatorClient } from './client'

/** Fixture Seqvar */
const seqvar = new SeqvarImpl('grch37', '6', 24302274, 'T', 'C')

/** Fixture with response from API. */
const responseManeBrca1Json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.maneResponse.BRCA1.json'), 'utf8')
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

describe.concurrent('VariantValidatorClient.construct()', () => {
  afterEach(() => {
    setupUrlConfigForTesting()
  })

  it('constructs correctly with default base URL', () => {
    // act:
    const client = new VariantValidatorClient()

    // assert:
    expect(client).toBeDefined()
  })

  it('constructs correctly with custom base URL', () => {
    // act:
    const client = new VariantValidatorClient('http://localhost:8080')

    // assert:
    expect(client).toBeDefined()
  })

  it('throws error if no base URL is configured', () => {
    // arrange:
    urlConfig.baseUrlVariantValidator = undefined

    // (guarded)
    expect(() => new VariantValidatorClient(undefined)).toThrow(
      'Configuration error: API base URL not configured'
    )
  })
})

describe.concurrent('VariantValidator', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('handles response correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(responseManeBrca1Json))

    // act:
    const client = new VariantValidatorClient()
    const result = await client.fetchVvResults(seqvar)

    // assert:
    expect(result).toMatchSnapshot()
  })

  it('throws in case of fetching problems', async () => {
    // arrange:
    fetchMocker.mockResponse(() => {
      return Promise.reject(new Error('failed to fetch from VariantValidator'))
    })

    // act:
    const client = new VariantValidatorClient()
    // (with guard)
    await expect(async () => await client.fetchVvResults(seqvar)).rejects.toThrow(
      'failed to fetch from VariantValidator'
    )

    // assert:
  })
})
