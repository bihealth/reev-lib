/**
 * Converts a number to a string with thousands separator.
 *
 * @param value     The number to separate.
 * @param separator The separator to use.
 */
export const separateIt = (value: number, separator: string = ' '): string => {
  const asString = `${value}`
  if (!asString.length) {
    return '0'
  }

  const splitString = asString.split('.', 1)
  const cardinal = splitString[0]

  if (!cardinal?.length) {
    splitString[0] = '0'
  } else {
    const offset = cardinal.length % 3
    const arr = [cardinal.slice(0, offset)]
    for (let i = 0; i <= cardinal.length; i += 3) {
      arr.push(cardinal.slice(offset + i, offset + i + 3))
    }
    splitString[0] = arr.filter((s) => s.length).join(separator)
  }

  return splitString.join('.')
}

/**
 * Round `value` to `digits` and return an `<abbr>` tag that has the original value
 * as the `@title` and the rounded value as the inner text.  Optionally add a `label`
 * to the `@title`
 *
 * @param value   The value to use and round.
 * @param digits  The number of digits to round to.
 * @param label   The optional label to add.
 * @param naValue
 *                The value to use if `value` is `undefined`.  If `undefined` then will
 *                display `N/A`.
 * @param titleValue
 *                The optional value to use for the `@title` attribute.  If `undefined`
 *                then will use `value`.
 */
export const roundIt = (
  value: number | undefined,
  digits: number = 2,
  label?: string,
  naValue: number | undefined = 0,
  titleValue?: string
): string => {
  const useLabel = label ? `${label}: ` : ''
  if (value === undefined) {
    if (naValue !== undefined) {
      const roundedValue = naValue.toFixed(digits)
      return `<abbr title='${useLabel}${titleValue ?? 'N/A'}'>${roundedValue}</abbr>`
    } else {
      return roundIt(naValue, digits, label, naValue, 'N/A')
    }
  }
  const roundedValue = value.toFixed(digits)
  return `<abbr title="${useLabel}${value}">${roundedValue}</abbr>`
}
