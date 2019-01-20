<template>
  <div>
    <h2 class="subTitle">校区分布</h2>
    <div class="chartsContainer">
      <div id="chart1"></div>
      <div id="chart2"></div>
    </div>
    <div class="tips" v-show="showTips">点击校区名称查看详情...</div>
    <div class="XQ">
      <div id="chart3" @click="baoshan"></div>
      <div id="chart4" @click="yanchang"></div>
      <div id="chart5" @click="jiading"></div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border>
        <el-table-column property="college" label="学院" align="center"></el-table-column>
        <el-table-column
          v-for="(item,index) in label"
          :key="index"
          :property="item"
          :label="item"
          align="center"
        ></el-table-column>
      </el-table>
    </el-dialog>
    <my-loading v-show="showLoading"></my-loading>
  </div>
</template>

<script>
var echarts = require("echarts");
import myLoading from "@/components/loading";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      title: "校区人数分布",
      dialogTableVisible: false,
      showTips: false,
      showLoading: false,
      label: []
    };
  },
  components: {
    myLoading
  },
  computed: {
    gridData() {
      return this.$store.state.gridData;
    }
  },
  mounted() {
    //进入默认状态，全校状态 get请求
    this.$store.state.showLoading = true;
    var route = this.$route.path.slice(8);
    var xymc = window.localStorage.getItem("college");
    this.$http
      .get("/apis/xjsj/xqrsfb", { params: { xymc: xymc } })
      .then(res => {
        var result = res.data;
        if (result.code == 2000) {
          var res = result;
          //在一进入页面，先更改数据，在重新commit
          //更改数据
          this.pPost(res.data);
          //更改vuex里route的数据，得知现在在哪一页
          this.changeRoute(route);
          this.$store.state.showLoading = false;
          this.showTips = true;
          this.$store.commit("drawBar", "chart1");
          this.$store.commit("drawBar1", "chart3");
          this.$store.commit("drawBar2", "chart4");
          this.$store.commit("drawBar3", "chart5");
          this.$store.commit("drawPie", "chart2");
        } else {
          alert(result.message);
        }
      });
  },
  methods: {
    ...mapMutations(["pPost", "changeRoute", "changeGridData"]),
    baoshan() {
      var xq = "宝山校区";
      this.getGride(xq);
    },
    yanchang() {
      var xq = "延长校区";
      this.getGride(xq);
    },
    jiading() {
      var xq = "嘉定校区";
      this.getGride(xq);
    },
    getGride(name) {
      var xq = name;
      this.showLoading = true;
      var xymc = this.$store.state.form.college;
      var nj = this.$store.state.form.grade;
      var zymc = this.$store.state.form.discipline;
      this.$http
        .get("/apis/xjsj/xqrsfb/xqrsfbxq", { params: { xq, xymc, zymc, nj } })
        .then(res => {
          var result = res.data;
          if (result.code == 2000) {
            var res = result;
            this.showLoading = false;
           
            this.dialogTableVisible = true;
            var arr = [];
            //动态更改label 取并集
            for (var i = 0; i < res.data.length; i++) {
              for (var item in res.data[i]) {
                if (arr.indexOf(item) < 0 && item != "college") {
                  arr.push(item);
                }
              }
              //arr.length最大是4
              if (arr.length == 4) {
                break;
              }
            }
            //把超学制放到最后排序
            if (arr.indexOf("超学制") > -1) {
              var temp = arr.splice(arr.indexOf("超学制"), 1)[0];
              var newArr = arr.sort((a, b) => {
                return b - a;
              });
              arr.push(temp);
              this.label = arr;
            } else {
              this.label = arr.sort((a, b) => {
                return b - a;
              });
            }
            //没有某些年份的人数数据补0
            for(var i=0;i<res.data.length;i++){            
                for(var j=0;j<this.label.length;j++){
                  if(this.label[j]!='学院'){
                     var temp = this.label[j];
                    if(!res.data[i][temp]){
                      res.data[i][temp] = 0;
                    }
                  }                
                }             
            }
             this.changeGridData(res.data);
          }
        })
        .catch(err => {
          this.showLoading = false;
          console.log(err);
          alert("校区详情查询错误");
        });
    }
  }
};
</script>

<style lang='less'>
.tips {
  color: #222;
}
</style>
