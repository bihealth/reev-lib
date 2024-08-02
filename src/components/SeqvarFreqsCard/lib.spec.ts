import { describe, expect, it } from 'vitest'

import { type GenomeBuild } from '../../lib/genomeBuilds'
import { type Seqvar } from '../../lib/genomicVars'
import { chromIsXY, isInParRegion, isVariantMt, isVariantMtHomopolymer } from './lib'

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

describe.concurrent('isInParRegion method', () => {
  it('should return true if X variant is in PAR1 region', () => {
    seqVar.chrom = 'X'
    seqVar.pos = 60001

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if X variant is in PAR1 region', () => {
    seqVar.chrom = 'X'
    seqVar.pos = 2699520

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if X variant is in PAR2 region', () => {
    seqVar.chrom = 'X'
    seqVar.pos = 154931044

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if X variant is in PAR2 region', () => {
    seqVar.chrom = 'X'
    seqVar.pos = 155260560

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return false if X variant is in PAR2 region', () => {
    seqVar.chrom = 'X'
    seqVar.pos = 5000000

    const result = isInParRegion(seqVar)

    expect(result).toBe(false)
  })

  it('should return true if Y variant is in PAR1 region', () => {
    seqVar.chrom = 'Y'
    seqVar.pos = 10001

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if Y variant is in PAR1 region', () => {
    seqVar.chrom = 'Y'
    seqVar.pos = 2649520

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if Y variant is in PAR2 region', () => {
    seqVar.chrom = 'Y'
    seqVar.pos = 59034050

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if Y variant is in PAR2 region', () => {
    seqVar.chrom = 'Y'
    seqVar.pos = 59363566

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return false if Y variant is in PAR2 region', () => {
    seqVar.chrom = 'Y'
    seqVar.pos = 5000000

    const result = isInParRegion(seqVar)

    expect(result).toBe(false)
  })

  it('should return true if GRCh38 X variant is in PAR1 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'X'
    seqVar.pos = 10001

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if GRCh38 X variant is in PAR1 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'X'
    seqVar.pos = 2781479

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if GRCh38 X variant is in PAR2 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'X'
    seqVar.pos = 155701383

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if GRCh38 X variant is in PAR2 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'X'
    seqVar.pos = 156030895

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return false if GRCh38 X variant is in PAR2 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'X'
    seqVar.pos = 5000000

    const result = isInParRegion(seqVar)

    expect(result).toBe(false)
  })

  it('should return true if GRCh38 Y variant is in PAR1 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'Y'
    seqVar.pos = 10001

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if GRCh38 Y variant is in PAR1 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'Y'
    seqVar.pos = 2781479

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if GRCh38 Y variant is in PAR2 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'Y'
    seqVar.pos = 56887903

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if GRCh38 Y variant is in PAR2 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'Y'
    seqVar.pos = 57217415

    const result = isInParRegion(seqVar)

    expect(result).toBe(true)
  })

  it('should return false if GRCh38 Y variant is in PAR2 region', () => {
    seqVar.genomeBuild = 'grch38'
    seqVar.chrom = 'Y'
    seqVar.pos = 5000000

    const result = isInParRegion(seqVar)

    expect(result).toBe(false)
  })
})

describe.concurrent('chromIsXY method', () => {
  it('should return true if X chromosome', () => {
    seqVar.chrom = 'X'

    const result = chromIsXY(seqVar)

    expect(result).toBe(true)
  })

  it('should return true if Y chromosome', () => {
    seqVar.chrom = 'Y'

    const result = chromIsXY(seqVar)

    expect(result).toBe(true)
  })

  it('should return false if not X or Y chromosome', () => {
    seqVar.chrom = '1'

    const result = chromIsXY(seqVar)

    expect(result).toBe(false)
  })
})
