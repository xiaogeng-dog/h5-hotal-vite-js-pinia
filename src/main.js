import { createApp } from 'vue'
import router from './router'
import pinia from './store'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.css'

createApp(App).use(router).use(pinia).mount('#app')
