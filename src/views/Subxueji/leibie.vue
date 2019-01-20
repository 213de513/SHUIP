<template>
  <div>
    <h2 class="subTitle">类别数据</h2>
    <div class="chartsContainer">
      <div id="chart1" class="big"></div>
    </div>
    <div class="chartsContainer">
      <div id="chart2" class="big"></div>
    </div>
    <div class="chartsContainer">
      <div id="chart3" class="smallPie"></div>
      <div id="chart4" class="smallPie"></div>
    </div>
    <div class="chartsContainer" style="margin-bottom:30px" v-show="showXKML">
      <div id="chart5" class="smallPie" style="height:700px"></div>
      <div id="chart6" class="smallPie" style="height:700px"></div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");
import { mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    //进入默认状态，全校状态 get请求
    this.$store.state.showLoading = true;
    var route = this.$route.path.slice(8);
    var xymc = window.localStorage.getItem("college");
    this.$http.get("/apis/xjsj/lbsj", { params: { xymc: xymc } }).then(res => {
      var result = res.data;
      if (result.code == 2000) {
        var res = result;
        //在一进入页面，先更改数据，在重新commit
        //更改数据
        this.pPost(res.data);
        //更改vuex里route的数据，得知现在在哪一页
        this.changeRoute(route);
        this.$store.state.showLoading = false;
        this.$store.commit("drawMulityBar", "chart1");
        this.$store.commit("drawPie1", {
          el: "chart2",
          data: res.data.chartData
        });
        this.$store.commit("drawPie1", {
          el: "chart3",
          data: res.data.pieData1
        });
        this.$store.commit("drawPie1", {
          el: "chart4",
          data: res.data.pieData2
        });
        if (xymc == "学校") {
          this.$store.state.showXKML = true;
          this.$store.commit("drawPie1", {
            el: "chart5",
            data: res.data.pieData3
          });
          this.$store.commit("drawPie1", {
            el: "chart6",
            data: res.data.pieData4
          });
        } else {
          this.$store.state.showXKML = false;
        }
      } else {
        alert(result.message);
      }
    });
  },
  methods: {
    ...mapMutations(["pPost", "changeRoute"])
  },
  computed: {
    showML() {
      var college = window.localStorage.getItem("college");
      return college == "学校" ? true : false;
    },
    showXKML() {
      return this.$store.state.showXKML;
    }
  }
};
</script>

<style lang='less' scoped>
.chartsContainer {
  min-height: 500px;
  display: flex;
  justify-content: space-around;
  .big {
    width: 80%;
  }
  .smallPie {
    width: 45%;
  }
}
</style>
