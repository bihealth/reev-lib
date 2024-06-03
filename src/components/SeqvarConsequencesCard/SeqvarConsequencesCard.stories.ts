import type { JsonValue } from '@protobuf-ts/runtime'
import type { Meta, StoryObj } from '@storybook/vue3'

import seqvarCsqResultBrca1Json from '../../api/mehari/fixture.seqvarCsqResponse.BRCA1.json'
import { SeqvarResult } from '../../api/mehari/types'
import SeqvarConsequencesCard from './SeqvarConsequencesCard.vue'

// Here, fixture data is loaded via `import` from JSON file.  Reading the file
// as in the tests fails with "process is not defined" error in the browser.

// @ts-ignore
// const seqvarCsqResponseBrca1 = SeqvarResult.fromJson(seqvarCsqResultBrca1Json as JsonValue)
const seqvarCsqResponseBrca1 = SeqvarResult.fromJson({"version":{"tx_db":"0.25.1","mehari":"0.25.5"},"query":{"genome_release":"grch37","chromosome":"11","position":533463,"reference":"T","alternative":"TTGGCCGAGGTCTCGATGTAGGGGATGCCGTAGCTTCGGGCGAGGTCCTGAGCCTGCCGAGATTCCACAGTGCGTGCAGCCAGGTCACACTTGTTCCCCACCAGCACCATGGGCACGTCATCCGAGTCCTTCACCCGTTTGATCTGCTCCCTGAGAGGTGGAAAGCGAGAGCTGGCTACGGGGGCTGCAGGCGCAGCGGCATCCAGGACATGCGCAGAGAGGACAGGAGGCCCCTGCCTGGACGCAGCCGGCCTGGCCCCACCTGTGCGGCGTGGGCTCCCGGGCCAGCCTCACGGGGTTCACCTGTACTGGTGGATGTCCTCAAAAGACTTGGTGTTGTTGATGGCAAACACACACAGGAAGCCCTCCCCGGTGCGCATGTACTGGTCCCGCATGGCGCTGTACTCCTCC","hgnc_id":null},"result":[{"consequences":["frameshift_variant"],"putative_impact":"HIGH","gene_symbol":"HRAS","gene_id":"HGNC:5173","feature_type":{"SoTerm":{"term":"Transcript"}},"feature_id":"NM_001130442.3","feature_biotype":"Coding","feature_tag":[],"rank":{"ord":4,"total":5},"hgvs_t":"c.439_440insGGAGGAGTACAGCGCCATGCGGGACCAGTACATGCGCACCGGGGAGGGCTTCCTGTGTGTGTTTGCCATCAACAACACCAAGTCTTTTGAGGACATCCACCAGTACAGGTGAACCCCGTGAGGCTGGCCCGGGAGCCCACGCCGCACAGGTGGGGCCAGGCCGGCTGCGTCCAGGCAGGGGCCTCCTGTCCTCTCTGCGCATGTCCTGGATGCCGCTGCGCCTGCAGCCCCCGTAGCCAGCTCTCGCTTTCCACCTCTCAGGGAGCAGATCAAACGGGTGAAGGACTCGGATGACGTGCCCATGGTGCTGGTGGGGAACAAGTGTGACCTGGCTGCACGCACTGTGGAATCTCGGCAGGCTCAGGACCTCGCCCGAAGCTACGGCATCCCCTACATCGAGACCTCGGCCA","hgvs_p":"p.K147Rfs*79","tx_pos":{"ord":653,"total":1178},"cds_pos":{"ord":439,"total":570},"protein_pos":{"ord":147,"total":190},"distance":0,"messages":null},{"consequences":["frameshift_variant"],"putative_impact":"HIGH","gene_symbol":"HRAS","gene_id":"HGNC:5173","feature_type":{"SoTerm":{"term":"Transcript"}},"feature_id":"NM_001318054.2","feature_biotype":"Coding","feature_tag":[],"rank":{"ord":4,"total":7},"hgvs_t":"c.120_121insGGAGGAGTACAGCGCCATGCGGGACCAGTACATGCGCACCGGGGAGGGCTTCCTGTGTGTGTTTGCCATCAACAACACCAAGTCTTTTGAGGACATCCACCAGTACAGGTGAACCCCGTGAGGCTGGCCCGGGAGCCCACGCCGCACAGGTGGGGCCAGGCCGGCTGCGTCCAGGCAGGGGCCTCCTGTCCTCTCTGCGCATGTCCTGGATGCCGCTGCGCCTGCAGCCCCCGTAGCCAGCTCTCGCTTTCCACCTCTCAGGGAGCAGATCAAACGGGTGAAGGACTCGGATGACGTGCCCATGGTGCTGGTGGGGAACAAGTGTGACCTGGCTGCACGCACTGTGGAATCTCGGCAGGCTCAGGACCTCGCCCGAAGCTACGGCATCCCCTACATCGAGACCTCGGCCA","hgvs_p":"p.R41Gfs*30","tx_pos":{"ord":653,"total":1152},"cds_pos":{"ord":120,"total":333},"protein_pos":{"ord":41,"total":111},"distance":0,"messages":null},{"consequences":["frameshift_variant"],"putative_impact":"HIGH","gene_symbol":"HRAS","gene_id":"HGNC:5173","feature_type":{"SoTerm":{"term":"Transcript"}},"feature_id":"NM_005343.4","feature_biotype":"Coding","feature_tag":["ManeSelect"],"rank":{"ord":4,"total":6},"hgvs_t":"c.439_440insGGAGGAGTACAGCGCCATGCGGGACCAGTACATGCGCACCGGGGAGGGCTTCCTGTGTGTGTTTGCCATCAACAACACCAAGTCTTTTGAGGACATCCACCAGTACAGGTGAACCCCGTGAGGCTGGCCCGGGAGCCCACGCCGCACAGGTGGGGCCAGGCCGGCTGCGTCCAGGCAGGGGCCTCCTGTCCTCTCTGCGCATGTCCTGGATGCCGCTGCGCCTGCAGCCCCCGTAGCCAGCTCTCGCTTTCCACCTCTCAGGGAGCAGATCAAACGGGTGAAGGACTCGGATGACGTGCCCATGGTGCTGGTGGGGAACAAGTGTGACCTGGCTGCACGCACTGTGGAATCTCGGCAGGCTCAGGACCTCGCCCGAAGCTACGGCATCCCCTACATCGAGACCTCGGCCA","hgvs_p":"p.K147Rfs*79","tx_pos":{"ord":653,"total":1070},"cds_pos":{"ord":439,"total":570},"protein_pos":{"ord":147,"total":190},"distance":0,"messages":null},{"consequences":["frameshift_variant"],"putative_impact":"HIGH","gene_symbol":"HRAS","gene_id":"HGNC:5173","feature_type":{"SoTerm":{"term":"Transcript"}},"feature_id":"NM_176795.5","feature_biotype":"Coding","feature_tag":[],"rank":{"ord":4,"total":6},"hgvs_t":"c.439_440insGGAGGAGTACAGCGCCATGCGGGACCAGTACATGCGCACCGGGGAGGGCTTCCTGTGTGTGTTTGCCATCAACAACACCAAGTCTTTTGAGGACATCCACCAGTACAGGTGAACCCCGTGAGGCTGGCCCGGGAGCCCACGCCGCACAGGTGGGGCCAGGCCGGCTGCGTCCAGGCAGGGGCCTCCTGTCCTCTCTGCGCATGTCCTGGATGCCGCTGCGCCTGCAGCCCCCGTAGCCAGCTCTCGCTTTCCACCTCTCAGGGAGCAGATCAAACGGGTGAAGGACTCGGATGACGTGCCCATGGTGCTGGTGGGGAACAAGTGTGACCTGGCTGCACGCACTGTGGAATCTCGGCAGGCTCAGGACCTCGCCCGAAGCTACGGCATCCCCTACATCGAGACCTCGGCCA","hgvs_p":"p.K147Rfs*79","tx_pos":{"ord":653,"total":1260},"cds_pos":{"ord":439,"total":513},"protein_pos":{"ord":147,"total":171},"distance":0,"messages":null},{"consequences":["upstream_gene_variant"],"putative_impact":"MODIFIER","gene_symbol":"LRRC56","gene_id":"HGNC:25430","feature_type":{"SoTerm":{"term":"Transcript"}},"feature_id":"NM_198075.4","feature_biotype":"Coding","feature_tag":["ManeSelect"],"rank":null,"hgvs_t":null,"hgvs_p":null,"tx_pos":null,"cds_pos":null,"protein_pos":null,"distance":-4064,"messages":null}]})

const meta = {
  title: 'Seqvar/SeqvarConsequencesCard',
  component: SeqvarConsequencesCard,
  tags: ['autodocs'],
  argTypes: {
    consequences: { control: { type: 'object' } }
  },
  args: { consequences: seqvarCsqResponseBrca1.result }
} satisfies Meta<typeof SeqvarConsequencesCard>

export default meta
type Story = StoryObj<typeof meta>

export const BRCA1: Story = {
  args: {
    consequences: seqvarCsqResponseBrca1.result
  }
}
