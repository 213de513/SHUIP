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
        left: 302px;
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
    }
</style>
