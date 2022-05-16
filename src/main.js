import { createApp } from 'vue'
import { Rootgloble } from './globle'
import router from './router'
import App from './App.vue'

const app = createApp(App)
Rootgloble(app)
app.use(router)
app.mount('#app')
