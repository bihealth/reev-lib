import { type SearchResult } from '../../api/litvar'

/** Enumeration for annotation types */
export enum AnnotationType {
  /** Disease */
  Disease = 'Disease',
  /** Gene */
  Gene = 'Gene',
  /** Chemical */
  Chemical = 'Chemical',
  /** Species */
  Species = 'Species',
  /** Variant */
  Variant = 'Variant',
  /** CellLine */
  CellLine = 'CellLine'
}

/** Location of an annotation. */
export interface AnnotationLocation {
  /** The offset of the annotation. */
  offset: number
  /** The length of the annotation. */
  length: number
}

/** One annotation record. */
export interface Annotation {
  /** The type of annotation. */
  type: AnnotationType
  /** The name of the annotation. */
  name?: string
  /** The text of the annotation. */
  text?: string
  /** Locations of the annotation */
  locations: AnnotationLocation[]
}

/** Search results type. */
export type SearchResults = { [key: string]: SearchResult }
