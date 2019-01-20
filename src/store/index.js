import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
var echarts = require('echarts');
Vue.use(vuex);
export default new vuex.Store({
  state: {
    form: {
      college: '学校', //学院
      grade: '', //年级
      discipline: '所有专业', //专业
      start: '', //起始时间
      end: '', //结束时间
      year: '', //年度
      route: '',
      term: [], //学期
    },
    showLoading: false,
    showBar: true,//显示多列柱状图
    showButton:false,//显示下载按钮
    showYj:false,//显示预警
    showXKML:true,//显示学籍数据-类别数据-学科门类
    tableTitle: '',
    showTable:true,//显示出国学院表格
    showSummary:true,//表格显示总计
    height: {
      height: '500px'
    },
    chartData: {
      title: '研究生在校状态',
      xAxis: ['在读', '休学', '保留学籍', '离校中'],
      series: {
        name: '人数',
        data: [2200, 3200, 80, 50, 1500]
      }
    },
    baoshanData: {
      title: '宝山研究生在校状态',
      xAxis: ['在读', '毕业', '休学', '保留学籍', '离校中'],
      series: {
        name: '人数',
        data: [1000, 1200, 40, 25, 700]
      }
    },
    yanchangData: {
      title: '延长研究生在校状态',
      xAxis: ['在读', '毕业', '休学', '保留学籍', '离校中'],
      series: {
        name: '人数',
        data: [500, 800, 20, 10, 300]
      }
    },
    jiadingData: {
      title: '嘉定研究生在校状态',
      xAxis: ['在读', '休学', '保留学籍', '离校中'],
      series: {
        name: '人数',
        data: [700, 1000, 20, 15, 500]
      }
    },
    pieData: {
      title: '研究生在校状态',
      legend: ['在读', '毕业', , '休学', '保留学籍', '离校中'],
      data: [{
        name: '在读',
        value: 2000
      }, {
        name: '毕业',
        value: 3200
      }, {
        name: '休学',
        value: 80
      }, {
        name: '保留学籍',
        value: 50
      }, {
        name: '离校中',
        value: 1500
      }]
    },
    mulityData: {
      title: '全校',
      legend: ['在读', '休学', '保留学籍', '离校中'],
      xAxis: ['一年级', '二年级', '三年级', '超学制'],
      series: [{
          name: '在读',
          data: [320, 332, 301, 334]
        },
        {
          name: '休学',
          data: [220, 182, 191, 234]
        },
        {
          name: '保留学籍',
          data: [150, 232, 201, 154]
        },
        {
          name: '离校中',
          data: [98, 77, 101, 99]
        }
      ]
    },
    searchData: {},
    tableData: [],
    label: [],
    gridData: []
  },
  getters: {
    chartData: state => state.chartData,
    pieData: state => state.pieData
  },
  mutations: {
    changeForm(state, form) {
      /**
       * 根据searchBar 动态更改
       */
      var route = state.form.route
      state.form = form;
      state.form.route = route;

    },
    //切换路由初始化searchBar
    initForm(state, form) {
      state.form.college = form.college;
      state.form.grade = form.grade;
      state.form.discipline = form.discipline;
      state.form.start = form.start;
      state.form.end = form.end;
      state.form.year = form.year;
      state.form.term = form.term
    },
    changeRoute(state, route) {
      state.form.route = route;

    },
    changeGridData(state, data) {
      state.gridData = data;
    },

    changeTableData(state, data) {
      state.tableData = data;
    },
    changeLabel(state, data) {
      state.label = data;
    },
    changeHeight(state, data) {
      state.height.height = data.yAxis.length * 200 + 'px';
    },
    pPost(state, form) {
      /*
          这是axios响应处理函数
          数据处理函数
      */
      //更新bar字段
      if (form.chartData) {
        state.chartData = form.chartData;
        //更新pie字段

        state.pieData.title = form.chartData.title;
        state.pieData.legend = form.chartData.xAxis;
        var arr = [];
        for (var i = 0; i < form.chartData.series.data.length; i++) {
          var temp = {};
          temp.name = form.chartData.xAxis[i];
          temp.value = form.chartData.series.data[i];
          arr.push(temp);
        }
        state.pieData.data = arr;
      }
      if (form.baoshanData) {
        state.baoshanData = form.baoshanData;
      }
      if (form.yanchangData) {
        state.yanchangData = form.yanchangData;
      }
      if (form.jiadingData) {
        state.jiadingData = form.jiadingData;
      }

      //更新mulityBar 字段
      if (form.mulityData) {
        state.mulityData = form.mulityData
      }


    },
    drawBar(state, ele) {
      /**
       * 柱状图绘制函数 
       */
      var myChart = echarts.init(document.getElementById(ele));
      var nowData = state.chartData;
      var option = {
        title: {
          text: nowData.title
        },
        tooltip: {},
        xAxis: {
          data: nowData.xAxis,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {},
        toolbox: {
          show: true,
          feature: {
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          name: nowData.series.name,
          type: 'bar',
          data: nowData.series.data,
          itemStyle: {
            emphasis: {
              barBorderRadius: 10
            },
            normal: {
              barBorderRadius: 10,
              color: new echarts.graphic.LinearGradient(
                0, 1, 0, 0,
                [{
                    offset: 0,
                    color: '#3977E6'
                  },
                  {
                    offset: 1,
                    color: '#37BBF8'
                  }

                ]
              )
            }
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 16
          }
        }]
      };

      myChart.setOption(option);
    },
    drawBar1(state, ele) {
      /**
       * 柱状图绘制函数 
       */
      var myChart = echarts.init(document.getElementById(ele));
      var nowData = state.baoshanData;
      var option = {
        title: {
          text: nowData.title
        },
        tooltip: {},
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 6
          },
          data: nowData.xAxis,
          axisTick: {
            show: false
          }
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          name: nowData.series.name,
          type: 'bar',
          data: nowData.series.data,
          itemStyle: {
            emphasis: {
              barBorderRadius: 10
            },
            normal: {
              barBorderRadius: 10,
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [{
                    offset: 0,
                    color: '#00FF00'
                  },
                  {
                    offset: 1,
                    color: '#00FF99'
                  }

                ]
              )
            }
          },
          label: {
            show: true,
            position: 'right',
            fontSize: 16,
            rotate: 0
          }
        }]
      };

      myChart.setOption(option);
    },
    drawBar2(state, ele) {
      /**
       * 柱状图绘制函数 
       */
      var myChart = echarts.init(document.getElementById(ele));
      var nowData = state.yanchangData;

      var option = {
        title: {
          text: nowData.title
        },
        tooltip: {},
        yAxis: {

          data: nowData.xAxis,
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 6
          },
          axisTick: {
            show: false
          }
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          name: nowData.series.name,
          type: 'bar',
          data: nowData.series.data,
          itemStyle: {
            emphasis: {
              barBorderRadius: 10
            },
            normal: {
              barBorderRadius: 10,
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [{
                    offset: 0,
                    color: '#990000'
                  },
                  {
                    offset: 1,
                    color: '#990099'
                  }

                ]
              )
            }
          },
          label: {
            show: true,
            position: 'right',
            fontSize: 16,
            rotate: 0
          }
        }]
      };

      myChart.setOption(option);
    },
    drawBar3(state, ele) {
      /**
       * 柱状图绘制函数 
       */
      var myChart = echarts.init(document.getElementById(ele));
      var nowData = state.jiadingData;
      var option = {
        title: {
          text: nowData.title
        },
        tooltip: {},
        yAxis: {
          data: nowData.xAxis,
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 6
          },
          axisTick: {
            show: false
          }
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          name: nowData.series.name,
          type: 'bar',
          data: nowData.series.data,
          itemStyle: {
            emphasis: {
              barBorderRadius: 10
            },
            normal: {
              barBorderRadius: 10,
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [{
                    offset: 0,
                    color: '#CCCC66'
                  },
                  {
                    offset: 1,
                    color: '#CCCC00'
                  }

                ]
              )
            }
          },
          label: {
            show: true,
            position: 'right',
            fontSize: 16,
            rotate: 0
          }
        }]
      };

      myChart.setOption(option);
    },
    //多列柱状图
    drawMulityBar(state, ele) {
      var myChart = echarts.init(document.getElementById(ele));
      var nowData = state.mulityData;
      var labelOption = {
        normal: {
          show: true,
          position: 'insideBottom',
          distance: 15,
          align: 'left',
          verticalAlign: 'middle',
          rotate: 90,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      };
      for (var i = 0; i < nowData.series.length; i++) {
        nowData.series[i].type = 'bar';
        nowData.series[i].barGap = 0;
        nowData.series[i].label = labelOption;
      }

      var option = {
        title: {
          text: nowData.title,
          top: 0
        },
        color: ['#409EFF', '#F56C6C', '#67C23A', '#E6A23C'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: nowData.legend,
          right: 0
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisTick: {
            show: false
          },
          data: nowData.xAxis
        }],
        yAxis: [{
          type: 'value'
        }],
        series: nowData.series
      };
      myChart.setOption(option);
    },
     //多列柱状图
     drawMulityBar1(state, ele) {
      var myChart = echarts.init(document.getElementById(ele.el));
      var nowData = ele.data;
      var labelOption = {
        normal: {
          show: true,
          position: 'top',
          distance: 15,
          align: 'center',
          verticalAlign: 'middle',
          // rotate: 90,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      };
      var itemStyle = {
        emphasis: {
          barBorderRadius: 10
        },
        normal: {
          barBorderRadius: 10
        }
      }
      for (var i = 0; i < nowData.series.length; i++) {
        nowData.series[i].type = 'bar';
        nowData.series[i].barGap = 0;
        nowData.series[i].label = labelOption;
        nowData.series[i].itemStyle = itemStyle;
      }

      var option = {
        title: {
          text: nowData.title,
          top: 0
        },
        color: ['#409EFF', '#F56C6C', '#67C23A', '#E6A23C'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: nowData.legend,
          right: 0
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisTick: {
            show: false
          },
          data: nowData.xAxis
        }],
        yAxis: [{
          type: 'value'
        }],
        series: nowData.series
      };
      myChart.setOption(option);
    },
    //多列躺柱状图
    drawTMulityBar(state, ele) {
      var myChart = echarts.init(document.getElementById(ele.el));
      var nowData = ele.data;
      var labelOp = {
        show: true,
        position: 'right',
        formatter: ' {a} {c}',
      }
      for(var i=0;i<nowData.series[1].data.length-1;i++){
        for(var j=0;j<nowData.series[1].data.length-i-1;j++){
          if(nowData.series[1].data[j]>nowData.series[1].data[j+1]){
            for(var x=0;x< nowData.series.length;x++){
              [nowData.series[x].data[j],nowData.series[x].data[j+1]] = [nowData.series[x].data[j+1],nowData.series[x].data[j]];
            }
            [nowData.yAxis[j],nowData.yAxis[j+1]] =  [nowData.yAxis[j+1],nowData.yAxis[j]] ;
          }
        }
      } 
      var arr = [];
      for (var i = 0; i < nowData.series.length; i++) {
        var temp = {};
        temp.name = nowData.series[i].name;
        temp.type = 'bar';
        temp.label = labelOp;
        temp.data = nowData.series[i].data;
        arr.push(temp);
      }
      var option = {
        title: {
          text: nowData.title,
          subtext: '点击查看列表'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: nowData.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: nowData.yAxis
        },
        series: arr,
        color: ['#409EFF', '#F56C6C', '#67C23A', '#E6A23C']

      };
      myChart.setOption(option);
    },
    drawTMulityBar1(state, ele) {
      var myChart = echarts.init(document.getElementById(ele.el));
      var nowData = ele.data;
      var labelOp = {
        show: true,
        position: 'right',
        formatter: '{c}人',
        fontSize:14
      }
      var obj = []
      for(var i=0;i<nowData.series[0].data.length; i++){
        var temp = {};
        temp.college = nowData.yAxis[i];
        temp.num = nowData.series[0].data[i];
        obj.push(temp);
      }
      var tempData = obj.sort((a,b)=>{
        return b.num-a.num;
      })
      var seriesData = [];
      var yAxisData = [];
      for(var i=0;i<tempData.length;i++){
        seriesData.push(tempData[i].num);
        yAxisData.push(tempData[i].college);
      }
      var arr = [];
      for (var i = 0; i < nowData.series.length; i++) {
        var temp = {};
        temp.name = nowData.series[i].name;
        temp.type = 'bar';
        temp.label = labelOp;
        temp.data = seriesData.reverse();
        arr.push(temp);
      }
      var option = {
        title: {
          text: nowData.title,
          subtext: '点击查看列表'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: nowData.legend,
          right:'right'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: yAxisData.reverse()
        },
        series: arr,
        color: ['#409EFF', '#F56C6C', '#67C23A', '#E6A23C']

      };
      myChart.setOption(option);
    },
    drawTMulityBar2(state, ele) {
      var myChart = echarts.init(document.getElementById(ele.el));
      var nowData = ele.data;
      var labelOp = {
        show: true,
        position: 'right',
        formatter: '{c} 人',
        fontSize:14
      }
      var obj = []
      for(var i=0;i<nowData.series[0].data.length; i++){
        var temp = {};
        temp.college = nowData.yAxis[i];
        temp.num = nowData.series[0].data[i];
        obj.push(temp);
      }
      var tempData = obj.sort((a,b)=>{
        return b.num-a.num;
      })
      var seriesData = [];
      var yAxisData = [];
      for(var i=0;i<tempData.length;i++){
        seriesData.push(tempData[i].num);
        yAxisData.push(tempData[i].college);
      }
      var arr = [];
      for (var i = 0; i < nowData.series.length; i++) {
        var temp = {};
        temp.name = nowData.series[i].name;
        temp.type = 'bar';
        temp.label = labelOp;
        temp.data = seriesData.reverse();
        arr.push(temp);
      }
      var option = {
        title: {
          text: nowData.title,
          subtext: '点击查看列表'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: nowData.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: yAxisData.reverse()
        },
        series: arr,
        color: ['#409EFF', '#F56C6C', '#67C23A', '#E6A23C']

      };
      var autoHeight = state.height.height;
      myChart.setOption(option);
      //重新调整大小
      myChart.getDom().style.height = autoHeight + "px";
      myChart.getDom().childNodes[0].style.height = autoHeight + "px";
      myChart.getDom().childNodes[0].childNodes[0].setAttribute("height",autoHeight);
      myChart.getDom().childNodes[0].childNodes[0].style.height = autoHeight + "px";
      myChart.resize(); 
    },
    drawPie(state, ele) {
      // 饼状图绘制函数
      var myChart = echarts.init(document.getElementById(ele));
      var pieData = state.pieData;
      var option = {
        title: {
          text: pieData.title,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: pieData.legend
        },
        series: [{
          name: '在校状态',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: pieData.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            shadowOffsetY: 10

          },
          label: {
            formatter: '{b} : {c} ({d}%)'
          },
          minAngle: 5
        }],
        color: ['#FF3333', '#CC3399', '#E6A23C', '#00B1DD', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
      };
      myChart.setOption(option);
    },
    //画饼状图
    drawPie1(state, ele) {
      var myChart = echarts.init(document.getElementById(ele.el));
      var pieData = ele.data;
      //改造数据
      var arr = [];
      for (var i = 0; i < ele.data.series.data.length; i++) {
        var temp = {};
        temp.name = ele.data.xAxis[i];
        temp.value = ele.data.series.data[i];
        arr.push(temp);
      }
      var option = {
        title: {
          text: pieData.title,
          subtext: '数据来自上海大学研究生院',
          left: 'center',
          top: 80,
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // show:false,
          // orient: 'vertical',
          bottom: 0,
          data: pieData.xAxis
        },
        series: [{
          name: pieData.series.name,
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: arr,
          itemStyle: {
            emphasis: {
              shadowBlur: 5,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.4)'
            },
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 5,
            shadowOffsetY: 2

          },
          label: {
            formatter: '{b}:{c}({d}%)',
            labelLine: {
              length: 1,
              length2: 1
            }
          },
          minAngle: 5
        }],
        color: ['#FF3333', '#67C23A', '#E6A23C', '#00B1DD', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#c4ccd3','#F56C6C','#87CEFA','#D15FEE']
      };
      myChart.setOption(option);
    },
    //画中国地图
    drawMap(state, ele) {
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById(ele.el));
      var mapData = ele.data;
      var mydata = mapData.result;
      //过滤器
      for (var i = 0; i < mydata.length; i++) {
        if (mydata[i].name.indexOf('省') > 0) {
          mydata[i].name = mydata[i].name.slice(0, mydata[i].name.indexOf('省'));
        } else if (mydata[i].name.indexOf('市') > 0) {
          mydata[i].name = mydata[i].name.slice(0, mydata[i].name.indexOf('市'));
        }
      }
      //分布
      var max = 0;
      for (var i = 0; i < mapData.result.length; i++) {
        if (mapData.result[i].value > max) {
          max = mapData.result[i].value;
        }
      }
      var level = Math.ceil(max / 6);
      var arr = [];
      for (var i = 0; i < 6; i++) {
        var obj = {};
        obj.start = i * level;
        obj.end = (i + 1) * level;
        if (i == 0) {
          obj.start++;
        }
        arr.push(obj);
      }
      var optionMap = {
        title: {
          text: mapData.title,
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item'
        },

        //左侧小导航图标
        visualMap: {
          show: true,
          x: 'left',
          y: 'center',
          splitList: arr,
          color: ['#F56C6C', '#E6A23C', '#409EFF', '#67C23A', '#9feaa5', '#DCDFE6']
        },

        //配置属性
        series: [{
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: 'move',
          layoutCenter: ['50%', '35%'],
          // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
          layoutSize: 800,
          label: {
            normal: {
              show: true //省份名称  
            },
            emphasis: {
              show: false
            }
          },
          data: mydata //数据
        }]
      };


      //使用制定的配置项和数据显示图表
      myChart.setOption(optionMap);
    },
    //画折线图
    drawLine(state, ele) {
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById(ele.el));
      var mapData = ele.data;
      //处理数据
      for (var i = 0; i < mapData.data.length; i++) {
        var obj = {};
        mapData.data[i].type = 'line';
        mapData.data[i].label = {
          show: true
        }
      }
      var option = {
        title: {
          text: mapData.title,
          subtext: '数据来自上海大学研究生院',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: mapData.legend,
          right: 'right',
          orient: 'horizontal',
          textStyle: {
            fontSize: 14
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: mapData.xAxis
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 50
          },
          axisTick: {
            show: false
          }
        },
        series: mapData.data
      };
      myChart.setOption(option);
    },
    //画嵌套饼图
    drawMulityPie(state, ele) {
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById(ele.el));
      var mapData = ele.data;
      var option = {
        title: {
          text: mapData.title,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: mapData.legend
        },
        color: ['#2f4554', '#61a0a8', '#DE9325', '#91c7ae', '#749f83', '#DE9325', '#73A373', '#c4ccd3', '#333333', '#E69D87', '#c23531'],
        series: [{
            name: '政治面貌',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              normal: {
                // show:false,
                position: 'inner',
                rotate: 90,
                fontSize: 12
              }
            },
            // minAngle: 3,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: mapData.innerData
          },
          {
            name: '政治面貌',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{b} : {c} ({d}%)'
            },
            // minAngle: 3,
            data: mapData.outerData
          }
        ]
      };
      myChart.setOption(option);
    },
    //画柱状图
    drawBar4(state, ele) {
      /**
       * 柱状图绘制函数 
       */
      var myChart = echarts.init(document.getElementById(ele.el));
      var nowData = ele.data;
      var option = {
        title: {
          text: nowData.title
        },
        tooltip: {},
        xAxis: {
          data: nowData.xAxis,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {},
        toolbox: {
          show: true,
          feature: {
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          name: nowData.series.name,
          type: 'bar',
          data: nowData.series.data,
          itemStyle: {
            emphasis: {
              barBorderRadius: 10
            },
            normal: {
              barBorderRadius: 10,
              color: new echarts.graphic.LinearGradient(
                0, 1, 0, 0,
                [{
                    offset: 0,
                    color: '#3977E6'
                  },
                  {
                    offset: 1,
                    color: '#37BBF8'
                  }

                ]
              )
            }
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 16
          }
        }]
      };

      myChart.setOption(option);
    }

  },
  actions: {
    ajax({
      commit,
      state
    }) {
      state.showLoading = true;
      var router = state.form.route.slice(0, 5);
      var url = '/apis' + router + '/search'; 
      axios.post(url, state.form).then((res) => {
        var result = res.data;
        if (result.code == 2000) {
          var res = result;
          state.showLoading = false;
          commit('pPost', res.data);
          //每次数据改变都需要重新调用api绘制图形
          var route = state.form.route;
          switch (route) {
            case '/xjsj':
              commit('drawMulityBar', 'chart1');
              commit('drawBar1', 'chart3');
              commit('drawBar2', 'chart4');
              commit('drawBar3', 'chart5');
              commit('drawPie', 'chart2');
              break;
            case '/xjsj/chaoxuezhi':
              commit('drawBar', 'chart1');
              res.data.tableData.forEach(item => {
                if (item.discipline == null) {
                  item.discipline = '所有专业';
                }
              })
              commit('changeTableData', res.data.tableData);
              break;
            case '/xjsj/yidong':
              commit("drawPie1", {
                  el: "chart1",
                  data: res.data.chartData
                });
              break;
            case '/xjsj/leibie':
              var college = state.form.college
              if(college=='学校'){
                state.showXKML=true;
              }else{
                state.showXKML=false;
              }
              commit('drawMulityBar', 'chart1');
              commit('drawPie1', {
                el: 'chart2',
                data: res.data.chartData
              });
              commit('drawPie1', {
                el: 'chart3',
                data: res.data.pieData1
              });
              commit('drawPie1', {
                el: 'chart4',
                data: res.data.pieData2
              });
              break;
            case '/xjsj/xiaoqufenbu':
              commit('drawBar', 'chart1');
              commit('drawBar1', 'chart3');
              commit('drawBar2', 'chart4');
              commit('drawBar3', 'chart5');
              commit('drawPie', 'chart2');
              break;
            case '/sysj':
              commit("drawPie1", {
                el: "chart2",
                data: res.data.pieData
              });
              break;
            case '/sysj/sssydq':
              var arr = res.data.result.sort((a, b) => {
                return parseInt(b.value) - parseInt(a.value);
              })
              commit('changeGridData', arr);
              state.tableTitle = res.data.title;
              commit('drawMap', {
                el: 'main',
                data: res.data
              });
              break;
            case '/sysj/zzmm':
              commit('drawMulityPie', {
                el: 'chart1',
                data: res.data
              });
              break;
            case '/sysj/mzqk':
              var temp = {}
              for (var i = 0; i < res.data.ssData.length; i++) {
                if (res.data.ssData[i].民族 == '汉族') {
                  temp = res.data.ssData.splice(i, 1)[0];
                  break;
                }
              }
              res.data.ssData.unshift(temp);
              commit('changeLabel', res.data.label);
              commit('changeTableData', res.data.ssData);
              break;
            case '/xlsj':
            case '/xlsj/zssj':
            case '/xlsj/xssj':
            case '/xlsj/bssj':
              commit('drawPie1', {
                el: 'chart1',
                data: res.data.pieData
              });
              commit('changeTableData', res.data.tableData);
              break;
            case '/kcsj':
              var college = state.form.college
              if (college != '学校') {
                state.showBar = false
              } else {
                state.showBar = true;
                var arr = [];
                for (var i = 0; i < res.data.mulityData.yAxis.length; i++) {
                  var temp = {};
                  temp.college = res.data.mulityData.yAxis[i];
                  temp.c1 = res.data.mulityData.series[0].data[i];
                  temp.c2 = res.data.mulityData.series[1].data[i];
                  temp.c3 = res.data.mulityData.series[2].data[i];
                  temp.c4 = res.data.mulityData.series[3].data[i];
                  arr.push(temp);
                }
                commit('changeGridData', arr);
                state.tableTitle = res.data.mulityData.title;
                setTimeout(() => {
                  commit("drawTMulityBar", {
                    el: "chart2",
                    data: res.data.mulityData
                  });
                }, 20);
              }
              commit("drawBar4", {
                el: "chart1",
                data: res.data.chartData
              });
              break;
            case '/kcsj/pyfa':
              commit("drawPie1", {
                el: "chart1",
                data: res.data.pieData
              });
              break;
            case '/kcsj/xqkk':
              var college = state.form.college
              if (college != '学校') {
                state.showBar = false
              } else {
                state.showBar = true;
                var arr = [];
                for (var i = 0; i < res.data.mulityData.yAxis.length; i++) {
                  var temp = {};
                  temp.college = res.data.mulityData.yAxis[i];
                  temp.c1 = res.data.mulityData.series[0].data[i]+'('+res.data.mulityData.percent[0].data[i]+')';
                  temp.c2 = res.data.mulityData.series[1].data[i]+'('+res.data.mulityData.percent[1].data[i]+')';
                  arr.push(temp);
                }
                commit('changeGridData', arr);
                state.tableTitle = res.data.mulityData.title;
                setTimeout(() => {
                  commit("drawTMulityBar", {
                    el: "chart2",
                    data: res.data.mulityData
                  });
                }, 20);
              }
              commit("drawPie1", {
                el: "chart1",
                data: res.data.kkmc
              });
              commit("drawPie1", {
                el: "chart3",
                data: res.data.kkms
              });
              break;
              case '/kcsj/kxyxk':
              var college = state.form.college
              //不是学校就显示表格
                var arr = [];
                for (var i = 0; i < res.data.mulityData.yAxis.length; i++) {
                  var temp = {};
                  temp.college = res.data.mulityData.yAxis[i];
                  if(res.data.mulityData.percent){
                    temp.c1 = res.data.mulityData.series[0].data[i]+'('+res.data.mulityData.percent[0].data[i]+')';
                }else{
                  temp.c1 = res.data.mulityData.series[0].data[i];
                }
                  arr.push(temp);
                }
                commit('changeGridData', arr);
              if (college != '学校') {
                state.showBar = false;
              } else {
                state.showBar = true;
                if(res.data.mulityData.yAxis.length==1){
                  state.height.height = res.data.mulityData.yAxis.length * 150 + "px";
                }else{
                  state.height.height = res.data.mulityData.yAxis.length * 100 + "px";
                } 
                setTimeout(() => {
                  commit("drawTMulityBar2", {
                    el: "chart2",
                    data: res.data.mulityData
                  });
                }, 20);
              }
              commit("drawPie1", {
                el: "chart1",
                data: res.data.pieData
              });
              break;
              case '/kcsj/tksj':
              var college = state.form.college
              if(college =='学校'){
                state.showSummary = true;
              }else{
                state.showSummary = false;
              }
                commit('changeTableData',res.data.tableData);break;
              case '/cjsj':
                commit('drawPie1',{el:'chart1',data:res.data.pieData});    
                commit('drawBar4',{el:'chart2',data:res.data.chartData}); 
                commit('changeGridData',res.data.chartData.percent);break;
              case '/cjsj/xfzt':
                var college = state.form.college
                if(college!='学校'){
                  state.showButton = true;
                }else{
                  state.showButton = false;
                }
                commit('drawPie1',{el:'chart1',data:res.data.pieData});    
                commit('drawMulityBar1',{el:'chart2',data:res.data.mulityData});break;
              case '/cjsj/cjyj':
                var college = state.form.college;
                var arr = [];
                var totle = 0;
                for(var i=0;i<res.data.mulityData.yAxis.length;i++){
                    var temp = {};
                    temp.college = res.data.mulityData.yAxis[i];
                    temp.num = res.data.mulityData.series[0].data[i];
                    arr.push(temp);
                    totle+=temp.num;
                }
                arr.unshift({college:'总计',num:totle})
                console.log(arr);
                commit('changeGridData',arr);
                state.tableTitle = res.data.mulityData.title; 
                if (college != '学校') {
                  state.showYj = true;
                  commit('changeTableData',res.data.tableData.sort((a,b)=>{
                    return parseInt(a.xh)-parseInt(b.xh)
                  }))
                  setTimeout(() => {
                    commit("drawTMulityBar1", {
                      el: "chart2",
                      data: res.data.mulityData
                    });
                  }, 20);
                } else {
                  state.showYj = false;
                }break;
            case '/cgsj':
            var college = state.form.college
            //不是学校就显示表格
            if (res.data.mulityData) {
              var arr = [];
              for (var i = 0; i < res.data.mulityData.yAxis.length; i++) {
                var temp = {};
                temp.college = res.data.mulityData.yAxis[i];
                if (res.data.mulityData.percent) {
                  temp.c1 =
                    res.data.mulityData.series[0].data[i] +
                    "(" +
                    res.data.mulityData.percent[0].data[i] +
                    ")";
                } else {
                  temp.c1 = res.data.mulityData.series[0].data[i];
                }
                arr.push(temp);
              }
              var tableData = arr.sort((a,b)=>{
                return parseInt(b.c1)-parseInt(a.c1);
              })
            }
         
            commit('changeGridData',tableData);
            if (college != '学校') {
              state.showBar = false;
            } else {
              state.showBar = true;
              if(res.data.mulityData.yAxis.length==1){
                state.height.height = res.data.mulityData.yAxis.length * 150+'px';
              }else{
                state.height.height = res.data.mulityData.yAxis.length * 100+'px';
              }
              
              Vue.nextTick(() => {
                commit("drawTMulityBar2", {
                  el: "chart2",
                  data: res.data.mulityData
                });
              });
            }
            commit("drawPie1", {
              el: "chart1",
              data: res.data.pieData
            });
            break;
            case '/cgsj/xnzz':
            var college = state.form.college
            commit('drawBar4',{el:'chart1',data:res.data.chartData}); 
            if(res.data.tableData){
              var tableData = res.data.tableData.sort((a,b)=>{
                return b.num-a.num;
              })
              commit('changeTableData',tableData);
            }
            if(college=='学校'){
                state.showTable = true;
            } else{
                state.showTable = false;
            } break;
            case '/cgsj/gpcg':
            var college = state.form.college
            commit('drawBar4',{el:'chart1',data:res.data.chartData}); 
            if(res.data.tableData){
              var tableData = res.data.tableData.sort((a,b)=>{
                return b.num-a.num;
              })
              commit('changeTableData',tableData);
            }
           
            if(college=='学校'){
                state.showTable = true;
            } else{
                state.showTable = false;
            } break;

          }
        }
      }).catch((error) => {
        state.showLoading = false;
        console.log(error);
        alert('查询错误,请重试');
      })
    }
  }
})
