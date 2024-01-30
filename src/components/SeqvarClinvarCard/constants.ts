import { ClinicalSignificance, ReviewStatus } from '../../pbs/annonars/clinvar/minimal'

export const CLINICAL_SIGNIFICANCE_LABEL: { [key in ClinicalSignificance]: string } = {
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_PATHOGENIC]: 'pathogenic',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_LIKELY_PATHOGENIC]: 'likely pathogenic',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_UNCERTAIN_SIGNIFICANCE]: 'uncertain significance',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_LIKELY_BENIGN]: 'likely benign',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_BENIGN]: 'benign',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_UNKNOWN]: 'unknown'
}

export const CLINICAL_SIGNIFICANCE_COLOR: { [key in ClinicalSignificance]: string } = {
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_PATHOGENIC]: 'red-darken-3',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_LIKELY_PATHOGENIC]: 'orange-draken-2',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_UNCERTAIN_SIGNIFICANCE]: 'gray-lighten-2',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_LIKELY_BENIGN]: 'green-lighen-3',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_BENIGN]: 'green-darken-2',
  [ClinicalSignificance.CLINICAL_SIGNIFICANCE_UNKNOWN]: 'grey-darken-2'
}

export const REVIEW_STATUS_LABEL: { [key in ReviewStatus]: string } = {
  [ReviewStatus.REVIEW_STATUS_PRACTICE_GUIDELINE]: 'practice guideline',
  [ReviewStatus.REVIEW_STATUS_REVIEWED_BY_EXPERT_PANEL]: 'reviewed by expert panel',
  [ReviewStatus.REVIEW_STATUS_CRITERIA_PROVIDED_MULTIPLE_SUBMITTERS_NO_CONFLICTS]:
    'criteria provided, multiple submitters, no conflicts',
  [ReviewStatus.REVIEW_STATUS_CRITERIA_PROVIDED_SINGLE_SUBMITTER]:
    'criteria provided, single submitter',
  [ReviewStatus.REVIEW_STATUS_CRITERIA_PROVIDED_CONFLICTING_INTERPRETATIONS]:
    'criteria provided, conflicting interpretations',
  [ReviewStatus.REVIEW_STATUS_NO_ASSERTION_CRITERIA_PROVIDED]: 'no assertion criteria provided',
  [ReviewStatus.REVIEW_STATUS_NO_ASSERTION_PROVIDED]: 'no assertion provided',
  [ReviewStatus.REVIEW_STATUS_PRACTICE_UNKNOWN]: 'unknown',
  [ReviewStatus.REVIEW_STATUS_FLAGGED_SUBMISSION]: 'flagged submission',
  [ReviewStatus.REVIEW_STATUS_NO_CLASSIFICATIONS_FROM_UNFLAGGED_RECORDS]:
    'no classifications from unflagged records'
}

export const REVIEW_STATUS_STARS: { [key in ReviewStatus]: number } = {
  [ReviewStatus.REVIEW_STATUS_PRACTICE_GUIDELINE]: 4,
  [ReviewStatus.REVIEW_STATUS_REVIEWED_BY_EXPERT_PANEL]: 3,
  [ReviewStatus.REVIEW_STATUS_CRITERIA_PROVIDED_MULTIPLE_SUBMITTERS_NO_CONFLICTS]: 2,
  [ReviewStatus.REVIEW_STATUS_CRITERIA_PROVIDED_SINGLE_SUBMITTER]: 1,
  [ReviewStatus.REVIEW_STATUS_CRITERIA_PROVIDED_CONFLICTING_INTERPRETATIONS]: 1,
  [ReviewStatus.REVIEW_STATUS_NO_ASSERTION_CRITERIA_PROVIDED]: 0,
  [ReviewStatus.REVIEW_STATUS_NO_ASSERTION_PROVIDED]: 0,
  [ReviewStatus.REVIEW_STATUS_PRACTICE_UNKNOWN]: 0,
  [ReviewStatus.REVIEW_STATUS_FLAGGED_SUBMISSION]: 0,
  [ReviewStatus.REVIEW_STATUS_NO_CLASSIFICATIONS_FROM_UNFLAGGED_RECORDS]: 0
}
