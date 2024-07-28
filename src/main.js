import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import "normalize.css"
import "./assets/css/index.css"
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

createApp(App).use(router).use(pinia).mount('#app')
