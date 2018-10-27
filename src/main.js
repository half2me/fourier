import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import AsyncComputed from 'vue-async-computed'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(AsyncComputed);
Vue.use(Buefy, {
  defaultIconPack: "fas"
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  beforeCreate() {this.$store.commit('initialiseStore')},
  render: h => h(App),
}).$mount('#app');
