<script setup lang="ts">
import { GenesHgncRecord } from '../../ext/annonars-api/src/lib'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  /** HGNC information to display for. */
  hgnc?: GenesHgncRecord
}>()
</script>

<template>
  <div>
    <div class="text-subtitle-1">External Resources</div>

    <div>
      <a
        v-if="hgnc?.cosmic"
        :href="`https://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=${hgnc?.cosmic}`"
        target="_blank"
      >
        <v-icon>mdi-launch</v-icon>
        COSMIC
      </a>
      <span v-else> <v-icon>mdi-launch</v-icon> COSMIC</span>
    </div>

    <div>
      <a :href="`https://www.deciphergenomics.org/gene/${hgnc?.symbol}`" target="_blank">
        <v-icon>mdi-launch</v-icon>
        DECIPHER
      </a>
    </div>
    <div>
      <a :href="`https://search.thegencc.org/genes/${hgnc?.hgnc_id}`" target="_blank">
        <v-icon>mdi-launch</v-icon>
        GenCC
      </a>
    </div>
    <div>
      <a
        :href="`https://www.kegg.jp/kegg-bin/search_pathway_text?map=map&keyword=${hgnc?.symbol}&mode=1&viewImage=true`"
        target="_blank"
      >
        <v-icon>mdi-launch</v-icon>
        KEGG
      </a>
    </div>
    <div>
      <a :href="`https://medlineplus.gov/genetics/gene/${hgnc?.symbol}/`" target="_blank">
        <v-icon>mdi-launch</v-icon>
        MedLinePlus
      </a>
    </div>
    <div>
      <a
        v-if="hgnc?.omim_id.length"
        :href="`https://www.omim.org/entry/${hgnc?.omim_id[0]}`"
        target="_blank"
      >
        <v-icon>mdi-launch</v-icon>
        OMIM
      </a>
      <span v-else> <v-icon>mdi-launch</v-icon> OMIM</span>
    </div>
    <div>
      <a :href="`https://pubmed.ncbi.nlm.nih.gov/?term=${hgnc?.symbol}`" target="_blank">
        <v-icon>mdi-launch</v-icon>
        PubMed
      </a>
    </div>

    <div>
      <a
        :href="`https://www.malacards.org/search/results?query=+[GE]+${hgnc?.symbol}`"
        target="_blank"
      >
        <v-icon>mdi-launch</v-icon>
        MalaCards
      </a>
    </div>
    <div>
      <a
        :href="`https://mastermind.genomenon.com/detail?gene=${hgnc?.symbol}&disease=all%20diseases`"
        target="_blank"
      >
        <v-icon>mdi-launch</v-icon>
        MASTERMIND
      </a>
    </div>

    <div>
      <template v-if="hgnc?.uniprot_ids?.length">
        <template v-for="(uniprotid, index) in hgnc.uniprot_ids" :key="index">
          <template v-if="index > 0"> , </template>
          <a
            :href="`http://missense3d.bc.ic.ac.uk:8080/search_direct?uniprot=${uniprotid}`"
            target="_blank"
          >
            <v-icon>mdi-launch</v-icon>
            {{ uniprotid }}
          </a>
          (Missense3D)
        </template>
      </template>
      <span v-else> <v-icon>mdi-launch</v-icon> Missense3D </span>
    </div>
    <div>
      <a :href="`https://varsome.com/gene/hg19/${hgnc?.hgncId}`" target="_blank">
        <v-icon>mdi-launch</v-icon>
        VarSome
      </a>
    </div>
  </div>
</template>
