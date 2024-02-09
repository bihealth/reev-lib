import { describe, expect, it } from 'vitest'

import { PlotlyDataPoint, downsample } from './lib'

// Helper function to generate mock data
const generateMockData = (count: number, start: number = 0): PlotlyDataPoint[] => {
  return Array.from({ length: count }, (_, i) => ({
    x: start + i,
    y: Math.floor(Math.random() * 5) - 2 // Generate random y values between -2 and 2
  }))
}

describe.concurrent('downsample function', () => {
  it('should return identical data when under the threshold for downsampling', () => {
    // arrange
    const mockData = generateMockData(100) // Generate 100 data points
    const windowSize = 10
    const start = 0
    const end = 99

    // act
    const result = downsample(mockData, windowSize, start, end)

    // assert
    expect(result.length).toBe(100) // Expect no downsampling
    expect(result[0].count).toBe(1) // Each data point should have a count of 1
  })

  it('should downsample data correctly when above the threshold', () => {
    // arrange
    const mockData = generateMockData(801, 0) // Generate 800 data points
    const windowSize = 40 // Large window size to ensure noticeable downsampling
    const start = 0
    const end = 799

    // act
    const result = downsample(mockData, windowSize, start, end)

    // assert
    expect(result.length).toBeLessThan(800) // Expect downsampling to reduce data points
    expect(result.every((bin) => bin.count > 0)).toBe(true) // Every bin should have at least one data point
  })

  it('should filter out data points outside of the specified start and end range', () => {
    // arrange
    const mockData = generateMockData(1000, 0)
    const windowSize = 100
    const start = 200
    const end = 299

    // act
    const result = downsample(mockData, windowSize, start, end)

    // assert
    expect(result.length).toBeLessThan(101)
    expect(result.every((bin) => bin.x >= start && bin.x <= end)).toBe(true) // All bins should be within the range
  })

  it('should handle empty data gracefully', () => {
    // arrange
    const mockData: PlotlyDataPoint[] = []
    const windowSize = 10
    const start = 0
    const end = 10

    // act
    const result = downsample(mockData, windowSize, start, end)

    // assert
    expect(result).toEqual([])
  })
})
