/** GeneID information as returned by the API. */
export interface GeneIds$Api {
  ccd_ids?: string[]
  ensembl_gene_id?: string
  entrez_gene_id?: string
  hgnc_id?: string
  omim_id?: string[]
  ucsc_id?: string
}

/**
 * Data structure for gene IDs.
 */
export interface GeneIds {
  ccdIds?: string[]
  ensemblGeneId?: string
  entrezGeneId?: string
  hgncId?: string
  omimId?: string[]
  ucscId?: string
}

/** Helper class for converting from `GeneIds$Api` to `GeneIds` */
class GeneIds$Type {
  fromJson(json: GeneIds$Api): GeneIds {
    return {
      ccdIds: json.ccd_ids,
      ensemblGeneId: json.ensembl_gene_id,
      entrezGeneId: json.entrez_gene_id,
      hgncId: json.hgnc_id,
      omimId: json.omim_id,
      ucscId: json.ucsc_id
    }
  }
}

/**
 * Helper instance for converting from `GeneIds$Api` to `GeneIds`.
 */
export const GeneIds = new GeneIds$Type()

/**
 * HGVS predicted protein consequence as returned by the API.
 */
export interface HgvsPredictedProteinConsequence$Api {
  lrg_slr: string
  lrg_tlr: string
  slr: string
  tlr: string
}

/**
 * Data structure for HGVS predicted protein consequence.
 */
export interface HgvsPredictedProteinConsequence {
  lrgSlr: string
  lrgTlr: string
  slr: string
  tlr: string
}

/**
 * Helper class for converting from `HgvsPredictedProteinConsequence$Api` to
 * `HgvsPredictedProteinConsequence`
 */
class HgvsPredictedProteinConsequence$Type {
  fromJson(json: HgvsPredictedProteinConsequence$Api): HgvsPredictedProteinConsequence {
    return {
      lrgSlr: json.lrg_slr,
      lrgTlr: json.lrg_tlr,
      slr: json.slr,
      tlr: json.tlr
    }
  }
}

/**
 * Helper instance for converting from `HgvsPredictedProteinConsequence$Api` to
 * `HgvsPredictedProteinConsequence`.
 */
export const HgvsPredictedProteinConsequence = new HgvsPredictedProteinConsequence$Type()

/**
 * DB x-references as returned by the API.
 */
export interface DbXref$Api {
  CCDS: string | null
  ensemblgene: string | null
  hgnc: string | null
  ncbigene: string | null
  select: string | null
}

/**
 * Data structure for DB x-references.
 */
export interface DbXref {
  ccds: string | null
  ensemblgene: string | null
  hgnc: string | null
  ncbigene: string | null
  select: string | null
}

/**
 * Helper class for converting from `DbXref$Api` to `DbXref`.
 */
class DbXref$Type {
  fromJson(json: DbXref$Api): DbXref {
    return {
      ccds: json.CCDS,
      ensemblgene: json.ensemblgene,
      hgnc: json.hgnc,
      ncbigene: json.ncbigene,
      select: json.select
    }
  }
}

/**
 * Helper instance for converting from `DbXref$Api` to `DbXref`.
 */
export const DbXref = new DbXref$Type()

/**
 * Annotation information as returned by the API.
 */
export interface Annotations$Api {
  chromosome?: string
  db_xref?: DbXref$Api
  ensembl_select?: boolean
  mane_plus_clinical_transcript?: boolean
  mane_select?: boolean
  map?: string
  note?: string
  refseq_select?: boolean
  variant?: string
}

/**
 * Data structure for annotations.
 */
export interface Annotations {
  chromosome?: string
  dbXref?: DbXref
  ensemblSelect?: boolean
  manePlusClinicalTranscript?: boolean
  maneSelect?: boolean
  map?: string
  note?: string
  refseqSelect?: boolean
  variant?: string
}

/** Helper class for converting from `Annotations$Api` to `Annotations` */
class Annotations$Type {
  fromJson(json: Annotations$Api): Annotations {
    return {
      chromosome: json.chromosome,
      dbXref: json.db_xref === undefined ? undefined : DbXref.fromJson(json.db_xref),
      ensemblSelect: json.ensembl_select,
      manePlusClinicalTranscript: json.mane_plus_clinical_transcript,
      maneSelect: json.mane_select,
      map: json.map,
      note: json.note,
      refseqSelect: json.refseq_select,
      variant: json.variant
    }
  }
}

/**
 * Helper instance for converting from `Annotations$Api` to `Annotations`.
 */
export const Annotations = new Annotations$Type()

/**
 * VCF information from assembly locus as returned by the API.
 */
export interface Vcf$Api {
  alt: string
  chr: string
  pos: string
  ref: string
}

/**
 * Data structure for VCF information from assembly locus.
 */
export interface Vcf {
  alt: string
  chr: string
  pos: string
  ref: string
}

/** Helper class for converting from `Vcf$Api` to `Vcf` */
class Vcf$Type {
  fromJson(json: Vcf$Api): Vcf {
    return {
      alt: json.alt,
      chr: json.chr,
      pos: json.pos,
      ref: json.ref
    }
  }
}

/**
 * Helper instance for converting from `Vcf$Api` to `Vcf`.
 */
export const Vcf = new Vcf$Type()

/**
 * Assembly locus description as returned by the API.
 */
export interface AssemblyLocus$Api {
  hgvs_genomic_description: string
  vcf: Vcf$Api
}

/**
 * Data structure for assembly locus description.
 */
export interface AssemblyLocus {
  hgvsGenomicDescription: string
  vcf: Vcf
}

/** Helper class for converting from `AssemblyLocus$Api` to `AssemblyLocus` */
class AssemblyLocus$Type {
  fromJson(json: AssemblyLocus$Api): AssemblyLocus {
    return {
      hgvsGenomicDescription: json.hgvs_genomic_description,
      vcf: Vcf.fromJson(json.vcf)
    }
  }
}

/**
 * Helper instance for converting from `AssemblyLocus$Api` to `AssemblyLocus`.
 */
export const AssemblyLocus = new AssemblyLocus$Type()

/**
 * Primary assembly loci as returned by the API.
 */
export interface PrimaryAssemblyLoci$Api {
  grch37: AssemblyLocus$Api | null
  grch38: AssemblyLocus$Api | null
  hg19: AssemblyLocus$Api | null
  hg38: AssemblyLocus$Api | null
}

/**
 * Data structure for primary assembly loci.
 */
export interface PrimaryAssemblyLoci {
  grch37: AssemblyLocus | null
  grch38: AssemblyLocus | null
  hg19: AssemblyLocus | null
  hg38: AssemblyLocus | null
}

/** Helper class for converting from `PrimaryAssemblyLoci$Api` to `PrimaryAssemblyLoci` */
class PrimaryAssemblyLoci$Type {
  fromJson(json: PrimaryAssemblyLoci$Api): PrimaryAssemblyLoci {
    return {
      grch37: json.grch37 ? AssemblyLocus.fromJson(json.grch37) : null,
      grch38: json.grch38 ? AssemblyLocus.fromJson(json.grch38) : null,
      hg19: json.hg19 ? AssemblyLocus.fromJson(json.hg19) : null,
      hg38: json.hg38 ? AssemblyLocus.fromJson(json.hg38) : null
    }
  }
}

/**
 * Helper instance for converting from `PrimaryAssemblyLoci$Api` to `PrimaryAssemblyLoci`.
 */
export const PrimaryAssemblyLoci = new PrimaryAssemblyLoci$Type()

/**
 * Reference sequence records as returned by the API.
 */
export interface ReferenceSequenceRecords$Api {
  protein: string | null
  refseqgene: string | null
  transcript: string | null
}

/**
 * Data structure for reference sequence records.
 */
export interface ReferenceSequenceRecords {
  protein: string | null
  refseqgene: string | null
  transcript: string | null
}

/**
 * Helper class for converting from `ReferenceSequenceRecords$Api` to
 * `ReferenceSequenceRecords`
 */
class ReferenceSequenceRecords$Type {
  fromJson(json: ReferenceSequenceRecords$Api): ReferenceSequenceRecords {
    return {
      protein: json.protein,
      refseqgene: json.refseqgene,
      transcript: json.transcript
    }
  }
}

/**
 * Helper instance for converting from `ReferenceSequenceRecords$Api` to
 * `ReferenceSequenceRecords`.
 */
export const ReferenceSequenceRecords = new ReferenceSequenceRecords$Type()

/**
 * Variant exonic position as returned by the API.
 */
export interface VariantExonicPosition$Api {
  end_exon: string
  start_exon: string
}

/**
 * Data structure for variant exonic position.
 */
export interface VariantExonicPosition {
  endExon: string
  startExon: string
}

/** Helper class for converting from `VariantExonicPosition$Api` to `VariantExonicPosition` */
class VariantExonicPosition$Type {
  fromJson(json: VariantExonicPosition$Api): VariantExonicPosition {
    return {
      endExon: json.end_exon,
      startExon: json.start_exon
    }
  }
}

/**
 * Helper instance for converting from `VariantExonicPosition$Api` to `VariantExonicPosition`.
 */
export const VariantExonicPosition = new VariantExonicPosition$Type()

/**
 * Single entry as returned by the API.
 */
export interface Entry$Api {
  annotations: Annotations$Api
  gene_ids: GeneIds$Api
  gene_symbol: string | null
  genome_context_intronic_sequence: string | null
  hgvs_lrg_transcript_variant: string | null
  hgvs_lrg_variant: string | null
  hgvs_predicted_protein_consequence: never
  hgvs_refseqgene_variant: string | null
  hgvs_transcript_variant: string | null
  primary_assembly_loci: PrimaryAssemblyLoci$Api
  reference_sequence_records: ReferenceSequenceRecords$Api | ''
  refseqgene_context_intronic_sequence: string | ''
  rna_variant_descriptions: string | null
  selected_assembly: string
  submitted_variant: string
  transcript_variant: string | null
  validation_warnings: string[]
  variant_exonic_positions: { [key: string]: VariantExonicPosition$Api } | null
}

/** Data structure for result entries. */
export interface Entry {
  annotations: Annotations
  geneIds: GeneIds
  geneSymbol: string | null
  genomeContextIntronicSequence: string | null
  hgvsLrgTranscriptVariant: string | null
  hgvsLrgVariant: string | null
  hgvsPredictedProteinConsequence: HgvsPredictedProteinConsequence | null
  hgvsRefseqgeneVariant: string | null
  hgvsTranscriptVariant: string | null
  primaryAssemblyLoci: PrimaryAssemblyLoci
  referenceSequenceRecords: ReferenceSequenceRecords | ''
  refseqgeneContextIntronicSequence: string
  rnaVariantDescriptions: string | null
  selectedAssembly: string
  submittedVariant: string
  transcriptVariant: string | null
  validationWarnings: string[]
  variantExonicPositions: { [key: string]: VariantExonicPosition }
}

/** Helper class for converting from `Entry$Api` to `Entry` */
class Entry$Type {
  fromJson(json: Entry$Api): Entry {
    return {
      annotations: Annotations.fromJson(json.annotations),
      geneIds: GeneIds.fromJson(json.gene_ids),
      geneSymbol: json.gene_symbol,
      genomeContextIntronicSequence: json.genome_context_intronic_sequence,
      hgvsLrgTranscriptVariant: json.hgvs_lrg_transcript_variant,
      hgvsLrgVariant: json.hgvs_lrg_variant,
      hgvsPredictedProteinConsequence: HgvsPredictedProteinConsequence.fromJson(
        json.hgvs_predicted_protein_consequence
      ),
      hgvsRefseqgeneVariant: json.hgvs_refseqgene_variant,
      hgvsTranscriptVariant: json.hgvs_transcript_variant,
      primaryAssemblyLoci: PrimaryAssemblyLoci.fromJson(json.primary_assembly_loci),
      referenceSequenceRecords:
        json.reference_sequence_records === ''
          ? ''
          : ReferenceSequenceRecords.fromJson(json.reference_sequence_records),
      refseqgeneContextIntronicSequence: json.refseqgene_context_intronic_sequence,
      rnaVariantDescriptions: json.rna_variant_descriptions,
      selectedAssembly: json.selected_assembly,
      submittedVariant: json.submitted_variant,
      transcriptVariant: json.transcript_variant,
      validationWarnings: json.validation_warnings,
      variantExonicPositions:
        json.variant_exonic_positions === null
          ? {}
          : Object.entries(json.variant_exonic_positions).reduce(
              (acc, [key, value]) => {
                acc[key] = VariantExonicPosition.fromJson(value)
                return acc
              },
              {} as { [key: string]: VariantExonicPosition }
            )
    }
  }
}

/**
 * Helper instance for converting from `Entry$Api` to `Entry`.
 */
export const Entry = new Entry$Type()

/**
 * Metadata as returned by the API.
 */
export interface Metadata$Api {
  variantvalidator_hgvs_version: string
  variantvalidator_version: string
  vvdb_version: string
  vvseqrepo_db: string
  vvta_version: string
}

/** Data structure for metadata. */
export interface Metadata {
  variantvalidatorHgvsVersion: string
  variantvalidatorVersion: string
  vvdbVersion: string
  vvseqrepoDb: string
  vvtaVersion: string
}

/** Helper class for converting from `Metadata$Api` to `Metadata` */
class Metadata$Type {
  fromJson(json: Metadata$Api): Metadata {
    return {
      variantvalidatorHgvsVersion: json.variantvalidator_hgvs_version,
      variantvalidatorVersion: json.variantvalidator_version,
      vvdbVersion: json.vvdb_version,
      vvseqrepoDb: json.vvseqrepo_db,
      vvtaVersion: json.vvta_version
    }
  }
}

/**
 * Helper instance for converting from `Metadata$Api` to `Metadata`.
 */
export const Metadata = new Metadata$Type()

/** Representation of VariantValidator result. */
export interface Response {
  entries: Entry[]
  flag: string
  metadata: Metadata
}

/** Helper class for converting from response JSON to `Response` */
class Response$Type {
  fromJson(json: any): Response {
    return {
      entries: Object.entries(json)
        .filter(([key, _]) => !['flag', 'metadata'].includes(key))
        .map(([_, value]) => Entry.fromJson(value as any)),
      flag: json.flag,
      metadata: Metadata.fromJson(json.metadata)
    }
  }
}

/**
 * Helper instance for converting from response JSON to `Response`.
 */
export const Response = new Response$Type()
