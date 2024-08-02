<!--
Display population frequencies.

Note that we do not use VSkelLoader here as this is done in the child
components when necessary.
-->

<script setup lang="ts">
import { SeqvarInfoResult } from '../../api/annonars/types'
import { type Seqvar } from '../../lib/genomicVars'
import DocsLink from '../DocsLink/DocsLink.vue'
import AutosomalFreqs from './AutosomalFreqs.vue'
import MitochondrialFreqs from './MitochondrialFreqs.vue'
import { isInParRegion, isVariantMt } from './lib'

/** The component's props with defaults applied. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  /** Annotated sequence variant. */
  seqvar?: Seqvar
  /** Annotations. */
  varAnnos?: SeqvarInfoResult
}>()
</script>

<template>
  <v-card>
    <v-card-title class="pb-0 pr-2">
      Population Frequencies
      <DocsLink anchor="population-frequencies" />
    </v-card-title>
    <v-card-text>
      <MitochondrialFreqs
        v-if="isVariantMt(seqvar as Seqvar)"
        :seqvar="seqvar"
        :var-annos="varAnnos"
      />
      <div v-else>
        <v-alert
          v-if="isInParRegion(seqvar)"
          closable
          text="This variant is located in a PAR region."
          type="warning"
          variant="tonal"
        ></v-alert>
        <v-row no-gutters>
          <v-col cols="6">
            <AutosomalFreqs :seqvar="seqvar" :var-annos="varAnnos" dataset="gnomadExomes" />
          </v-col>
          <v-col cols="6">
            <AutosomalFreqs :seqvar="seqvar" :var-annos="varAnnos" dataset="gnomadGenomes" />
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
