import fs from 'fs'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { SeqvarImpl } from '../../lib/genomicVars'
import { VariantValidatorClient } from './client'
import { Response } from './types'

/** Fixture Seqvar */
const seqvar = new SeqvarImpl('grch37', '6', 24302274, 'T', 'C')

/** Fixtures with response from API. */
const maneResponseBrca1Json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.maneResponse.BRCA1.json'), 'utf8')
)
const maneResponseTelomericJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.maneResponse.telomeric.json'), 'utf8')
)

describe.concurrent('Response.fromJson', () => {
  it('handles BRCA1 variant correctly', async () => {
    // arrange:

    // act:
    const result = Response.fromJson(maneResponseBrca1Json)

    // assert:
    expect(result).toMatchSnapshot()
  })

  it('handles telomeric variant correctly', async () => {
    // arrange:

    // act:
    const result = Response.fromJson(maneResponseTelomericJson)

    // assert:
    expect(result).toMatchSnapshot()
  })
})
