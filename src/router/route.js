import Vue from 'vue'
import Router from 'vue-router'
import imgUpLoad from '@/components/imgUpLoad'
import chart from '@/components/echartsDemo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/upImage',
      name: 'imgUpLoad',
      component: imgUpLoad
    },
    {
      path: '/chart',
      name: 'chart',
      component: chart
    }
  ]
})
