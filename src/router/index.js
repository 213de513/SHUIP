import Vue from 'vue'
import Router from 'vue-router'
import XueJi from '@/views/xueji.vue'
import Abroad from '@/views/abroad'
import Course from '@/views/course'
import Education from '@/views/education'
import Score from '@/views/score'
import ChaoXueZhi from '../views/Subxueji/chaoxuezhi.vue'
import LeiBie from '../views/Subxueji/leibie.vue'
import XiaoQuFenBu from '../views/Subxueji/xiaoqufenbu.vue'
import YiDong from '../views/Subxueji/yidong.vue'
import subXueJi from '../views/Subxueji/xueji.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/index',     
      component: XueJi,
      children:[
        {
          path:'',
          name: 'XueJi',
          component:subXueJi
        },

        {
          path:'chaoxuezhi',
          component:ChaoXueZhi
        },
        {
          path:'leibie',
          component:LeiBie
        },{
          path:'xiaoqufenbu',
          component:XiaoQuFenBu
        },{
          path:'yidong',
          component:YiDong
        },
      ]
    },
    {
      path: '/abroad',
      name: 'Abroad',
      component: Abroad
    },
    {
      path: '/course',
      name: 'course',
      component: Course
    },
    {
      path: '/education',
      name: 'education',
      component: Education
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    },
    {
      path:'/*',
      redirect: '/index'
    }
  ]
})
