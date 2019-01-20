<template>
  <div>
    <h2 class="subTitle">成绩预警</h2>
    <div class="chartsContainer1" @click="showGridData" v-show="!showCollege" :style="height">
      <div id="chart1" class="big"></div>
    </div>
    <div class="chartsContainer1" @click="showGridData" v-show="showCollege" :style="height1">
      <div id="chart2" class="big"></div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border>
        <el-table-column property="college" label="学院" align="center"></el-table-column>
        <el-table-column property="num" label="超两门不及格人数" align="center"></el-table-column>
      </el-table>
    </el-dialog>
    <div class="tableContainer">
      <el-table :data="tableData" border v-show="showCollege" :default-sort="{prop: 'num', order: 'descending'}">
        <el-table-column property="xh" label="学号" sortable align="center"></el-table-column>
        <el-table-column property="xm" label="姓名" align="center"></el-table-column>
        <el-table-column property="xymc" label="学院名称" align="center"></el-table-column>
        <el-table-column property="cc" label="学位" align="center"></el-table-column>
        <el-table-column property="num" label="不及格门数" sortable align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogTableVisible: false,
      height: {
        height: "500px"
      },
      height1: {
        height: "200px"
      }
    };
  },
  methods: {
    ...mapMutations(["changeRoute", "changeGridData","changeTableData"]),
    cjyj() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.$http
        .get("/apis/cjsj/cjyj", { params: { xymc: xymc } })
        .then(res => {
          var result = res.data;
          if (result.code == 2000) {
            var res = result;
            //在一进入页面，先更改数据，在重新commit
            //更改vuex里route的数据，得知现在在哪一页
            this.changeRoute(route);
            this.$store.state.showLoading = false;
            if (xymc == "学校") {
              this.$store.state.showYj = false;
              this.height.height =
                res.data.mulityData.yAxis.length * 100 + "px";
              this.$nextTick(function() {
                this.$store.commit("drawTMulityBar1", {
                  el: "chart1",
                  data: res.data.mulityData
                });
              });
            } else {
              this.$store.state.showYj = true;
              this.changeTableData(res.data.tableData);
              this.$nextTick(function() {
                this.$store.commit("drawTMulityBar1", {
                  el: "chart2",
                  data: res.data.mulityData
                });
              });
            }
            var arr = this.formateTableData(res.data.mulityData);
            this.changeGridData(arr.sort((a,b)=>{
              return b.num-a.num
            }));
            this.$store.state.tableTitle = res.data.mulityData.title;
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.state.showLoading = false;
          alert("查询错误，请重试!");
        });
    },
    formateTableData(data) {
      var arr = [];
      var totle = 0;
      for (var i = 0; i < data.yAxis.length; i++) {
        var temp = {};
        temp.college = data.yAxis[i];
        temp.num = data.series[0].data[i];
        arr.push(temp);
        totle += temp.num;
      }
      arr.unshift({ college: "总计", num: totle });
      return arr.reverse();
    },
    showGridData() {
      this.dialogTableVisible = true;
    }
  },
  mounted() {
    this.cjyj();
  },
  computed: {
    gridData() {
      return this.$store.state.gridData;
    },
    title() {
      return this.$store.state.tableTitle;
    },
    showCollege() {
      var flag = this.$store.state.showYj;
      return flag;
    },
    tableData(){
      return this.$store.state.tableData;
    }
  }
};
</script>
<style lang="less" >
.chartsContainer1 {
  height: 550px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
  .big {
    width: 80%;
  }
}
.tableContainer {
  width: 100%;
  background-color: #f1f4f7;
  padding: 60px;
}
</style>