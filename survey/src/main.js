import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
