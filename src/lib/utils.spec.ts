import { describe, expect, it } from 'vitest'

import { roundIt } from './utils'

describe('roundIt', () => {
  it('rounds to 2 decimals by default', () => {
    expect(roundIt(1.234567)).toEqual('<abbr title="1.234567">1.23</abbr>')
  })

  it('rounds to 3 decimals when configured', () => {
    expect(roundIt(1.234567, 3)).toEqual('<abbr title="1.234567">1.235</abbr>')
  })

  it('allows to set the label', () => {
    expect(roundIt(1.234567, 2, 'the-label')).toEqual(
      '<abbr title="the-label: 1.234567">1.23</abbr>'
    )
  })
})
