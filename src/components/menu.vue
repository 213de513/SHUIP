<template>
 <div id='menu'>
     <ul>
         <router-link tag='li' to='/index'>学籍数据</router-link>
         <router-link tag='li' to='/score'>成绩数据</router-link>
         <router-link tag='li' to='/course'>课程数据</router-link>
         <router-link tag='li' to='/abroad'>出国数据</router-link>
         <router-link tag='li' to='/education'>学历数据</router-link>
     </ul>
     <button class='btn' id='shaixuan' @click='showMask'>筛选 <span class="glyphicon glyphicon-cog"></span></button>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   methods:{
       showMask(){
           this.$emit('showMask');
       }
   },
   components: {

   }
 }
</script>

<style lang='less'>
    @theme : #00B1DD;
    #menu{
        position: fixed;
        top: 100px;
        left: 0;
        width: 100%;
        background-color: #f5f5f5;
        height: 50px;
        border-bottom: 1px solid #BBB;
        box-shadow: 0 1px 3px gray;
        z-index: 998;
        ul{
            padding: 0 70px;
            font-size: 20px;
            height: 100%;
            li{
                float: left;
                margin-right: 25px;
                line-height: 50px;
                height: 40px;
                cursor: pointer;
                &:hover{
                    color: @theme;
                }
                &.router-link-active{
                    border-bottom: 3px solid @theme;
                }
            }
        }
        #shaixuan{
            float: right;
            background-color: @theme;
            color:white;
            margin-top: -42px;
            margin-right: 40px;
        }
    }
 
</style>
