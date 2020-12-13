// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import AxiosPlugin from 'vue-axios-cors'

import JsonViewer from 'vue-json-viewer'


// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)
// Vue.use(vueJsonEditor)

Vue.config.productionTip = false
// Vue.prototype.$http =axios
Vue.use(AxiosPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
