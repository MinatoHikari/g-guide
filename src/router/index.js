import Vue from 'vue'
import Router from 'vue-router'
import cardlink from '@/components/cardlink'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: cardlink
    }
  ]
})
