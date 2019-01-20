<template>
  <div >
       <h2 class='subTitle'>博士生源地区</h2>      
       <div class="my-map">
           <div id='main' class='big'></div>
        </div> 
  </div>
</template>

<script>
var echarts = require('echarts');
import {mapMutations} from 'vuex'
import 'echarts/map/js/china.js';
export default {
  data(){
    return {
        
    }

  },
  methods:{
        ...mapMutations([
            'changeRoute'
        ]),
        randomData(){
            return Math.round(Math.random()*500);  
      },
      drawMap(){
               //进入默认状态，全校状态 get请求
       this.$store.state.showLoading = true;       
       var route = this.$route.path.slice(9);
        var xymc = window.localStorage.getItem('college'); 
       this.$http.get('/apis/sysj/sssysj',{params:{route:route}}).then((res)=>{
            //在一进入页面，先更改数据，在重新commit
            //更改vuex里route的数据，得知现在在哪一页
            this.changeRoute(route);
            this.$store.state.showLoading = false;
            this.$store.commit('drawMap',{el:'main',data:res.data});
       })
      }
  },
  mounted(){
         this.drawMap();
  }
}
</script>
<style lang="less" scoped>
        .my-map{
            height: 1200px;
            display: flex;
            justify-content: space-around;
            .big{
                width: 100%;
            }
        }
</style>