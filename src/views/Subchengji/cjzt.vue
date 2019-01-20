<template>
  <div>
    <div class="chartsContainer1">
         <div id="chart1" class='big'></div>
    </div>
     <div class="chartsContainer1" style='margin-bottom:0'>
         <div id="chart2" class='big'></div>
    </div>
    <div class="tableContainer">
    <el-table :data="percentData" border>
        <el-table-column property="zs" label="专硕不及格比例" align="center"></el-table-column>
        <el-table-column property="xs" label="学硕不及格比例" align="center"></el-table-column>       
        <el-table-column property="bs" label="博士不及格比例" align="center"></el-table-column>             
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
        
    };
  },
  methods: {
     ...mapMutations([
            'changeRoute','changeGridData'
        ]),
      cjzt(){
        //进入默认状态，全校状态 get请求
       this.$store.state.showLoading = true;       
       var route = this.$route.path.slice(8);
       var xymc = window.localStorage.getItem('college'); 
       this.$http.get('/apis/cjsj/cjzt',{params:{xymc:xymc}}).then((res)=>{
         var result = res.data;
         if(result.code==2000){
           var res = result;
             //在一进入页面，先更改数据，在重新commit
            //更改vuex里route的数据，得知现在在哪一页
            this.changeRoute(route);
            this.$store.state.showLoading = false;
            this.$store.commit('drawPie1',{el:'chart1',data:res.data.pieData});    
            this.$store.commit('drawBar4',{el:'chart2',data:res.data.chartData}); 
            this.changeGridData(res.data.chartData.percent)
            // this.percentData.push(res.data.chartData.percent[0]);   
         }          
       }).catch((err)=>{
         console.log(err);
          this.$store.state.showLoading = false;
          alert('查询错误，请重试!');
       })
      }
  },
  mounted() {
    this.cjzt();
  },
  computed:{
    percentData(){
       return this.$store.state.gridData;
    }
  }
};
</script>
<style lang="less" >
.tableContainer{
    width: 100%;
    background-color: #f1f4f7;
    padding: 30px 60px;
}
     .chartsContainer1{
            height: 550px;
            display: flex;
            justify-content: space-around;
            margin-bottom: 50px;
            .big{
                width: 80%;
            }
        }
</style>