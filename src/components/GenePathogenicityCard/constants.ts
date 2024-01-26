import { ClingenDosageScore } from '../../pbs/annonars/genes/base'

/** Scores for ClinGen dosage scores. */
export const CLINGEN_DOSAGE_SCORES: { [Key in ClingenDosageScore]: number } = {
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_UNKNOWN]: 0,
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_SUFFICIENT_EVIDENCE_AVAILABLE]: 3,
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_SOME_EVIDENCE_AVAILABLE]: 2,
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_LITTLE_EVIDENCE]: 1,
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_NO_EVIDENCE_AVAILABLE]: 0,
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_RECESSIVE]: 30,
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_UNLIKELY]: 40
}

/** Colors for ClinGen dosage scores. */
export const CLINGEN_DOSAGE_COLOR: { [Key in ClingenDosageScore]: string } = {
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_UNKNOWN]: 'transparent',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_SUFFICIENT_EVIDENCE_AVAILABLE]: 'red-darken-3',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_SOME_EVIDENCE_AVAILABLE]: 'orange-darken-2',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_LITTLE_EVIDENCE]: 'orange-darken-2',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_NO_EVIDENCE_AVAILABLE]: 'green-lighten-2',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_RECESSIVE]: 'orange-darken-2',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_UNLIKELY]: 'green-lighten-2'
}

/** Labels for ClinGen dosage scores. */
export const CLINGEN_DOSAGE_LABELS: { [Key in ClingenDosageScore]: string } = {
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_UNKNOWN]: 'unknown',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_SUFFICIENT_EVIDENCE_AVAILABLE]:
    'sufficient evidence for dosage pathogenicity',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_SOME_EVIDENCE_AVAILABLE]:
    'some evidence for dosage pathogenicity',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_LITTLE_EVIDENCE]:
    'little evidence for dosage pathogenicity',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_NO_EVIDENCE_AVAILABLE]:
    'no evidence for dosage pathogenicity',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_RECESSIVE]:
    'gene associated with autosomal recessive phenotype',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_UNLIKELY]: 'dosage sensitivity unlikely'
}

/** Short labels for ClinGen dosage scores. */
export const CLINGEN_DOSAGE_LABELS_SHORT: { [Key in ClingenDosageScore]: string } = {
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_UNKNOWN]: 'unknown',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_SUFFICIENT_EVIDENCE_AVAILABLE]: 'sufficient evidence',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_SOME_EVIDENCE_AVAILABLE]: 'some evidence',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_LITTLE_EVIDENCE]: 'little evidence',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_NO_EVIDENCE_AVAILABLE]: 'no evidence',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_RECESSIVE]: 'gene autosomal recessive',
  [ClingenDosageScore.CLINGEN_DOSAGE_SCORE_UNLIKELY]: 'unlikely'
}
