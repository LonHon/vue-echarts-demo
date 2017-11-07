import Vue from 'vue'
import Router from 'vue-router'
import imgUpLoad from '@/components/imgUpLoad'
import chart from '@/components/echartsDemo'
import toolShow from '@/components/toolShow'
import userRespon from '@/components/userResponse'
import edu_syl from '@/components/edu_syl'
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
      path: '/toolShow',
      name: 'toolShow',
      component: toolShow
    },
    {
      path: '/edu_syl',
      name: 'edu_syl',
      component: edu_syl
    }
  ]
})
