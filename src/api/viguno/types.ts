/** Representation of an HPO term. */
export interface HpoTerm {
  /** Term identifier. */
  term_id: string
  /** Term name. */
  name: string
  /** Term definition, if any. */
  definition?: string
}

/** Gene as returned by the API. */
export interface Gene {
  gene_ncbi_id: number
  gene_symbol: string
  hgnc_id: string
  hpo_terms?: HpoTerm[]
}
