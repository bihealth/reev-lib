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
    <div class="text-subtitle-1">Alternative Identifiers</div>

    <div>
      <strong> ENSEMBL: </strong>
      <a
        :href="`https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${hgnc?.ensembl_gene_id}`"
        target="_blank"
      >
        <v-icon>mdi-launch</v-icon>
        {{ hgnc?.ensembl_gene_id }}
      </a>
    </div>

    <div>
      <strong> HGNC: </strong>
      <a
        :href="`https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${hgnc?.hgnc_id}`"
        target="_blank"
      >
        <v-icon>mdi-launch</v-icon>
        {{ hgnc?.hgnc_id }}
      </a>
    </div>

    <div v-if="hgnc?.mgd_id?.length">
      <strong>MGI: </strong>
      <template v-for="(mgd_id, index) in hgnc.mgd_id" :key="mgd_id">
        <template v-if="index > 0"> , </template>
        <a :href="`https://www.informatics.jax.org/marker/${mgd_id}`" target="_blank">
          <v-icon>mdi-launch</v-icon>
          {{ mgd_id }}
        </a>
      </template>
    </div>
    <span v-else> No MGI </span>

    <div v-if="hgnc?.pubmed_id?.length">
      <strong>Primary PMID: </strong>
      <template v-for="(pmid, index) in hgnc.pubmed_id" :key="pmid">
        <template v-if="index > 0"> , </template>
        <a :href="`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`" target="_blank">
          <v-icon>mdi-launch</v-icon>
          {{ pmid }}
        </a>
      </template>
    </div>
    <div v-else>No primary PMID</div>

    <div v-if="hgnc?.refseq_accession?.length">
      <strong> RefSeq: </strong>
      <template v-for="(accession, index) in hgnc.refseq_accession" :key="index">
        <template v-if="index > 0"> , </template>
        <a
          :href="`https://www.ncbi.nlm.nih.gov/nuccore/?term=${accession}+AND+srcdb_refseq[PROP]`"
          target="_blank"
        >
          <v-icon>mdi-launch</v-icon>
          {{ accession }}
        </a>
      </template>
    </div>
    <div v-else>No RefSeq</div>

    <div v-if="hgnc?.uniprot_ids?.length">
      <strong> UniProt: </strong>
      <template v-for="(uniprotid, index) in hgnc.uniprot_ids" :key="index">
        <template v-if="index > 0"> , </template>
        <a :href="`https://www.uniprot.org/uniprotkb/${uniprotid}/entry`" target="_blank">
          <v-icon>mdi-launch</v-icon>
          {{ uniprotid }}
        </a>
      </template>
    </div>
    <div v-else>No UniProt</div>
  </div>
</template>
