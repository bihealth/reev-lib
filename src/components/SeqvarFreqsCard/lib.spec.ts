import { describe, expect, it } from 'vitest'

import { type GenomeBuild } from '@/lib/genomeBuilds'
import { type Seqvar } from '@/lib/genomicVars'

import { isVariantMt, isVariantMtHomopolymer } from './lib'

/** Example Sequence variant. */
const seqVar: Seqvar = {
  genomeBuild: 'grch37' as GenomeBuild,
  chrom: '1',
  pos: 12345,
  del: 'A',
  ins: 'G',
  userRepr: 'chr1:12345:A:G'
}

describe.concurrent('isVariantMt method', () => {
  it('should return true if mitochondrial chromosome', () => {
    // arrange:
    seqVar.chrom = 'MT'
    seqVar.chrom = 'M'
    seqVar.chrom = 'chrMT'
    seqVar.chrom = 'chrM'

    // act:
    const result_MT = isVariantMt(seqVar)
    const result_M = isVariantMt(seqVar)
    const result_chrMT = isVariantMt(seqVar)
    const result_chrM = isVariantMt(seqVar)

    // assert:
    expect(result_MT).toBe(true)
    expect(result_M).toBe(true)
    expect(result_chrMT).toBe(true)
    expect(result_chrM).toBe(true)
  })

  it('should return false if not mitochondrial chromosome', () => {
    // arrange:
    seqVar.chrom = '1'

    // act:
    const result = isVariantMt(seqVar)

    // assert:
    expect(result).toBe(false)
  })
})

describe.concurrent('isVariantMtHomopolymer method', () => {
  it('should return true if mitochondrial homopolymer', () => {
    // arrange:
    seqVar.chrom = 'MT'
    seqVar.pos = 70

    // act:
    const result = isVariantMtHomopolymer(seqVar)

    // assert:
    expect(result).toBe(true)
  })

  it('should return false if not mitochondrial homopolymer (chromosome)', () => {
    // arrange:
    seqVar.chrom = '1'
    seqVar.pos = 70

    // act:
    const result = isVariantMtHomopolymer(seqVar)

    // assert:
    expect(result).toBe(false)
  })

  it('should return false if not mitochondrial homopolymer (position)', () => {
    // arrange:
    seqVar.chrom = 'MT'
    seqVar.pos = 1

    // act:
    const result = isVariantMtHomopolymer(seqVar)

    // assert:
    expect(result).toBe(false)
  })
})
