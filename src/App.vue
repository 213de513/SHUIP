<template>
  <div id="app">
    <my-header></my-header>
    <my-menu @showMask='show'></my-menu>
    <my-nav :menu='menu'></my-nav>
    <router-view ></router-view>
    <div id='mask' v-show='showMask' @click='hiddeMask'></div>
    <search-bar class='animated fadeInRight' @search='search' v-show='showMask'></search-bar>
    <div id='loading' v-show='showLoading'>
      <img src="static/loading-master/loading-spinning-bubbles.svg" alt="loading" id='img'>
    </div>
    <my-photo ></my-photo>
  </div>
</template>

<script>
import './assets/css/reset.css'
import './assets/css/animate.css'
import myHeader from './components/header'
import myMenu from './components/menu'
import myNav from './components/nav'
import searchBar from './components/searchBar'
import myPhoto from './components/animation'
export default {
  name: 'App',
  data(){
    return {
      data:'hello World',
      showMask:false,
      nowPage:'index',
      menuData:[{name:'学籍状态',icon:'glyphicon-stats',path:'/index'},{name:'超学制数据',icon:'glyphicon-education',path:'/index/chaoxuezhi'},{name:'学籍异动',icon:'glyphicon-send',path:'/index/yidong'},{name:'类别数据',icon:'glyphicon-th-list',path:'/index/leibie'},{name:'校区分布人数',icon:'glyphicon-globe',path:'/index/xiaoqufenbu'}]
    }
  },
  computed:{
    menu(){
      var route = this.$route.path.slice(1);
      this.nowPage = route;
      var myMenu = this.menuData;
      switch(this.nowPage){
      case 'index':
      myMenu = [{name:'学籍状态',icon:'glyphicon-stats',path:'/index'},{name:'超学制数据',icon:'glyphicon-education',path:'/index/chaoxuezhi'},{name:'学籍异动',icon:'glyphicon-send',path:'/index/yidong'},{name:'类别数据',icon:'glyphicon-th-list',path:'/index/leibie'},{name:'校区分布人数',icon:'glyphicon-globe',path:'/index/xiaoqufenbu'}]
      break;
      case 'score':
        myMenu= [{name:'成绩状态',icon:'glyphicon-stats'},{name:'学分状态',icon:'glyphicon-education'},{name:'成绩预警',icon:'glyphicon-send'}];
        break;
      case 'course':
        myMenu = [{name:'公共课数据',icon:'glyphicon-stats'},{name:'培养方案课程数据',icon:'glyphicon-education'},{name:'学期开课数据',icon:'glyphicon-send'},{name:'跨院系专业选课数据',icon:'glyphicon-th-list'},{name:'调课数据',icon:'glyphicon-globe'}]
        break;
      case 'abroad':
        myMenu= [{name:'出国总体数据',icon:'glyphicon-stats'},{name:'校内资助',icon:'glyphicon-education'},{name:'公派出国',icon:'glyphicon-send'}];
        break;
      case 'education':
        myMenu= [{name:'总体毕业数据',icon:'glyphicon-stats'},{name:'专业硕士',icon:'glyphicon-education'},{name:'学术硕士',icon:'glyphicon-send'},{name:'博士',icon:'glyphicon-th-list'},{name:'博士留学',icon:'glyphicon-globe'}];
        break;
      }
      return myMenu;
    },
    showLoading(){
      return this.$store.state.showLoading;
    }
  },
  methods:{
      show(){
        this.showMask = true;
      },
      hiddeMask(){
        this.showMask = false;
      },
      search(){
        this.showMask = false;
        this.$store.dispatch('ajax');
      },
      getRoute(){
        var route = this.$route.path.slice(1);
        this.nowPage = route;

        switch(this.nowPage){
          case 'index':
          this.menuData = [{name:'学籍状态',icon:'glyphicon-stats'},{name:'超学制数据',icon:'glyphicon-education'},{name:'学籍异动',icon:'glyphicon-send'},{name:'类别数据',icon:'glyphicon-th-list'},{name:'校区分布人数',icon:'glyphicon-globe'}];
          break;
          case 'score':
            this.menuData = [{name:'成绩状态',icon:'glyphicon-stats'},{name:'学分状态',icon:'glyphicon-education'},{name:'成绩预警',icon:'glyphicon-send'}];
            break;
          case 'course':
            this.menuData = [{name:'公共课数据',icon:'glyphicon-stats'},{name:'培养方案课程数据',icon:'glyphicon-education'},{name:'学期开课数据',icon:'glyphicon-send'},{name:'跨院系专业选课数据',icon:'glyphicon-th-list'},{name:'调课数据',icon:'glyphicon-globe'}]
            break;
          case 'abroad':
            this.menuData = [{name:'出国总体数据',icon:'glyphicon-stats'},{name:'校内资助',icon:'glyphicon-education'},{name:'公派出国',icon:'glyphicon-send'}];
            break;
          case 'education':
            this.menuData = [{name:'总体毕业数据',icon:'glyphicon-stats'},{name:'专业硕士',icon:'glyphicon-education'},{name:'学术硕士',icon:'glyphicon-send'},{name:'博士',icon:'glyphicon-th-list'},{name:'博士留学',icon:'glyphicon-globe'}];
            break;
        }
      }
  },
  components:{
    myHeader,
    myMenu,
    myNav,
    searchBar,
    myPhoto
  }
}
</script>

<style lang='less'>
    .body{
    position: absolute;
    top: 150px;
    left: 0;
    right: 0;
  }
  #mask{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 9999;
  }
  #loading{
    width: 100px;
    height: 100px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    img{
      width: 100%;
      height: 100%;
    }
  }

</style>
