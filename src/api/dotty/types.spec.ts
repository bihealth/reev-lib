import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { SpdiResult, TranscriptResult } from './types'

/** Fixtures with response from API. */
const toSpdiResponseLarp7 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.toSpdiResponse.LARP7.json'), 'utf8')
)
const findTranscriptsResponseBrca1 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.findTranscriptsResponse.BRCA1.json'), 'utf8')
)

describe.concurrent('SpdiResult.fromJson', () => {
  it('handles response to query for BRCA1 correctly', async () => {
    // arrange:

    // act:
    const result = SpdiResult.fromJson(toSpdiResponseLarp7)

    // assert:
    expect(result).toMatchSnapshot()
  })
})

describe.concurrent('TranscriptResult.fromJson', () => {
  it('handles response to query for LARP7 variant correctly', async () => {
    // arrange:

    // act:
    const result = TranscriptResult.fromJson(findTranscriptsResponseBrca1)

    // assert:
    expect(result).toMatchSnapshot()
  })
})
