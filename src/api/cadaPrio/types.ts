/**
 * One entry of the result as returned by the API.
 */
export interface ResponseEntry$Api {
  /** The HPO term. */
  hpo_term: string
  /** The gene symbol. */
  gene_symbol: string
  /** The predicted impact. */
  impact: string
}

/**
 * One entry of the result.
 */
export interface ResponseEntry {
  /** The HPO term. */
  hpoTerm: string
  /** The gene symbol. */
  geneSymbol: string
  /** The predicted impact. */
  impact: string
}

/** Helper class for converting `ResponseEntry$Api` to `ResponseEntry`. */
class ResponseEntry$Type {
  /** Converts `ResponseEntry$Api` to `ResponseEntry`. */
  fromJson(data: ResponseEntry$Api): ResponseEntry {
    return {
      hpoTerm: data.hpo_term,
      geneSymbol: data.gene_symbol,
      impact: data.impact
    }
  }
}

/** Helper instance for converting `ResponseEntry$Api` to `ResponseEntry`. */
export const ResponseEntry = new ResponseEntry$Type()

/** Type for the response of the `predict` endpoint. */
export interface Response {
  /** The result entries. */
  entries: ResponseEntry[]
}

/** Helper class for converting JSON from API to `Response`. */
class Response$Type {
  /** Converts JSON from API to `Response`. */
  fromJson(data: any[]): Response {
    return {
      entries: data.map((entry) => ResponseEntry.fromJson(entry))
    }
  }
}

/** Helper instance for converting JSON to `Response`. */
export const Response = new Response$Type()
