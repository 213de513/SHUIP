<template>
 <div>
     <h2 class='subTitle'>学籍状态</h2>
     <div class="chartsContainer">
         <div id="chart1"></div>
         <div id="chart2"></div>
     </div>
 </div>
</template>

<script>
var echarts = require('echarts');
 export default {
   data () {
     return {

     }
   },
   mounted(){
       this.drawBar('chart1');
       this.drawPie('chart2');
   },
   methods:{
       drawBar(ele){
           var myChart = echarts.init(document.getElementById(ele));
            myChart.setOption({
                title: {
                    text: 'ECharts 柱状图'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
       },
        drawPie(ele){
           var myChart = echarts.init(document.getElementById(ele));
            myChart.setOption({
                title: {
                    text: 'ECharts 饼状图'
                },
                tooltip: {},
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                 toolbox: {
                    show: true,
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [ {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问',label:{color:'black'},labelLine:{show:true,lineStyle:{color:'#444'}}},
                {value:310, name:'邮件营销',label:{color:'black'},labelLine:{show:true,lineStyle:{color:'#444'}}},
                {value:274, name:'联盟广告',label:{color:'black'},labelLine:{show:true,lineStyle:{color:'#444'}}},
                {value:235, name:'视频广告',label:{color:'black'},labelLine:{show:true,lineStyle:{color:'#444'}}},
                {value:400, name:'搜索引擎',label:{color:'black'},labelLine:{show:true,lineStyle:{color:'#444'}}}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }]
            });
       },

   }
 }
</script>

<style lang='less'>
    
</style>
