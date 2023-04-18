import { createApp } from 'vue'
import App from '~/popup/App.vue'
import router from './router'
import store, { key } from '@/store'
const app = createApp(App)
app.use(router)
app.use(store, key)
app.mount(document.querySelector('#app'))
