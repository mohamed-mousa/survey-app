import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faEdit, faTrashAlt, faPlus);

const pinia = createPinia();
const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.use(pinia);
app.use(router);

app.mount("#app");
