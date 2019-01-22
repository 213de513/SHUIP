<template>
 <div >
     <h2 class="subTitle">超学制数据</h2>
     <div class="chartsContainer">
         <div id="chart1" styly='flex:1'></div>
     </div>
     <div class="tableContainer">
         <el-table
            :data="tableData"
            stripe
            border
            :default-sort="{prop: 'number', order: 'descending'}"
            style="width: 100%">
                <el-table-column
                prop="college"
                label="学院" 
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="discipline"
                label="专业" 
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="number"
                label="超学制人数"
                :sortable='true'
                :sort-method="sort"
                 align="center"
                >
                </el-table-column>
                <el-table-column
                prop="percent"
                :sortable='true'
                :sort-method="sort1"
                label="超学制人数占学院人数比例"  align="center">
                </el-table-column>
        </el-table>
     </div>
     <button class='btn btn-info download'>
         <!-- 下载表格 -->
         <a :href="downLoadTableUrl" id='link'>下载表格 </a>
     </button>
     
 </div>
</template>

<script>
var echarts = require('echarts');

import {mapMutations} from 'vuex'
 export default {
   data () {
     return {
     }
   },
   mounted(){
       //进入默认状态，全校状态 get请求
       this.$store.state.showLoading = true;
       var route = this.$route.path.slice(8);    
        var xymc = window.localStorage.getItem('college'); 
        this.changeTableData([]);
       this.$http.get('/apis/xjsj/cxzsj',{params:{xymc:xymc,grade:''}}).then((res)=>{
           var result = res.data;
           if(result.code==2000){
                //在一进入页面，先更改数据，在重新commit
                // console.log(res.data);
                var res = res.data;
                this.pPost(res.data);
                this.changeRoute(route);
                res.data.tableData.forEach(item=>{
                    if(item.discipline==null){
                        item.discipline='所有专业';
                    }
                })
                this.$store.state.showLoading = false;
                this.$store.commit('drawBar','chart1');
                this.changeTableData(res.data.tableData)
           }
      
       })
   },
   methods:{
        ...mapMutations([
            'pPost','changeRoute','changeTableData'
        ]),
        sort(a,b){
            return parseInt(a.number)-parseInt(b.number)
        },
         sort1(a,b){
            return parseFloat(a.percent)-parseFloat(b.percent)
        }
   },
   computed:{
       tableData(){
           return this.$store.state.tableData;
       },
       downLoadTableUrl(){
           var base = 'http://202.120.117.108:8080/visualdata/xjsj/cxzsj/cxzxx?xymc=';
           var college = this.$store.state.form.college+'&zymc=';
           var discipline = this.$store.state.form.discipline
           return base + college+discipline;
       }
   }
 }
</script>

<style lang='less'>
.tableContainer{
    width: 100%;
    background-color: #f1f4f7;
    padding: 60px;
}
.download{
    display: block;
    width: 100px;
    margin: 0 auto;
    margin-bottom: 50px;
    padding-left:0;
    padding-right: 0; 
    #link{
        color: white;
        display: inline-block;
        width: 100px;
        height: 100%;   
        text-align: center    
    }
}
 
</style>
