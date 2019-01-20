<template>
  <div>
    <div class="chartsContainer1" >
      <div id="chart1" class="big"></div>
    </div>
    <div class="tableContainer">
      <el-table :data="tableData" border show-summary v-show="showTable">
        <el-table-column property="college" label="学院" align="center"></el-table-column>
        <el-table-column property="num" label="人数" align="center"></el-table-column>
      </el-table>
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
    ...mapMutations(["changeRoute", "changeTableData"]),
    gpcg() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.changeTableData([]);
      this.$http
        .get("/apis/cgsj/gpcg", { params: { xymc: xymc } })
        .then(res => {
          var result = res.data;
          if (result.code == 2000) {
            var res = result;
            //在一进入页面，先更改数据，在重新commit
            //更改vuex里route的数据，得知现在在哪一页
            this.changeRoute(route);
            this.$store.state.showLoading = false;
            this.$store.commit("drawBar4", {
              el: "chart1",
              data: res.data.chartData
            });
            var tableData = res.data.tableData.sort((a,b)=>{
              return b.num-a.num;
            })
            this.changeTableData(tableData);
            if (xymc == "学校") {
              this.$store.state.showTable = true;
            } else {
              this.$store.state.showTable = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.state.showLoading = false;
          alert("查询错误，请重试!");
        });
    }
  },
  mounted() {
    this.gpcg();
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
    showTable() {
      return this.$store.state.showTable;
    }
  }
};
</script>
<style lang="less" >
.chartsContainer1 {
  height: 550px;
  display: flex;
  justify-content: space-around;
  margin: 50px;
  .big {
    width: 80%;
  }
}
.tableContainer {
  width: 90%;
  background-color: #f1f4f7;
  padding: 30px 60px;

  margin: 0 auto;
}
</style>