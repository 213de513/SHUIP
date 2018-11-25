<template>
 <div id='nav'>
     <div id='searchContainer'>
        <span class="glyphicon glyphicon-search"></span>
        <input type="text" placeholder="Search" class="form-control" >
     </div>
     <ul id='subMenu'>
         <router-link v-for='(item,index) in menu' :key="index" :to='{path:item.path}' tag='li'   exact><span class="glyphicon" :class='item.icon'></span> &nbsp;&nbsp;{{item.name}}</router-link>
     </ul>
     <div id='copyright'>
         copyright © by Shanghai University <br>
         <a href="http://yjsb.shu.edu.cn">yjsb.shu.edu.cn</a>
     </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         
     }
   },
   props:['menu'],
   components: {

   }
 }
</script>

<style lang='less'>
    #nav{
        position: fixed;
        top: 152px;
        bottom: 0;
        left: 0;
        width: 270px;
        // background-color: #f60;
        border-right: 1px solid #bbb;
        box-shadow: 1px 0 3px gray;
        #searchContainer{
            position: relative;
            font-size: 20px;
            height: 120px;
            padding: 20px;
            background-color: #fff;
            border-bottom: 1px solid #bbb;
            span{
                position: absolute;
                top: 46px;
                left: 34px;
                color: gray;
                z-index: 2;
            }
            input{
                margin-top: 20px;
                padding: 0 40px;
            }
        }
        #subMenu{
            li{
                height: 60px;
                padding: 0 20px;
                line-height: 60px;
                color:#00B1DD;
                font-size: 16px;
                cursor: pointer;
                &.router-link-active{
                    background-color: #00B1DD;
                    color:white;
                }
                &:not(.router-link-active):hover{
                    background-color: #f1f1f1;
                }
            }
        }
        #copyright{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #bbb;
            background-color: #fff;
            text-align: center;
            padding: 10px 20px;
            height: 56px;
            font-size: 14px;
            z-index: 998;
        }
    }
 
</style>
