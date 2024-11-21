<script setup lang="ts">
import { titleCase } from 'title-case'
import { computed, onMounted, ref, useSlots, watch } from 'vue'

import DocsLink from '../DocsLink/DocsLink.vue'
import { GenesConditionsRecord, GenesDiseaseAssociation, GenesDiseaseAssociationEntryConfidenceLevel, GenesDiseaseAssociationSource, GenesGeneInfoRecord, GenesPanelappAssociation, GenesPanelappAssociationConfidenceLevel, GenesPanelappRecordConfidenceLevel } from '../../ext/annonars-api/src/lib'
import { ResultHpoTerm } from '../../ext/viguno-api/src/lib'

/** This component's props. */
const props = withDefaults(
  defineProps<{
    /** The gene information record. */
    geneInfo?: GenesGeneInfoRecord
    /** The HPO terms to display. */
    hpoTerms?: ResultHpoTerm[]
  }>(),
  {
    hpoTerms: () => []
  }
)

/** This component's slots. */
const slots = useSlots()

// -- code for hiding / showing term IDs -------------------------------------

/** Whether to display Term IDs. */
const showTermIds = ref<boolean>(false)

/** Whether to show terms as hyperlinks. */
const showTermLinks = ref<boolean>(true)

// -- code for expanded / collapsed card --------------------------------------

/** Whether the card is expanded. */
const isExpanded = ref<boolean>(false)

// -- code for shortened / full HPO term list -------------------------------

/** Maxmimal number of HPO terms to show by default. */
const maxHpoTerms = 20

/** Whether to show all terms. */
const showAllHpoTerms = ref<boolean>(false)

/** The HPO terms to show. */
const hpoTermsToShow = computed<ResultHpoTerm[]>(() => {
  if (showAllHpoTerms.value ?? !props.hpoTerms) {
    return props.hpoTerms ?? []
  } else {
    return props.hpoTerms.slice(0, maxHpoTerms)
  }
})

// -- code for integrated conditions -----------------------------------------

const GDA_LABELS: {
  [key in GenesDiseaseAssociationSource]: string
} = {
  'Omim':
    'OMIM',
  'Orphanet':
    'Orphanet',
  'Panelapp':
    'PanelApp',
}

const CONFIDENCE_LEVEL_LABELS: {
  [key in GenesDiseaseAssociationEntryConfidenceLevel]: string
} = {
  'High': 'High',
  'Medium': 'Medium',
  'Low': 'Low',
}

const PANELAPP_CONFIDENCE_LABELS: {
  [key in GenesPanelappAssociationConfidenceLevel]: string
} = {
  'Green': 'Green',
  'Amber': 'Amber',
  'Red': 'Red',
  'None': 'None'
}

const PANELAPP_CONFIDENCE_ORDER: {
  [key in GenesPanelappAssociationConfidenceLevel]: number
} = {
  'Green': 0,
  'Amber': 1,
  'Red': 2,
  'None': 0
}

const conditions = computed<GenesConditionsRecord>(() => {
  if (!!props.geneInfo?.conditions) {
    return props.geneInfo.conditions!
  } else {
    return {
      hgnc_id: props.geneInfo?.hgnc?.hgnc_id ?? '',
      disease_associations: [],
      panelapp_associations: []
    }
  }
})

// -- code for shortened / full associate disease list -----------------------

/** Maxmimal number of diseases terms to show by default. */
const maxDiseases = 3

/** Whether to show all terms. */
const showAllDiseases = ref<boolean>(false)

/** The diseases to show. */
const diseasesToShow = computed<GenesDiseaseAssociation[]>(() => {
  return conditions.value.disease_associations
})

/** Whether to display disease details. */
const showDiseaseDetails = ref<boolean[]>([])

/** Initialize the showDiseaseDetails. */
const initShowDiseaseDetails = () => {
  showDiseaseDetails.value = conditions.value.disease_associations.map(() => false)
}

/** Sorting `v-model` attributes for disease list. */
const sortKeyDisease = ref<string>('diseaseName')
const sortOrderDisease = ref<'asc' | 'desc'>('asc')
const sortItemsDisease = [
  {
    label: 'confidence',
    key: 'confidence'
  },
  {
    label: 'name',
    key: 'diseaseName'
  }
]

/** Custom function for sorting confidence Level. */
const confidenceLevelSorting = (
  a: GenesPanelappAssociationConfidenceLevel,
  b: GenesPanelappAssociationConfidenceLevel
) => {
  const confidenceA = PANELAPP_CONFIDENCE_ORDER[a]
  const confidenceB = PANELAPP_CONFIDENCE_ORDER[b]
  return confidenceA - confidenceB
}

/** Custom sorting functions for `v-data-iterator` */
type DataTableCompareFunctionPanelApp<T = any> = (a: T, b: T) => number
const customKeySortPanelApp: { [key: string]: DataTableCompareFunctionPanelApp } = {
  confidenceLevel: confidenceLevelSorting
}
type DataTableCompareFunctionConfidenceLevel = (
  a: GenesPanelappRecordConfidenceLevel,
  b: GenesPanelappRecordConfidenceLevel
) => number
const customKeySortDisease: { [key: string]: DataTableCompareFunctionConfidenceLevel } = {
  confidence: confidenceLevelSorting
}

onMounted(() => initShowDiseaseDetails())
watch(
  () => conditions.value,
  () => initShowDiseaseDetails()
)

// -- code for shortened / full PanelApp panel list --------------------------

/** Maxmimal number of diseases terms to show by default. */
const maxPanels = 3

/** Whether to show all terms. */
const showAllPanels = ref<boolean>(false)

/** The diseases to show. */
const panelsToShow = computed<GenesPanelappAssociation[]>(() => {
  return conditions.value.panelapp_associations
})

/** Whether to display PanelApp panel details. */
const showPanelDetails = ref<boolean[]>([])

/** Initialize the showPanelDetails. */
const initShowPanelDetails = () => {
  showPanelDetails.value = conditions.value.disease_associations.map(() => false)
}

/** Sorting `v-model` attributes for PanelApp panel list. */
const sortKeyPanelApp = ref<string>('confidenceLevel')
const sortOrderPanelApp = ref<'asc' | 'desc'>('desc')
const sortItemsPanelApp = [
  {
    label: 'confidence',
    key: 'confidenceLevel'
  },
  {
    label: 'name',
    key: 'panel.name'
  },
  {
    label: 'mode of inheritance',
    key: 'modeOfInheritance'
  }
]

onMounted(() => initShowPanelDetails())
watch(
  () => conditions.value,
  () => initShowPanelDetails()
)

/** The number of cols for the conditions (12 or leave space of 3 for cada ranking) */
const conditionsCols = computed<number>(() => {
  if (slots.default) {
    return 9
  } else {
    return 12
  }
})
</script>

<template>
  <!-- no ENSG => display loader -->
  <template v-if="!geneInfo && !hpoTerms">
    <v-skeleton-loader class="mx-auto border" type="image,button" />
  </template>

  <!-- otherwise, display actual card -->
  <template v-else>
    <v-card>
      <v-card-title class="pb-0 pr-2">
        Associated Conditions
        <DocsLink anchor="associated-conditions" />
      </v-card-title>
      <v-card-subtitle class="text-overline">
        Phenotypes and Disorders Associated with Gene
      </v-card-subtitle>
      <v-card-text class="pt-3">
        <v-row>
          <v-col :cols="conditionsCols" class="pt-0">
            <template v-if="hpoTerms === null">
              <v-skeleton-loader class="mt-3 mx-auto border" type="header,text" />
            </template>
            <template v-else>
              <!-- == ACMG SF ====== -->
              <template v-if="geneInfo?.acmg_sf">
                <div class="text-subtitle-1">ACMG Supplementary Findings</div>
                <div>
                  The gene <span class="font-italic">{{ geneInfo.hgnc!.symbol }}</span> is on the
                  <abbr title="American College of Medical Genetics and Genomics"> ACMG </abbr>
                  Supplementary Findings (SF) list since v{{ geneInfo.acmg_sf.sf_list_version }}. The
                  disease phenotype is
                  <strong>{{ titleCase(geneInfo.acmg_sf.disease_phenotype) }}</strong> for
                  <strong>{{ geneInfo.acmg_sf.inheritance }}</strong> inheritance. The SF list
                  recommends to report
                  <strong>{{ geneInfo.acmg_sf.variants_to_report.replace('All', 'all') }}</strong>
                  variants.
                </div>
              </template>
              <!-- == Conditions ===== -->

              <div v-if="conditions.disease_associations?.length">
                <v-data-iterator
                  :items="diseasesToShow"
                  :item-key="(item: GenesDiseaseAssociation) => item.hgnc_id"
                  :sort-by="[{ key: sortKeyDisease, order: sortOrderDisease }]"
                  :custom-key-sort="customKeySortDisease"
                  :items-per-page="showAllDiseases ? -1 : maxDiseases"
                  :hide-default-footer="true"
                  class="mt-3"
                >
                  <template #header>
                    <v-toolbar class="px-2 rounded-t-lg border" color="background">
                      <div class="text-subtitle-1" :class="{ 'mt-3': geneInfo?.hgnc }">
                        Associated Diseases
                        <small>
                          <template
                            v-if="(conditions.disease_associations?.length ?? 0) > maxDiseases"
                          >
                            <template v-if="showAllDiseases">
                              ({{ conditions.disease_associations?.length }} of
                              {{ conditions.disease_associations?.length }})
                            </template>
                            <template v-else>
                              ({{ diseasesToShow.length }} of
                              {{ conditions.disease_associations?.length }})
                            </template>
                          </template>
                          <template v-else>
                            ({{ conditions.disease_associations?.length }})
                          </template>

                          <template v-if="conditions.disease_associations.length > maxDiseases">
                            &bullet;
                            <a href="#" @click.prevent="showAllDiseases = !showAllDiseases">
                              {{ showAllDiseases ? ' show fewer' : ' show all' }}
                            </a>
                          </template>
                        </small>
                      </div>
                      <v-spacer></v-spacer>
                      <div style="width: 220px">
                        <v-select
                          v-model="sortKeyDisease"
                          label="sort by"
                          item-title="label"
                          item-value="key"
                          :items="sortItemsDisease"
                          density="compact"
                          :hide-details="true"
                          variant="outlined"
                        />
                      </div>
                      <v-btn @click="sortOrderDisease = sortOrderDisease == 'asc' ? 'desc' : 'asc'">
                        {{ sortOrderDisease }}
                        <v-icon
                          :icon="
                            sortOrderDisease == 'asc' ? 'mdi-sort-ascending' : 'mdi-sort-descending'
                          "
                          class="pl-3"
                        />
                      </v-btn>
                    </v-toolbar>
                  </template>

                  <template #default="{ items }">
                    <template v-for="item in items" :key="item.raw">
                      <v-sheet class="rounded-l px-3 py-2 mt-3" color="background">
                        <div class="text-h6">
                          {{ item.raw.disease_name }}
                        </div>
                        <div class="text-body-2 mt-1">
                          Description: {{ item.raw.disease_definition ?? 'N/A' }}
                        </div>
                        <div class="text-body-2 mt-2">
                          <span class="font-weight-bold"> Confidence: </span>
                          <span
                            class="text-no-wrap"
                            :title="
                              CONFIDENCE_LEVEL_LABELS[
                                item.raw
                                  .confidence as GenesDiseaseAssociationEntryConfidenceLevel
                              ]
                            "
                          >
                            <template
                              v-if="
                                item.raw.confidence ===
                                'High'
                              "
                            >
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star</v-icon>
                            </template>
                            <template
                              v-else-if="
                                item.raw.confidence ===
                                'Medium'
                              "
                            >
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star-outline</v-icon>
                            </template>
                            <template v-else>
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star-outline</v-icon>
                              <v-icon>mdi-star-outline</v-icon>
                            </template>
                          </span>
                          <span class="font-weight-bold"> &bullet; Sources: </span>
                          {{
                            item.raw.sources
                              .map((s: keyof typeof GDA_LABELS) => GDA_LABELS[s])
                              .join(', ')
                          }}
                        </div>
                        <v-expansion-panels color="background" variant="popout">
                          <v-expansion-panel bg-color="background" rounded="lg">
                            <v-expansion-panel-title
                              expand-icon="mdi-plus"
                              collapse-icon="mdi-minus"
                            >
                              Additional Information
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                              <div style="border-top: 1px solid black" class="mt-2 pt-2 pl-4">
                                <ul
                                  v-for="(disorder, idxDisorder) in item.raw.labeled_disorders"
                                  :key="idxDisorder"
                                >
                                  <li>[{{ disorder.term_id }}] {{ disorder.title }}</li>
                                </ul>
                              </div>
                            </v-expansion-panel-text>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-sheet>
                    </template>
                  </template>

                  <template #no-data>
                    <v-sheet class="pa-3 text-center font-italic border">
                      No diseases associated with gene.
                    </v-sheet>
                  </template>
                </v-data-iterator>
              </div>

              <div v-else class="text-grey font-italic">No diseases associated with gene.</div>
              <!-- == PanelApp Panels -->

              <div v-if="conditions.panelapp_associations?.length">
                <v-data-iterator
                  :items="panelsToShow"
                  :item-key="(item: GenesPanelappAssociation) => item.panel!.id"
                  :sort-by="[{ key: sortKeyPanelApp, order: sortOrderPanelApp }]"
                  :custom-key-sort="customKeySortPanelApp"
                  :items-per-page="showAllPanels ? -1 : maxPanels"
                  :hide-default-footer="true"
                  class="mt-3"
                >
                  <template #header>
                    <v-toolbar class="px-2 rounded-t-lg border" color="background">
                      <div class="text-subtitle-1 mt-3">
                        PanelApp Panels for {{ geneInfo?.hgnc!.symbol }}
                        <a
                          :href="`https://panelapp.genomicsengland.co.uk/panels/entities/${
                            geneInfo?.hgnc!.symbol
                          }`"
                          target="_blank"
                        >
                          <v-icon>mdi-launch</v-icon>
                        </a>
                        <small>
                          <template
                            v-if="(conditions.panelapp_associations?.length ?? 0) > maxPanels"
                          >
                            <template v-if="showAllPanels">
                              ({{ conditions.panelapp_associations?.length }} of
                              {{ conditions.panelapp_associations?.length }})
                            </template>
                            <template v-else>
                              ({{ panelsToShow.length }} of
                              {{ conditions.panelapp_associations?.length }})
                            </template>
                          </template>
                          <template v-else>
                            ({{ conditions.panelapp_associations?.length }})
                          </template>

                          <template v-if="conditions.panelapp_associations.length > maxPanels">
                            &bullet;
                            <a href="#" @click.prevent="showAllPanels = !showAllPanels">
                              {{ showAllPanels ? ' show fewer' : ' show all' }}
                            </a>
                          </template>
                        </small>
                      </div>
                      <v-spacer></v-spacer>
                      <div style="width: 220px">
                        <v-select
                          v-model="sortKeyPanelApp"
                          label="sort by"
                          item-title="label"
                          item-value="key"
                          :items="sortItemsPanelApp"
                          density="compact"
                          :hide-details="true"
                          variant="outlined"
                        />
                      </div>
                      <v-btn
                        @click="sortOrderPanelApp = sortOrderPanelApp == 'asc' ? 'desc' : 'asc'"
                      >
                        {{ sortOrderPanelApp }}
                        <v-icon
                          :icon="
                            sortOrderPanelApp == 'asc'
                              ? 'mdi-sort-ascending'
                              : 'mdi-sort-descending'
                          "
                          class="pl-3"
                        />
                      </v-btn>
                    </v-toolbar>
                  </template>

                  <template #default="{ items }">
                    <template v-for="item in items" :key="item.raw.panel.name">
                      <v-sheet class="rounded-l px-3 py-2 mt-3" color="background">
                        <div class="text-h6">
                          {{ item.raw.panel!.name }}
                          <small> (v{{ item.raw.panel!.version }}) </small>
                          <a
                            :href="`https://panelapp.genomicsengland.co.uk/panels/${
                              item.raw.panel!.id
                            }`"
                            target="_blank"
                            class="ml-2"
                          >
                            <v-icon>mdi-launch</v-icon>
                          </a>
                        </div>
                        <!-- <div class="text-body-2 mt-1">
                        Description: {{ item.raw.diseaseDefinition ?? 'N/A' }}
                      </div> -->
                        <div class="text-body-2 mt-2">
                          <span class="font-weight-bold"> Confidence: </span>
                          <span
                            class="text-no-wrap"
                            :title="
                              PANELAPP_CONFIDENCE_LABELS[
                                item.raw
                                  .confidence_level
                              ]
                            "
                          >
                            <template
                              v-if="
                                item.raw.confidence_level ===
                                'Green'
                              "
                            >
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star</v-icon>
                            </template>
                            <template
                              v-else-if="
                                item.raw.confidence_level ===
                                'Amber'
                              "
                            >
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star-outline</v-icon>
                            </template>
                            <template v-else>
                              <v-icon>mdi-star</v-icon>
                              <v-icon>mdi-star-outline</v-icon>
                              <v-icon>mdi-star-outline</v-icon>
                            </template>
                          </span>
                          <span class="font-weight-bold"> &bullet; Mode of Inheritance: </span>
                          <span> {{ item.raw.mode_of_inheritance }} </span>
                        </div>

                        <v-expansion-panels color="background" variant="popout">
                          <v-expansion-panel bg-color="background" rounded="lg">
                            <v-expansion-panel-title
                              expand-icon="mdi-plus"
                              collapse-icon="mdi-minus"
                            >
                              Additional Information
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                              Gene specific panel decision in PanelApp:
                              <a
                                :href="`https://panelapp.genomicsengland.co.uk/panels/${
                                  item.raw.panel!.id
                                }/gene/${geneInfo?.hgnc!.symbol}`"
                                target="_blank"
                              >
                                <v-icon>mdi-launch</v-icon>
                              </a>
                              <div style="border-top: 1px solid black" class="mt-2 pt-2 pl-4">
                                <ul
                                  v-for="(phenotype, idxPhenotype) in item.raw.phenotypes"
                                  :key="idxPhenotype"
                                >
                                  <li>{{ phenotype }}</li>
                                </ul>
                              </div>
                            </v-expansion-panel-text>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-sheet>
                    </template>
                  </template>

                  <template #no-data>
                    <v-sheet class="pa-3 text-center font-italic border">
                      No PanelApp panels associated with gene.
                    </v-sheet>
                  </template>
                </v-data-iterator>
              </div>
              <div v-else class="text-grey font-italic">
                No PanelApp panels associated with gene.
              </div>

              <!-- == HPO Terms ===== -->
              <div class="text-subtitle-1 mt-3">
                HPO Terms
                <small>
                  <template v-if="(hpoTerms?.length ?? 0) > maxHpoTerms">
                    <template v-if="showAllHpoTerms">
                      ({{ hpoTerms?.length }} of {{ hpoTerms?.length }})
                    </template>
                    <template v-else>
                      ({{ hpoTermsToShow.length }} of {{ hpoTerms?.length }})
                    </template>
                  </template>
                  <template v-else> ({{ hpoTerms?.length }}) </template>

                  <template v-if="hpoTerms.length > maxHpoTerms">
                    &bullet;
                    <a href="#" @click.prevent="showAllHpoTerms = !showAllHpoTerms">
                      {{ showAllHpoTerms ? ' show fewer' : ' show all' }}
                    </a>
                  </template>
                </small>
              </div>
              <div v-if="hpoTerms?.length">
                <template v-for="(term, idx) in hpoTermsToShow" :key="idx">
                  <template v-if="idx > 0"> , </template>
                  <template v-if="showTermLinks">
                    <a :href="`https://hpo.jax.org/app/browse/term/${term.term_id}`" target="_blank">
                      <v-icon>mdi-launch</v-icon>
                      <template v-if="showTermIds"> [{{ term.term_id }}] </template>
                      {{ term.name }}
                    </a>
                  </template>
                  <template v-else>
                    <template v-if="showTermIds"> [{{ term.term_id }}] </template>
                    {{ term.name }}
                  </template>
                </template>
                <template v-if="hpoTerms.length > maxHpoTerms"> , ... </template>
              </div>
              <div v-else class="text-grey font-italic">No HPO terms associated with gene.</div>
            </template>
          </v-col>
          <v-col v-if="slots.default" cols="3">
            <slot></slot>
          </v-col>
        </v-row>
      </v-card-text>

      <v-expand-transition>
        <div v-if="isExpanded">
          <v-divider class="mt-3" />
          <v-card-text class="pt-3 pb-0">
            <!--
              == Orphanet Disorders =========================================
            -->
            <div class="text-subtitle-1 mt-3">
              Orphanet Disorders
              <small> ({{ geneInfo?.orpha?.orpha_diseases?.length ?? 0 }}) </small>
            </div>
            <div v-if="geneInfo?.orpha?.orpha_diseases?.length">
              <template v-for="(disease, idx) in geneInfo?.orpha?.orpha_diseases ?? []" :key="idx">
                <template v-if="idx > 0"> , </template>
                <template v-if="showTermLinks">
                  <a
                    :href="`https://www.orpha.net/consor/cgi-bin/Disease_Search_Simple.php?lng=EN&Disease_Disease_Search_diseaseGroup=${disease.orphaId.replace(
                      ':',
                      ' '
                    )}&Disease_Disease_Search_diseaseType=ORPHA`"
                    target="_blank"
                  >
                    <v-icon>mdi-launch</v-icon>
                    <template v-if="showTermIds"> [{{ disease.orpha_id }}] </template>
                    {{ disease.label }}
                  </a>
                </template>
                <template v-else>
                  <template v-if="showTermIds"> [{{ disease.orpha_id }}] </template>
                  {{ disease.label }}
                </template>
              </template>
            </div>
            <div v-else class="text-grey font-italic">
              No Orphanet disorders annotated for gene.
            </div>

            <!--
            == OMIM Diseases ==================================================
          -->
            <div class="text-subtitle-1 mt-3">
              OMIM Diseases
              <small> ({{ geneInfo?.omim?.omim_diseases?.length ?? 0 }}) </small>
            </div>
            <div v-if="geneInfo?.omim?.omim_diseases?.length">
              <template v-for="(disease, idx) in geneInfo?.omim?.omim_diseases" :key="idx">
                <template v-if="idx > 0"> , </template>
                <template v-if="showTermLinks">
                  <a
                    :href="`https://www.omim.org/entry/${disease.label.split(':')[1]}`"
                    target="_blank"
                  >
                    <v-icon>mdi-launch</v-icon>
                    <span v-if="showTermIds"> [{{ disease.omim_id }}] </span>
                    {{ disease.label }}
                  </a>
                </template>
                <template v-else>
                  <span v-if="showTermIds"> [{{ disease.omim_id }}] </span>
                  {{ disease.label }}
                </template>
              </template>
            </div>
            <div v-else class="text-grey font-italic">No OMIM diseases found.</div>
          </v-card-text>
        </div>
      </v-expand-transition>

      <v-card-actions>
        <v-switch
          id="conditions-card-show-term-ids"
          v-model="showTermIds"
          color="primary"
          :value="true"
          :false-value="false"
          label="numeric terms"
          class="ml-3 d-inline-flex flex-grow-0"
          density="compact"
          inset
        />
        <v-switch
          v-model="showTermLinks"
          color="primary"
          :value="true"
          :false-value="false"
          label="show links"
          class="ml-3 d-inline-flex flex-grow-0"
          density="compact"
          inset
        />
        <v-btn
          :href="`https://hpo.jax.org/app/browse/gene/${geneInfo?.hgnc?.entrez_id}`"
          target="_blank"
          prepend-icon="mdi-launch"
          class="ml-6"
        >
          JAX HPO
        </v-btn>
        <v-btn
          v-if="geneInfo?.hgnc?.omim_id?.length"
          :href="`https://www.omim.org/entry/${geneInfo?.hgnc?.omim_id[0]}`"
          target="_blank"
          prepend-icon="mdi-launch"
          class="ml-6"
        >
          OMIM
        </v-btn>
        <v-btn
          v-if="geneInfo?.hgnc?.orphanet"
          :href="`https://www.orpha.net/consor/cgi-bin/OC_Exp.php?Expert=${geneInfo?.hgnc?.orphanet}`"
          target="_blank"
          prepend-icon="mdi-launch"
          class="ml-6"
        >
          Orphanet
        </v-btn>

        <v-spacer />
        <div class="text-grey text-caption">
          OMIM ({{ geneInfo?.omim?.omim_diseases?.length ?? 0 }}) &bullet; Orphanet ({{
            geneInfo?.orpha?.orpha_diseases?.length ?? 0
          }})
        </div>
        <v-btn
          id="conditions-card-expand-button"
          :append-icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="isExpanded = !isExpanded"
        >
          <template v-if="!isExpanded"> More </template>
          <template v-if="isExpanded"> Less </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
</template>
