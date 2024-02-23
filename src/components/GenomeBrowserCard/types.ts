/** Alias for Genome Browser type. */
export type GenomeBrowser = any

/** Track definition. */
export interface Track {
  name: string
  sourceType: string
  format: string
  visibilityWindow: number
  url: string
  indexURL?: string
  color: string
  displayMode?: string
}
