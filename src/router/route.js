import Vue from 'vue'
import Router from 'vue-router'
import imgUpLoad from '@/components/imgUpLoad'
import chart from '@/components/echartsDemo'
import fuzzySearch from '@/components/fuzzySearch'
import userRespon from '@/components/userResponse'
import edu_syl from '@/components/edu_syl'
import calendar from '@/tools/calendar'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: chart
    },
    {
      path: '/userRespon',
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
    },
    {
      path: '/edu_syl',
      name: 'edu_syl',
      component: edu_syl
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: calendar
    }
  ]
})
