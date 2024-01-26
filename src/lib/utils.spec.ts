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

  it('has correct behaviour with undefined value', () => {
    expect(roundIt(undefined)).toEqual("<abbr title='N/A'>0.00</abbr>")
    expect(roundIt(undefined, 2, 'the-label')).toEqual("<abbr title='the-label: N/A'>0.00</abbr>")
    expect(roundIt(undefined, 2, 'the-label', 1.234567)).toEqual(
      "<abbr title='the-label: N/A'>1.23</abbr>"
    )
  })
})
