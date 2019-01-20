<template>
  <div>
    <div class="chartsContainer1">
      <div id="chart1" class="big"></div>
    </div>
    <div
      class="chartsContainer2"
      @click="showGridData"
      id="chartsContainer2"
      :style="height"
      v-show="showBar"
    >
      <div id="chart2" class="big"></div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible" >
      <el-table :data="gridData" border>
        <el-table-column property="college" label="学院" align="center"></el-table-column>
        <el-table-column property="c1" label="各学院出国数据(占全校比例)" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogTableVisible: false
    };
  },
  methods: {
    ...mapMutations(["changeRoute", "changeGridData", "changeHeight"]),
    ztcgsj() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.$http
        .get("/apis/cgsj/cgzt", { params: { xymc: xymc } })
        .then(res => {
          var result = res.data;
          if (result.code == 2000) {
            if (xymc == "学校") {
              this.$store.state.showBar = true;
            } else {
              this.$store.state.showBar = false;
            }
            var res = result;
            //在一进入页面，先更改数据，在重新commit
            //更改vuex里route的数据，得知现在在哪一页
            this.changeRoute(route);
            this.$store.state.showLoading = false;
            this.$store.commit("drawPie1", {
              el: "chart1",
              data: res.data.pieData
            });
            //格式化表格数据
            if (res.data.mulityData) {
              var arr = [];
              for (var i = 0; i < res.data.mulityData.yAxis.length; i++) {
                var temp = {};
                temp.college = res.data.mulityData.yAxis[i];
                if (res.data.mulityData.percent) {
                  temp.c1 =
                    res.data.mulityData.series[0].data[i] +
                    "(" +
                    res.data.mulityData.percent[0].data[i] +
                    ")";
                } else {
                  temp.c1 = res.data.mulityData.series[0].data[i];
                }
                arr.push(temp);
              }
            }
            console.log(parseInt(arr[0].c1));
            var tableData = arr.sort((a,b)=>{
              return parseInt(b.c1)-parseInt(b.c1);
            })
            this.changeGridData(tableData);
            if (this.showBar) {
              if (res.data.mulityData.yAxis.length == 1) {
                this.$store.state.height.height =
                  res.data.mulityData.yAxis.length * 150 + "px";
              } else {
                this.$store.state.height.height =
                  res.data.mulityData.yAxis.length * 100 + "px";
              }
              //格式化列表数据
              this.$store.state.tableTitle = res.data.mulityData.title;
              //坑？ 采用nextTick 组织过早渲染画图
              this.$nextTick(function() {
                this.$store.commit("drawTMulityBar1", {
                  el: "chart2",
                  data: res.data.mulityData
                });
              });
            }
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("出错啦！😀");
        });
    },
    showGridData() {
      this.dialogTableVisible = true;
    }
  },
  mounted() {
    this.ztcgsj();
  },
  computed: {
    gridData() {
      return this.$store.state.gridData;
    },
    title() {
      return this.$store.state.tableTitle;
    },
    showBar() {
      return this.$store.state.showBar;
    },
    height() {
      return this.$store.state.height;
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