    import "bootstrap/dist/css/bootstrap.min.css";

    import { createApp } from "vue";
    import App from "./App.vue";
    import { library } from '@fortawesome/fontawesome-svg-core'
    /* import font awesome icon component */
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { fas } from '@fortawesome/free-solid-svg-icons'
    import { fab } from '@fortawesome/free-brands-svg-icons'
    
    // Agrega todos los iconos sólidos al objeto de la biblioteca
    library.add(fas)
    library.add(fab)

    createApp(App).component('font-awesome-icon',FontAwesomeIcon).mount("#app");

    import "bootstrap/dist/js/bootstrap.min";