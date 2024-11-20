import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'src/ext/mehari-api/openapi.yaml',
  output: 'src/ext/mehari-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
