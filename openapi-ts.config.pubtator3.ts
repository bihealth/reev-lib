import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'src/ext/pubtator3-api/openapi.yaml',
  output: 'src/ext/pubtator3-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
