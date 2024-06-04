import { describe, expect, test } from 'vitest'

import { clinsigColor } from './helpers'

describe.concurrent('helpers.ts', async () => {
  test.each([
    ['Benign', 'green-darken-2'],
    ['Likely benign', 'green-lighten-3'],
    ['Likely pathogenic', 'orange-darken-2'],
    ['Pathogenic', 'red-darken-3'],
    ['Uncertain significance', 'grey-lighten-2'],
    ['Likely benign/benign', 'green-lighten-3'],
    ['Likely pathogenic/pathogenic', 'orange-darken-2'],
    ['Conflicting interpretations', 'grey-lighten-2']
  ])('returns the correct value for %s (%s)', (description: string, expected: string) => {
    expect(clinsigColor(description)).toEqual(expected)
  })
})
