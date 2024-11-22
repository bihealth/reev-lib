<script setup lang="ts">
/**
 * This component displays a VCard with gene pathogenicity information.
 */
import { GenesGeneInfoRecord } from '../../ext/annonars-api/src/lib'
import { roundIt } from '../../lib/utils'
import DocsLink from '../DocsLink/DocsLink.vue'
import { CLINGEN_DOSAGE_COLOR, CLINGEN_DOSAGE_LABELS_SHORT } from './constants'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  /** Gene information, if any. */
  geneInfo?: GenesGeneInfoRecord
}>()
</script>

<template>
  <v-card>
    <v-card-title class="pb-0 pr-2">
      Gene Pathogenicity
      <DocsLink anchor="gene-pathogenicity" />
    </v-card-title>
    <v-card-subtitle class="text-overline">
      Intolerance Constraints and Annotations
    </v-card-subtitle>
    <v-card-text class="pt-3">
      <!-- no constraints symbol => display loader (geneInfo.hgnc is always available) -->
      <template v-if="!geneInfo">
        <v-skeleton-loader class="mt-3 mx-auto border" type="heading,subtitle,text,text" />
      </template>
      <!-- otherwise, display actual card -->
      <template v-else>
        <v-row no-gutters class="d-flex flex-row">
          <v-col cols="3">
            <v-sheet class="pa-3 mr-2 h-100" color="background">
              <template v-if="geneInfo?.clingen">
                <div class="text-subtitle-1">
                  ClinGen
                  <small>
                    <a
                      :href="`https://search.clinicalgenome.org/kb/genes/${geneInfo?.hgnc!.hgnc_id}`"
                    >
                      <v-icon>mdi-launch</v-icon>
                    </a>
                  </small>
                </div>
                <v-table density="compact" class="bg-transparent">
                  <tbody>
                    <tr>
                      <td class="pa-0">haploinsufficiency</td>
                      <td class="pa-0 text-right">
                        <v-chip
                          density="compact"
                          :class="`bg-${
                            CLINGEN_DOSAGE_COLOR[geneInfo?.clingen.haploinsufficiency_score!]
                          }`"
                        >
                          {{
                            CLINGEN_DOSAGE_LABELS_SHORT[geneInfo?.clingen.haploinsufficiency_score!]
                          }}
                        </v-chip>
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-0">triplosensitivity</td>
                      <td class="pa-0 text-right">
                        <v-chip
                          density="compact"
                          :class="`bg-${
                            CLINGEN_DOSAGE_COLOR[geneInfo?.clingen.triplosensitivity_score!]
                          }`"
                        >
                          {{
                            CLINGEN_DOSAGE_LABELS_SHORT[geneInfo?.clingen.triplosensitivity_score!]
                          }}
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </template>
              <template v-else> No ClinGen data </template>
            </v-sheet>
          </v-col>

          <v-col cols="3">
            <v-sheet class="pa-3 mx-1 h-100" color="background">
              <template v-if="geneInfo?.gnomad_constraints">
                <div class="text-subtitle-1">
                  gnomAD
                  <small> v4.0 </small>
                  <small v-if="geneInfo?.hgnc?.ensembl_gene_id?.length">
                    <a
                      :href="`https://gnomad.broadinstitute.org/gene/${geneInfo?.hgnc.ensembl_gene_id}?dataset=gnomad_r4`"
                    >
                      <v-icon>mdi-launch</v-icon>
                    </a>
                  </small>
                </div>
                <v-table density="compact" class="bg-transparent">
                  <tbody>
                    <tr>
                      <td class="pa-0 text-subtitle-2 text-center" colspan="2">Loss of Function</td>
                    </tr>
                    <tr>
                      <td class="pa-0">
                        <abbr title="predicted probability that the gene is LoF intolerant">
                          pLI
                        </abbr>
                      </td>
                      <td class="pa-0 text-right">
                        <!-- eslint-disable vue/no-v-html -->
                        <span v-html="roundIt(geneInfo?.gnomad_constraints.pli ?? undefined)" />
                        <!-- eslint-enable -->
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-0">
                        <abbr title="LoF observed/expected upper bound fraction"> LOEUF </abbr>
                      </td>
                      <td class="pa-0 text-right">
                        <!-- eslint-disable vue/no-v-html -->
                        <span
                          v-html="roundIt(geneInfo?.gnomad_constraints.oe_lof_upper ?? undefined)"
                        />
                        <!-- eslint-enable -->
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-0 text-subtitle-2 text-center" colspan="2">Missense</td>
                    </tr>
                    <tr>
                      <td class="pa-0">
                        <abbr title="Missense observed/expected upper bound fraction">
                          o/e (upper)
                        </abbr>
                      </td>
                      <td class="pa-0 text-right">
                        <!-- eslint-disable vue/no-v-html -->
                        <span
                          v-html="roundIt(geneInfo?.gnomad_constraints.oe_mis_upper ?? undefined)"
                        />
                        <!-- eslint-enable -->
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-0">
                        <abbr title="Z-score of observed/expected missense variant count">
                          o/e Z-score
                        </abbr>
                      </td>
                      <td class="pa-0 text-right">
                        <!-- eslint-disable vue/no-v-html -->
                        <span v-html="roundIt(geneInfo?.gnomad_constraints.mis_z ?? undefined)" />
                        <!-- eslint-enable -->
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </template>
              <template v-else> No gnomAD constraints </template>
            </v-sheet>
          </v-col>

          <v-col cols="3">
            <v-sheet class="pa-3 mx-1 h-100" color="background">
              <template v-if="true">
                <div class="text-subtitle-1">
                  DECIPHER
                  <small v-if="geneInfo?.hgnc?.symbol?.length">
                    <a
                      :href="`https://www.deciphergenomics.org/gene/${geneInfo?.hgnc?.symbol}/overview/clinical-info`"
                    >
                      <v-icon>mdi-launch</v-icon>
                    </a>
                  </small>
                </div>
                <v-table density="compact" class="bg-transparent">
                  <tbody>
                    <tr>
                      <td class="pa-0">
                        <abbr
                          :title="`haploinsufficiency prediction percentile (raw score=${geneInfo?.decipher_hi?.hi_index})`"
                        >
                          %HI
                        </abbr>
                      </td>
                      <td class="pa-0 text-right">
                        <!-- eslint-disable vue/no-v-html -->
                        <span
                          v-if="geneInfo?.decipher_hi !== undefined"
                          v-html="roundIt(geneInfo?.decipher_hi?.p_hi)"
                        />
                        <span v-else> N/A </span>
                        <!-- eslint-enable -->
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-0">sHet</td>
                      <td class="pa-0 text-right">
                        <!-- eslint-disable vue/no-v-html -->
                        <span v-if="geneInfo?.shet" v-html="roundIt(geneInfo?.shet.s_het)" />
                        <!-- eslint-enable -->
                        <span v-else> N/A </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-0">pHaplo</td>
                      <td class="pa-0 text-right">
                        <!-- eslint-disable vue/no-v-html -->
                        <span v-if="geneInfo?.rcnv" v-html="roundIt(geneInfo?.rcnv.p_haplo)" />
                        <!-- eslint-enable -->
                        <span v-else> N/A </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pa-0">pTriplo</td>
                      <td class="pa-0 text-right">
                        <!-- eslint-disable vue/no-v-html -->
                        <span v-if="geneInfo?.rcnv" v-html="roundIt(geneInfo?.rcnv.p_triplo)" />
                        <!-- eslint-enable -->
                        <span v-else> N/A </span>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </template>
              <template v-else> No gnomAD constraints </template>
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <slot></slot>
          </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>
