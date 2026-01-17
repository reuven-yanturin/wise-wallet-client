/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import router from "@/router"
import dayjsPlugin from "@/plugins/dayjs"
import vuetify from "@/plugins/vuetify"

import formatPriceMixin from '@/mixins/formatPriceMixin.js'
import toastMixin from "@/mixins/toastMixin.js"
import store from '@/store'

// Composable
import { createApp } from 'vue'

import "@/assets/styles/app.scss"

const app = createApp(App)

app
  .use(store)
  .use(vuetify)
  .use(router)
  .use(dayjsPlugin)
  .mixin(formatPriceMixin)
  .mixin(toastMixin)
  .mount('#app')
