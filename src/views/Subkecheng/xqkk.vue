<template>
  <div>
    <div class="chartsContainer1">
      <div id="chart1" class="big"></div>
    </div>
        <div class="chartsContainer1">
      <div id="chart3" class="big"></div>
    </div>
     <div class="chartsContainer2" @click='showGridData' id='chartsContainer2' :style='height' v-show="showBar">
      <div id="chart2" class="big"></div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border :default-sort="{prop: 'c1', order: 'descending'}">
        <el-table-column property="college" label="学院" align="center"></el-table-column>
        <el-table-column property="c1" :sortable='true' :sort-method='sort' label="开课门次(占全校比例)" align="center"></el-table-column>       
        <el-table-column property="c2" :sortable='true'  :sort-method='sort2'  label="开课门数(占全校比例)" align="center"></el-table-column>           
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogTableVisible:false,
      height:{
        height:'200px'
      }
    };
  },
  methods: {
    ...mapMutations(["changeRoute","changeGridData",'changeHeight']),
    drawBar() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.$http.get("/apis/kcsj/xqkk",{params:{xymc:xymc}}).then(res => {
        var result = res.data;
        if (result.code == 2000) {
          var res = result;
          //在一进入页面，先更改数据，在重新commit
          //更改vuex里route的数据，得知现在在哪一页
          this.changeRoute(route);
          this.$store.state.showLoading = false;       
          this.$store.commit("drawPie1", {
            el: "chart1",
            data: res.data.kkmc
          });
            this.$store.commit("drawPie1", {
            el: "chart3",
            data: res.data.kkms
          });
          if(this.showBar){
                  this.height.height = res.data.mulityData.yAxis.length * 100+'px';
              //格式化列表数据
                   var arr = [];
                  for(var i=0;i<res.data.mulityData.yAxis.length;i++){
                    var temp = {};
                    temp.college = res.data.mulityData.yAxis[i];
                    temp.c1 = res.data.mulityData.series[0].data[i]+'('+res.data.mulityData.percent[0].data[i]+')';
                    temp.c2 = res.data.mulityData.series[1].data[i]+'('+res.data.mulityData.percent[1].data[i]+')';
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
    },
    sort(a,b){
      return parseInt(a.c1)-parseInt(b.c1);
    },
    sort2(a,b){
      return parseInt(a.c2)-parseInt(b.c2);
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
  height: 600px;
  display: flex;
  justify-content: space-around;
  .big {
    width: 80%;
  }
}
.chartsContainer2 {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
  .big {
    width: 90%;
  }
}
</style>