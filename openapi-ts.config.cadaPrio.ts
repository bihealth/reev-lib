import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'ext/cadaPrio-api/openapi.yaml',
  output: 'ext/cadaPrio-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
