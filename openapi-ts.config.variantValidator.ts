import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'ext/variantValidator-api/openapi.yaml',
  output: 'ext/variantValidator-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
