import Vue from 'vue'
import Router from 'vue-router'
import rootpage from '@/components/rootpage'
import tipspage from '@/components/tipspage'
import App from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
    },
    {
      path: '/tips',
      name: 'guide',
      component: tipspage
    }
  ]
})
