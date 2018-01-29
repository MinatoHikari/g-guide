// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

import './assets/purecss/build/base-min.css'
import './assets/purecss/build/pure-min.css'
import './assets/purecss/build/grids-responsive-min.css'
import './assets/css/caomei1.2.8/style.css'
import './assets/css/main.css'
import '../static/js/lodash.min.js'

Vue.config.productionTip = false

import cardlink from './components/cardlink'
import suspendcard from './components/suspendcard'
Vue.component("card-link", cardlink)
Vue.component("suspend-card", suspendcard)


/* eslint-disable no-new */
var bus = new Vue()
export default bus
new Vue({
  el: '#App',
  router,
  components: { App },
  template: '<App/>'
})

