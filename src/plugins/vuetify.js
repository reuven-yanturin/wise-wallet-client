/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          // primary: {
          //   base: "#48B75B",
          //   darken1: "#2D7439",
          //   lighten5: "#f6fbf7",
          // },
          // secondary: {
          //   base: "#558DBD",
          //   darken1: "#264C6E",
          // },
          // tertiary: {
          //   base: "#3F4448",
          //   darken1: "#000000",
          // },
          error: "#f44336",
        },
      },
    },
  },
})
