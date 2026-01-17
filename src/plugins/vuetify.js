/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@fortawesome/fontawesome-free/css/all.css"
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { ru, en } from 'vuetify/locale'
import { aliases, fa } from "vuetify/iconsets/fa"

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    messages: { ru, en },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#518243",
          secondary: "#6a7c63",
          error: "#f44336",
        },
      },
    },
  },
  icons: {
    defaultSet: "fa",
    aliases,
    sets: { fa },
  },
})
