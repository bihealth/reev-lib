/**
 * Types as returned by the dotty API.
 */

/**
 * Interface describing a variant in SPDI notation as returned in JSON from
 * dotty API.
 */
export interface Spdi$Api {
  /** Assembly name. */
  assembly: string
  /** Reference sequence ID. */
  contig: string
  /** 1-based position. */
  pos: number
  /** Reference allele / deleted sequence. */
  reference_deleted: string
  /** Alternate allele / inserted sequence. */
  alternate_inserted: string
}

/** Interface describing a variant in SPDI notation. */
export interface Spdi {
  /** Assembly name. */
  assembly: string
  /** Reference sequence ID. */
  contig: string
  /** 1-based position. */
  pos: number
  /** Reference allele / deleted sequence. */
  referenceDeleted: string
  /** Alternate allele / inserted sequence. */
  alternateInserted: string
}

/**
 * Helper for performing operations for `Spdi` such as constructing from JSON.
 */
class Spdi$Type {
  /** Create new `Spdi` from JSON. */
  fromJson(json: Spdi$Api): Spdi {
    return {
      assembly: json.assembly,
      contig: json.contig,
      pos: json.pos,
      referenceDeleted: json.reference_deleted,
      alternateInserted: json.alternate_inserted
    }
  }
}

/**
 * Helper for performing operations for `Spdi` such as constructing from JSON.
 */
export const Spdi = new Spdi$Type()

/**
 * Interface describing result for converting a transcript-level variant
 * to SPDI.
 */
export interface SpdiResult$Api {
  /** Indicator if the query was successful. */
  success: boolean
  /** The actual payload / SPDI representation of the variant. */
  value?: Spdi$Api
  /** Any error message. */
  message?: string
}

/**
 * Helper type for performing operations for `SpdiResult` such as constructing
 * from JSON.
 */
class SpdiResult$Type {
  /** Create new `SpdiResult` from JSON. */
  fromJson(json: SpdiResult$Api): SpdiResult {
    return {
      success: json.success,
      value: json.value ? Spdi.fromJson(json.value) : undefined,
      message: json.message
    }
  }
}

/**
 * Result for converting a transcript-level variant to SPDI.
 */
export interface SpdiResult {
  /** Indicator if the query was successful. */
  success: boolean
  /** The actual payload / SPDI representation of the variant. */
  value?: Spdi
  /** Any error message. */
  message?: string
}

/**
 * Helper type for performing operations for `SpdiResult` such as constructing
 * from JSON.
 */
export const SpdiResult = new SpdiResult$Type()

/**
 * Interface describing alignment of an exon to an assembly as returned in JSON
 * from dotty API.
 */
export interface ExonAlignment$Api {
  /** Exon start in reference. */
  ref_start: number
  /** Exon end in reference. */
  ref_end: number
  /** Exon number. */
  exon_no: number
  /** Exon start in transcript. */
  tx_start: number
  /** Exon end in transcript. */
  tx_end: number
  /** The gapped alignment description. */
  alignment?: string
}

/**
 * Interface describing alignment of an exon to an assembly.
 */
export interface ExonAlignment {
  /** Exon start in reference. */
  refStart: number
  /** Exon end in reference. */
  refEnd: number
  /** Exon number. */
  exonNo: number
  /** Exon start in transcript. */
  txStart: number
  /** Exon end in transcript. */
  txEnd: number
  /** The gapped alignment description. */
  alignment?: string
}

/**
 * Helper for performing operations for `ExonAlignment` such as constructing
 * from JSON.
 */
class ExonAlignment$Type {
  /** Create new `ExonAlignment` from JSON. */
  fromJson(json: ExonAlignment$Api): ExonAlignment {
    return {
      refStart: json.ref_start,
      refEnd: json.ref_end,
      exonNo: json.exon_no,
      txStart: json.tx_start,
      txEnd: json.tx_end,
      alignment: json.alignment
    }
  }
}

/**
 * Helper for performing operations for `ExonAlignment` such as constructing
 * from JSON.
 */
export const ExonAlignment = new ExonAlignment$Type()

/**
 * Interface describing alignment of a `Transcript` to an assembly as returned
 * in JSON from dotty API.
 */
export interface TranscriptAlignment$Api {
  /** Assembly of alignment. */
  assembly: string
  /** Alignment contig. */
  contig: string
  /** CDS start. */
  cds_start: number
  /** CDS end. */
  cds_end: number
  /** Exons, first two entries are start/end positions on the chromosome. */
  exons: ExonAlignment$Api[]
}

/**
 * Interface describing alignment of a `Transcript` to an assembly.
 */
export interface TranscriptAlignment {
  /** Assembly of alignment. */
  assembly: string
  /** Alignment contig. */
  contig: string
  /** CDS start. */
  cdsStart: number
  /** CDS end. */
  cdsEnd: number
  /** Exons, first two entries are start/end positions on the chromosome. */
  exons: ExonAlignment[]
}

/**
 * Helper type for performing operations for `TranscriptAlignment` such as
 * constructing from JSON.
 */
class TranscriptAlignment$Type {
  /** Create new `TranscriptAlignment` from JSON. */
  fromJson(json: TranscriptAlignment$Api): TranscriptAlignment {
    return {
      assembly: json.assembly,
      contig: json.contig,
      cdsStart: json.cds_start,
      cdsEnd: json.cds_end,
      exons: json.exons.map((exon) => ExonAlignment.fromJson(exon))
    }
  }
}

/**
 * Helper type for performing operations for `TranscriptAlignment` such as
 * constructing from JSON.
 */
export const TranscriptAlignment = new TranscriptAlignment$Type()

/**
 * Interface describing a transcript as returned in JSON from dotty API.
 */
export interface Transcript$Api {
  /** Transcript ID. */
  id: string
  /** Gene HGNC ID. */
  hgnc_id: string
  /** Gene HGNC symbol. */
  hgnc_symbol: string
  /** Alignments of the transcripts. */
  alignments: TranscriptAlignment$Api[]
}

/**
 * Interface describing a transcript.
 */
export interface Transcript {
  /** Transcript ID. */
  id: string
  /** Gene HGNC ID. */
  hgncId: string
  /** Gene HGNC symbol. */
  hgncSymbol: string
  /** Alignments of the transcripts. */
  alignments: TranscriptAlignment[]
}

/**
 * Helper type for performing operations for `Transcript` such as constructing
 * from JSON.
 */
class Transcript$Type {
  /** Create new `Transcript` from JSON. */
  fromJson(json: Transcript$Api): Transcript {
    return {
      id: json.id,
      hgncId: json.hgnc_id,
      hgncSymbol: json.hgnc_symbol,
      alignments: json.alignments.map((alignment) => TranscriptAlignment.fromJson(alignment))
    }
  }
}

/**
 * Helper type for performing operations for `Transcript` such as constructing
 * from JSON.
 */
export const Transcript = new Transcript$Type()

/**
 * Interface describing result querying for transcripts as returned in JSON
 * from dotty API.
 */
export interface TranscriptResult$Api {
  /** The actual payload / list of transcripts. */
  transcripts: Transcript$Api[]
}

/**
 * Interface describing result querying for transcripts.
 */
export interface TranscriptResult {
  /** The actual payload / list of transcripts. */
  transcripts: Transcript[]
}

/**
 * Helper type for performing operations for `TranscriptResult` such as
 * constructing from JSON.
 */
class TranscriptResult$Type {
  fromJson(json: TranscriptResult$Api): TranscriptResult {
    return {
      transcripts: json.transcripts.map((transcript) => Transcript.fromJson(transcript))
    }
  }
}

/**
 * Helper for performing operations for `TranscriptResult` such as
 * constructing from JSON.
 */
export const TranscriptResult = new TranscriptResult$Type()
