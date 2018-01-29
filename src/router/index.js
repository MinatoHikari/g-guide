import Vue from 'vue'
import Router from 'vue-router'
import guidegroups from '@/components/guidegroups'
import tipspage from '@/components/tipspage'
import App from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: guidegroups
    },
    {
      path: '/tips',
      name: 'guide',
      component: tipspage
    }
  ]
})
