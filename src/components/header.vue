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

   },
   mounted(){
       console.log(document.documentElement.clientWidth);
   }
 }
</script>

<style lang='less'>
    #header{
        padding:5px 70px;
        height: 80px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        z-index: 99;
        #logo{
            float: left;
            width: 60px;
            height: 70px;
        }
        #title{
            font-size: 36px;
            height: 80px;
            line-height: 80px;
            text-align: center;
        }
    }
    @media screen and (max-width:1550px) {
            #header{
                padding:5px 70px;
                height: 40px;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: #fff;
                z-index: 999;
                #logo{
                    float: left;
                    width: 25px;
                    height: 30px;
                }
                #title{
                    font-size: 20px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                }
            }
    }
 
</style>
