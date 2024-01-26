<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(
  defineProps<{
    /** Base URL for the documentation link-out. */
    baseUrl?: string
    /** Anchor for the link-out */
    anchor: string
  }>(),
  {
    baseUrl: 'https://reev.readthedocs.io/en/latest/doc_manual.html'
  }
)
</script>

<template>
  <a
    class="d-block text-body-2 float-right text-primary"
    :href="`${baseUrl}#${anchor}`"
    target="_blank"
  >
    <v-icon>mdi-help-circle-outline</v-icon>
  </a>
</template>
