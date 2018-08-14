import Vue from 'vue'
import Router from 'vue-router'

const Data = () => import('pages/data/data')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Data
    }
  ]
})
