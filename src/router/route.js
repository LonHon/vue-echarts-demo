import Vue from 'vue'
import Router from 'vue-router'
import imgUpLoad from '@/components/imgUpLoad'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hhh',
      name: 'imgUpLoad',
      component: imgUpLoad
    }
  ]
})
