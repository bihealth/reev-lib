import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'src/ext/dotty-api/openapi.yaml',
  output: 'src/ext/dotty-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
