import type { JsonValue } from '@protobuf-ts/runtime'

import { Record as ClinvarSeqvarRecord } from '../../pbs/annonars/clinvar/minimal'
import { ResponseRecord as ClinvarStrucvarResponseRecord } from '../../pbs/annonars/clinvar/sv'
import { Record as UcscConservationRecord } from '../../pbs/annonars/cons/base'
import { Record as DbsnpRecord } from '../../pbs/annonars/dbsnp/base'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { Record as Gnomad2Record } from '../../pbs/annonars/gnomad/gnomad2'
import { Record as Gnomad3Record } from '../../pbs/annonars/gnomad/gnomad3'
import { Record as Gnomad4Record } from '../../pbs/annonars/gnomad/gnomad4'
import { Record as GnomadMtdnaRecord } from '../../pbs/annonars/gnomad/mtdna'
import { Record as HelixmtdbRecord } from '../../pbs/annonars/helixmtdb/base'

/**
 * Interface for Clinvar Strucvars query response as returned by
 */
export interface ClinvarSvQueryResponse$Api {
  records?: JsonValue[]
}

/**
 * Interface for Clinvar Strucvars query result.
 */
export interface ClinvarSvQueryResponse {
  records: ClinvarStrucvarResponseRecord[]
}

/**
 * Helper class to convert `ClinvarSvQueryResponse$Api` to `ClinvarSvQueryResponse`.
 */
class ClinvarSvQueryResponse$Type {
  fromJson(apiResponse: ClinvarSvQueryResponse$Api): ClinvarSvQueryResponse {
    const records = apiResponse.records ?? []
    return {
      records: records.map((value) => ClinvarStrucvarResponseRecord.fromJson(value))
    }
  }
}

/**
 * Helper instance to convert `ClinvarSvQueryResponse$Api` to `ClinvarSvQueryResponse`.
 */
export const ClinvarSvQueryResponse = new ClinvarSvQueryResponse$Type()

/**
 * Interface for gene names as returned by `genes/search` API.
 */
export interface GeneNames$Api {
  hgnc_id: string
  symbol: string
  name: string
  alias_symbol: string[]
  alias_name: string[]
  ensembl_gene_id?: string
  ncbi_gene_id?: string
}

/**
 * Interface for gene names results.
 */
export interface GeneNames {
  hgncId: string
  symbol: string
  name: string
  aliasSymbol: string[]
  aliasName: string[]
  ensemblGeneId?: string
  ncbiGeneId?: string
}

/**
 * Helper class to convert `GeneNames$Api` to `GeneNames`.
 */
class GeneNames$Type {
  fromJson(apiGene: GeneNames$Api): GeneNames {
    return {
      hgncId: apiGene.hgnc_id,
      symbol: apiGene.symbol,
      name: apiGene.name,
      aliasSymbol: apiGene.alias_symbol,
      aliasName: apiGene.alias_name,
      ensemblGeneId: apiGene.ensembl_gene_id,
      ncbiGeneId: apiGene.ncbi_gene_id
    }
  }
}

/**
 * Helper instance to convert `GeneNames$Api` to `GeneNames`.
 */
export const GeneNames = new GeneNames$Type()

/**
 * Interface for scored gene names as returned by `genes/search` API.
 */
export interface ScoreGeneNames$Api {
  score: number
  data: GeneNames$Api
}

/**
 * Interface for scored gene names results.
 */
export interface ScoreGeneNames {
  score: number
  data: GeneNames
}

/**
 * Helper class to convert `ScoreGeneNames$Api` to `ScoreGeneNames`.
 */
class ScoreGeneNames$Type {
  fromJson(apiGene: ScoreGeneNames$Api): ScoreGeneNames {
    return {
      score: apiGene.score,
      data: GeneNames.fromJson(apiGene.data)
    }
  }
}

/**
 * Helper instance to convert `ScoreGeneNames$Api` to `ScoreGeneNames`.
 */
export const ScoreGeneNames = new ScoreGeneNames$Type()

/**
 * Interface for gene search query response as returned by API.
 */
export interface GeneSearchResponse$Api {
  genes: ScoreGeneNames$Api[]
}

/**
 * Interface for gene search query result.
 */
export interface GeneSearchResponse {
  genes: ScoreGeneNames[]
}

/**
 * Helper class to convert `GeneSearchResponse$Api` to `GeneSearchResponse`.
 */
class GeneSearchResponse$Type {
  fromJson(apiResponse: GeneSearchResponse$Api): GeneSearchResponse {
    return {
      genes: apiResponse.genes.map((gene) => ScoreGeneNames.fromJson(gene))
    }
  }
}

/**
 * Helper instance to convert `GeneSearchResponse$Api` to `GeneSearchResponse`.
 */
export const GeneSearchResponse = new GeneSearchResponse$Type()

/**
 * Interface for gene info result as returned by API.
 */
export interface GeneInfoResult$Api {
  genes: { [key: string]: GeneInfoRecord }
}

/**
 * Interface for gene info result.
 */
export interface GeneInfoResult {
  /** Gehe information per HGNC ID. */
  genes: GeneInfoRecord[]
}

/**
 * Helper class to convert `GeneInfoResult$Api` to `GeneInfoResult`.
 */
class GeneInfoResult$Type {
  fromJson(apiResult: GeneInfoResult$Api): GeneInfoResult {
    return {
      genes: Object.values(apiResult.genes).map((gene$Api) =>
        // @ts-ignore
        GeneInfoRecord.fromJson(gene$Api as JsonValue)
      )
    }
  }
}

/**
 * Helper instance to convert `GeneInfoResult$Api` to `GeneInfoResult`.
 */
export const GeneInfoResult = new GeneInfoResult$Type()

/**
 * Interface for seqvar info query as returned by API.
 */
export interface SeqvarInfoQuery$Api {
  genome_release: string
  chromosome: string
  pos: number
  reference: string
  alternative: string
}

/**
 * Interface for seqvar info query.
 */
export interface SeqvarInfoQuery {
  genomeRelease: string
  chromosome: string
  pos: number
  reference: string
  alternative: string
}

/**
 * Helper class to convert `SeqvarInfoQuery$Api` to `SeqvarInfoQuery`.
 */
class SeqvarInfoQuery$Type {
  fromJson(apiQuery: SeqvarInfoQuery$Api): SeqvarInfoQuery {
    return {
      genomeRelease: apiQuery.genome_release,
      chromosome: apiQuery.chromosome,
      pos: apiQuery.pos,
      reference: apiQuery.reference,
      alternative: apiQuery.alternative
    }
  }
}

/**
 * Helper instance to convert `SeqvarInfoQuery$Api` to `SeqvarInfoQuery`.
 */
export const SeqvarInfoQuery = new SeqvarInfoQuery$Type()

/**
 * Interface for seqvar info query result as returned by API.
 */
export interface SeqvarInfoResult$Api {
  cadd: { [key: string]: number | string | boolean | null } | null
  dbsnp: DbsnpRecord | null
  dbnsfp: { [key: string]: number | string | boolean | null } | null
  dbscsnv: { [key: string]: number | string | boolean | null } | null
  gnomad_mtdna: GnomadMtdnaRecord | null
  gnomad_exomes: Gnomad2Record | Gnomad3Record | Gnomad4Record | null
  gnomad_genomes: Gnomad2Record | Gnomad3Record | Gnomad4Record | null
  helixmtdb: HelixmtdbRecord | null
  ucsc_conservation: {
    records: UcscConservationRecord[]
  }[]
  clinvar: null
}

/**
 * Interface for seqvar info result.
 */
export interface SeqvarInfoResult {
  cadd?: { [key: string]: number | string | boolean | null }
  dbsnp?: DbsnpRecord
  dbnsfp?: { [key: string]: number | string | boolean | null }
  dbscsnv?: { [key: string]: number | string | boolean | null }
  gnomadMtdna?: GnomadMtdnaRecord
  gnomadExomes?: Gnomad2Record | Gnomad3Record | Gnomad4Record
  gnomadGenomes?: Gnomad2Record | Gnomad3Record | Gnomad4Record
  helixmtdb?: HelixmtdbRecord
  ucscConservation: UcscConservationRecord[][]
  clinvar?: ClinvarSeqvarRecord
}

/**
 * Helper to convert
 */

/**
 * Helper class to convert `SeqvarInfoResult$Api` to `SeqvarInfoResult`.
 */
class SeqvarInfoResult$Type {
  fromJson(apiResult: SeqvarInfoResult$Api): SeqvarInfoResult {
    return {
      cadd: apiResult.cadd === null ? undefined : apiResult.cadd,
      dbsnp:
        // @ts-ignore
        apiResult.dbsnp === null
          ? undefined // @ts-ignore
          : DbsnpRecord.fromJson(apiResult.dbsnp as JsonValue),
      dbnsfp: apiResult.dbnsfp === null ? undefined : apiResult.dbnsfp,
      dbscsnv: apiResult.dbscsnv === null ? undefined : apiResult.dbscsnv,
      gnomadMtdna:
        apiResult.gnomad_mtdna === null
          ? undefined
          : // @ts-ignore
            GnomadMtdnaRecord.fromJson(apiResult.gnomad_mtdna as JsonValue),
      gnomadExomes: apiResult.gnomad_exomes === null ? undefined : apiResult.gnomad_exomes,
      gnomadGenomes: apiResult.gnomad_genomes === null ? undefined : apiResult.gnomad_genomes,
      helixmtdb:
        apiResult.helixmtdb === null
          ? undefined
          : // @ts-ignore
            HelixmtdbRecord.fromJson(apiResult.helixmtdb as JsonValue),
      ucscConservation: apiResult.ucsc_conservation.map((cons) => cons.records),
      clinvar:
        apiResult.clinvar === null
          ? undefined
          : // @ts-ignore
            ClinvarSeqvarRecord.fromJson(apiResult.clinvar as JsonValue)
    }
  }
}

/**
 * Helper instance to convert `SeqvarInfoResult$Api` to `SeqvarInfoResult`.
 */
export const SeqvarInfoResult = new SeqvarInfoResult$Type()

/**
 * Interface for seqvar info query response as returned by API.
 */
export interface SeqvarInfoResponse$Api {
  server_version: string
  query: SeqvarInfoQuery$Api
  result: SeqvarInfoResult$Api
}

/**
 * Interface for seqvar info query result.
 */
export interface SeqvarInfoResponse {
  serverVersion: string
  query: SeqvarInfoQuery
  result: SeqvarInfoResult
}

/**
 * Helper class to convert `SeqvarInfoResponse$Api` to `SeqvarInfoResponse`.
 */
class SeqvarInfoResponse$Type {
  fromJson(apiResponse: SeqvarInfoResponse$Api): SeqvarInfoResponse {
    return {
      serverVersion: apiResponse.server_version,
      query: SeqvarInfoQuery.fromJson(apiResponse.query),
      result: SeqvarInfoResult.fromJson(apiResponse.result)
    }
  }
}

/**
 * Helper instance to convert `SeqvarInfoResponse$Api` to `SeqvarInfoResponse`.
 */
export const SeqvarInfoResponse = new SeqvarInfoResponse$Type()
