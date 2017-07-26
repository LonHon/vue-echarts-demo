import Vue from 'vue'
import Router from 'vue-router'
import imgUpLoad from '@/components/imgUpLoad'
import chart from '@/components/echartsDemo'
import fuzzySearch from '@/components/fuzzySearch'
import userRespon from '@/components/userResponse'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'userRespon',
      component: userRespon
    },
    {
      path: '/upImage',
      name: 'imgUpLoad',
      component: imgUpLoad
    },
    {
      path: '/chart',
      name: 'chart',
      component: chart
    },
    {
      path: '/search',
      name: 'fuzzySearch',
      component: fuzzySearch
    }
  ]
})
