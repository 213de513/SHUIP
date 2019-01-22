<template>
  <div>
    <div class="chartsContainer1">
         <div id="chart1" class='big'></div>
    </div>
    <button class='btn btn-info download' v-show="showButton">
         <!-- 下载表格 -->
         <a :href="downLoadTableUrl" id='link' target="_blank">下载当前学院学分表格</a>
     </button>
    <div class="chartsContainer1">
         <div id="chart2" class='big'></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
     ...mapMutations([
            'changeRoute'
        ]),
      xfzt(){
        //进入默认状态，全校状态 get请求
       this.$store.state.showLoading = true;       
       var route = this.$route.path.slice(8);
       var xymc = window.localStorage.getItem('college'); 
       this.$http.get('/apis/cjsj/xfzt',{params:{xymc:xymc}}).then((res)=>{
         var result = res.data;
         if(result.code==2000){
           var res = result;
             //在一进入页面，先更改数据，在重新commit
            //更改vuex里route的数据，得知现在在哪一页
            this.changeRoute(route);
            this.$store.state.showLoading = false;
            if(xymc=='学校'){
              this.$store.state.showButton = false;
            }else{
                this.$store.state.showButton = true;
            }
            this.$store.commit('drawPie1',{el:'chart1',data:res.data.pieData});    
            this.$store.commit('drawMulityBar1',{el:'chart2',data:res.data.mulityData});          
         }
          
       }).catch((err)=>{
           console.log(err)
          this.$store.state.showLoading = false;
          alert('查询错误，请重试!');
       })
      }
  },
  mounted() {
    this.xfzt();
  },
  computed:{
      showButton(){         
          var flag = this.$store.state.showButton;
          return flag;
      },
      downLoadTableUrl(){
           var base = 'http://202.120.117.108:8080/visualdata/cjsj/xfzt/message?xymc=';
           var college = this.$store.state.form.college;
           var nj =  this.$store.state.form.grade
           return base + college+'&nj='+nj;
       }
  }
};
</script>
<style lang="less" >
     .chartsContainer1{
            height: 550px;
            display: flex;
            justify-content: space-around;
            margin-bottom: 50px;
            .big{
                width: 80%;
            }
        }
    .download{
    display: block;
    width: 200px;
    margin: 0 auto;
    margin-bottom: 50px;
    padding-left:0;
    padding-right: 0; 
    #link{
        color: white;
        display: inline-block;
        width: 100%;
        height: 100%;   
        text-align: center    
    }
}
</style>