import { GenesClingenDosageScore } from "@/ext/annonars-api/src/lib"

/** Scores for ClinGen dosage scores. */
export const CLINGEN_DOSAGE_SCORES: { [Key in GenesClingenDosageScore]: number } = {
  'SufficientEvidenceAvailable': 3,
  'SomeEvidenceAvailable': 2,
  'LittleEvidence': 1,
  'NoEvidenceAvailable': 0,
  'Recessive': 30,
  'Unlikely': 40
}

/** Colors for ClinGen dosage scores. */
export const CLINGEN_DOSAGE_COLOR: { [Key in GenesClingenDosageScore]: string } = {
  'SufficientEvidenceAvailable': 'red-darken-3',
  'SomeEvidenceAvailable': 'orange-darken-2',
  'LittleEvidence': 'orange-darken-2',
  'NoEvidenceAvailable': 'green-lighten-2',
  'Recessive': 'orange-darken-2',
  'Unlikely': 'green-lighten-2'
}

/** Labels for ClinGen dosage scores. */
export const CLINGEN_DOSAGE_LABELS: { [Key in GenesClingenDosageScore]: string } = {
  'SufficientEvidenceAvailable': 'Sufficient evidence for dosage pathogenicity',
  'SomeEvidenceAvailable': 'Some evidence for dosage pathogenicity',
  'LittleEvidence': 'Little evidence for dosage pathogenicity',
  'NoEvidenceAvailable': 'No evidence for dosage pathogenicity',
  'Recessive': 'Gene associated with autosomal recessive phenotype',
  'Unlikely': 'Dosage sensitivity unlikely'
}

/** Short labels for ClinGen dosage scores. */
export const CLINGEN_DOSAGE_LABELS_SHORT: { [Key in GenesClingenDosageScore]: string } = {
  'SufficientEvidenceAvailable': 'sufficient evidence',
  'SomeEvidenceAvailable': 'some evidence',
  'LittleEvidence': 'little evidence',
  'NoEvidenceAvailable': 'no evidence',
  'Recessive': 'gene autosomal recessive',
  'Unlikely': 'unlikely'
}
