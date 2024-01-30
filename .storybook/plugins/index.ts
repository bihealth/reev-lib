import type { App } from 'vue'

import vuetify from './vuetify'

export async function registerPlugins(app: App) {
  app.use(vuetify)
}
