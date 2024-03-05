import fs from 'fs'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

import { setupUrlConfigForTesting, urlConfig } from '../../lib/urlConfig'
import { VigunoClient } from './client'
import { HpoOmimsResult, HpoTermResult } from './types'

/** Mock `fetch()` */
const fetchMocker = createFetchMock(vi)

/** Fixture with response from API. */
const responseResolveOmim616145Json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.resolveOmim.616145.json'), 'utf8')
)
const responseQueryOmimTermsByNameEarly = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.queryOmimTermsByName.early.json'), 'utf8')
)
const responseQueryOmimTermsByNameXxx = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.queryOmimTermsByName.xxx.json'), 'utf8')
)
const responseResolveHpoTermById0000118 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.resolveHpoTermById.0000118.json'), 'utf8')
)
const responseResolveHpoTermByIdAbnormal = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.resolveHpoTermByName.abnormal.json'), 'utf8')
)
const responseResolveHpoTermByIdFoobar = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './fixture.resolveHpoTermByName.foobar.json'), 'utf8')
)

describe.concurrent('VigunoClient.construct()', () => {
  afterEach(() => {
    setupUrlConfigForTesting()
  })

  it('constructs correctly with default base URL', () => {
    // act:
    const client = new VigunoClient()

    // assert:
    expect(client).toBeDefined()
  })

  it('constructs correctly with custom base URL', () => {
    // act:
    const client = new VigunoClient('http://localhost:8080')

    // assert:
    expect(client).toBeDefined()
  })

  it('throws error if no base URL is configured', () => {
    // arrange:
    urlConfig.baseUrlViguno = undefined

    // (guarded)
    expect(() => new VigunoClient(undefined)).toThrow(
      'Configuration error: API base URL not configured'
    )
  })
})

describe.concurrent('Viguno Client', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
    fetchMocker.resetMocks()
  })

  it('resolves OMIM term by ID correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(responseResolveOmim616145Json))

    // act:
    const client = new VigunoClient()
    const result = await client.resolveOmimTermById('123456')

    // assert:
    expect(result).toEqual(HpoOmimsResult.fromJson(responseResolveOmim616145Json))
  })

  it('handles non-existent OMIM term ID', async () => {
    // arrange:
    const errorMessage = 'OMIM term not found'
    fetchMocker.mockResponseOnce(JSON.stringify({ msg: errorMessage }), { status: 404 })

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.resolveOmimTermById('999999')).rejects.toThrow(errorMessage)
  })

  it('handles server error when resolving OMIM term by ID', async () => {
    // arrange:
    const errorMessage = 'Internal Server Error'
    fetchMocker.mockResponseOnce(JSON.stringify({ msg: errorMessage }), { status: 500 })

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.resolveOmimTermById('123456')).rejects.toThrow(errorMessage)
  })

  it('handles network error when resolving OMIM term by ID', async () => {
    // arrange:
    fetchMocker.mockReject(new Error('Network Error'))

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.resolveOmimTermById('123456')).rejects.toThrow('Network Error')
  })

  it('returns a list of OMIM terms for a valid query', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(responseQueryOmimTermsByNameEarly))

    // act:
    const client = new VigunoClient()
    const result = await client.queryOmimTermsByName('early')

    // assert:
    expect(result).toEqual(HpoOmimsResult.fromJson(responseQueryOmimTermsByNameEarly))
  })

  it('returns an empty list for a query with no results', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(responseQueryOmimTermsByNameXxx))

    // act:
    const client = new VigunoClient()
    const result = await client.queryOmimTermsByName('xxx')

    // assert:
    expect(result).toEqual(HpoOmimsResult.fromJson(responseQueryOmimTermsByNameXxx))
  })

  it('handles server error for a query', async () => {
    // arrange:
    const errorMessage = 'Internal Server Error'
    fetchMocker.mockResponseOnce(JSON.stringify({ msg: errorMessage }), { status: 500 })

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.queryOmimTermsByName('Example')).rejects.toThrow(errorMessage)
  })

  it('handles network error during a query', async () => {
    // arrange:
    fetchMocker.mockReject(new Error('Network Error'))

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.queryOmimTermsByName('Example')).rejects.toThrow('Network Error')
  })

  it('resolves HPO term by ID correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(responseResolveHpoTermById0000118))

    // act:
    const client = new VigunoClient()
    const result = await client.resolveHpoTermById('0000118')

    // assert:
    expect(result).toEqual(HpoTermResult.fromJson(responseResolveHpoTermById0000118))
  })

  it('handles non-existent HPO term ID', async () => {
    // arrange:
    const errorMessage = 'HPO term not found'
    fetchMocker.mockResponseOnce(JSON.stringify({ msg: errorMessage }), { status: 404 })

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.resolveHpoTermById('9999999')).rejects.toThrow(errorMessage)
  })

  it('handles server error when resolving HPO term by ID', async () => {
    // arrange:
    const errorMessage = 'Internal Server Error'
    fetchMocker.mockResponseOnce(JSON.stringify({ msg: errorMessage }), { status: 500 })

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.resolveHpoTermById('0000118')).rejects.toThrow(errorMessage)
  })

  it('handles network error when resolving HPO term by ID', async () => {
    // arrange:
    fetchMocker.mockReject(new Error('Network Error'))

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.resolveHpoTermById('0000118')).rejects.toThrow('Network Error')
  })

  it('queries HPO terms by name correctly', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(responseResolveHpoTermByIdAbnormal))

    // act:
    const client = new VigunoClient()
    const result = await client.queryHpoTermsByName('abnormal')

    // assert:
    expect(result).toEqual(HpoTermResult.fromJson(responseResolveHpoTermByIdAbnormal))
  })

  it('returns an empty list for a name query with no results', async () => {
    // arrange:
    fetchMocker.mockResponseOnce(JSON.stringify(responseResolveHpoTermByIdFoobar))

    // act:
    const client = new VigunoClient()
    const result = await client.queryHpoTermsByName('foobar')

    // assert:
    expect(result).toEqual(HpoTermResult.fromJson(responseResolveHpoTermByIdFoobar))
  })

  it('handles server error during name query', async () => {
    // arrange:
    const errorMessage = 'Internal Server Error'
    fetchMocker.mockResponseOnce(JSON.stringify({ msg: errorMessage }), { status: 500 })

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.queryHpoTermsByName('Phenotypic')).rejects.toThrow(errorMessage)
  })

  it('handles network error during name query', async () => {
    // arrange:
    fetchMocker.mockReject(new Error('Network Error'))

    // act:
    const client = new VigunoClient()

    // assert:
    await expect(client.queryHpoTermsByName('Phenotypic')).rejects.toThrow('Network Error')
  })
})
