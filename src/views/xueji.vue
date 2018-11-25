<template>
 <div class='body'>   
     <router-view></router-view> 
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   }
 }
</script>

<style lang='less'>
    .body{
        position: absolute;
        left: 272px;
        right: 0;
        top: 152px;
        background-color: #f1f4f7;
        height: 800px;
        .subTitle{
            width: 180px;
            margin: 30px auto;
            border-bottom: 3px solid #f60;
            text-align: center;
            font-size: 30px;
        }
        .chartsContainer{
            height: 400px;
            display: flex;
            justify-content: space-around;
            div{
                width: 40%;
            }
        }
        .XQ{
            margin-top: 50px;
            height: 300px;
            display: flex;
            justify-content: space-around;
            div{
                width: 33%;
                // background-color: #f60;
            }
        }
    }
</style>
