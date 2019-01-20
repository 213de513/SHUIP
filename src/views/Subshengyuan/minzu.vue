<template>
  <div>
    <h2 class="subTitle">民族情况</h2>
    <span class='mzDetail'>硕士研究生生源民族情况详情</span>
    <div class="tableContainer">
      <el-table :data="ssData" border show-summary style="width: 100%"  >
        <el-table-column v-for='(item,index) in label' :key='index' :prop="item" :label="item"  align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      defaultSort:0
    };
  },
  methods: {
    ...mapMutations(["changeRoute","changeLabel","changeTableData"]),
    mzqk() {
      //进入默认状态，全校状态 get请求
      this.$store.state.showLoading = true;
      var route = this.$route.path.slice(8);
      var xymc = window.localStorage.getItem("college");
      this.$http.get("/apis/sysj/mzqk",{params:{xymc:xymc}}).then(res => {
        var result = res.data;
        if(result.code==2000){
          var res = result;
          //在一进入页面，先更改数据，在重新commit
          //更改vuex里route的数据，得知现在在哪一页
          this.changeRoute(route);
          this.$store.state.showLoading = false;        
          // var temp = {}
          // for(var i=0;i<res.data.ssData.length;i++){
          //   if(res.data.ssData[i].民族=='汉族'){
          //    temp =  res.data.ssData.splice(i,1)[0];
          //    break;
          //   }
          // }
          // res.data.ssData.unshift(temp);
          var len = res.data.label.length;
          this.defaultSort = res.data.label[len-1];
          console.log(this.defaultSort);
          this.changeLabel(res.data.label);
          this.changeTableData(res.data.ssData.sort((a,b)=>{
            return b['2018']-a['2018'];
          }));
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
    this.mzqk();
  },
  computed:{
    label(){
      return this.$store.state.label;
    },
    ssData(){
      return this.$store.state.tableData;
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
.mzDetail{
  margin-left: 30px;
  border-bottom: 2px solid  #00B1DD;
  padding: 3px 
}
</style>