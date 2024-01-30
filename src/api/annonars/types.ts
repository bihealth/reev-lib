import { JsonValue } from '@protobuf-ts/runtime'

import { Record as ClinvarRecord } from '../../pbs/annonars/clinvar/minimal'
import { Record as UcscConservationRecord } from '../../pbs/annonars/cons/base'
import { Record as DbsnpRecord } from '../../pbs/annonars/dbsnp/base'
import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'
import { Record as Gnomad2Record } from '../../pbs/annonars/gnomad/gnomad2'
import { Record as Gnomad3Record } from '../../pbs/annonars/gnomad/gnomad3'
import { Record as Gnomad4Record } from '../../pbs/annonars/gnomad/gnomad4'
import { Record as GnomadMtdnaRecord } from '../../pbs/annonars/gnomad/mtdna'
import { Record as HelixmtdbRecord } from '../../pbs/annonars/helixmtdb/base'

/**
 * Interface for gene info result.
 */
export interface GeneInfoResult {
  /** Gehe information per HGNC ID. */
  genes: GeneInfoRecord[]
}

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
  clinvar?: ClinvarRecord
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
            ClinvarRecord.fromJson(apiResult.clinvar as JsonValue)
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
