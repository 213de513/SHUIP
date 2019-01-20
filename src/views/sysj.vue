<template>
  <div class="body">
           <router-view></router-view>
  </div>
</template>

<script>

export default {
  data(){
    return {
    }
  },
  methods:{
  },
  mounted(){
   
  }
}
</script>
<style lang="less" >
  .body{
        position: absolute;
        left: 222px;
        right: 0;
        top: 154px;
        background-color: #f1f4f7;
        min-height: 777px;
        .subTitle{
            width: 200px;
            margin: 40px auto;
            border-bottom: 3px solid #f60;
            text-align: center;
            font-size: 30px;
        }
        .chartsContainer{
            min-height: 400px;
            display: flex;
            justify-content: space-around;
            div{
                width: 40%;
            }
        }
    }
     @media screen and (max-width:1550px){
           .body{
        position: absolute;
        left: 182px;
        right: 0;
        top: 132px;
        background-color: #f1f4f7;
        min-height: 777px;
        .subTitle{
            width: 200px;
            margin: 20px auto;
            border-bottom: 2px solid #f60;
            text-align: center;
            font-size: 24px;
        }
        .chartsContainer{
            min-height: 400px;
            display: flex;
            justify-content: space-around;
            div{
                width: 40%;
            }
        }
    }
     }
</style>