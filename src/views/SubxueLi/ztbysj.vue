<template>
  <div>
    <!-- <h2 class="subTitle">总体毕业数据</h2> -->
    <div class="chartsContainer1">
      <div id="chart1" class="big"></div>
    </div>
    <div class="tableContainer">
      <el-table
        :data="tableData"
        stripe
        border
        :default-sort="{prop: 'percent', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column prop="college" label="学院" align="center"></el-table-column>
        <el-table-column prop="yibiye" label="已毕业人数(毕业+结业)" sortable align="center"></el-table-column>
        <el-table-column prop="yingbiye" label="应毕业人数" sortable align="center"></el-table-column>
        <el-table-column prop="percent" label="已毕业人数占应毕业人数比例" :sortable='true' :sort-method="sort" align="center"></el-table-column>
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
    ztbysj() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.changeTableData([]);
      this.$http
        .get("/apis/xlsj/ztby", { params: { xymc: xymc } })
        .then(res => {
          var result = res.data;
          if (result.code == 2000) {
            var res = result;
            //在一进入页面，先更改数据，在重新commit
            //更改vuex里route的数据，得知现在在哪一页
            this.changeRoute(route);
            this.$store.state.showLoading = false;
            this.$store.commit("drawPie1", {
              el: "chart1",
              data: res.data.pieData
            });
            this.changeTableData(res.data.tableData);
          }
        })
        .catch(() => {
          this.$store.state.showLoading = false;
          alert("查询错误，请重试!");
        });
    },
    sort(a,b){
      return parseFloat(a.percent)-parseFloat(b.percent)
    }
  },
  mounted() {
    this.ztbysj();
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    }
  }
};
</script>
<style lang="less" >
.tableContainer {
  width: 100%;
  background-color: #f1f4f7;
  padding: 20px;
}
.chartsContainer1 {
  height: 550px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
  .big {
    width: 80%;
  }
}
</style>