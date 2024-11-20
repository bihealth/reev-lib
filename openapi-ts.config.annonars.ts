import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'src/ext/annonars-api/openapi.yaml',
  output: 'src/ext/annonars-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
