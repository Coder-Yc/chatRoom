import { createApp } from 'vue'
import { Rootgloble } from "./globle";
// import Chat from "vue-beautiful-chat"
import router from "./router";
import App from './App.vue'

const app = createApp(App)
Rootgloble(app);
app.use(router);
// app.use(Chat)
app.mount("#app");