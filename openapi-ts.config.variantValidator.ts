import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'src/ext/variantValidator-api/openapi.yaml',
  output: 'src/ext/variantValidator-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
