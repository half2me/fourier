import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import AsyncComputed from 'vue-async-computed'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import BackToTop from 'vue-backtotop'
var VueScrollTo = require('vue-scrollto');
import VueApexCharts from 'vue-apexcharts'
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(VueApexCharts);

Vue.use(InfiniteLoading, { /* options */ });
Vue.component('apexchart', VueApexCharts);
Vue.use(AsyncComputed);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
});
Vue.use(VueScrollTo);
Vue.use(BackToTop);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  beforeCreate() {this.$store.commit('initialiseStore')},
  render: h => h(App),
}).$mount('#app');
