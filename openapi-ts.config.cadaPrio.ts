import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'src/ext/cadaPrio-api/openapi.yaml',
  output: 'src/ext/cadaPrio-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
