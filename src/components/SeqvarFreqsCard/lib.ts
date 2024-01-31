import { Seqvar } from '../../lib/genomicVars'

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
