/** Interface for plotly data point. */
export interface PlotlyDataPoint {
  x: number
  y: number
}

/** Interface for downsampled data point. */
export interface DownsampledDataPoint {
  x: number
  y: number
  count: number
}

/** Helper function for downstreaming data.
 * @param data - The data to downsample.
 * @param windowSize - The size of the window to downsample.
 * @param start - The start of the data.
 * @param end - The end of the data.
 * @returns The downsampled data.
 */
export const downsample = (
  data: PlotlyDataPoint[],
  windowSize: number,
  start: number,
  end: number
): DownsampledDataPoint[] => {
  // First, filter the data points to only include those within the start and end range
  const filteredData = data.filter((item) => item.x >= start && item.x <= end)

  if (filteredData.length === 0) return []

  // If there are less than 800 variants after filtering, do not downsample
  if (filteredData.length < 800) {
    return filteredData.map((item) => ({ x: item.x, y: item.y, count: 1 }))
  }

  const bins: DownsampledDataPoint[] = []
  const minX = start // Use the provided start as minX
  const maxX = end // Use the provided end as maxX

  for (let x = minX; x <= maxX; x += windowSize) {
    for (let y = -3; y <= 2; y++) {
      bins.push({ x: x + windowSize / 2, y: y, count: 0 })
    }
  }

  filteredData.forEach((point) => {
    const binIndex = Math.floor((point.x - minX) / windowSize)
    if (binIndex < 0 || binIndex >= bins.length / 6) return // Guard against out-of-range errors
    const bin = bins[binIndex * 6 + (point.y + 3)]
    bin.count++
  })

  // Return only bins with count > 0
  return bins.filter((bin) => bin.count > 0)
}
