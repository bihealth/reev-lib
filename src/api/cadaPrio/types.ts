/**
 * One entry of the result as returned by the API.
 */
export interface ResponseEntry$Api {
  /** HGNC ID */
  hgnc_id: string
  /** NCBI Gene ID */
  ncbi_gene_id: string
  /** Rank */
  rank: number
  /** Score */
  score: number
}

/**
 * One entry of the result.
 */
export interface ResponseEntry {
  /** HGNC ID */
  hgncId: string
  /** NCBI Gene ID */
  ncbiGeneId: string
  /** Rank */
  rank: number
  /** Score */
  score: number
}

/** Helper class for converting `ResponseEntry$Api` to `ResponseEntry`. */
class ResponseEntry$Type {
  /** Converts `ResponseEntry$Api` to `ResponseEntry`. */
  fromJson(data: ResponseEntry$Api): ResponseEntry {
    return {
      hgncId: data.hgnc_id,
      ncbiGeneId: data.ncbi_gene_id,
      rank: data.rank,
      score: data.score
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
