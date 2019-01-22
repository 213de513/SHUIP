import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Login from '@/views/login'
import Content from '@/views/content'
import Index from '@/views/index'
import NProgress from 'nprogress'
//学籍数据
import XueJi from '@/views/xueji.vue'
import ChaoXueZhi from '../views/Subxueji/chaoxuezhi.vue'
import LeiBie from '../views/Subxueji/leibie.vue'
import XiaoQuFenBu from '../views/Subxueji/xiaoqufenbu.vue'
import YiDong from '../views/Subxueji/yidong.vue'
import subXueJi from '../views/Subxueji/xueji.vue'
//生源数据
import ShengYuan from '../views/sysj'
import Zhiliang from '../views/Subshengyuan/zhliang.vue'
import diqu from '../views/Subshengyuan/diqu.vue'
import diqu2 from '../views/Subshengyuan/diqu2.vue'
import zzmm from '../views/Subshengyuan/zzmm.vue'
import minzu from '../views/Subshengyuan/minzu.vue'
//学历数据
import Education from '@/views/education'
import ztby from '../views/SubxueLi/ztbysj.vue'
import zssj from '../views/SubxueLi/zs.vue'
import xssj from '../views/SubxueLi/xs.vue'
import bssj from '../views/SubxueLi/bs.vue'
//课程数据
import Course from '@/views/course'
import ggkc from '../views/Subkecheng/ggkc.vue'
import xqkk from '../views/Subkecheng/xqkk.vue'
import pyfa from '../views/Subkecheng/pyfa.vue'
import kyxxk from '../views/Subkecheng/kyxxk.vue'
import tksj from '../views/Subkecheng/tksj.vue'
//成绩数据
import Score from '@/views/score'
import cjzt from '../views/Subchengji/cjzt.vue'
import xfzt from '../views/Subchengji/xfzt.vue'
import cjyj from '../views/Subchengji/cjyj.vue'
//出国数据
import Abroad from '@/views/abroad'
import cgztsj from '@/views/Subchuguo/cgztsj'
import gpcg from '@/views/Subchuguo/gpcg'
import xnzz from '@/views/Subchuguo/xnzz'

Vue.use(Router)
axios.defaults.withCredentials=true;
var router = new Router({
  routes: [
    {
      path:'/',
      component:Login
  },
  {
    path:'/content',
    component:Content,
    children:[
      {
        path: '',
        name: 'Index',
        component: Index
      },
      {
        path: 'xjsj',     
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
        path: 'cgsj',
        component: Abroad,
        children:[
          {
            path:'',
            component:cgztsj
          },
          {
            path:'xnzz',
            component:xnzz
          },
          {
            path:'gpcg',
            component:gpcg
          }
        ]
      },
      {
        path: 'kcsj',
        component: Course,
        children:[
          {
            path:'',
            component:ggkc
          },
          {
            path:'pyfa',
            component:pyfa
          },
          {
            path:'xqkk',
            component:xqkk
          },
          {
            path:'kxyxk',
            component:kyxxk
          },
          {
            path:'tksj',
            component:tksj
          }
        ]
      },
      {
        path: 'sysj',
        component: ShengYuan,
        children:[
          {
            path:'',
            component:Zhiliang
          },
          {
            path:'sssydq',
            component:diqu
          },
          {
            path:'zzmm',
            component:zzmm
          },
          {
            path:'mzqk',
            component:minzu
          }
        ]
      },
      {
        path: 'xlsj',
        component: Education,
        children:[
          {
            path:'',
            component:ztby
          },
          {
            path:'xssj',
            component:xssj
          },
          {
            path:'zssj',
            component:zssj
          },
          {
            path:'bssj',
            component:bssj
          }
        ]
      },
      {
        path: 'cjsj',
        component: Score,
        children:[
          {path:'',component:cjzt},
          {path:'xfzt',component:xfzt},
          {path:'cjyj',component:cjyj},
        ]
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path:'*',
    redirect:'/'
  }
  ]
})
router.beforeEach((to, from, next) => {
  var storage = window.localStorage;
  if (to.matched.some(record => record.meta.requiresAuth)) {
      var storage = window.localStorage;
      //next(); //测试next
      var num = storage.getItem('userID');
      NProgress.start();
      axios.get('/apis/user/checkLogin',{params:{sID:num}}).then(res=>{
          if(res.data.code==2000){//在线
            storage.setItem('userID',res.data.data.sID);
            storage.setItem('status','on');
            storage.setItem('college',res.data.data.role);
            setTimeout(() => {
              NProgress.done();
              next();
            }, 1000);
          }else if(res.data.code==2001){
            storage.setItem('userID',-1);
            storage.setItem('status','off');
            storage.setItem('college','');
            NProgress.done();
            next({
              path: '/'
            })
          }        
      }).catch(err=>{
        NProgress.done();
        alert('出现未知错误,请刷新页面')
      })        
  } else {
    next() // 确保一定要调用 next()
  }
})
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
export default router