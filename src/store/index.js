import  Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
var echarts = require('echarts');
Vue.use(vuex);
export default new vuex.Store({
    state:{
        form:{
            college:'all',//学院
            grade:'all',//年级
            discipline:'all',//专业
            //year:'',
            start:'',//起始时间
            end:''//结束时间
        },
        showLoading:false,
        chartData:{
            title:'研究生在校状态',
            xAxis:['在读','休学','保留学籍','离校中'],
            series:{
                name:'人数',
                data:[2200,80,50,1500]
            }
        },
        pieData:{
            title:'研究生在校状态',
            legend:['在读','休学','保留学籍','离校中'],
            data:[{name:'在读',value:2000},{name:'休学',value:80},{name:'保留学籍',value:50},{name:'离校中',value:1500}]

        }
    },
    getters:{
        chartData:state => state.chartData 
        ,
        pieData:state=>state.pieData
    },
    mutations:{
        changeForm(state,form){
            /**
             * 根据searchBar 动态更改
             */
            state.form = form;
        },
        pPost(state,form){
             /*
                这是axios响应处理函数
                数据处理函数
            */ 
            //更新bar字段
            state.chartData = form;
            //更新pie字段
            state.pieData.title = form.title;
            state.pieData.legend = form.xAxis;
            var arr= [];
            for(var i=0;i<form.series.data.length;i++){
                var temp = {};
                
                temp.name= form.xAxis[i];
                temp.value = form.series.data[i];
                arr.push(temp);
            }
            state.pieData.data = arr;
        },
        drawBar(state,ele){
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
                         dataView: {readOnly: false},
                         magicType: {type: ['line', 'bar']},
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
                                [
                                    {offset: 0, color: '#3977E6'},
                                    {offset: 1, color: '#37BBF8'}
    
                                ]
                            )
                        }
                    }
                 }]
             };
 
             myChart.setOption(option);
        },
        drawPie(state,ele){
            // 饼状图绘制函数
            var myChart = echarts.init(document.getElementById(ele));
            var pieData = state.pieData;
            var option = {
                 title : {
                     text:pieData.title ,
                     x:'center'
                 },
                 tooltip : {
                     trigger: 'item',
                     formatter: "{a} <br/>{b} : {c} ({d}%)"
                 },
                 legend: {
                     orient: 'vertical',
                     left: 'left',
                     data: pieData.legend
                 },
                 series : [
                     {
                         name: '在校状态',
                         type: 'pie',
                         radius : '55%',
                         center: ['50%', '60%'],
                         data:pieData.data,
                         itemStyle: {
                             emphasis: {
                                 shadowBlur: 10,
                                 shadowOffsetX: 0,
                                 shadowColor: 'rgba(0, 0, 0, 0.5)'
                             },
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 10,
                            shadowOffsetY:10
                            
                         },
                         minAngle : 1
                     }
                 ],
                 color:['#FF3333','#CC3399', '#00FF66', '#00B1DD', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
             };
             myChart.setOption(option);
        }
    },
    actions:{
        ajax({commit,state}){
            state.showLoading = true;
            axios.post('/apis/selStu',state.form).then((res)=>{
                state.showLoading = false;
                commit('pPost',res.data);
                //每次数据改变都需要重新调用api绘制图形
                commit('drawBar','chart1');
                commit('drawPie','chart2');
            })
        }
    }
})
