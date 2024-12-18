/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import router from "./router"
import dayjsPlugin from "./plugins/dayjs"
import FontAwesomeIcon from './plugins/fontawesome'
import formatPriceMixin from './mixins/formatPriceMixin.js'

// Composables
import { createApp } from 'vue'
import vuetify from "@/plugins/vuetify"

import "@/assets/styles/app.scss"

const app = createApp(App)

app
  .use(vuetify)
  .use(router)
  .use(dayjsPlugin)
  .mixin(formatPriceMixin)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')
