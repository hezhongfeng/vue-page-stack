import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VuePageStack from 'dist/vue-page-stack.esm'

createApp(App).use(VuePageStack,{router}).mount('#app')
