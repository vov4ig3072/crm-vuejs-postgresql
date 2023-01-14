import  { createApp } from 'vue'
import App from "./App"
import router from './router/router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader.vue'
import  VueCookies  from 'vue3-cookies'
import 'materialize-css/dist/js/materialize'

const app = createApp(App)
app.use(messagePlugin)
app.use(VueCookies, {expireTimes: '4h'})
app.component('Loader', Loader)

app.use(store).use(router).mount('#app')
