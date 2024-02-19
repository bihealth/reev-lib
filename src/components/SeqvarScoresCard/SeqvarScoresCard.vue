<script setup lang="ts">
import { computed, ref } from 'vue'

import { SeqvarInfoResult } from '../../api/annonars/types'
import { roundIt } from '../../lib/utils'
import DocsLink from '../DocsLink/DocsLink.vue'
import ScoreDisplay from './ScoreDisplay.vue'
import Conservation from './UcscConservation.vue'

const props = defineProps<{
  /** Information to display scores for. */
  varAnnos?: SeqvarInfoResult
}>()

const alphaMissenseScoreList = computed<number[]>(() => {
  if (!props.varAnnos?.dbnsfp?.AlphaMissense_score) {
    return []
  } else {
    const alphasaMissenseScore = props.varAnnos.dbnsfp.AlphaMissense_score as string
    return alphasaMissenseScore.split(';').map(parseFloat)
  }
})

const alphaMissenseScore = computed<number | null>(() => {
  const scores = alphaMissenseScoreList.value
  if (!scores.length) {
    return null
  } else {
    const maxScore = Math.max(...scores)
    if (maxScore > 0.5) {
      return maxScore
    } else {
      return Math.min(...scores)
    }
  }
})

interface BestOf {
  score: number | null
  key: string | null
}

const bestOf = (obj: any, keys: string[], abs: boolean = false): BestOf => {
  if (!obj) {
    return { score: null, key: null }
  }
  const values = keys
    .map((key) => ({ score: obj[key] ?? null, key }))
    .filter(({ score }) => score !== null)
  if (values.length) {
    if (abs) {
      values.sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
    } else {
      values.sort((a, b) => b.score - a.score)
    }
    return values[0]
  } else {
    return {
      score: null,
      key: null
    }
  }
}

const expandSpliceAi = ref<boolean>(false)
const expandMMSplice = ref<boolean>(false)

const SpliceAiKeys = [
  'SpliceAI-acc-gain',
  'SpliceAI-acc-loss',
  'SpliceAI-don-gain',
  'SpliceAI-don-loss'
]
const MMSpliceKeys = [
  'MMSp_acceptorIntron',
  'MMSp_acceptor',
  'MMSp_exon',
  'MMSp_donor',
  'MMSp_donorIntron'
]

const bestSpliceAi = computed<BestOf>(() => {
  return bestOf(props.varAnnos?.cadd, SpliceAiKeys)
})

type ScoreMapping = { [key: string]: number }

const allSpliceAi = computed<ScoreMapping>(() => {
  const res: ScoreMapping = {}
  for (const key of SpliceAiKeys) {
    res[key] = props.varAnnos?.cadd![key] as number
  }
  return res
})

const bestMMSplice = computed(() => {
  return bestOf(props.varAnnos?.cadd, MMSpliceKeys, true)
})

const allMMSplice = computed<ScoreMapping>(() => {
  const res: ScoreMapping = {}
  for (const key of MMSpliceKeys) {
    res[key] = props.varAnnos?.cadd![key] as number
  }
  return res
})

const decodeMultiDbnsfp = (s: string): number | null => {
  if (!s) {
    return null
  } else {
    const vals = s
      .split(';')
      .filter((s) => s != '.')
      .map(parseFloat)
    if (!vals.length) {
      return null
    } else {
      return Math.max(...vals)
    }
  }
}

const siftScore = computed((): number | null =>
  decodeMultiDbnsfp(props.varAnnos?.dbnsfp?.SIFT_score as string)
)

const translatedSiftScore = computed((): number | null => {
  const value = siftScore.value
  if (value === null) {
    return null
  } else {
    return 1 - value
  }
})

const fathmmScore = computed((): number | null =>
  decodeMultiDbnsfp(props.varAnnos?.dbnsfp?.FATHMM_score as string)
)

const translatedFathmmScore = computed((): number | null => {
  const value = fathmmScore.value
  if (value === null) {
    return null
  } else {
    return 10 - value
  }
})

const gerpScore = computed((): number | null => {
  if (props.varAnnos?.dbnsfp && 'GERP++_RS' in props.varAnnos.dbnsfp) {
    return props.varAnnos.dbnsfp['GERP++_RS'] as number
  } else {
    return null
  }
})

const mpcScore = computed((): number | null =>
  decodeMultiDbnsfp(props.varAnnos?.dbnsfp?.MPC_score as string)
)

const revelScore = computed((): number | null =>
  decodeMultiDbnsfp(props.varAnnos?.dbnsfp?.REVEL_score as string)
)

const polyphenScore = computed((): number | null =>
  decodeMultiDbnsfp(props.varAnnos?.dbnsfp?.Polyphen2_HVAR_score as string)
)
</script>

<template>
  <v-card>
    <v-card-title class="pb-0 pr-2">
      Scores
      <DocsLink anchor="scores" />
    </v-card-title>
    <v-card-subtitle class="text-overline"> Precomputed Sequence Variant Scores </v-card-subtitle>
    <v-card-text>
      <div v-if="props.varAnnos?.dbnsfp || props.varAnnos?.cadd">
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">Scoring Method</th>
              <th class="text-center">Score</th>
              <th class="text-center">Visualization</th>
              <th class="text-center">
                <abbr title="Interpretations on prediction refer to Pejaver et al. (2022)"
                  >Interpretation</abbr
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="align-middle">AlphaMissense</th>
              <template v-if="alphaMissenseScore">
                <!-- eslint-disable vue/no-v-html -->
                <td class="text-center align-middle" v-html="roundIt(alphaMissenseScore, 4)" />
                <!-- eslint-enable -->
                <td class="text-center align-middle">
                  <span class="not-predictive"> &mdash; </span>
                </td>
                <td class="text-center align-middle">
                  <span class="not-predictive"> (no Pejaver computation yet) </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                AlphaMissense prediction not available.
              </td>
            </tr>
            <tr>
              <th class="align-middle">BayesDel</th>
              <template
                v-if="
                  props.varAnnos?.dbnsfp?.BayesDel_addAF_score &&
                  props.varAnnos?.dbnsfp?.BayesDel_addAF_score !== Infinity &&
                  props.varAnnos?.dbnsfp?.BayesDel_addAF_score !== undefined
                "
              >
                <!-- eslint-disable vue/no-v-html -->
                <td
                  class="text-center align-middle"
                  v-html="roundIt(props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number, 4)"
                />
                <!-- eslint-enable -->
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="-1"
                    :range-upper="1"
                    :height="12"
                    font-size="10px"
                    :value="props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number"
                    :benign-moderate-upper="-0.36"
                    :benign-supporting-upper="-0.18"
                    :pathogenic-supporting-lower="0.13"
                    :pathogenic-moderate-lower="0.27"
                    :pathogenic-strong-lower="0.5"
                  />
                </td>
                <td class="text-center align-middle">
                  <span
                    v-if="(props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number) <= -0.36"
                    class="benign-moderate"
                  >
                    benign moderate
                  </span>
                  <span
                    v-else-if="
                      (props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number) > -0.36 &&
                      (props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number) <= -0.18
                    "
                    class="benign-supporting"
                  >
                    benign supporting
                  </span>
                  <span
                    v-else-if="
                      (props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number) >= 0.13 &&
                      (props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number) < 0.27
                    "
                    class="pathogenic-supporting"
                  >
                    pathogenic supporting
                  </span>
                  <span
                    v-else-if="
                      (props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number) >= 0.27 &&
                      (props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number) < 0.5
                    "
                    class="pathogenic-moderate"
                  >
                    pathogenic moderate
                  </span>
                  <span
                    v-else-if="(props.varAnnos?.dbnsfp?.BayesDel_addAF_score as number) >= 0.5"
                    class="pathogenic-strong"
                  >
                    pathogenic strong
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                BayesDel prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">CADD</th>
              <template
                v-if="
                  varAnnos?.cadd?.PHRED &&
                  varAnnos?.cadd?.PHRED !== Infinity &&
                  varAnnos?.cadd?.PHRED !== undefined
                "
              >
                <td class="text-center align-middle">
                  {{ varAnnos?.cadd?.PHRED }}
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="50"
                    :height="12"
                    font-size="10px"
                    :value="varAnnos?.cadd?.PHRED as number"
                    :benign-strong-upper="0.15"
                    :benign-moderate-upper="17.3"
                    :benign-supporting-upper="22.7"
                    :pathogenic-supporting-lower="25.3"
                    :pathogenic-moderate-lower="28.1"
                  />
                </td>
                <td class="text-center align-middle">
                  <span v-if="(varAnnos?.cadd?.PHRED as number) < 0.15" class="benign-strong">
                    benign strong
                  </span>
                  <span
                    v-else-if="
                      (varAnnos?.cadd?.PHRED as number) >= 0.15 &&
                      (varAnnos?.cadd?.PHRED as number) < 17.3
                    "
                    class="benign-moderate"
                  >
                    benign moderate
                  </span>
                  <span
                    v-else-if="
                      (varAnnos?.cadd?.PHRED as number) >= 17.3 &&
                      (varAnnos?.cadd?.PHRED as number) < 22.7
                    "
                    class="benign-supporting"
                  >
                    benign supporting
                  </span>
                  <span
                    v-else-if="
                      (varAnnos?.cadd?.PHRED as number) >= 25.3 &&
                      (varAnnos?.cadd?.PHRED as number) < 28.1
                    "
                    class="pathogenic-supporting"
                  >
                    pathogenic supporting
                  </span>
                  <span
                    v-else-if="(varAnnos?.cadd?.PHRED as number) >= 28.1"
                    class="pathogenic-moderate"
                  >
                    pathogenic moderate
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                CADD prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">FATHMM</th>
              <template
                v-if="
                  fathmmScore &&
                  translatedFathmmScore &&
                  translatedFathmmScore !== Infinity &&
                  translatedFathmmScore !== undefined
                "
              >
                <td class="text-center align-middle">
                  {{ fathmmScore }}
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="20"
                    :height="12"
                    font-size="10px"
                    :value="translatedFathmmScore"
                    :disp-trans-offset="10"
                    :disp-trans-mult="-1"
                    :benign-moderate-upper="5.31"
                    :benign-supporting-upper="6.68"
                    :pathogenic-supporting-lower="14.14"
                    :pathogenic-moderate-lower="15.04"
                  />
                </td>
                <td class="text-center align-middle">
                  <span v-if="fathmmScore >= 4.69" class="benign-moderate"> benign moderate </span>
                  <span
                    v-else-if="fathmmScore < 4.69 && fathmmScore >= 3.32"
                    class="benign-supporting"
                  >
                    benign supporting
                  </span>
                  <span
                    v-else-if="fathmmScore > -5.04 && fathmmScore <= -4.14"
                    class="pathogenic-supporting"
                  >
                    pathogenic supporting
                  </span>
                  <span v-else-if="fathmmScore <= -5.04" class="pathogenic-moderate">
                    pathogenic moderate
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                FATHMM prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">Gerp++</th>
              <template v-if="gerpScore && gerpScore !== Infinity && gerpScore !== undefined">
                <td class="text-center align-middle">
                  {{ gerpScore }}
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="-10"
                    :range-upper="10"
                    :height="12"
                    font-size="10px"
                    :value="gerpScore"
                    :benign-moderate-upper="-4.54"
                    :benign-supporting-upper="2.7"
                  />
                </td>
                <td class="text-center align-middle">
                  <span v-if="gerpScore <= -4.54" class="benign-moderate"> benign moderate </span>
                  <span v-else-if="gerpScore > -4.54 && gerpScore <= 2.7" class="benign-supporting">
                    benign supporting
                  </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                Gerp++ prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">
                MMSplice
                <!-- Toggle Button -->
                <a>
                  <v-btn
                    size="25"
                    color=""
                    icon
                    :disabled="!bestMMSplice.key || bestMMSplice.score === Infinity"
                    @click="expandMMSplice = !expandMMSplice"
                  >
                    <v-icon>
                      {{ expandMMSplice ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
                    </v-icon>
                  </v-btn>
                </a>
              </th>
              <template
                v-if="
                  bestMMSplice.key &&
                  bestMMSplice.score !== Infinity &&
                  bestMMSplice.score !== undefined
                "
              >
                <td class="text-center align-middle">
                  {{ bestMMSplice.score }}
                  <span class="text-muted ml-2">({{ bestMMSplice.key }})</span>
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="1"
                    :height="12"
                    font-size="10px"
                    :value="bestMMSplice.score as number"
                  />
                </td>
                <td class="text-center align-middle">&mdash;</td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                MMSplice prediction not available.
              </td>
            </tr>

            <template v-if="expandMMSplice">
              <tr v-for="(score, index) in allMMSplice" :key="index">
                <th class="text-center align-middle">{{ index }}</th>
                <td>{{ score }}</td>
                <td
                  v-if="score !== Infinity && score !== undefined"
                  class="text-center align-middle"
                >
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="1"
                    :height="12"
                    font-size="10px"
                    :value="score"
                  />
                </td>
                <td v-else class="text-center align-middle">&mdash;</td>
                <td class="text-center align-middle">&mdash;</td>
              </tr>
            </template>

            <tr>
              <th class="align-middle">MPC</th>
              <template v-if="mpcScore && mpcScore !== Infinity && mpcScore !== undefined">
                <td class="text-center align-middle" v-html="roundIt(mpcScore, 4)" />
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="5"
                    :height="12"
                    font-size="10px"
                    :value="mpcScore"
                    :pathogenic-supporting-lower="1.36"
                    :pathogenic-moderate-lower="1.828"
                  />
                </td>
                <td class="text-center align-middle">
                  <span v-if="mpcScore >= 1.36 && mpcScore < 1.828" class="pathogenic-supporting">
                    pathogenic supporting
                  </span>
                  <span v-else-if="mpcScore >= 1.828" class="pathogenic-moderate">
                    pathogenic moderate
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                MPC prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">PolyPhen2</th>
              <template
                v-if="
                  polyphenScore !== null &&
                  polyphenScore !== Infinity &&
                  polyphenScore !== undefined
                "
              >
                <td class="text-center align-middle">
                  {{ polyphenScore }}
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="-20"
                    :range-upper="30"
                    :height="12"
                    font-size="10px"
                    :value="polyphenScore"
                    :benign-moderate-upper="0.009"
                    :benign-supporting-upper="0.113"
                    :pathogenic-supporting-lower="0.978"
                    :pathogenic-moderate-lower="0.999"
                  />
                </td>
                <td class="text-center align-middle">
                  <span v-if="polyphenScore <= 0.009" class="benign-moderate">
                    benign moderate
                  </span>
                  <span
                    v-else-if="polyphenScore > 0.009 && polyphenScore <= 0.113"
                    class="benign-supporting"
                  >
                    benign supporting
                  </span>
                  <span
                    v-else-if="polyphenScore >= 0.978 && polyphenScore < 0.999"
                    class="pathogenic-supporting"
                  >
                    pathogenic supporting
                  </span>
                  <span v-else-if="polyphenScore >= 0.999" class="pathogenic-moderate">
                    pathogenic moderate
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                PolyPhen2 HVAR prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">PhyloP-100</th>
              <template
                v-if="
                  props.varAnnos?.dbnsfp?.phyloP100way_vertebrate &&
                  props.varAnnos?.dbnsfp?.phyloP100way_vertebrate !== Infinity &&
                  props.varAnnos?.dbnsfp?.phyloP100way_vertebrate !== undefined
                "
              >
                <td class="text-center align-middle">
                  {{ props.varAnnos?.dbnsfp?.phyloP100way_vertebrate }}
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="-20"
                    :range-upper="30"
                    :height="12"
                    font-size="10px"
                    :value="props.varAnnos?.dbnsfp?.phyloP100way_vertebrate as number"
                    :benign-moderate-upper="0.021"
                    :benign-supporting-upper="1.879"
                    :pathogenic-supporting-lower="7.367"
                    :pathogenic-moderate-lower="9.741"
                  />
                </td>
                <td class="text-center align-middle">
                  <span
                    v-if="(props.varAnnos?.dbnsfp?.phyloP100way_vertebrate as number) <= 0.021"
                    class="benign-moderate"
                  >
                    benign moderate
                  </span>
                  <span
                    v-else-if="
                      (props.varAnnos?.dbnsfp?.phyloP100way_vertebrate as number) > 0.021 &&
                      (props.varAnnos?.dbnsfp?.phyloP100way_vertebrate as number) <= 1.879
                    "
                    class="benign-supporting"
                  >
                    benign supporting
                  </span>
                  <span
                    v-else-if="
                      (props.varAnnos?.dbnsfp?.phyloP100way_vertebrate as number) >= 7.367 &&
                      (props.varAnnos?.dbnsfp?.phyloP100way_vertebrate as number) < 9.741
                    "
                    class="pathogenic-supporting"
                  >
                    pathogenic supporting
                  </span>
                  <span
                    v-else-if="(props.varAnnos?.dbnsfp?.phyloP100way_vertebrate as number) >= 9.741"
                    class="pathogenic-moderate"
                  >
                    pathogenic moderate
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                PhyloP-100 prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">PrimateAI</th>
              <template
                v-if="
                  props.varAnnos?.dbnsfp?.PrimateAI_score &&
                  props.varAnnos?.dbnsfp?.PrimateAI_score !== Infinity &&
                  props.varAnnos?.dbnsfp?.PrimateAI_score !== undefined
                "
              >
                <td
                  class="text-center align-middle"
                  v-html="roundIt(props.varAnnos?.dbnsfp?.PrimateAI_score as number, 4)"
                />
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="1"
                    :height="12"
                    font-size="10px"
                    :value="props.varAnnos?.dbnsfp?.PrimateAI_score as number"
                    :benign-moderate-upper="0.362"
                    :benign-supporting-upper="0.483"
                    :pathogenic-supporting-lower="0.79"
                    :pathogenic-moderate-lower="0.867"
                  />
                </td>
                <td class="text-center align-middle">
                  <span
                    v-if="(props.varAnnos?.dbnsfp?.PrimateAI_score as number) <= 0.362"
                    class="benign-moderate"
                  >
                    benign moderate
                  </span>
                  <span
                    v-else-if="
                      (props.varAnnos?.dbnsfp?.PrimateAI_score as number) > 0.362 &&
                      (props.varAnnos?.dbnsfp?.PrimateAI_score as number) <= 0.483
                    "
                    class="benign-supporting"
                  >
                    benign supporting
                  </span>
                  <span
                    v-else-if="
                      (props.varAnnos?.dbnsfp?.PrimateAI_score as number) >= 0.79 &&
                      (props.varAnnos?.dbnsfp?.PrimateAI_score as number) < 0.867
                    "
                    class="pathogenic-supporting"
                  >
                    pathogenic supporting
                  </span>
                  <span
                    v-else-if="(props.varAnnos?.dbnsfp?.PrimateAI_score as number) >= 0.867"
                    class="pathogenic-moderate"
                  >
                    pathogenic moderate
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                PrimateAI prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">SIFT</th>
              <template
                v-if="
                  siftScore &&
                  translatedSiftScore &&
                  translatedSiftScore !== Infinity &&
                  translatedFathmmScore !== undefined
                "
              >
                <td class="text-center align-middle">
                  {{ siftScore }}
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="1"
                    :height="12"
                    font-size="10px"
                    :value="translatedSiftScore"
                    :disp-trans-offset="1"
                    :disp-trans-mult="-1"
                    :benign-moderate-upper="0.673"
                    :benign-supporting-upper="0.92"
                    :pathogenic-supporting-lower="0.999"
                    :pathogenic-moderate-lower="1.0"
                  />
                </td>
                <td class="text-center align-middle">
                  <span v-if="siftScore >= 0.327" class="benign-moderate"> benign moderate </span>
                  <span
                    v-else-if="siftScore < 0.327 && siftScore >= 0.08"
                    class="benign-supporting"
                  >
                    benign supporting
                  </span>
                  <span
                    v-else-if="siftScore >= 0.001 && siftScore < 0"
                    class="pathogenic-supporting"
                  >
                    pathogenic supporting
                  </span>
                  <span v-else-if="siftScore == 0" class="pathogenic-moderate">
                    pathogenic moderate
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                SIFT prediction not available.
              </td>
            </tr>

            <tr>
              <th class="align-middle">
                SpliceAI
                <!-- Toggle Button -->
                <a>
                  <v-btn
                    size="25"
                    color=""
                    icon
                    :disabled="!bestSpliceAi.key || bestSpliceAi.score === Infinity"
                    @click="expandSpliceAi = !expandSpliceAi"
                  >
                    <v-icon>
                      {{ expandSpliceAi ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
                    </v-icon>
                  </v-btn>
                </a>
              </th>
              <template
                v-if="
                  bestSpliceAi.key &&
                  bestSpliceAi.score !== Infinity &&
                  bestSpliceAi.score !== undefined
                "
              >
                <td class="text-center align-middle">
                  {{ bestSpliceAi.score }}
                  <span class="text-muted ml-2">({{ bestSpliceAi.key }})</span>
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="1"
                    :height="12"
                    font-size="10px"
                    :value="bestSpliceAi.score as number"
                  />
                </td>
                <td class="text-center align-middle">&mdash;</td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                SpliceAI prediction not available.
              </td>
            </tr>

            <template v-if="expandSpliceAi">
              <tr v-for="(score, index) in allSpliceAi" :key="index">
                <th class="text-center align-middle">{{ index }}</th>
                <td>{{ score }}</td>
                <td
                  v-if="score !== Infinity && score !== undefined"
                  class="text-center align-middle"
                >
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="1"
                    :height="12"
                    font-size="10px"
                    :value="score"
                  />
                </td>
                <td v-else class="text-center align-middle">&mdash;</td>
                <td class="text-center align-middle">&mdash;</td>
              </tr>
            </template>

            <tr>
              <th class="align-middle">REVEL</th>
              <template v-if="revelScore && revelScore !== Infinity && revelScore !== undefined">
                <td class="text-center align-middle">
                  {{ revelScore }}
                </td>
                <td class="text-center align-middle">
                  <ScoreDisplay
                    :range-lower="0"
                    :range-upper="1"
                    :height="12"
                    font-size="10px"
                    :value="revelScore"
                    :benign-very-strong-upper="0.003"
                    :benign-strong-upper="0.016"
                    :benign-moderate-upper="0.183"
                    :benign-supporting-upper="0.29"
                    :pathogenic-supporting-lower="0.644"
                    :pathogenic-moderate-lower="0.773"
                    :pathogenic-strong-lower="0.932"
                  />
                </td>
                <td class="text-center align-middle">
                  <span v-if="revelScore <= 0.003" class="benign-very-strong">
                    benign very strong
                  </span>
                  <span v-else-if="revelScore > 0.003 && revelScore <= 0.016" class="benign-strong">
                    benign strong
                  </span>
                  <span
                    v-else-if="revelScore > 0.016 && revelScore <= 0.183"
                    class="benign-moderate"
                  >
                    benign moderate
                  </span>
                  <span
                    v-else-if="revelScore > 0.183 && revelScore <= 0.29"
                    class="benign-supporting"
                  >
                    benign supporting
                  </span>
                  <span
                    v-else-if="revelScore >= 0.644 && revelScore < 0.773"
                    class="pathogenic-supporting"
                  >
                    pathogenic supporting
                  </span>
                  <span
                    v-else-if="revelScore >= 0.773 && revelScore < 0.932"
                    class="pathogenic-moderate"
                  >
                    pathogenic moderate
                  </span>
                  <span v-else-if="revelScore >= 0.932" class="pathogenic-strong">
                    pathogenic strong
                  </span>
                  <span v-else class="not-predictive"> &mdash; </span>
                </td>
              </template>
              <td v-else colspan="4" class="text-muted text-center font-italic">
                REVEL prediction not available.
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div v-else>
        <p class="text-muted text-center font-italic">
          Variant predictions are currently only available for SNVs and certain precomputed indels.
        </p>
      </div>
    </v-card-text>
    <v-card-subtitle class="text-overline"> UCSC 100 Vertebrate Conservation </v-card-subtitle>
    <v-card-text>
      <Conservation :var-annos="varAnnos" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.external-resource-item {
  float: left;
  margin-right: 10px;
}

.external-resource-item:last-child {
  float: none;
  margin-right: 0;
}

.benign-very-strong {
  padding: 2px;
  background-color: hsla(120, 100%, 50%, 0.65);
}

.benign-strong {
  padding: 2px;
  background-color: hsla(105.6, 100%, 50%, 0.65);
}

.benign-moderate {
  padding: 2px;
  background-color: hsla(91.2, 100%, 50%, 0.65);
}

.benign-supporting {
  padding: 2px;
  background-color: hsla(76.8, 100%, 50%, 0.65);
}

.pathogenic-supporting {
  padding: 2px;
  background-color: hsla(43.2, 100%, 50%, 0.65);
}

.pathogenic-moderate {
  padding: 2px;
  background-color: hsla(28.8, 100%, 50%, 0.65);
}

.pathogenic-strong {
  padding: 2px;
  background-color: hsla(14.4, 100%, 50%, 0.65);
}

.pathogenic-very-strong {
  padding: 2px;
  background-color: hsla(0, 100%, 50%, 0.65);
}
</style>
