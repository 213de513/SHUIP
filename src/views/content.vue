<template>
  <div id="content">
    <my-header></my-header>
    <my-menu ></my-menu>
    <my-nav :menu='menu'></my-nav>
    <router-view ></router-view>
    <!-- <div id='mask' v-show='showMask' @click='hiddeMask'></div> -->
    <!-- <search-bar class='animated fadeInRight'  v-show='showMask'></search-bar> -->
    <search-bar2 @search='search' ></search-bar2>
    <my-loading v-show='showLoading'></my-loading>
    <my-photo ></my-photo>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import '@/assets/css/animate.css'
import myHeader from '@/components/header'
import myMenu from '@/components/menu'
import myNav from '@/components/nav'
import myLoading from '@/components/loading'
import searchBar2 from '@/components/searchBar2'
import myPhoto from '@/components/animation'
export default {
  name: 'Content',
  data(){
    return {
      data:'hello World',
      nowPage:'',
      menuData:[{name:'学籍状态',icon:'glyphicon-stats',path:'/content/xjsj'},{name:'超学制数据',icon:'glyphicon-education',path:'/content/xjsj/chaoxuezhi'},{name:'学籍异动',icon:'glyphicon-send',path:'/content/xjsj/yidong'},{name:'类别数据',icon:'glyphicon-th-list',path:'/content/xjsj/leibie'},{name:'校区分布人数',icon:'glyphicon-globe',path:'/content/xjsj/xiaoqufenbu'}]
    }
  },
  computed:{
    menu(){
      var route = this.$route.path.slice(9,13);
      this.nowPage = route;
      var myMenu = this.menuData;
      switch(this.nowPage){
      case 'xjsj':
      myMenu = [{name:'学籍状态',icon:'glyphicon-stats',path:'/content/xjsj'},{name:'超学制数据',icon:'glyphicon-education',path:'/content/xjsj/chaoxuezhi'},{name:'学籍异动',icon:'glyphicon-send',path:'/content/xjsj/yidong'},{name:'类别数据',icon:'glyphicon-th-list',path:'/content/xjsj/leibie'},{name:'校区人数分布',icon:'glyphicon-globe',path:'/content/xjsj/xiaoqufenbu'}]
      break;
      case 'cjsj':
        myMenu= [{name:'成绩状态',icon:'glyphicon-stats',path:'/content/cjsj'},{name:'学分状态',icon:'glyphicon-education',path:'/content/cjsj/xfzt'},{name:'成绩预警',icon:'glyphicon-warning-sign',path:'/content/cjsj/cjyj'}];
        break;
      case 'kcsj':
        myMenu = [{name:'公共课数据',icon:'glyphicon-stats',path:'/content/kcsj'},{name:'培养方案课程',icon:'glyphicon-education',path:'/content/kcsj/pyfa'},{name:'学期开课数据',icon:'glyphicon-send',path:'/content/kcsj/xqkk'},{name:'跨院系专业选课',icon:'glyphicon-th-list',path:'/content/kcsj/kxyxk'},{name:'调课数据',icon:'glyphicon-random',path:'/content/kcsj/tksj'}]
        break;
      case 'cgsj':
        myMenu= [{name:'出国总体数据',icon:'glyphicon-stats',path:'/content/cgsj'},{name:'校内资助',icon:'glyphicon-education',path:'/content/cgsj/xnzz'},{name:'公派出国',icon:'glyphicon-send',path:'/content/cgsj/gpcg'}];
        break;
      case 'xlsj':
        myMenu= [{name:'总体毕业数据',icon:'glyphicon-stats',path:'/content/xlsj'},{name:'专业硕士',icon:'glyphicon-education',path:'/content/xlsj/zssj'},{name:'学术硕士',icon:'glyphicon-send',path:'/content/xlsj/xssj'},{name:'博士',icon:'glyphicon-th-list',path:'/content/xlsj/bssj'}];
        break;
       case 'sysj':
        myMenu= [{name:'生源质量',icon:'glyphicon-stats',path:'/content/sysj'},{name:'硕士生源地区',icon:'glyphicon-globe',path:'/content/sysj/sssydq'},{name:'学生政治面貌',icon:'glyphicon-th-list',path:'/content/sysj/zzmm'},{name:'学生民族情况',icon:'glyphicon-education',path:'/content/sysj/mzqk'}];
        break;
      }
      return myMenu;
    },
    showLoading(){
      return this.$store.state.showLoading;
    },
    showMenu(){
      var storage = window.localStorage;
      var college =storage.getItem('college');
      return college; 
    }
  },
  methods:{
      search(){
        this.$store.dispatch('ajax');
      }
  },
  components:{
    myHeader,
    myMenu,
    myNav,
    myLoading,
    myPhoto,
    searchBar2
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

</style>
