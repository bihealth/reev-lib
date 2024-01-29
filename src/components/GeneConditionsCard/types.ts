/** Representation of an HPO term. */
export interface HpoTerm {
  /** Term identifier. */
  term_id: string
  /** Term name. */
  name: string
  /** Term definition, if any. */
  definition?: string
}
