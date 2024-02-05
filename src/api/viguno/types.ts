/** Interface for an HPO term as returned by API. */
export interface HpoTerm$Api {
  /** Term identifier. */
  term_id: string
  /** Term name. */
  name: string
  /** Term definition, if any. */
  definition?: string
  /** Synonyms. */
  synonyms: string[] | null
  /** Xrefs. */
  xrefs: string[] | null
}

/** Interface for an HPO term. */
export interface HpoTerm {
  /** Term identifier. */
  termId: string
  /** Term name. */
  name: string
  /** Term definition, if any. */
  definition?: string
  /** Synonyms. */
  synonyms?: string[]
  /** Xrefs. */
  xrefs?: string[]
}

/** Helper class for converting from `HpoTerm$Api` to `HpoTerm`. */
class HpoTerm$Type {
  fromJson(api: HpoTerm$Api): HpoTerm {
    return {
      termId: api.term_id,
      name: api.name,
      definition: api.definition,
      synonyms: api.synonyms ?? undefined,
      xrefs: api.xrefs ?? undefined
    }
  }
}

/** Helper instance for converting from `HpoTerm$Api` to `HpoTerm`. */
export const HpoTerm = new HpoTerm$Type()

/** Interface for gene as returned by the API. */
export interface Gene$Api {
  gene_ncbi_id: number
  gene_symbol: string
  hgnc_id: string
  hpo_terms?: HpoTerm$Api[]
}

/** Interface for gene. */
export interface Gene {
  geneNcbiId: number
  geneSymbol: string
  hgncId: string
  hpoTerms?: HpoTerm[]
}

/** Helper class for converting from `Gene$Api` to `Gene`. */
class Gene$Type {
  fromJson(api: Gene$Api): Gene {
    return {
      geneNcbiId: api.gene_ncbi_id,
      geneSymbol: api.gene_symbol,
      hgncId: api.hgnc_id,
      hpoTerms: api.hpo_terms?.map(HpoTerm.fromJson)
    }
  }
}

/** Helper instance for converting from `Gene$Api` to `Gene`. */
export const Gene = new Gene$Type()

/** Interface for version as returned by API. */
export interface Version$Api {
  hpo: string
  viguno: string
}

/** Interface for version. */
export interface Version {
  hpo: string
  viguno: string
}

/** Helper class for converting from `Version$Api` to `Version`. */
class Version$Type {
  fromJson(api: Version$Api): Version {
    return {
      hpo: api.hpo,
      viguno: api.viguno
    }
  }
}

/** Helper instance for converting from `Version$Api` to `Version`. */
export const Version = new Version$Type()

/** Interface for OMIM lookup query as returned by API. */
export interface HpoOmimsQuery$Api {
  omim_id: string | null
  name: string | null
  match_: string | null
  max_result: number
  hpo_terms: boolean
}

/** Interface for OMIM lookup query. */
export interface HpoOmimsQuery {
  omimId?: string
  name?: string
  match?: string
  maxResult: number
  hpoTerms: boolean
}

/** Helper class for converting from `HpoOmimsQuery$Api` to `HpoOmimsQuery`. */
class HpoOmimsQuery$Type {
  fromJson(api: HpoOmimsQuery$Api): HpoOmimsQuery {
    return {
      omimId: api.omim_id ?? undefined,
      name: api.name ?? undefined,
      match: api.match_ ?? undefined,
      maxResult: api.max_result,
      hpoTerms: api.hpo_terms
    }
  }
}

/** Helper instance for converting from `HpoOmimsQuery$Api` to `HpoOmimsQuery`. */
export const HpoOmimsQuery = new HpoOmimsQuery$Type()

/** Interface for OMIM entry as returned by API. */
export interface HpoOmim$Api {
  omim_id: string
  name: string
  hpo_terms?: HpoTerm$Api[]
}

/** Interface for OMIM entry. */
export interface HpoOmim {
  omimId: string
  name: string
  hpoTerms?: HpoTerm[]
}

/** Helper class for converting from `HpoOmim$Api` to `HpoOmim`. */
class HpoOmim$Type {
  fromJson(api: HpoOmim$Api): HpoOmim {
    return {
      omimId: api.omim_id,
      name: api.name,
      hpoTerms: api.hpo_terms?.map(HpoTerm.fromJson)
    }
  }
}

/** Helper instance for converting from `HpoOmim$Api` to `HpoOmim`. */
export const HpoOmim = new HpoOmim$Type()

/** Interface for response of OMIM lookup as returned by API. */
export interface HpoOmimsResult$Api {
  version: Version$Api
  query: HpoOmimsQuery$Api
  result: HpoOmim$Api[]
}

/** Interface for response of OMIM lookup. */
export interface HpoOmimsResult {
  version: Version
  query: HpoOmimsQuery
  result: HpoOmim[]
}

/** Helper class for converting from `HpoOmimsResult$Api` to `HpoOmimsResult`. */
class HpoOmimsResult$Type {
  fromJson(api: HpoOmimsResult$Api): HpoOmimsResult {
    return {
      version: Version.fromJson(api.version),
      query: HpoOmimsQuery.fromJson(api.query),
      result: api.result.map(HpoOmim.fromJson)
    }
  }
}

/** Helper instance for converting from `HpoOmimsResult$Api` to `HpoOmimsResult`. */
export const HpoOmimsResult = new HpoOmimsResult$Type()

/** Interface for HPO term lookup query as returned by API. */
export interface HpoTermQuery$Api {
  term_id: string | null
  name: string | null
  max_result: number
  genes: boolean
}

/** Interface for HPO term lookup query. */
export interface HpoTermQuery {
  termId?: string
  name?: string
  maxResult: number
  genes: boolean
}

/** Helper class for converting from `HpoTermQuery$Api` to `HpoTermQuery`. */
class HpoTermQuery$Type {
  fromJson(api: HpoTermQuery$Api): HpoTermQuery {
    return {
      termId: api.term_id ?? undefined,
      name: api.name ?? undefined,
      maxResult: api.max_result,
      genes: api.genes
    }
  }
}

/** Helper instance for converting from `HpoTermQuery$Api` to `HpoTermQuery`. */
export const HpoTermQuery = new HpoTermQuery$Type()

/** Interface for response of HPO lookup as returned by API. */
export interface HpoTermResult$Api {
  version: Version$Api
  query: HpoTermQuery$Api
  result: HpoTerm$Api[]
}

/** Interface for response of HPO lookup. */
export interface HpoTermResult {
  version: Version
  query: HpoTermQuery
  result: HpoTerm[]
}

/** Helper class for converting from `HpoTermResult$Api` to `HpoTermResult`. */
class HpoTermResult$Type {
  fromJson(api: HpoTermResult$Api): HpoTermResult {
    return {
      version: Version.fromJson(api.version),
      query: HpoTermQuery.fromJson(api.query),
      result: api.result.map(HpoTerm.fromJson)
    }
  }
}

/** Helper instance for converting from `HpoTermResult$Api` to `HpoTermResult`. */
export const HpoTermResult = new HpoTermResult$Type()

/** Interface for gene lookup query as returned by API. */
export interface HpoGeneQuery$Api {
  gene_id: string | null
  name: string | null
  match_: string | null
  max_result: number
  hpo_terms: boolean
}

/** Interface for gene lookup query. */
export interface HpoGeneQuery {
  geneId?: string
  name?: string
  match?: string
  maxResult: number
  hpoTerms: boolean
}

/** Helper class for converting from `HpoGeneQuery$Api` to `HpoGeneQuery`. */
class HpoGeneQuery$Type {
  fromJson(api: HpoGeneQuery$Api): HpoGeneQuery {
    return {
      geneId: api.gene_id ?? undefined,
      name: api.name ?? undefined,
      match: api.match_ ?? undefined,
      maxResult: api.max_result,
      hpoTerms: api.hpo_terms
    }
  }
}

/** Helper instance for converting from `HpoGeneQuery$Api` to `HpoGeneQuery`. */
export const HpoGeneQuery = new HpoGeneQuery$Type()

/** Interface for response of gene lookup as returned by API. */
export interface HpoGenesResult$Api {
  version: Version$Api
  query: HpoGeneQuery$Api
  result: Gene$Api[]
}

/** Interface for response of gene lookup. */
export interface HpoGenesResult {
  version: Version
  query: HpoGeneQuery
  result: HpoTerm[]
}

/** Helper class for converting from `HpoGenesResult$Api` to `HpoGenesResult`. */
class HpoGenesResult$Type {
  fromJson(api: HpoGenesResult$Api): HpoGenesResult {
    return {
      version: Version.fromJson(api.version),
      query: HpoGeneQuery.fromJson(api.query),
      result: (api.result[0]?.hpo_terms || []).map(HpoTerm.fromJson)
    }
  }
}

/** Helper instance for converting from `HpoGenesResult$Api` to `HpoGenesResult`. */
export const HpoGenesResult = new HpoGenesResult$Type()
