import fs from 'fs'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { CadaPrioClient } from './client'

/** Fixture with prediction results. */
const cadaPrioPredictResultJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.predictResponse.json'), 'utf8')
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

describe.concurrent('CadaPrioClient', () => {
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
