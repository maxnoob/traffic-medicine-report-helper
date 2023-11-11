import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
// import { plugin, defaultConfig } from '@formkit/vue' -- createApp(App).use(plugin, defaultConfig).mount('#app')

createApp(App).mount('#app')
// remember, each Vue plugin needs its own .use()
// .use(router).use(plugin2)

