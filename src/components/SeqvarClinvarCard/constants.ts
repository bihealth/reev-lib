import {
  ClinvarAggregateGermlineReviewStatus,
  ClinvarAggregateOncogenicityReviewStatus,
  ClinvarAggregateSomaticClinicalImpactReviewStatus
} from '../../ext/annonars-api/src/lib'

export const AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL: {
  [key in ClinvarAggregateGermlineReviewStatus]: string
} = {
  no_classification_provided: 'no classification provided',
  no_assertion_criteria_provided: 'no assertion criteria provided',
  criteria_provided_single_submitter: 'criteria provided, single submitter',
  criteria_provided_multiple_submitters_no_conflicts:
    'criteria provided, multiple submitters, no conflicts',
  criteria_provided_conflicting_classifications: 'criteria provided, conflicting classifications',
  reviewed_by_expert_panel: 'reviewed by expert panel',
  practice_guideline: 'practice guideline',
  no_classifications_from_unflagged_records: 'no classifications from unflagged records',
  no_classification_for_the_single_variant: 'no classification for the single variant'
}

export const AGGREGATE_GERMLINE_REVIEW_STATUS_STARS: {
  [key in ClinvarAggregateGermlineReviewStatus]: number
} = {
  no_classification_provided: 0,
  no_assertion_criteria_provided: 0,
  criteria_provided_single_submitter: 1,
  criteria_provided_multiple_submitters_no_conflicts: 2,
  criteria_provided_conflicting_classifications: 0,
  reviewed_by_expert_panel: 3,
  practice_guideline: 4,
  no_classifications_from_unflagged_records: 0,
  no_classification_for_the_single_variant: 0
}

export const AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL: {
  [key in ClinvarAggregateSomaticClinicalImpactReviewStatus]: string
} = {
  no_classification_provided: 'no classification provided',
  no_assertion_criteria_provided: 'no assertion criteria provided',
  criteria_provided_single_submitter: 'criteria provided, single submitter',
  criteria_provided_multiple_submitters: 'criteria provided, multiple submitters',
  reviewed_by_expert_panel: 'reviewed by expert panel',
  practice_guideline: 'practice guideline',
  no_classifications_from_unflagged_records: 'no classifications from unflagged records',
  no_classification_for_the_single_variant: 'no classification for the single variant'
}

export const AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS: {
  [key in ClinvarAggregateSomaticClinicalImpactReviewStatus]: number
} = {
  no_classification_provided: 0,
  no_assertion_criteria_provided: 0,
  criteria_provided_single_submitter: 1,
  criteria_provided_multiple_submitters: 2,
  reviewed_by_expert_panel: 3,
  practice_guideline: 4,
  no_classifications_from_unflagged_records: 0,
  no_classification_for_the_single_variant: 0
}

export const AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL: {
  [key in ClinvarAggregateOncogenicityReviewStatus]: string
} = {
  no_classification_provided: 'no classification provided',
  no_assertion_criteria_provided: 'no assertion criteria provided',
  criteria_provided_single_submitter: 'criteria provided, single submitter',
  criteria_provided_multiple_submitters_no_conflicts: 'criteria provided, multiple submitters',
  reviewed_by_expert_panel: 'reviewed by expert panel',
  practice_guideline: 'practice guideline',
  no_classifications_from_unflagged_records: 'no classifications from unflagged records',
  no_classification_for_the_single_variant: 'no classification for the single variant',
  criteria_provided_conflicting_classifications: 'criteria provided, conflicting classifications'
}

export const AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS: {
  [key in ClinvarAggregateOncogenicityReviewStatus]: number
} = {
  no_classification_provided: 0,
  no_assertion_criteria_provided: 0,
  criteria_provided_single_submitter: 1,
  criteria_provided_multiple_submitters_no_conflicts: 2,
  criteria_provided_conflicting_classifications: 0,
  reviewed_by_expert_panel: 3,
  practice_guideline: 4,
  no_classifications_from_unflagged_records: 0,
  no_classification_for_the_single_variant: 0
}
