export const clinsigColor = (description?: string) => {
  if (description === undefined) {
    return 'grey-darken-2'
  }
  if (description.toLowerCase().includes('likely pathogenic')) {
    return 'orange-darken-2'
  } else if (description.toLowerCase().includes('likely benign')) {
    return 'green-lighten-3'
  } else if (description.toLowerCase().includes('pathogenic')) {
    return 'red-darken-3'
  } else if (description.toLowerCase().includes('benign')) {
    return 'green-darken-2'
  } else if (
    description.toLowerCase().includes('uncertain') ||
    description.toLowerCase().includes('conflicting')
  ) {
    return 'grey'
  } else {
    return 'grey-darken-2'
  }
}
