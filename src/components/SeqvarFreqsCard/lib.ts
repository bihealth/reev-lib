import type { Seqvar } from '../../lib/genomicVars'

/**
 * Returns whether the given variant looks mitochondrial.
 *
 * @param seqvar Small variant to check.
 * @returns whether the position is on the mitochondrial genome
 */
export const isVariantMt = (seqvar: Seqvar): boolean => {
  return ['MT', 'M', 'chrMT', 'chrM'].includes(seqvar?.chrom)
}

/**
 * Returns whether the given position is in a homopolymer on the mitochondrial chromosome.
 *
 * @param seqvar Small variant to check.
 * @returns whether the position is in a mitochondrial homopolymer
 */
export const isVariantMtHomopolymer = (seqvar: Seqvar): boolean => {
  if (!seqvar) {
    return false
  }
  const { pos } = seqvar
  const positionCheck = (pos: number) => {
    return (
      (pos >= 66 && pos <= 71) ||
      (pos >= 300 && pos <= 316) ||
      (pos >= 513 && pos <= 525) ||
      (pos >= 3106 && pos <= 3107) ||
      (pos >= 12418 && pos <= 12425) ||
      (pos >= 16182 && pos <= 16194)
    )
  }
  if (isVariantMt(seqvar)) {
    return positionCheck(pos)
  } else {
    return false
  }
}

export const parRegions: {
  [genomeBuild: string]: { [chrom: string]: { [par: string]: { [pos: string]: number } } }
} = {
  grch37: {
    x: {
      par1: { start: 60001, end: 2699520 },
      par2: { start: 154931044, end: 155260560 }
    },
    y: {
      par1: { start: 10001, end: 2649520 },
      par2: { start: 59034050, end: 59363566 }
    }
  },
  grch38: {
    x: {
      par1: { start: 10001, end: 2781479 },
      par2: { start: 155701383, end: 156030895 }
    },
    y: {
      par1: { start: 10001, end: 2781479 },
      par2: { start: 56887903, end: 57217415 }
    }
  }
}

export const isInParRegion = (seqvar: Seqvar | undefined) => {
  if (!seqvar) {
    return false
  }
  const chrom = seqvar.chrom.replace(/^chr/, '').toLowerCase()
  if (chrom !== 'x' && chrom !== 'y') {
    return false
  }
  const parRegion = parRegions[seqvar.genomeBuild][chrom]
  return (
    (seqvar.pos >= parRegion.par1.start && seqvar.pos <= parRegion.par1.end) ||
    (seqvar.pos >= parRegion.par2.start && seqvar.pos <= parRegion.par2.end)
  )
}

export const chromIsXY = (seqvar: Seqvar | undefined) => {
  if (!seqvar) {
    return false
  }
  const chrom = seqvar.chrom.replace(/^chr/, '')
  return chrom === 'X' || chrom === 'Y'
}
