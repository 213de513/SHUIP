<template>
  <div>
    <!-- <h2 class="subTitle">培养方案课程数据</h2> -->
    <div class="chartsContainer1">
      <div id="chart1" class="big"></div>
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
    ...mapMutations(["changeRoute"]),
    pyfa() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.$http.get("/apis/kcsj/pyfa",{params:{xymc:xymc}}).then(res => {
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
        }else{ 
          this.$store.state.showLoading = false;
          this.$message.error(result.message);
        }
      });
    }
  },
  mounted() {
    this.pyfa();
  }
};
</script>
<style lang="less" scoped>
.chartsContainer1 {
  height: 600px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
  .big {
    width: 80%;
  }
}
</style>