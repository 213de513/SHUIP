<template>
  <div>
    <h2 class="subTitle">学籍状态</h2>
    <div class="chartsContainer">
      <div id="chart1"></div>
      <div id="chart2"></div>
    </div>
    <div class="XQ">
      <div id="chart3"></div>
      <div id="chart4"></div>
      <div id="chart5"></div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");
import { mapGetters } from "vuex";
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
    this.$http.get("/apis/xjsj/xjzt", { params: { xymc: xymc } }).then(res => {
      var result = res.data;
      if (result.code == 2000) {
        //在一进入页面，先更改数据，在重新commit
        //更改单柱状图，饼状图数据
        this.pPost(res.data.data);
        //更改vuex里route的数据，得知现在在哪一页
        this.changeRoute(route);

        this.$store.state.showLoading = false;
        this.$store.commit("drawMulityBar", "chart1");
        this.$store.commit("drawBar1", "chart3");
        this.$store.commit("drawBar2", "chart4");
        this.$store.commit("drawBar3", "chart5");
        this.$store.commit("drawPie", "chart2");
      }else if(result.code==2001){
          alert(result.message)
      }
    });
  },
  methods: {
    ...mapMutations(["pPost", "changeRoute"])
  }
};
</script>

<style lang='less'>
</style>
