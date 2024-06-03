import {
  AggregateGermlineReviewStatus,
  AggregateOncogenicityReviewStatus,
  AggregateSomaticClinicalImpactReviewStatus
} from '../../pbs/annonars/clinvar_data/clinvar_public'

export const AGGREGATE_GERMLINE_REVIEW_STATUS_LABEL: {
  [key in AggregateGermlineReviewStatus]: string
} = {
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_UNSPECIFIED]: 'UNSPECIFIED',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_NO_CLASSIFICATION_PROVIDED]:
    'no classification provided',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_NO_ASSERTION_CRITERIA_PROVIDED]:
    'no assertion criteria provided',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_CRITERIA_PROVIDED_SINGLE_SUBMITTER]:
    'criteria provided, single submitter',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_CRITERIA_PROVIDED_MULTIPLE_SUBMITTERS_NO_CONFLICTS]:
    'criteria provided, multiple submitters, no conflicts',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_CRITERIA_PROVIDED_CONFLICTING_CLASSIFICATIONS]:
    'criteria provided, conflicting classifications',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_REVIEWED_BY_EXPERT_PANEL]:
    'reviewed by expert panel',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_PRACTICE_GUIDELINE]:
    'practice guideline',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_NO_CLASSIFICATIONS_FROM_UNFLAGGED_RECORDS]:
    'no classifications from unflagged records',
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_NO_CLASSIFICATION_FOR_THE_SINGLE_VARIANT]:
    'no classification for the single variant'
}

export const AGGREGATE_GERMLINE_REVIEW_STATUS_STARS: {
  [key in AggregateGermlineReviewStatus]: number
} = {
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_UNSPECIFIED]: 0,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_NO_CLASSIFICATION_PROVIDED]: 0,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_NO_ASSERTION_CRITERIA_PROVIDED]: 0,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_CRITERIA_PROVIDED_SINGLE_SUBMITTER]: 1,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_CRITERIA_PROVIDED_MULTIPLE_SUBMITTERS_NO_CONFLICTS]: 2,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_CRITERIA_PROVIDED_CONFLICTING_CLASSIFICATIONS]: 0,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_REVIEWED_BY_EXPERT_PANEL]: 3,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_PRACTICE_GUIDELINE]: 4,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_NO_CLASSIFICATIONS_FROM_UNFLAGGED_RECORDS]: 0,
  [AggregateGermlineReviewStatus.AGGREGATE_GERMLINE_REVIEW_STATUS_NO_CLASSIFICATION_FOR_THE_SINGLE_VARIANT]: 0
}

export const AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_LABEL: {
  [key in AggregateSomaticClinicalImpactReviewStatus]: string
} = {
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_UNSPECIFIED]:
    'UNSPECIFIED',
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_NO_CLASSIFICATION_PROVIDED]:
    'no classification provided',
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_NO_ASSERTION_CRITERIA_PROVIDED]:
    'no assertion criteria provided',
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_CRITERIA_PROVIDED_SINGLE_SUBMITTER]:
    'criteria provided, single submitter',
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_CRITERIA_PROVIDED_MULTIPLE_SUBMITTERS]:
    'criteria provided, multiple submitters',
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_REVIEWED_BY_EXPERT_PANEL]:
    'reviewed by expert panel',
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_PRACTICE_GUIDELINE]:
    'practice guideline',
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_NO_CLASSIFICATIONS_FROM_UNFLAGGED_RECORDS]:
    'no classifications from unflagged records',
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_NO_CLASSIFICATION_FOR_THE_SINGLE_VARIANT]:
    'no classification for the single variant'
}

export const AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_STARS: {
  [key in AggregateSomaticClinicalImpactReviewStatus]: number
} = {
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_UNSPECIFIED]: 0,
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_NO_CLASSIFICATION_PROVIDED]: 0,
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_NO_ASSERTION_CRITERIA_PROVIDED]: 0,
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_CRITERIA_PROVIDED_SINGLE_SUBMITTER]: 1,
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_CRITERIA_PROVIDED_MULTIPLE_SUBMITTERS]: 2,
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_REVIEWED_BY_EXPERT_PANEL]: 3,
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_PRACTICE_GUIDELINE]: 4,
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_NO_CLASSIFICATIONS_FROM_UNFLAGGED_RECORDS]: 0,
  [AggregateSomaticClinicalImpactReviewStatus.AGGREGATE_SOMATIC_CLINICAL_IMPACT_REVIEW_STATUS_NO_CLASSIFICATION_FOR_THE_SINGLE_VARIANT]: 0
}

export const AGGREGATE_ONCOGENICITY_REVIEW_STATUS_LABEL: {
  [key in AggregateOncogenicityReviewStatus]: string
} = {
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_UNSPECIFIED]:
    'UNSPECIFIED',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_NO_CLASSIFICATION_PROVIDED]:
    'no classification provided',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_NO_ASSERTION_CRITERIA_PROVIDED]:
    'no assertion criteria provided',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_CRITERIA_PROVIDED_SINGLE_SUBMITTER]:
    'criteria provided, single submitter',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_CRITERIA_PROVIDED_MULTIPLE_SUBMITTERS_NO_CONFLICTS]:
    'criteria provided, multiple submitters, no conflicts',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_CRITERIA_PROVIDED_CONFLICTING_CLASSIFICATIONS]:
    'criteria provided, conflicting classifications',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_REVIEWED_BY_EXPERT_PANEL]:
    'reviewed by expert panel',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_PRACTICE_GUIDELINE]:
    'practice guideline',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_NO_CLASSIFICATIONS_FROM_UNFLAGGED_RECORDS]:
    'no classifications from unflagged records',
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_NO_CLASSIFICATION_FOR_THE_SINGLE_VARIANT]:
    'no classification for the single variant'
}

export const AGGREGATE_ONCOGENICITY_REVIEW_STATUS_STARS: {
  [key in AggregateOncogenicityReviewStatus]: number
} = {
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_UNSPECIFIED]: 0,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_NO_CLASSIFICATION_PROVIDED]: 0,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_NO_ASSERTION_CRITERIA_PROVIDED]: 0,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_CRITERIA_PROVIDED_SINGLE_SUBMITTER]: 1,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_CRITERIA_PROVIDED_MULTIPLE_SUBMITTERS_NO_CONFLICTS]: 2,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_CRITERIA_PROVIDED_CONFLICTING_CLASSIFICATIONS]: 0,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_REVIEWED_BY_EXPERT_PANEL]: 3,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_PRACTICE_GUIDELINE]: 4,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_NO_CLASSIFICATIONS_FROM_UNFLAGGED_RECORDS]: 0,
  [AggregateOncogenicityReviewStatus.AGGREGATE_ONCOGENICITY_REVIEW_STATUS_NO_CLASSIFICATION_FOR_THE_SINGLE_VARIANT]: 0
}
