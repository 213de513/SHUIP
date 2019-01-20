import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import qs from 'qs'
Vue.use(ElementUI);

Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
Vue.prototype['$http'] = axios;
Vue.prototype['$qs'] = qs;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
