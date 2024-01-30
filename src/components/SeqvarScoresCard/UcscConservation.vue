<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { SeqvarInfoResult } from '../../api/annonars'
import { separateIt as sepIt } from '../../lib/utils'
import { Record as UcscConservationRecord } from '../../pbs/annonars/cons/base'

const props = defineProps<{
  /** Information to display conservation for. */
  varAnnos?: SeqvarInfoResult
}>()

/** Return the conservation records. */
const ucscConservation = computed<UcscConservationRecord[]>(() => {
  if (props.varAnnos?.ucscConservation?.length) {
    const result = []
    for (const records of props.varAnnos?.ucscConservation) {
      for (const record of records) {
        result.push(record)
      }
    }
    return result
  } else {
    return []
  }
})

const transcriptIds = computed<string[]>(() => {
  let res: string[] = ucscConservation.value.map(({ enstId }: any) => enstId)
  res = [...new Set(res)]
  res.sort()
  return res
})

interface ConsInfo {
  chrom: string
  start: number
  stop: number
  alignment: string
}

const consInfo = computed<{ [key: string]: ConsInfo[] }>(() => {
  const seen = new Set<string>()
  const res: { [key: string]: ConsInfo[] } = {}
  for (const { chrom, enstId, start, stop, alignment } of ucscConservation.value) {
    const key = `${enstId}-${chrom}-${enstId}-${start}-${stop}`
    if (!seen.has(key)) {
      seen.add(key)
      if (!(enstId in res)) {
        res[enstId] = []
      }
      res[enstId].push({ chrom, start, stop, alignment })
    }
  }

  for (const key in res) {
    res[key].sort((a: any, b: any) => a.start - b.start)
  }

  return res
})

const selectedTranscript = ref('')

const initSelectedTranscript = () => {
  if (transcriptIds.value?.length) {
    if (
      !selectedTranscript.value ||
      (transcriptIds.value || []).includes(selectedTranscript.value)
    ) {
      selectedTranscript.value = transcriptIds.value[0]
    }
  }
}

watch(() => props.varAnnos, initSelectedTranscript)
onMounted(initSelectedTranscript)
</script>

<template>
  <div v-if="ucscConservation.length">
    <div class="float-right">
      <v-select
        v-model="selectedTranscript"
        label="transcript"
        :items="transcriptIds"
        density="compact"
        :hide-details="true"
        variant="outlined"
      />
    </div>
    <pre><b><u>  chr  start      end          |  alignment                                                                                           </u></b>
<template v-for="row in consInfo[selectedTranscript]">{{ row.chrom.padStart(5) }} {{ sepIt(row.start, ',').padStart(11) }}-{{ sepIt(row.stop, ',').padEnd(11) }}  |  {{ row.alignment }}
</template></pre>
  </div>
  <div v-else class="text-muted text-center font-italic">No UCSC conservation data available.</div>
</template>
