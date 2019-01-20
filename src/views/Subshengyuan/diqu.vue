<template>
  <div>
    <!-- <h2 class="subTitle">硕士生源地区</h2> -->
    <div class="my-map" @click='showGridData'>
      <div id="main" class="big"></div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border>
        <el-table-column property="name" label="地区" align="center"></el-table-column>
        <el-table-column property="value" label="人数" align="center"></el-table-column>       
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
var echarts = require("echarts");
import { mapMutations } from "vuex";
import "echarts/map/js/china.js";
export default {
  data() {
    return {
        dialogTableVisible:false
    };
  },
  methods: {
    ...mapMutations(["changeRoute","changeGridData"]),
    drawMap() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.$http
        .get("/apis/sysj/sydq", { params: { xymc: xymc } })
        .then(res => {
          var result = res.data;
          if (result.code == 2000) {
            var res = result;
            //在一进入页面，先更改数据，在重新commit
            //更改vuex里route的数据，得知现在在哪一页
            this.changeRoute(route);
            this.$store.state.showLoading = false;
            var arr = res.data.result.sort((a,b)=>{
                return parseInt(b.value)-parseInt(a.value);
            })
            this.changeGridData(arr);
            this.$store.state.tableTitle = res.data.title;
            this.$store.commit("drawMap", { el: "main", data: res.data });
          }
        }).catch(err=>{
          console.log(err);
            this.$message.error('加载失败,请重试');
        });
    },
    showGridData(){
        this.dialogTableVisible = true;
    }
  },
  mounted() {
    this.drawMap();
  },
  computed:{
      gridData(){
          
          return this.$store.state.gridData;
      },
      title(){
           return this.$store.state.tableTitle;
      }
  }
};
</script>
<style lang="less" scoped>
.my-map {
  margin-top: 80px;
  height: 1000px;
  display: flex;
  justify-content: space-around;
  .big {
    width: 100%;
  }
}
</style>