import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// Agrega todos los iconos sólidos al objeto de la biblioteca
library.add(fas);
library.add(fab);


import "bootstrap/dist/js/bootstrap.min";
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
createApp(App).component("font-awesome-icon", FontAwesomeIcon).component("vue-sweetalert2", VueSweetalert2).mount("#app");
