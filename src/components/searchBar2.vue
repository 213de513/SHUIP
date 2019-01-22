<template>
  <div id="search2">
    <form class="form-inline">
      <!-- 学院 -->
      <div class="form-group">
        <label for="college">学院</label>
        <select
          name="college"
          id="college"
          :disabled="college_dis"
          class="form-control"
          @change="switch2"
          v-model="nowColoege"
        >
          <option value="学校" selected>全校</option>
          <option v-for="(item,index) in college" :key="index" :value="item">{{item}}</option>
        </select>
      </div>
      <!-- 专业 -->
      <div class="form-group" v-show="showDiscipline">
        <label for="discipline">专业</label>
        <select
          name="discipline"
          id="discipline"
          class="form-control"
          v-model="myDiscipline"
          @change="switch1 "
        >
          <option value="所有专业" selected>所有专业</option>
          <option v-for="item in discipline" :key="item" :value="item">{{item}}</option>
        </select>
      </div>
      <!-- 年级 2018 2017 2016 超学制  -->
      <div class="form-group" v-show="showGrade">
        <label for="grade">年级</label>
        <select name="grade" id="grade" class="form-control" v-model="nowGrade" @change="getRq">
          <option value selected>全年级</option>
          <option v-for="item in grade" :key="item" :value="item">{{item}}</option>
        </select>
      </div>
      <!-- 起始/结束时间 -->
      <div class="form-group" v-show="showYear">
        <label for="start">起始时间</label>
        <el-date-picker
          v-model="start"
          id="start"
          type="date"
          placeholder="选择日期"
          size="small"
          :picker-options="pickerOptionsStart"
          @change="changeEnd"
          format="yyyy年MM月dd日"
          value-format="yyyyMMdd"
        ></el-date-picker>
      </div>
      <div class="form-group" v-show="showYear">
        <label for="end">结束时间</label>
        <el-date-picker
          v-model="end"
          id="end"
          type="date"
          placeholder="选择日期"
          size="small"
          :picker-options="pickerOptionsEnd"
          @change="changeStart"
          format="yyyy年MM月dd日"
          value-format="yyyyMMdd"
        ></el-date-picker>
      </div>
      <!-- 单个年度 -->
      <div class="form-group" v-show="showND">
        <label for="nd">年度</label>
        <el-select v-model="year_sel" placeholder="请选择年度" id="nd" size="small" clearable>
          <el-option v-for="item in yearData" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <!-- 区间年度（2016-2017） -->
      <div class="form-group" v-show="showTerm">
        <label for="kcnd">年度</label>
        <el-select v-model="kcnd_sel" placeholder="请选择年度" id="kcnd" size="small">
          <el-option v-for="item in kcYearData" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <!-- 学期（春、秋、冬）-->
      <div class="form-group" v-show="showTerm">
        <label for="term">学期</label>
        <el-select v-model="term_sel"  placeholder="请选择学期" multiple id="term" size="small" style='width:220px'>
          <el-option v-for="item in termData" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <input type="button" class="btn btn-info search" value="查询" @click="search">
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      formData: {},
      nowColoege: "学校", //所选学院
      grade: [], //可选年级
      nowGrade: "", //所选年级
      college: [
        "理学院",
        "文学院",
        "外国语学院",
        "法学院",
        "通信与信息工程学院",
        "计算机工程与科学学院",
        "机电工程与自动化学院",
        "材料科学与工程学院",
        "环境与化学工程学院",
        "生命科学学院","上海美术学院",
        "上海电影学院",
        "悉尼工商学院",
        "社会科学学部",
        "土木工程系",
        "体育学院",
        "国际教育学院",
        "艺术研究院",
        "数码艺术学院",
        "管理学院",
        "图书情报档案系",
        "经济学院",
        "公共管理系",
        "社会学院",
        "新闻传播学院",
        "音乐学院",
        "快速制造中心",
        "BA中心",
        "微电子中心",
        "电子生物中心",
        "力学所",
        "纳米科学与技术中心",
        "系统生物技术研究所",
        "中国艺术研究院上海分院",
        "材料基因组工程研究院",
        "上海研究院",
        "其他",
        "钱伟长学院",
        "公共学院"
      ],
      discipline: [], //可选专业
      myDiscipline: "所有专业", //所选专业
      start: "", //开始时间
      end: "", //结束事件
      pickerOptionsEnd: {}, //结束时间控制条件
      pickerOptionsStart: {}, //起始时间控制条件
      year_sel: "", //已选单个年度
      yearData: [], //可选单个年度
      kcnd_sel: "", //已选区间年度
      kcYearData: [], //可选区间年度
      term_sel: [], //已选学期
      termData: ["春", "夏", "秋", "冬"],
      start1:'',
      end1:''
    };
  },
  methods: {
    ...mapMutations(["initForm"]),
    //获取专业
    getDiscipline() {
      var xymc = this.nowColoege;
      if (xymc == "学校") {
        this.myDiscipline = "所有专业";
        this.discipline = [];
      } else {
        var url = "/apis" + this.baseRoute + "/zymc";
        this.$http
          .get(url, { params: { xymc: xymc,route:this.route } })
          .then(res => {
            var res = res.data;
            if (res.code == 2000) {
              this.discipline = res.data.discipline;
            } else {
              alert("获取专业失败");
            }
          })
          .catch(err => {
            alert("获取专业失败");
          });
      }
    },
    //获取年级
    getGrade() {
      var xymc = this.nowColoege;
      var zymc = this.myDiscipline;
      if(xymc=='学校'&&this.route!='/kcsj/kxyxk'){
        this.nowGrade = '';
        this.grade = [];
      }else{
         var url = "/apis" + this.baseRoute + "/nj";
      this.$http
        .get(url, {
          params: { zymc: zymc,xymc:xymc }
        })
        .then(res => {
          var res = res.data;
          if(res.code==2000){
             this.grade = res.data.grade.sort((a,b)=>{
               return b-a;
             });
          }else{
            alert('年级查询失败')
          }
        }).catch(err=>{
          console.log(err);
          alert('年级查询失败');
        });
      }
     
    },
    //获取单个年度
    getNd() {
      var xymc = this.nowColoege;
      var zymc = this.myDiscipline;
      var url = "/apis" + this.baseRoute + "/nd";
      this.$http
        .get(url, { params: { xymc: xymc, zymc: zymc,route:this.route } })
        .then(res => {
          var res = res.data;
          if (res.code == 2000) {
            this.year_sel = res.data[0];
            this.yearData = res.data;
          } else {
            alert("获取年度失败");
          }
        })
        .catch(err => {
          alert("获取年度失败");
        });
    },
    //获取区间年度+学期
    getTerm() {
      var xymc = this.nowColoege;
      var url = "/apis" + this.baseRoute + "/term";
      this.$http
        .get(url, { params: { xymc: xymc } })
        .then(res => {
          var res = res.data;
          if (res.code == 2000) {
            this.kcnd_sel = res.data[0];
            this.kcYearData = res.data;
            this.term_sel =  ["春", "夏", "秋", "冬"];
          } else {
            alert("获取学期失败");
          }
        })
        .catch(err => {
          alert("获取学期失败");
        });
    },
    //查询结果
    search() {
      this.formData = {
        college: this.nowColoege, //学院
        grade: this.nowGrade, //年级
        discipline: this.myDiscipline, //专业
        start: this.start, //起始时间
        end: this.end, //结束时间
        year: this.year_sel,
        term: this.fomateTerm
      };
      this.$store.commit("changeForm", this.formData); //更改store里form表单数据
      this.$emit("search"); //向父组件提交search事件
    },
    //需要联动学院的
    switch2(){
      if(this.baseRoute == "/sysj"||this.route=='/xjsj'||this.route=='/xjsj/chaoxuezhi'||this.route=='/xjsj/xiaoqufenbu'||this.baseRoute=='/xlsj'){
        this.getDiscipline();
        this.getRq();
      }else if(this.route=='/xjsj/yidong'||this.route=='/kcsj'||this.route=='/kcsj/pyfa'||this.baseRoute=='/cgsj'){
        this.getNd();
      }else if(this.route=='/cjsj/xfzt'||this.route=='/kcsj/kxyxk'){
        this.getGrade();
      }else if(this.route == '/kcsj/xqkk'||this.route == '/kcsj/tksj'){
        this.getTerm();
      }
    },
    //需要联动专业的
    switch1() {
      if (this.baseRoute == "/sysj") {
        this.getNd();
      }else if(this.route=='/xjsj/xiaoqufenbu'||this.baseRoute=='/xlsj'){
        this.getGrade()
      }
    },
    getRq() {
      if(this.baseRoute=='/xlsj'){
      var xymc = this.nowColoege;
      var zymc = this.myDiscipline;
      var nj = this.nowGrade;
      var url = "/apis" + this.baseRoute + "/byrq";
      this.$http
        .get(url, { params: { xymc: xymc,zymc:zymc,nj:nj,route:this.route } })
        .then(res => {
          var res = res.data;
          if (res.code == 2000) {
           var start = this.formateTime(res.data.start);
           var end = this.formateTime(res.data.end);
           this.start1 = start;
           this.end1 = end;
           this.start = '';
           this.end = '';
           this.pickerOptionsStart = {
             disabledDate(time){
               return time.getTime()<new Date(start)||time.getTime()>new Date(end);
             }
           }
           this.pickerOptionsEnd = {
             disabledDate(time){
               return time.getTime()<new Date(start)||time.getTime()>new Date(end);
             }
           }
          } else {
            alert("获取日期失败");
          }
        })
        .catch(err => {
          alert("获取日期失败");
        });
      }
    },
    changeEnd(){
       var start = this.formateTime(this.start);
       var end = this.end1;
         this.pickerOptionsEnd = {
             disabledDate(time){
               return time.getTime()<new Date(start)||time.getTime()>new Date(end);
             }
           }
    },
    changeStart(){
       var end = this.formateTime(this.end);
       var start = this.start1;
        this.pickerOptionsStart = {
             disabledDate(time){
               return time.getTime()>new Date(end)||time.getTime()<new Date(start);
             }
           }
    },
    formateTime(time){
      if(time.trim().length==8){
        return time.slice(0,4)+'/'+time.slice(4,6)+'/'+time.slice(6);
      }else if(time.trim().length==6){
         return time.slice(0,4)+'/'+time.slice(4)+'/01';
      }else if(time.trim().length==4){
         return time+'/01/01';
      }
    }
  },
  mounted() {
    //初始化一下专业
    this.switch2();
    this.switch1();
    var college = window.localStorage.getItem("college");
    this.nowColoege = college;
  },
  computed: {
    college_dis() {
      var college = window.localStorage.getItem("college");
      return college == "学校" ? false : true;
    },
    role() {
      var college = window.localStorage.getItem("college");
      return college;
    },
    showDiscipline() {
      if (
        this.baseRoute == "/sysj" ||
        this.baseRoute == "/xlsj" ||
        this.route == "/xjsj" ||
        this.route == "/xjsj/chaoxuezhi" ||
        this.route == "/xjsj/xiaoqufenbu"
      ) {
        return true;
      } else {
        return false;
      }
    },
    showGrade() {
      if (
        this.route == "/xjsj/xiaoqufenbu" ||
        this.route == "/cjsj/xfzt" ||
        this.route == "/kcsj/kxyxk" ||
        this.baseRoute == "/xlsj"
      ) {
        return true;
      } else {
        return false;
      }
    },
    showYear() {
      if (this.baseRoute == "/xlsj") {
        return true;
      } else {
        return false;
      }
    },
    showND() {
      if (
        this.route == "/sysj" ||
        this.route == "/sysj/sssydq" ||
        this.route == "/sysj/zzmm" ||
        this.route == "/xjsj/yidong" ||
        this.route == "/kcsj" ||
        this.route == "/kcsj/pyfa" ||
        this.baseRoute == "/cgsj"
      ) {
        return true;
      } else {
        return false;
      }
    },
    showTerm() {
      if (this.route == "/kcsj/xqkk"||this.route == "/kcsj/tksj") {
        return true;
      } else {
        return false;
      }
    },
    route() {
      return this.$route.path.slice(8);
    },
    baseRoute() {
      return this.route.slice(0, 5);
    },
    fomateTerm(){
      var arr = [];
      for(var i=0;i<this.term_sel.length;i++){
        arr.push(this.kcnd_sel+'学年'+this.term_sel[i]+'季学期');
      }
      return arr;
    }
  },
  watch: {
    $route(to, from) {
      this.nowColoege = this.role;
      this.nowGrade = "";
      this.myDiscipline = "所有专业";
      this.start = ""; //开始时间
      this.end = ""; //结束事件
      this.year_sel = ""; //已选单个年度
      this.kcnd_sel = ""; //已选区间年度
      this.term_sel = []; //已选学期
      this.termData = ["春", "夏", "秋", "冬"];
      this.formData = {
        college: "学校", //学院
        grade: "", //年级
        discipline: "所有专业", //专业
        start: "", //起始时间
        end: "", //结束时间
        year: "",
        term: []
      };
      this.initForm(this.formData);
      //初始化一下专业
      this.switch2();
      this.switch1();
    }
  }
};
</script>
<style lang="less" scoped>
#search2 {
  height: 50px;
  background-color: #f1f4f7;
  position: fixed;
  z-index: 99;
  top: 120px;
  left: 222px;
  right: 0;
  padding: 7px 20px;
  border-bottom: 1px solid #ddd;
  form {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
@media screen and (max-width: 1550px) {
  #search2 {
    top: 81px;
    left: 182px;
    right: 0;
    padding: 7px 10px;
    #college,
    #discipline,
    #grade {
      font-size: 12px;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 6px;
    }
    #term{
      max-width: 200px;
    }
  }
}
</style>