import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";

import colors from "vuetify/lib/util/colors";
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo,
        secondary: colors.cyan.lighten4,
        accent: colors.blue,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});

Vue.use(Vuetify);

export default vuetify;
