import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";

import '@/styles/tailwind.css'
import '@/styles/index.css'
import {createPinia} from "pinia";

//导入pinia
const pinia = createPinia()

const app =createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
