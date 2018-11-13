<template>
 <div id='header'>
     <img src="../assets/images/微信截图_20180301203516.png" alt="logo" id='logo'>
     <h1 id='title'>上海大学研究生信息可视化平台</h1>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style lang='less'>
    #header{
        padding:5px 70px;
        height: 100px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        z-index: 999;
        #logo{
            float: left;
            width: 68px;
            height: 80px;
        }
        #title{
            font-size: 36px;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }
    }
 
</style>
