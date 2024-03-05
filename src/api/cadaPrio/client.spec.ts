import fs from 'fs'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { setupUrlConfigForTesting, urlConfig } from '../../lib/urlConfig'
import { CadaPrioClient } from './client'

/** Fixture with prediction results. */
const cadaPrioPredictResultJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.predictResponse.json'), 'utf8')
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

describe.concurrent('CadaPrioClient.construct()', () => {
  afterEach(() => {
    setupUrlConfigForTesting()
  })

  it('constructs correctly with default base URL', () => {
    // act:
    const client = new CadaPrioClient()

    // assert:
    expect(client).toBeDefined()
  })

  it('constructs correctly with custom base URL', () => {
    // act:
    const client = new CadaPrioClient('http://localhost:8080')

    // assert:
    expect(client).toBeDefined()
  })

  it('throws error if no base URL is configured', () => {
    // arrange:
    urlConfig.baseUrlCadaPrio = undefined

    // (guarded)
    expect(() => new CadaPrioClient(undefined)).toThrow(
      'Configuration error: API base URL not configured'
    )
  })
})

describe.concurrent('CadaPrioClient.predictGeneImpact()', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('returns the correct result', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(cadaPrioPredictResultJson))

    // act:
    const client = new CadaPrioClient()
    const result = await client.predictGeneImpact(['HP:0000001'])

    // assert:
    expect(JSON.stringify(result)).toMatchSnapshot()
  })

  it('throws in case of fetching problems', async () => {
    // arrange:
    fetchMocker.mockResponse(() => {
      return Promise.reject(new Error('failed to run cada-prio'))
    })

    // act:
    const client = new CadaPrioClient()
    // (with guard)
    await expect(async () => await client.predictGeneImpact(['HP:0000001'])).rejects.toThrow(
      'failed to run cada-prio'
    )

    // assert:
  })
})
