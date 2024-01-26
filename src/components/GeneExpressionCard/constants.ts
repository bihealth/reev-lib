import { GtexTissue, GtexTissueDetailed } from '../../pbs/annonars/genes/base'

export const TISSUE_LABELS: { [Key in GtexTissue]: string } = {
  [GtexTissue.GTEX_TISSUE_UNKNOWN]: 'Unknown',
  [GtexTissue.GTEX_TISSUE_ADIPOSE_TISSUE]: 'Adipose Tissue',
  [GtexTissue.GTEX_TISSUE_ADRENAL_GLAND]: 'Adrenal Gland',
  [GtexTissue.GTEX_TISSUE_BLADDER]: 'Bladder',
  [GtexTissue.GTEX_TISSUE_BLOOD]: 'Blood',
  [GtexTissue.GTEX_TISSUE_BLOOD_VESSEL]: 'Blood Vessel',
  [GtexTissue.GTEX_TISSUE_BONE_MARROW]: 'Bone Marrow',
  [GtexTissue.GTEX_TISSUE_BRAIN]: 'Brain',
  [GtexTissue.GTEX_TISSUE_BREAST]: 'Breast',
  [GtexTissue.GTEX_TISSUE_CERVIX_UTERI]: 'Cervix Uteri',
  [GtexTissue.GTEX_TISSUE_COLON]: 'Colon',
  [GtexTissue.GTEX_TISSUE_ESOPHAGUS]: 'Esophagus',
  [GtexTissue.GTEX_TISSUE_FALLOPIAN_TUBE]: 'Fallopian Tube',
  [GtexTissue.GTEX_TISSUE_HEART]: 'Heart',
  [GtexTissue.GTEX_TISSUE_KIDNEY]: 'Kidney',
  [GtexTissue.GTEX_TISSUE_LIVER]: 'Liver',
  [GtexTissue.GTEX_TISSUE_LUNG]: 'Lung',
  [GtexTissue.GTEX_TISSUE_MUSCLE]: 'Muscle',
  [GtexTissue.GTEX_TISSUE_NERVE]: 'Nerve',
  [GtexTissue.GTEX_TISSUE_OVARY]: 'Ovary',
  [GtexTissue.GTEX_TISSUE_PANCREAS]: 'Pancreas',
  [GtexTissue.GTEX_TISSUE_PITUITARY]: 'Pituitary',
  [GtexTissue.GTEX_TISSUE_PROSTATE]: 'Prostate',
  [GtexTissue.GTEX_TISSUE_SALIVARY_GLAND]: 'Salivary Gland',
  [GtexTissue.GTEX_TISSUE_SKIN]: 'Skin',
  [GtexTissue.GTEX_TISSUE_SMALL_INTESTINE]: 'Small Intestine',
  [GtexTissue.GTEX_TISSUE_SPLEEN]: 'Spleen',
  [GtexTissue.GTEX_TISSUE_STOMACH]: 'Stomach',
  [GtexTissue.GTEX_TISSUE_TESTIS]: 'Testis',
  [GtexTissue.GTEX_TISSUE_THYROID]: 'Thyroid',
  [GtexTissue.GTEX_TISSUE_UTERUS]: 'Uterus',
  [GtexTissue.GTEX_TISSUE_VAGINA]: 'Vagina'
}

export const TISSUE_DETAILED_LABELS: { [Key in GtexTissueDetailed]: string } = {
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_UNKNOWN]: 'Unknown',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ADIPOSE_SUBCUTANEOUS]: 'Adipose - Subcutaneous',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ADIPOSE_VISCERAL_OMENTUM]:
    'Adipose - Visceral (Omentum)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ADRENAL_GLAND]: 'Adrenal Gland',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ARTERY_AORTA]: 'Artery - Aorta',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ARTERY_CORONARY]: 'Artery - Coronary',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ARTERY_TIBIAL]: 'Artery - Tibial',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BLADDER]: 'Bladder',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_AMYGDALA]: 'Brain - Amygdala',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_ANTERIOR_CINGULATE_CORTEX]:
    'Brain - Anterior cingulate cortex (BA24)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_CAUDATE_BASAL_GANGLIA]:
    'Brain - Caudate (basal ganglia)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_CEREBELLAR_HEMISPHERE]:
    'Brain - Cerebellar Hemisphere',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_CEREBELLUM]: 'Brain - Cerebellum',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_CORTEX]: 'Brain - Cortex',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_FRONTAL_CORTEX]: 'Brain - Frontal Cortex (BA9)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_HIPPOCAMPUS]: 'Brain - Hippocampus',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_HYPOTHALAMUS]: 'Brain - Hypothalamus',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_NUCLEUS_ACCUMBENS]:
    'Brain - Nucleus accumbens (basal ganglia)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_PUTAMEN_BASAL_GANGLIA]:
    'Brain - Putamen (basal ganglia)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_SPINAL_CORD]: 'Brain - Spinal cord (cervical c-1)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BRAIN_SUBSTANTIA_NIGRA]: 'Brain - Substantia nigra',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_BREAST_MAMMARY_TISSUE]: 'Breast - Mammary Tissue',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_CELLS_CULTURED_FIBROBLASTS]:
    'Cells - Cultured fibroblasts',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_CELLS_EBV_TRANSFORMED_LYMPHOCYTES]:
    'Cells - EBV-transformed lymphocytes',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_CELLS_LEUKEMIA_CELL_LINE]:
    'Cells - Leukemia cell line (CML)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_CERVIX_ECTOCERVIX]: 'Cervix - Ectocervix',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_CERVIX_ENDOCERVIX]: 'Cervix - Endocervix',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_COLON_SIGMOID]: 'Colon - Sigmoid',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_COLON_TRANSVERSE]: 'Colon - Transverse',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ESOPHAGUS_GASTROESOPHAGEAL_JUNCTION]:
    'Esophagus - Gastroesophageal Junction',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ESOPHAGUS_MUCOSA]: 'Esophagus - Mucosa',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_ESOPHAGUS_MUSCULARIS]: 'Esophagus - Muscularis',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_FALLOPIAN_TUBE]: 'Fallopian Tube',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_HEART_ATRIAL_APPENDAGE]: 'Heart - Atrial Appendage',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_HEART_LEFT_VENTRICLE]: 'Heart - Left Ventricle',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_KIDNEY_CORTEX]: 'Kidney - Cortex',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_KIDNEY_MEDULLA]: 'Kidney - Medulla',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_LIVER]: 'Liver',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_LUNG]: 'Lung',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_MINOR_SALIVARY_GLAND]: 'Minor Salivary Gland',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_MUSCLE_SKELETAL]: 'Muscle - Skeletal',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_NERVE_TIBIAL]: 'Nerve - Tibial',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_OVARY]: 'Ovary',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_PANCREAS]: 'Pancreas',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_PITUITARY]: 'Pituitary',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_PROSTATE]: 'Prostate',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_SALIVARY_GLAND]: 'Salivary Gland',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_SKIN_NOT_SUN_EXPOSED_SUPRAPUBIC]:
    'Skin - Not Sun Exposed (Suprapubic)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_SKIN_SUN_EXPOSED_LOWER_LEG]:
    'Skin - Sun Exposed (Lower leg)',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_SMALL_INTESTINE_TERMINAL_ILEUM]:
    'Small Intestine - Terminal Ileum',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_SPLEEN]: 'Spleen',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_STOMACH]: 'Stomach',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_TESTIS]: 'Testis',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_THYROID]: 'Thyroid',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_UTERUS]: 'Uterus',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_VAGINA]: 'Vagina',
  [GtexTissueDetailed.GTEX_TISSUE_DETAILED_WHOLE_BLOOD]: 'Whole Blood'
}
