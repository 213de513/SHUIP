<template>
  <div>
    <h2 class="subTitle">调课数据</h2>
    <div class="tableContainer">
      <el-table :data="tkData" border :show-summary='showSummary' style="width: 100%" :default-sort="{prop: 'num', order: 'descending'}">
        <el-table-column property="college" label="学院" align="center"></el-table-column>
        <el-table-column property="num" label="调课次数" sortable align="center"></el-table-column>
      </el-table>
    </div>
    <!-- <span class='mzDetail'>博士研究生生源民族情况详情</span>
    <div class="tableContainer">
      <el-table :data="bsData" border show-summary style="width: 100%">
        <el-table-column v-for='(item,index) in label' :key='index' :prop="item" :label="item"  align="center" ></el-table-column>
      </el-table>
    </div> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {

    };
  },
  methods: {
    ...mapMutations(["changeRoute","changeLabel","changeTableData"]),
    tksj() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.changeTableData([]);
      this.$http.get("/apis/kcsj/tksj",{params:{xymc:xymc}}).then(res => {
        var result = res.data;
        if(result.code==2000){
          var res = result;
          //在一进入页面，先更改数据，在重新commit
          //更改vuex里route的数据，得知现在在哪一页
          this.changeRoute(route);
          this.$store.state.showLoading = false;        
          this.changeTableData(res.data.tableData);
          if(xymc=='学校'){
            this.$store.state.showSummary=true
          }else{
            this.$store.state.showSummary = false
          }
        }else{
          this.$message.error(result.message);
        }
      }).catch(err=>{
        this.$store.state.showLoading = false;
        console.log(err);
        alert('查询错误')
      });
    }
  },
  mounted() {
    this.tksj();
  },
  computed:{
    tkData(){
      return this.$store.state.tableData;
    },
    showSummary(){
      return this.$store.state.showSummary
    }
  }
};
</script>
<style lang="less">
.tableContainer{
    width: 100%;
    background-color: #f1f4f7;
    padding: 30px 60px;
}
</style>