import { Record as GeneInfoRecord } from '../../pbs/annonars/genes/base'

/** Interface for gene info result. */
export interface GeneInfoResult {
  /** Gehe information per HGNC ID. */
  genes: GeneInfoRecord[]
}
