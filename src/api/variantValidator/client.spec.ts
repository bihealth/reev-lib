import fs from 'fs'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { SeqvarImpl } from '../../lib/genomicVars'
import { VariantValidatorClient } from './client'
import { Response } from './types'

/** Fixture Seqvar */
const seqvar = new SeqvarImpl('grch37', '6', 24302274, 'T', 'C')

/** Fixture with response from API. */
const responseManeBrca1Json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.maneResponse.BRCA1.json'), 'utf8')
)

/** Initialize mock for `fetch()`. */
const fetchMocker = createFetchMock(vi)

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
