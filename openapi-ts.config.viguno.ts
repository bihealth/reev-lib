import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'src/ext/viguno-api/openapi.yaml',
  output: 'src/ext/viguno-api/src/lib',
  plugins: [
    '@tanstack/vue-query'
  ]
});
