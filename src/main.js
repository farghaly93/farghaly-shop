import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'

Vue.use(Vuelidate);
 axios.defaults.baseURL = 'http://localhost:3001';
 axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
