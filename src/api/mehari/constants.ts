/** Mapping from transcript effect to label. */
export const TX_EFFECT_LABELS: { [key: string]: string } = {
  transcript_variant: 'whole tx',
  exon_variant: 'exonic',
  splice_region_variant: 'splicing',
  intron_variant: 'intronic',
  upstream_variant: 'upstream',
  downstream_variant: 'downstream',
  other: 'other'
}
