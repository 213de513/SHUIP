<template>
 <div id='searchBar'>
    <h3 id='searchMenu'>筛选菜单</h3>
   <form class="form-horizontal">
        <div class="form-group">
            <label for="college" class="col-sm-3 control-label text-left">学&nbsp;&nbsp;&nbsp;&nbsp;院</label>
            <div class="col-sm-9">
            <select name="college" id="coloege" class="form-control" v-model="nowColoege" @change="changeCollege">
                <option value="" disabled selected style='display:none;'>请选择学院</option>
                <option v-for='(item,index) in college' :key='index' :value="item"  >{{item}}</option>                
            </select>
            </div>
        </div>
        <div class="form-group">
            <label for="grade" class="col-sm-3 control-label">年&nbsp;&nbsp;&nbsp;&nbsp;级</label>
            <div class="col-sm-9">
            <select name="grade" id="grade" class='form-control' v-model="grade" >
                <option value="" disabled selected style='display:none;'>请选择年级</option>
                <option value="1">研一</option>
                <option value="2">研二</option>
                <option value="3">研三</option>
            </select>
            </div>
        </div>
         <div class="form-group">
            <label for="discipline" class="col-sm-3 control-label">专&nbsp;&nbsp;&nbsp;&nbsp;业</label>
            <div class="col-sm-9">
            <select name="discipline" id="discipline" class="form-control" v-model="myDiscipline">
                <option value="" disabled selected style='display:none;'>请选择专业</option>
                <option v-for='(item,index) in discipline' :key='index' :value="item"  >{{item}}</option>                
            </select>
            </div>
        </div>
        <div class="form-group">
            <div class='col-sm-4'>
                <input type="checkbox" name='year' value='1' id='t1' v-model="year">&nbsp;&nbsp;<label for="t1">年度一</label>
            </div>
            <div class='col-sm-4'>
                <input type="checkbox" name='year' value='2' id='t2' v-model="year">&nbsp;&nbsp;<label for="t2">年度二</label>
            </div>
            <div class='col-sm-4'>
                <input type="checkbox" name='year' value='3' id='t3' v-model="year">&nbsp;&nbsp;<label for="t3">年度三</label>
            </div>   
        </div>
        <div class="form-group">
            <label for="start" class="col-sm-3 control-label">起始时间</label>
            <div class="col-sm-9">
            <input type="date" class="form-control" id="start" v-model="start" >
            </div>
        </div>
        <div class="form-group">
            <label for="end" class="col-sm-3 control-label">结束时间</label>
            <div class="col-sm-9">
            <input type="date" class="form-control" id="end" placeholder="结束时间" v-model="end">
            
            </div>
        </div>
  </form>
   <button class='btn btn-info' @click='search' >筛&nbsp;&nbsp;&nbsp;选</button>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         formData:{},
         nowColoege:'',
         grade:'',
         college:['理学院','文学院','外国语学院','管理学院','法学院','通信与信息工程学院','计算机工程与科学学院','机电工程与自动化学院','材料科学与工程学院','生命科学学院','上海美术学院','上海电影学院','悉尼工商学院','土木工程系','社会学院','音乐学院','经济学院','微电子研究与开发中心','力学所','图书情报档案系','材料基因组工程研究院','上海研究院','国际教育学院','新闻传播学院','体育学院'],
         discipline:[],
         myDiscipline:'',
         start:'',
         end:'',
         year:[]
     }
   },
   methods:{
     search(){
         this.formData = {
              college:this.nowColoege,//学院
                grade:this.grade,//年级
                discipline:this.myDiscipline,//专业
                year:this.year,
                start:this.start,//起始时间
                end:this.end//结束时间
         }
       this.$store.commit('changeForm',this.formData);
       this.$emit('search');
     },
     changeCollege(){
         switch(this.nowColoege){
             case '理学院':
             this.discipline = ['数学','统计学','物理学','化学']; break;
             case '文学院':
             this.discipline = ['中国语言文学','中国史','世界史','全球学','文物与博物馆','汉语国际教育']; break;
             case '外国语学院':
             this.discipline = ['英语语言文学','日语语言文学','外国语言学及应用语言学','日语笔译','英语笔译']; break;
             case '管理学院':
             this.discipline = ['企业管理','旅游管理','会计学','会计','管理科学与工程']; break;
             case '法学院':
             this.discipline = ['法学','法律（法学）','法律（非法学）']; break;
             case '通信与信息工程学院':
             this.discipline = ['信号与信息处理','通信与信息系统','生物医学工程','电路与系统','电磁场与微波技术','电子与通信工程']; break;
             case '计算机工程与科学学院':
             this.discipline = ['计算机科学与技术','软件工程'];break;
             case '机电工程与自动化学院':
             this.discipline = ['测试计量技术及仪器','电气工程','控制科学与工程','机械电子工程','精密仪器及机械','机械电子工程','机械制造及其自动化','机械设计及理论']; break;
             case '材料科学与工程学院':
             this.discipline = ['高分子化学与物理','微电子学与固体电子学','材料科学与工程','冶金工程','环境科学与工程']; break;
             case '生命科学学院' :
             this.discipline = ['生物学','食品科学'];break;
             case '上海美术学院' :
             this.discipline = ['建筑学','美术学','设计学','美术','艺术设计','艺术学理论'];break;
             case '上海电影学院':
             this.discipline = ['计算机科学与技术','艺术学理论','戏剧与影视学','数字媒体创意工程','电子与通信工程'];break;
             case '悉尼工商学院':
             this.discipline = ['管理科学与工程','企业管理','城市公共设施信息化管理','区域经济学','金融','会计'];break;
             case '土木工程系':
             this.discipline = ['土木工程'];break;
             case '社会学院':
             this.discipline = ['社会学','人口学','人类学','民俗学','社会工作'];break;
             case '力学所':
             this.discipline = ['力学'];break;
             case '微电子研究与开发中心':
             this.discipline = ['微电子学与固体电子学'];break;
             case '音乐学院':
             this.discipline = ['音乐与舞蹈学'];break;
             case '经济学院':
             this.discipline = ['理论经济学','应用经济学','金融','国际商务'];break;
             case '图书情报档案系':
             this.discipline = ['情报学','档案学','图书情报'];break;
             case '材料基因组工程研究院':
             this.discipline = ['材料科学与工程','计算机科学与技术'];break;
             case '上海研究院':
             this.discipline = ['应用经济学','社会学'];
             case '国际教育学院':
             this.discipline = ['汉语国际教育'];break;
             case '新闻传播学院':
             this.discipline = ['新闻传播学','新闻与传播'];break;
             case '体育学院':
             this.discipline = ['体育'];break;

         }
     }
   }
 }
</script>

<style lang='less' scoped>
  #searchBar{
    height: 100vh;
    background-color: #fff;
    width: 500px;
    position: fixed;
    right: 0;
    top: 0;
    bottom:0;
    padding: 0 30px;
    z-index: 9999999;
    #searchMenu{
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-top: 20px;
        color:#00B1DD;
    }
    form{
      padding: 50px 30px;
      .form-group{
          margin-bottom: 35px;
          font-weight: bold;
          font-size: 15px;
      }
    }
    button{
      display: block;
      width: 65%;
      margin: 0 auto;
    }
  }
 
</style>