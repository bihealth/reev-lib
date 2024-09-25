import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'ext/dotty-api/openapi.yaml',
  output: 'ext/dotty-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
