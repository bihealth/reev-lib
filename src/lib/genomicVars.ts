/**
 * Code for genomic variant representation and parsing.
 */
import {
  CHROM_LENGTHS_37,
  CHROM_LENGTHS_38,
  GENOME_BUILD_ALIASES,
  GENOME_BUILD_LABELS,
  type GenomeBuild,
  REFSEQ_CHROM_37,
  REFSEQ_CHROM_38,
  refseqToGenomeBuild
} from './genomeBuilds'

/** Regular expression for gnomAD variant identifiers. */
export const REGEX_GNOMAD_VARIANT =
  /^(?:(?<genomeBuild>(?:\w+))-)?(?<chrom>(?:chr)?(?:[1-9]|1[0-9]|2[0-2]|X|Y|M|MT))-(?<pos>\d+)-(?<del>[ACGT]+)-(?<ins>[ACGT]+)$/i

/** Regular expression for Canonical SPDI variant identifiers. */
export const REGEX_CANONICAL_SPDI =
  /^(?<sequence>NC_(?:\d\d\d\d\d\d\.\d+)):(?<pos>\d+):(?<del>[ACGT]+):(?<ins>[ACGT]+)$/i

/** Interface for regex groups when parsing with `REGEX_CANONICAL_SPDI`. */
export interface RegexCanonicalSpdiGroups {
  sequence: string
  pos: string
  del: string
  ins: string
}

/** Regular expression for "relaxed SPDI" variant identifiers. */
export const REGEX_RELAXED_SPDI =
  /^(?:(?<genomeBuild>(?:\w+)):)?(?<chrom>(?:chr)?(?:[1-9]|1[0-9]|2[0-2]|X|Y|M|MT)):(?<pos>\d+):(?<del>[ACGT]+):(?<ins>[ACGT]+)$/i

/** Interface for regex groups when parsing with `REGEX_GNOMAD_VARIANT` or `REGEX_RELAXED_SPDI`. */
export interface RegexRelaxedSpdiGroups {
  genomeBuild?: string
  chrom: string
  pos: string
  del: string
  ins: string
}

/** Regular expression for dbSNP */
export const REGEX_DBSNP_ID = /^rs\d+$/i

/** Regular expression for ClinVar RCV and VCV identifiers. */
export const REGEX_CLINVAR_ID =
  /^(?<accession>(?:RCV|VCV)\d\d\d\d\d\d\d\d\d)(?:\.(?<version>\d+))?$/i

/** Interface for regex groups when parsing with `REGEX_CLINVAR_ID`. */
export interface RegexClinvarIdGroups {
  accession: string
  version?: string
}

/** Regular expression for colon-separated format of deletions and duplications. */
export const REGEX_CNV_COLON =
  /^(?<svType>DEL|DUP):(?:(?:(?:(?<genomeBuild>(?:\w+)):)?(?<chrom>(?:chr)?(?:[1-9]|1[0-9]|2[0-2]|X|Y|M|MT)))|(?<sequence>NC_(?:\d\d\d\d\d\d\.\d+))):(?<start>\d+):(?<stop>\d+)$/i

/** Regular expression for hypen-separated format of deletions and duplications. */
export const REGEX_CNV_HYPHEN =
  /^(?<svType>DEL|DUP)-(?:(?:(?:(?<genomeBuild>(?:\w+))-)?(?<chrom>(?:chr)?(?:[1-9]|1[0-9]|2[0-2]|X|Y|M|MT)))|(?<sequence>NC_(?:\d\d\d\d\d\d\.\d+)))-(?<start>\d+)-(?<stop>\d+)$/i

/** CNV types. */
export type CnvType = 'DEL' | 'DUP'

/** Currently supported SV types. */
export type SvType = CnvType | 'INV' | 'INS' | 'BND'

/** Interface for regex groups when parsing with `REGEX_CNV_COLON` or `REGEX_CNV_HYPHEN`. */
export interface RegexCnvGroups {
  svType: string
  genomeBuild?: string
  chrom?: string
  sequence?: string
  start: string
  stop: string
}

/** Regular expression for ISCN 2020 CNV format. */
export const REGEX_CNV_ISCN_2020 =
  /^(?:(?:arr\[(?<genomeBuildA>(?:\w+))\])|(?<genomeBuildB>(?:\w+))) (?<chromL>(?:chr)?(?:[1-9]|1[0-9]|2[0-2]|X|Y|M|MT))(?<armL>([pq]\d+))(?:\.(?<chromR>(?:chr)?(?:[1-9]|1[0-9]|2[0-2]|X|Y|M|MT))(?<armR>[pq]\d+))? *\((?<start>[,\d]+)_(?<stop>[,\d]+)\)x(?<copyNumber>\d+)$/

/** Interface for regex groups when parsing with `REGEX_CNV_ISCN_2020`. */
export interface RegexCnvIscnGroups {
  genomeBuildA?: string
  genomeBuildB?: string
  chromL: string
  armL: string
  chromR: string
  armR: string
  start: string
  stop: string
  copyNumber: string
}

/**
 * Interface that represents a canonical sequence variant that also provides.
 *
 * The user-facing representation of the variant can be stored (e.g., what
 * the user entered) or computed (e.g., from the variant's internal
 * representation).
 */
export interface Seqvar {
  /** Genome build */
  genomeBuild: GenomeBuild
  /**
   * Canonical chromomsome name "1", .., "22", "X", "Y", "MT"
   * **without** `chr` prefix.
   */
  chrom: string
  /** 1-based position */
  pos: number
  /** Deleted bases */
  del: string
  /** Inserted bases */
  ins: string
  /** Return user-facing representation of variant. */
  userRepr: string
}

/**
 * Implementation of the `Seqvar` interface.
 */
export class SeqvarImpl implements Seqvar {
  genomeBuild: GenomeBuild
  chrom: string
  pos: number
  del: string
  ins: string
  userRepr: string

  constructor(
    genomeBuild: GenomeBuild,
    chrom: string,
    pos: number,
    del: string,
    ins: string,
    userRepr?: string
  ) {
    this.genomeBuild = genomeBuild
    this.chrom = chrom
    this.pos = pos
    this.del = del
    this.ins = ins
    this.userRepr =
      userRepr ?? `${this.genomeBuild}-${this.chrom}-${this.pos}-${this.del}-${this.ins}`
  }

  /** Return the "object name" to be used in the API to the backend etc. */
  toName(): string {
    return `${this.genomeBuild}-${this.chrom}-${this.pos}-${this.del}-${this.ins}`
  }
}

/**
 * Construct a `SeqvarImpl` from a `Seqvar`.
 */
export function seqvarImplFromSeqvar(variant: Seqvar): SeqvarImpl {
  return new SeqvarImpl(
    variant.genomeBuild,
    variant.chrom,
    variant.pos,
    variant.del,
    variant.ins,
    variant.userRepr
  )
}

/** Base class for exceptions when parsing variants. */
export class InvalidVariant extends Error {
  constructor(message: string) {
    super(message)
  }
}

/** Exception type for issues with parsing sequence variants. */
export class ParseError extends InvalidVariant {
  constructor(message: string) {
    super(message)
  }
}

/** Exception type for issues with parsing sequence variants. */
export class InvalidPos extends InvalidVariant {
  constructor(message: string) {
    super(message)
  }
}

/**
 * Return SequenceVariant validated for valid positions.
 *
 * @throws {InvalidPos} If the variant is invalid.
 */
export function validateSeqvar(variant: Seqvar): Seqvar {
  if (variant.pos < 1) {
    throw new InvalidPos(`Invalid position: ${variant.pos}`)
  }
  const stopPos = variant.pos + variant.del.length - 1
  if (
    (variant.genomeBuild === 'grch37' && stopPos > CHROM_LENGTHS_37[variant.chrom]) ||
    (variant.genomeBuild === 'grch38' && stopPos > CHROM_LENGTHS_38[variant.chrom])
  ) {
    throw new InvalidPos(`Invalid position: ${variant.pos}`)
  }
  return variant
}

/** Helper that performs the chromosome name normalization. */
function normalizeChrom(value: string): string {
  return value.toLowerCase().replace(/^chr/, '').replace(/^m$/, 'mt').toUpperCase()
}

/** Helper that returns `GenotypeBuild` for the given `value` or throws. */
function validatedGenomeBuild(value: string | undefined, defaultValue: GenomeBuild): GenomeBuild {
  if (!value) {
    // none given, use default
    return defaultValue
  } else {
    // validate genome builds against known ones
    for (const [alias, build] of Object.entries(GENOME_BUILD_ALIASES)) {
      if (value?.toUpperCase() === alias.toUpperCase()) {
        return build
      }
    }
    throw new ParseError(`Unknown genome build: ${value}`)
  }
}

/**
 * Attempt parsing of colon/hyphen-separated sequence variant.
 *
 * The chromsome will be normalized as such that the "chr" prefix is removed, X and Y
 * are transformed into upper case and "M" is transformed to "MT".
 *
 * @param value - The gnomAD variant to parse.
 * @param defaultGenomeBuild - The genome build to use as a fallback.
 *
 * @throws {ParseError} If the variant cannot be parsed or the genome build is invalid.
 */
export function parseSeparatedSeqvar(
  value: string,
  defaultGenomeBuild: GenomeBuild = 'grch37'
): Seqvar {
  const match = value.match(REGEX_GNOMAD_VARIANT) ?? value.match(REGEX_RELAXED_SPDI)
  if (!match || !match.groups) {
    throw new ParseError(`Unable to parse colon/hyphen separated seqvar: ${value}`)
  }

  let {
    // eslint-disable-next-line prefer-const
    genomeBuild: genomeBuildValue,
    chrom,
    // eslint-disable-next-line prefer-const
    pos,
    del,
    ins
  } = match.groups as unknown as RegexRelaxedSpdiGroups

  // get validated genome build
  const genomeBuild = validatedGenomeBuild(genomeBuildValue, defaultGenomeBuild)
  // normalize chromosome
  chrom = normalizeChrom(chrom)
  // normalize case of DEL/INS
  del = del.toUpperCase()
  ins = ins.toUpperCase()

  return validateSeqvar({
    genomeBuild,
    chrom,
    pos: parseInt(pos),
    del: del.toUpperCase(),
    ins: ins.toUpperCase(),
    userRepr: `${GENOME_BUILD_LABELS[genomeBuild]}-${chrom}-${pos}-${del}-${ins}`
  })
}

/**
 * Attempt parsing of a canonical SPDI variant.
 *
 * @param value - The canonical SPDI variant to parse.
 *
 * @throws {ParseError} If the variant cannot be parsed or the sequence is invalid.
 */
export function parseCanonicalSpdiSeqvar(value: string): Seqvar {
  const match = value.match(REGEX_CANONICAL_SPDI)
  if (!match || !match.groups) {
    throw new ParseError(`Unable to parse canonical SPDI variant: ${value}`)
  }

  // eslint-disable-next-line prefer-const
  let { sequence, pos, del, ins } = match.groups as unknown as RegexCanonicalSpdiGroups

  // Lookup sequence (all upper case) in the GRCh37/GRCh38 mapping
  sequence = sequence.toUpperCase()
  let chrom: string
  let genomeBuild: GenomeBuild
  if (sequence in REFSEQ_CHROM_37) {
    genomeBuild = 'grch37'
    chrom = REFSEQ_CHROM_37[sequence]
  } else if (sequence in REFSEQ_CHROM_38) {
    genomeBuild = 'grch38'
    chrom = REFSEQ_CHROM_38[sequence]
  } else {
    throw new ParseError(`Unknown sequence: ${sequence}`)
  }

  // normalize case of DEL/INS
  del = del.toUpperCase()
  ins = ins.toUpperCase()

  return validateSeqvar({
    genomeBuild,
    chrom,
    pos: parseInt(pos),
    del: del.toUpperCase(),
    ins: ins.toUpperCase(),
    userRepr: `${GENOME_BUILD_LABELS[genomeBuild]}-${chrom}-${pos}-${del}-${ins}`
  })
}

/**
 * Interface that describes a canonical DEL, DUP, or INV strucvar.
 *
 * This will later be extended to inversions as well.
 */
export interface LinearStrucvar {
  /** The type of the SV. */
  svType: 'DEL' | 'DUP' | 'INV'
  /** The genome build. */
  genomeBuild: GenomeBuild
  /**
   * Canonical chromomsome name "1", .., "22", "X", "Y", "MT"
   * **without** `chr` prefix.
   */
  chrom: string
  /** The 1-based start position. */
  start: number
  /** The 1-based stop position. */
  stop: number
  /** The copy number. */
  copyNumber?: number
  /** The user-facing representation. */
  userRepr: string
}

/**
 * Implementation of the `LinearStrucvar` interface.
 */
export class LinearStrucvarImpl implements LinearStrucvar {
  svType: 'DEL' | 'DUP' | 'INV'
  genomeBuild: GenomeBuild
  chrom: string
  start: number
  stop: number
  copyNumber?: number
  userRepr: string

  constructor(
    svType: 'DEL' | 'DUP' | 'INV',
    genomeBuild: GenomeBuild,
    chrom: string,
    start: number,
    stop: number,
    copyNumber?: number,
    userRepr?: string
  ) {
    this.svType = svType
    this.genomeBuild = genomeBuild
    this.chrom = chrom
    this.start = start
    this.stop = stop
    this.copyNumber = copyNumber
    this.userRepr =
      userRepr ?? `${this.svType}-${this.genomeBuild}-${this.chrom}-${this.start}-${this.stop}`
  }

  /** Return the "object name" to be used in the API to the backend etc. */
  toName(): string {
    return `${this.svType}-${this.genomeBuild}-${this.chrom}-${this.start}-${this.stop}`
  }
}

/**
 * Construct a `LinearStrucvarImpl` from a `LinearStrucvar`.
 */
export function linearStrucvarImplFromLinearStrucvar(variant: LinearStrucvar): LinearStrucvarImpl {
  return new LinearStrucvarImpl(
    variant.svType,
    variant.genomeBuild,
    variant.chrom,
    variant.start,
    variant.stop,
    variant.copyNumber,
    variant.userRepr
  )
}

/**
 * The strand orientation of a breakend.
 */
export enum StrandOrientation {
  /** 3' to 3' */
  THREE_TO_THREE = '3to3',
  /** 5' to 3' */
  FIVE_TO_THREE = '5to3',
  /** 3' to 5' */
  THREE_TO_FIVE = '3to5',
  /** 5' to 5' */
  FIVE_TO_FIVE = '5to5',
  /** not applicable or unknown */
  NOT_APPLICABLE = 'NtoN'
}

/**
 * Interface that describes a insertion strucvar.
 */
export interface InsertionStrucvar {
  /** The type of the SV. */
  svType: 'INS'
  /** The genome build. */
  genomeBuild: GenomeBuild
  /**
   * Canonical chromomsome name "1", .., "22", "X", "Y", "MT"
   * **without** `chr` prefix.
   */
  chrom: string
  /** The 1-based position. */
  start: number
  /** The inserted sequence. */
  insSeq?: string
  /** The length of the inserted sequence. */
  insLen?: number
  /** The user-facing representation. */
  userRepr: string
}

/**
 * Implementation of the `InsertionStrucvar` interface.
 */
export class InsertionStrucvarImpl implements InsertionStrucvar {
  svType: 'INS'
  genomeBuild: GenomeBuild
  chrom: string
  start: number
  insSeq?: string
  insLen?: number
  userRepr: string

  constructor(
    genomeBuild: GenomeBuild,
    chrom: string,
    start: number,
    insSeq?: string,
    insLen?: number,
    userRepr?: string
  ) {
    this.svType = 'INS'
    this.genomeBuild = genomeBuild
    this.chrom = chrom
    this.start = start
    this.insSeq = insSeq
    this.insLen = insLen
    let tmp = `${this.svType}-${this.genomeBuild}-${this.chrom}-${this.start}`
    if (insSeq !== undefined) {
      tmp += `-${insSeq}`
    } else if (insLen !== undefined) {
      tmp += `-${insLen}`
    }
    this.userRepr = userRepr ?? tmp
  }

  /** Return the "object name" to be used in the API to the backend etc. */
  toName(): string {
    let tmp = `${this.svType}-${this.genomeBuild}-${this.chrom}-${this.start}`
    if (this.insSeq !== undefined) {
      tmp += `-${this.insSeq}`
    } else if (this.insLen !== undefined) {
      tmp += `-${this.insLen}`
    }
    return tmp
  }
}

/**
 * Construct a `InsertionStrucvarImpl` from a `InsertionStrucvar`.
 */
export function insertionStrucvarImplFromInsertionStrucvar(
  ins: InsertionStrucvar
): InsertionStrucvarImpl {
  return new InsertionStrucvarImpl(
    ins.genomeBuild,
    ins.chrom,
    ins.start,
    ins.insSeq,
    ins.insLen,
    ins.userRepr
  )
}

/**
 * Interface that describes a breakend.
 */
export interface BreakendStrucvar {
  /** The type of the SV. */
  svType: 'BND'
  /** The genome build. */
  genomeBuild: GenomeBuild
  /**
   * Canonical chromomsome name "1", .., "22", "X", "Y", "MT" **without**
   * `chr` prefix.
   */
  chrom: string
  /** Canonical chromosome of the second end. */
  chrom2: string
  /** The 1-based start position. */
  start: number
  /** The 1-based stop position (on second end). */
  stop: number
  /** Strand orientation */
  strandOrientation: StrandOrientation
  /** The user-facing representation. */
  userRepr: string
}

/**
 * Implementation of the `BreakendStrucvar` interface.
 */
export class BreakendStrucvarImpl implements BreakendStrucvar {
  svType: 'BND'
  genomeBuild: GenomeBuild
  chrom: string
  chrom2: string
  start: number
  stop: number
  strandOrientation: StrandOrientation
  userRepr: string

  constructor(
    genomeBuild: GenomeBuild,
    chrom: string,
    chrom2: string,
    start: number,
    stop: number,
    strandOrientation?: StrandOrientation,
    userRepr?: string
  ) {
    this.svType = 'BND'
    this.genomeBuild = genomeBuild
    this.chrom = chrom
    this.chrom2 = chrom2
    this.start = start
    this.stop = stop
    this.strandOrientation = strandOrientation ?? StrandOrientation.NOT_APPLICABLE
    this.userRepr =
      userRepr ??
      `${this.svType}-${this.genomeBuild}-${this.chrom}-${this.start}-${this.chrom2}-` +
        `${this.stop}-${this.strandOrientation}`
  }

  /** Return the "object name" to be used in the API to the backend etc. */
  toName(): string {
    return (
      `${this.svType}-${this.genomeBuild}-${this.chrom}-${this.start}-${this.chrom2}-` +
      `${this.stop}-${this.strandOrientation}`
    )
  }
}

/**
 * Construct a `BreakendStrucvarImpl` from a `BreakendStrucvar`.
 */
export function breakendStrucvarImplFromBreakendStrucvar(
  bnd: BreakendStrucvar
): BreakendStrucvarImpl {
  return new BreakendStrucvarImpl(
    bnd.genomeBuild,
    bnd.chrom,
    bnd.chrom2,
    bnd.start,
    bnd.stop,
    bnd.strandOrientation,
    bnd.userRepr
  )
}

/** All supported structural variant types. */
export type Strucvar = LinearStrucvar | InsertionStrucvar | BreakendStrucvar

/**
 * Attempt parsing of a colon/hyphen-separated structural variant.
 *
 * Will leave the `copyNumber` field `undefined`.
 *
 * @param value - The linear structural variant to parse.
 * @param defaultGenomeBuild - The genome build to use as a fallback.
 *
 * @throws {ParseError} If the variant cannot be parsed or the sequence is invalid.
 */
export function parseSeparatedStrucvar(
  value: string,
  defaultGenomeBuild: GenomeBuild = 'grch37'
): Strucvar {
  const match = value.match(REGEX_CNV_COLON) ?? value.match(REGEX_CNV_HYPHEN)
  if (!match || !match.groups) {
    throw new ParseError(`Unable to parse colon/hyphen separated strucvar: ${value}`)
  }

  // Obtain the genome build and chromosome from the parsed groups.  Also,
  // perform validation.
  const {
    svType: svType$Regex,
    genomeBuild: genomeBuildValue,
    sequence,
    chrom: chromValue,
    start: startValue,
    stop: stopValue
  } = match.groups as unknown as RegexCnvGroups

  let genomeBuild: GenomeBuild
  let chrom: string

  // If the sequence was given then derive the genome build from this.
  if (sequence?.length) {
    genomeBuild = refseqToGenomeBuild(sequence)
    if (genomeBuild == 'grch37') {
      chrom = REFSEQ_CHROM_37[sequence]
    } else {
      chrom = REFSEQ_CHROM_38[sequence]
    }
  } else if (chromValue?.length) {
    // get validated genome build
    genomeBuild = validatedGenomeBuild(genomeBuildValue, defaultGenomeBuild)
    // normalize chromosome
    chrom = normalizeChrom(chromValue)
  } else {
    throw Error('Unreachable code, either sequence or chromValue must be defined')
  }

  // Validate positions.
  const start = parseInt(startValue)
  const stop = parseInt(stopValue)
  if (start > stop || start < 1) {
    throw new ParseError(`Invalid positions: start=${start}, stop=${stop}`)
  } else {
    const lengths = genomeBuild == 'grch37' ? CHROM_LENGTHS_37 : CHROM_LENGTHS_38
    if (start > lengths[chrom] || stop > lengths[chrom]) {
      throw new ParseError(`Invalid positions: start=${start}, stop=${stop}`)
    }
  }

  // Normalize the SV type.
  let svType: SvType
  if (svType$Regex.toUpperCase() === 'DEL') {
    svType = 'DEL'
  } else if (svType$Regex.toUpperCase() === 'DUP') {
    svType = 'DUP'
  } else {
    throw new ParseError(`Unknown SV type: ${svType$Regex}`)
  }

  return {
    svType,
    genomeBuild,
    chrom,
    start,
    stop,
    copyNumber: undefined,
    userRepr: `${svType}-${GENOME_BUILD_LABELS[genomeBuild]}-${chrom}-${start}-${stop}`
  }
}

/**
 * Attempt parsing of a ISCN array CNV.
 *
 * @param value - The CNV variant to parse.
 * @param defaultGenomeBuild - The genome build to use as a fallback.
 *
 * @throws {ParseError} If the variant cannot be parsed or the sequence is invalid.
 */
export function parseIscnCnv(
  value: string,
  defaultGenomeBuild: GenomeBuild = 'grch37'
): LinearStrucvar {
  const match = value.match(REGEX_CNV_ISCN_2020)
  if (!match || !match.groups) {
    throw new ParseError(`Unable to parse colon/hyphen separated strucvar: ${value}`)
  }

  // Obtain the genome build, chromosome, and copy number from the parsed groups.
  // Also, perform validation.
  const {
    genomeBuildA,
    genomeBuildB,
    chromL,
    chromR,
    armL,
    armR,
    start: startValue,
    stop: stopValue,
    copyNumber: copyNumberValue
  } = match.groups as unknown as RegexCnvIscnGroups
  const genomeBuild = validatedGenomeBuild(genomeBuildA ?? genomeBuildB, defaultGenomeBuild)
  if (chromR !== undefined && chromL != chromR) {
    throw new ParseError(`Chromosomes do not match: ${chromL} != ${chromR}`)
  }
  const chrom = normalizeChrom(chromL)
  const copyNumber = parseInt(copyNumberValue)

  // Validate positions.
  const start = parseInt(startValue.replace(',', ''))
  const stop = parseInt(stopValue.replace(',', ''))
  if (start > stop || start < 1) {
    throw new ParseError(`Invalid positions: start=${start}, stop=${stop}`)
  } else {
    const lengths = genomeBuild == 'grch37' ? CHROM_LENGTHS_37 : CHROM_LENGTHS_38
    if (start > lengths[chrom] || stop > lengths[chrom]) {
      throw new ParseError(`Invalid positions: start=${start}, stop=${stop}`)
    }
  }

  let svType: SvType
  if (chrom == 'Y') {
    if (copyNumber < 2) {
      svType = 'DEL'
    } else {
      svType = 'DUP'
    }
  } else {
    if (copyNumber == 0) {
      svType = 'DEL'
    } else {
      svType = 'DUP'
    }
  }

  const armRRepr = armR === undefined ? '' : `.${chrom}${armR}`
  const userRepr =
    `${GENOME_BUILD_LABELS[genomeBuild]} ${chrom}${armL}${armRRepr} ` +
    `(${start}_${stop})x${copyNumber}`

  return {
    svType,
    genomeBuild,
    chrom,
    start,
    stop,
    copyNumber,
    userRepr
  }
}
