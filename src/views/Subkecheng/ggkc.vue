<template>
  <div>
    <h2 class="subTitle">公共课数据</h2>
    <div class="chartsContainer1">
      <div id="chart1" class="big"></div>
    </div>
     <div class="chartsContainer2" @click='showGridData' id='chartsContainer2' :style='height' v-show="showBar">
      <div id="chart2" class="big"></div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border :default-sort="{prop: 'c2', order: 'descending'}">
        <el-table-column property="college" label="学院" align="center"></el-table-column>
        <el-table-column property="c1" label="公共平台"  :sortable="true" align="center"></el-table-column>       
        <el-table-column property="c2" label="公共课"  :sortable="true" align="center"></el-table-column>       
        <el-table-column property="c3" label="公共选修课"  :sortable="true" align="center"></el-table-column>       
        <el-table-column property="c4" label="创新创业课"  :sortable="true" align="center"></el-table-column>       
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogTableVisible:false
    };
  },
  methods: {
    ...mapMutations(["changeRoute","changeGridData",'changeHeight']),
    drawBar() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.$http.get("/apis/kcsj/ggksj",{params:{xymc:xymc}}).then(res => {
        var result = res.data;
        if (result.code == 2000) {
          var res = result;
          //在一进入页面，先更改数据，在重新commit
          //更改vuex里route的数据，得知现在在哪一页
          this.changeRoute(route);
          this.$store.state.showLoading = false;
          //动态更改躺多列柱状图的高度         
          this.$store.commit("drawBar4", {
            el: "chart1",
            data: res.data.chartData
          });
          if(this.showBar){
               this.changeHeight(res.data.mulityData)
              //格式化列表数据
                   var arr = [];
                  for(var i=0;i<res.data.mulityData.yAxis.length;i++){
                    var temp = {};
                    temp.college = res.data.mulityData.yAxis[i];
                    temp.c1 = res.data.mulityData.series[0].data[i];
                    temp.c2 = res.data.mulityData.series[1].data[i];
                    temp.c3 = res.data.mulityData.series[2].data[i];
                    temp.c4 = res.data.mulityData.series[3].data[i];
                    arr.push(temp);
                  }
                  this.changeGridData(arr);
                  this.$store.state.tableTitle = res.data.mulityData.title;
                   //坑？ 采用nextTick 组织过早渲染画图
                  this.$nextTick(function(){
                    this.$store.commit("drawTMulityBar", {
                      el: "chart2",
                      data:res.data.mulityData
                    });
                  })
          }
         
          
        }else{
          this.$message.error(result.message);
        }
      });
    },
    showGridData(){
        this.dialogTableVisible = true;
    }
  },
  mounted() {
    this.drawBar();
  },
   computed:{
      gridData(){         
          return this.$store.state.gridData;
      },
      title(){
           return this.$store.state.tableTitle;
      },
      height(){
          return this.$store.state.height;
      },
      showBar(){
          var storage = window.localStorage;
          var college = storage.getItem('college');
          var flag = this.$store.state.showBar;
          if(college=='学校'&&flag){
            return true
          }else{
            return false;
          }
      }
  }
};
</script>
<style lang="less" scoped>
.chartsContainer1 {
  height: 500px;
  display: flex;
  justify-content: space-around;
  .big {
    width: 80%;
  }
}
.chartsContainer2 {
  // height: 1200px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
  .big {
    width: 90%;
  }
}
</style>