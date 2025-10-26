// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#000000",
          secondary: "#424242",
          accent: "#757575",
          background: "#FFFFFF",
          surface: "#F5F5F5",
          error: "#000000",
          info: "#616161",
          success: "#000000",
          warning: "#000000",
        },
      },
    },
  },
});
