import  { createApp } from 'vue'
import Paginate from 'vuejs-paginate-next'
import App from "./App"
import router from './router/router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader.vue'
import  VueCookies  from 'vue3-cookies'
import currency from './filters/currency.filter'
import dateFilters from './filters/date.filter'
import localize from './filters/localize.filter'
import tooltipDirective from './directives/tooltip.directive'
import 'materialize-css/dist/js/materialize'

const app = createApp(App)
app.use(messagePlugin)
app.use(VueCookies, {expireTimes: '4h'})
app.component('Loader', Loader)
app.component('Paginate', Paginate)
app.directive('tooltip', tooltipDirective)
app.config.globalProperties.$filters = {
    currency, dateFilters, localize
}

app.use(store).use(router).mount('#app')
