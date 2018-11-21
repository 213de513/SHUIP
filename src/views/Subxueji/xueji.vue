<template>
 <div>
     <h2 class='subTitle'>学籍状态</h2>
     <div class="chartsContainer">
         <div id="chart1"></div>
         <div id="chart2"></div>
     </div>
 </div>
</template>

<script>
var echarts = require('echarts');
import { mapGetters } from 'vuex'
import {mapMutations} from 'vuex'
 export default {
   data () {
     return {

     }
   },
   mounted(){
       //进入默认状态，全校状态 get请求
       this.$store.state.showLoading = true;
       this.$http.get('/apis/selStu').then((res)=>{
            //在一进入页面，先更改数据，在重新commit
            this.pPost(res.data);
            this.$store.state.showLoading = false;
            this.$store.commit('drawBar','chart1');
            this.$store.commit('drawPie','chart2');
       })
   },
   methods:{
        ...mapMutations([
            'pPost'
        ])
   }
 }
</script>

<style lang='less'>
    
</style>
