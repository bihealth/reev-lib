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
