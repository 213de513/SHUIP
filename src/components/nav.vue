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
         <a href="http://gs.shu.edu.cn" target="blank">gs.shu.edu.cn</a>
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
        top: 122px;
        bottom: 0;
        left: 0;
        width: 220px;
        // background-color: #f60;
        border-right: 1px solid #bbb;
        box-shadow: 1px 0 3px gray;
        z-index: 99;
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
            bottom: 4px;
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
     @media screen and (max-width:1550px){
          #nav{
        position: fixed;
        top: 82px;
        bottom: 0;
        left: 0;
        width: 180px;
        // background-color: #f60;
        border-right: 1px solid #bbb;
        box-shadow: 1px 0 3px gray;
         background-color: #fff;
        #searchContainer{
            position: relative;
            font-size: 20px;
            height: 60px;
            padding: 0 10px;
            background-color: #fff;
            border-bottom: 1px solid #bbb;
            span{
                position: absolute;
                top: 8px;
                left: 24px;
                color: gray;
                z-index: 2;
            }
            input{
                // margin-top: 20px;
                padding: 0 40px;
            }
        }
        #subMenu{
            li{
                height: 60px;
                padding: 0 20px;
                line-height: 60px;
                color:#00B1DD;
                font-size: 14px;
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
            bottom: 4px;
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
     }
</style>
