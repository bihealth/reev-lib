import { describe, expect, it } from 'vitest'

import { roundIt, separateIt } from './utils'

describe.concurrent('separateIt method', () => {
  it('should separate a positive value with default separator', () => {
    const result = separateIt(123456789)
    expect(result).toBe('123 456 789')
  })

  it('should separate a positive value with specified separator', () => {
    const result = separateIt(123456789, ',')
    expect(result).toBe('123,456,789')
  })

  it('should handle zero value', () => {
    const result = separateIt(0)
    expect(result).toBe('0')
  })

  it('should handle float value', () => {
    const result = separateIt(123456789.12345)
    expect(result).toBe('123 456 789')
  })

  it('should handle values less then 0', () => {
    const result = separateIt(0.0134)
    expect(result).toBe('0')
  })
})

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
