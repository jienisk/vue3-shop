//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'


import App from './App.vue'


import '@/styles/common.scss'
import { lazyPlugin } from '@/directives'

import { componentPlugin } from '@/components'



const app = createApp(App)
const pinia = createPinia()


pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')




