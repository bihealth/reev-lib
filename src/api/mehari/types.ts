/**
 * Types for interfacing with the Mehari API.
 */
import { GenomeBuild } from '../../lib/genomeBuilds'

/**
 * Enumeration for the putative impact.
 */
export enum SeqvarPutativeImpact {
  High = 'HIGH',
  Moderate = 'MODERATE',
  Low = 'LOW',
  Modifier = 'MODIFIER'
}

/**
 * Enumeration for the consequence.
 */
export enum SeqvarConsequence {
  // high impact
  ChromosomeNumberVariation = 'chromosome_number_variation',
  ExonLossVariant = 'exon_loss_variant',
  FrameshiftVariant = 'frameshift_variant',
  RareAminoAcidVariant = 'rare_amino_acid_variant',
  SpliceAcceptorVariant = 'splice_acceptor_variant',
  SpliceDonorVariant = 'splice_donor_variant',
  StartLost = 'start_lost',
  StopGained = 'stop_gained',
  StopLost = 'stop_lost',
  TranscriptAblation = 'transcript_ablation',
  // moderate impact
  ThreePrimeUtrTruncation = '3_prime_UTR_truncation',
  FivePrimeUtrTruncaction = '5_prime_UTR_truncation',
  ConservativeInframeDeletion = 'conservative_inframe_deletion',
  ConservativeInframeInsertion = 'conservative_inframe_insertion',
  DisruptiveInframeDeletion = 'disruptive_inframe_deletion',
  DisruptiveInframeInsertion = 'disruptive_inframe_insertion',
  MissenseVariant = 'missense_variant',
  RegulatoryRegionAblation = 'regulatory_region_ablation',
  SpliceRegionVariant = 'splice_region_variant',
  TbfsAblation = 'TFBS_ablation',
  // low impact
  FivePrimeUtrPrematureStartCodonGainVariant = '5_prime_UTR_premature_start_codon_gain_variant',
  InitiatorCodonVariant = 'initiator_codon_variant',
  StartRetained = 'start_retained',
  StopRetainedVariant = 'stop_retained_variant',
  SynonymousVariant = 'synonymous_variant',
  // modifier
  ThreePrimeUtrVariant = '3_prime_UTR_variant',
  FivePrimeUtrVariant = '5_prime_UTR_variant',
  CodingSequenceVariant = 'coding_sequence_variant',
  ConservedIntergenicVariant = 'conserved_intergenic_variant',
  ConservedIntronVariant = 'conserved_intron_variant',
  DownstreamGeneVariant = 'downstream_gene_variant',
  ExonVariant = 'exon_variant',
  FeatureElongation = 'feature_elongation',
  FeatureTruncation = 'feature_truncation',
  GeneVariant = 'gene_variant',
  IntergenicVariant = 'intergenic_variant',
  IntronVariant = 'intron_variant',
  MatureMirnaVariant = 'mature_miRNA_variant',
  Mirna = 'miRNA',
  NmdTranscriptVariant = 'NMD_transcript_variant',
  NonCodingTranscriptExonVariant = 'non_coding_transcript_exon_variant',
  NonCodingTranscriptIntronVariant = 'non_coding_transcript_intron_variant',
  RegulatoryRegionAmplification = 'regulatory_region_amplification',
  RegulatoryRegionVariant = 'regulatory_region_variant',
  TfBindingSiteVariant = 'TF_binding_site_variant',
  TfbsAmplification = 'TFBS_amplification',
  TranscriptAmplification = 'transcript_amplification',
  TranscriptVariant = 'transcript_variant',
  UpstreamGeneVariant = 'upstream_gene_variant'
}

/**
 * Interface for the rank as returned by API.
 */
export interface Rank$Api {
  /** The exon / intron number. */
  rank: number
  /** The total number of exons / introns. */
  total: number
}

/**
 * Interface for the rank.
 */
export interface Rank {
  /** The exon / intron number. */
  rank: number
  /** The total number of exons / introns. */
  total: number
}

/**
 * Helper class for converting `Rank$Api` to `Rank`.
 */
class Rank$Type {
  /** Convert `Rank$Api` to `Rank`. */
  fromJson(json: Rank$Api): Rank {
    return {
      rank: json.rank,
      total: json.total
    }
  }
}

/**
 * Helper for converting `Rank$Api` to `Rank`.
 */
export const Rank: Rank$Type = new Rank$Type()

/**
 * Interface for one entry in the result as returned by API.
 */
export interface SeqvarResultEntry$Api {
  /** The consequences of the allele. */
  consequences: SeqvarConsequence[]
  /** The putative impact. */
  putative_impact: SeqvarPutativeImpact
  /** The gene symbol. */
  gene_symbol: string
  /** The gene identifier. */
  gene_id: string
  /** The feature type. */
  feature_type: string
  /** The feature identifier. */
  feature_id: string
  /** The feature biotype. */
  feature_biotype: string
  /** The feature tags. */
  feature_tag: string[]
  /** The exon / intron rank. */
  rank: Rank$Api | null
  /** HGVS c. notation. */
  hgvs_t: string | null
  /** HGVS p. notation. */
  hgvs_p: string | null
  /** cDNA position. */
  tx_pos: number | null
  /** CDS position. */
  cds_pos: number | null
  /** Protein position. */
  protein_pos: number | null
  /** Distance to feature. */
  distance?: number
  /** Optional list of warnings and error messages. */
  messages?: string[]
}

/**
 * Interface for one entry in the result.
 */
export interface SeqvarResultEntry {
  /** The consequences of the allele. */
  consequences: SeqvarConsequence[]
  /** The putative impact. */
  putativeImpact: SeqvarPutativeImpact
  /** The gene symbol. */
  geneSymbol: string
  /** The gene identifier. */
  geneId: string
  /** The feature type. */
  featureType: string
  /** The feature identifier. */
  featureId: string
  /** The feature biotype. */
  featureBiotype: string
  /** The feature tags. */
  featureTag: string[]
  /** The exon / intron rank. */
  rank?: Rank
  /** HGVS c. notation. */
  hgvsT?: string
  /** HGVS p. notation. */
  hgvsP?: string
  /** cDNA position. */
  txPos?: number
  /** CDS position. */
  cdsPos?: number
  /** Protein position. */
  proteinPos?: number
  /** Distance to feature. */
  distance?: number
  /** Optional list of warnings and error messages. */
  messages?: string[]
}

/**
 * Helper class for converting `ResultEntry$Api` to `ResultEntry`.
 */
class SeqvarResultEntry$Type {
  /** Convert `SeqvarResultEntry$Api` to `SeqvarResultEntry`. */
  fromJson(json: SeqvarResultEntry$Api): SeqvarResultEntry {
    return {
      consequences: json.consequences,
      putativeImpact: json.putative_impact,
      geneSymbol: json.gene_symbol,
      geneId: json.gene_id,
      featureType: json.feature_type,
      featureId: json.feature_id,
      featureBiotype: json.feature_biotype,
      featureTag: json.feature_tag,
      rank: json.rank === null ? undefined : Rank.fromJson(json.rank),
      hgvsT: json.hgvs_t === null ? undefined : json.hgvs_t,
      hgvsP: json.hgvs_p === null ? undefined : json.hgvs_p,
      txPos: json.tx_pos === null ? undefined : json.tx_pos,
      cdsPos: json.cds_pos === null ? undefined : json.cds_pos,
      proteinPos: json.protein_pos === null ? undefined : json.protein_pos,
      distance: json.distance === null ? undefined : json.distance,
      messages: json.messages === null ? undefined : json.messages
    }
  }
}

/**
 * Helper for converting `SeqvarResultEntry$Api` to `SeqvarResultEntry`.
 */
export const SeqvarResultEntry: SeqvarResultEntry$Type = new SeqvarResultEntry$Type()

/**
 * Interface for the version as returned by API.
 */
export interface Version$Api {
  /** Transcript database version. */
  tx_db: string
  /** The application version. */
  mehari: string
}

/**
 * Interface for the version.
 */
export interface SeqvarVersion {
  /** Transcript database version. */
  txDb: string
  /** The application version. */
  mehari: string
}

/**
 * Helper class for converting `Version$Api` to `Version`.
 */
class Version$Type {
  /** Convert `Version$Api` to `Version`. */
  fromJson(json: Version$Api): SeqvarVersion {
    return {
      txDb: json.tx_db,
      mehari: json.mehari
    }
  }
}

/**
 * Helper for converting `Version$Api` to `Version`.
 */
export const Version: Version$Type = new Version$Type()

/**
 * Interface for the query as returned by API.
 */
export interface SeqvarQuery$Api {
  /** The assembly. */
  genome_release: string
  /** SPDI sequence. */
  chromosome: string
  /** SPDI position. */
  position: number
  /** SPDI deletion. */
  reference: string
  /** SPDI insertion. */
  alternative: string
  /** Optionally, the HGNC ID of the gene to limit to. */
  hgnc_id?: string
}

/**
 * Interface for the query.
 */
export interface SeqvarQuery {
  /** The assembly. */
  genomeRelease: string
  /** SPDI sequence. */
  chromosome: string
  /** SPDI position. */
  position: number
  /** SPDI deletion. */
  reference: string
  /** SPDI insertion. */
  alternative: string
  /** Optionally, the HGNC ID of the gene to limit to. */
  hgncId?: string
}

/**
 * Helper class for converting `SeqvarQuery$Api` to `SeqvarQuery`.
 */
class SeqvarQuery$Type {
  /** Convert `SeqvarQuery$Api` to `SeqvarQuery`. */
  fromJson(json: SeqvarQuery$Api): SeqvarQuery {
    return {
      genomeRelease: json.genome_release,
      chromosome: json.chromosome,
      position: json.position,
      reference: json.reference,
      alternative: json.alternative,
      hgncId: json.hgnc_id
    }
  }
}

/**
 * Helper for converting `SeqvarQuery$Api` to `SeqvarQuery`.
 */
export const SeqvarQuery: SeqvarQuery$Type = new SeqvarQuery$Type()

/**
 * Interface for the result as returned by API.
 */
export interface SeqvarResult$Api {
  /** Version information. */
  version: Version$Api
  /** The original query records. */
  query: SeqvarQuery$Api
  /** The resulting records for the scored genes. */
  result: SeqvarResultEntry$Api[]
}

/**
 * Interface for the result.
 */
export interface SeqvarResult {
  /** Version information. */
  version: SeqvarVersion
  /** The original query records. */
  query: SeqvarQuery
  /** The resulting records for the scored genes. */
  result: SeqvarResultEntry[]
}

/**
 * Helper class for converting `Result$Api` to `Result`.
 */
class SeqvarResult$Type {
  /** Convert `Result$Api` to `Result`. */
  fromJson(json: SeqvarResult$Api): SeqvarResult {
    return {
      version: Version.fromJson(json.version),
      query: SeqvarQuery.fromJson(json.query),
      result: json.result.map((entry) => SeqvarResultEntry.fromJson(entry))
    }
  }
}

/**
 * Helper for converting `SeqvarResult$Api` to `SeqvarResult`.
 */
export const SeqvarResult: SeqvarResult$Type = new SeqvarResult$Type()

/**
 * Enumeration for the effect on transcript.
 */
export enum TranscriptEffect {
  TranscriptVariant = 'transcript_variant',
  ExonVariant = 'exon_variant',
  SpliceRegionVariant = 'splice_region_variant',
  IntronVariant = 'intron_variant',
  UpstreamVariant = 'upstream_variant',
  DownstreamVariant = 'downstream_variant',
  IntergenicVariant = 'intergenic_variant'
}

/**
 * Interface for one entry in the result as returned by API.
 */
export interface GeneTranscriptEffects$Api {
  /** HGNC identifier */
  hgnc_id: string
  /** Transcript effects for the gene. */
  transcript_effects: TranscriptEffect[]
}

/**
 * Explanation of transcript effect per individual gene.
 */
export interface GeneTranscriptEffects {
  /** HGNC identifier */
  hgncId: string
  /** Transcript effects for the gene. */
  transcriptEffects: TranscriptEffect[]
}

/**
 * Helper class for converting `GeneTranscriptEffects$Api` to `GeneTranscriptEffects`.
 */
class GeneTranscriptEffects$Type {
  /** Convert `GeneTranscriptEffects$Api` to `GeneTranscriptEffects`. */
  fromJson(json: GeneTranscriptEffects$Api): GeneTranscriptEffects {
    return {
      hgncId: json.hgnc_id,
      transcriptEffects: json.transcript_effects
    }
  }
}

/**
 * Helper for converting `GeneTranscriptEffects$Api` to `GeneTranscriptEffects`.
 */
export const GeneTranscriptEffects: GeneTranscriptEffects$Type = new GeneTranscriptEffects$Type()

/**
 * Enumeration for the structural variant type.
 */
export enum StrucVarType {
  Del = 'del',
  Dup = 'dup',
  Ins = 'ins',
  Bnd = 'bnd',
  Inv = 'inv'
}

/**
 * Parameters for `/strucvars/csq` as returned by the API.
 */
export interface StrucvarsQuery$Api {
  /** The assembly. */
  genome_release: GenomeBuild
  /** Chromosome sequence. */
  chromosome: string
  /** Start position. */
  start: number
  /** 1-based stop position. */
  stop: number
  /** Type of SV. */
  sv_type: StrucVarType
}

/**
 * Parameters for `/strucvars/csq`.
 */
export interface StrucvarsQuery {
  /** The assembly. */
  genomeRelease: GenomeBuild
  /** Chromosome sequence. */
  chromosome: string
  /** Start position. */
  start: number
  /** 1-based stop position. */
  stop: number
  /** Type of SV. */
  svType: StrucVarType
}

/**
 * Helper class for converting `StrucvarsQuery$Api` to `StrucvarsQuery`.
 */
class StrucvarsQuery$Type {
  /** Convert `StrucvarsQuery$Api` to `StrucvarsQuery`. */
  fromJson(json: StrucvarsQuery$Api): StrucvarsQuery {
    return {
      genomeRelease: json.genome_release,
      chromosome: json.chromosome,
      start: json.start,
      stop: json.stop,
      svType: json.sv_type
    }
  }
}

/**
 * Helper for converting `StrucvarsQuery$Api` to `StrucvarsQuery`.
 */
export const StrucvarsQuery: StrucvarsQuery$Type = new StrucvarsQuery$Type()

/**
 * Interface for the result as returned by API.
 */
export interface StrucvarResult$Api {
  /** Version information. */
  version: Version$Api
  /** The original query records. */
  query: SeqvarQuery$Api
  /** The resulting records for the scored genes. */
  result: GeneTranscriptEffects$Api[]
}

/**
 * Interface for the result.
 */
export interface StrucvarResult {
  /** Version information. */
  version: SeqvarVersion
  /** The original query records. */
  query: SeqvarQuery
  /** The resulting records for the scored genes. */
  result: GeneTranscriptEffects[]
}

/**
 * Helper class for converting `Result$Api` to `Result`.
 */
class StrucvarResult$Type {
  /** Convert `Result$Api` to `Result`. */
  fromJson(json: StrucvarResult$Api): StrucvarResult {
    return {
      version: Version.fromJson(json.version),
      query: SeqvarQuery.fromJson(json.query),
      result: json.result.map((entry) => GeneTranscriptEffects.fromJson(entry))
    }
  }
}

/**
 * Helper for converting `StrucvarResult$Api` to `StrucvarResult`.
 */
export const StrucvarResult: StrucvarResult$Type = new StrucvarResult$Type()
