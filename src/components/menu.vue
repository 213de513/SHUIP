<template>
 <div id='menu'>
     <ul>
         <router-link tag='li' to='/content/sysj'>生源数据</router-link>
         <router-link tag='li' to='/content/xjsj'>学籍数据</router-link>
         <router-link tag='li' to='/content/cjsj'>成绩数据</router-link>
         <router-link tag='li' to='/content/kcsj'>课程数据</router-link>
         <router-link tag='li' to='/content/cgsj'>出国数据</router-link>
         <router-link tag='li' to='/content/xlsj'>学历数据</router-link>
     </ul>
     <div class="userInfo">
         欢迎你! {{userInfo.userId}} &nbsp;<span id='logout' @click='logout'>退出</span>
     </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   methods:{
    logout(){
            var storage=window.localStorage;
            var num = storage.getItem('userID');
            this.$http.get('/apis/user/logout',{params:{sID:num}}).then(res=>{
                var result = res.data;
                if(result.code==2000){
                    storage.setItem('userID',-1);
                    storage.setItem('status','off');
                    storage.setItem('college','');
                    this.$router.push('/');
                }else{
                    alert('退出失败，请重试')
                }
            })            
             
    }
   },
   computed:{
       userInfo(){
            var storage=window.localStorage;
            var userId = storage.getItem('userID');
            var status = storage.getItem('status');
            var obj = {};
            obj.userId = userId;
            obj.status = status;
            return obj;
       }
   }
 }
</script>

<style lang='less'>
    @theme : #00B1DD;
    #menu{
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        background-color: #f5f5f5;
        height: 40px;
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
                line-height: 40px;
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
        .userInfo{
            width: 250px;
            height: 50px;
            float: right;
            // background-color: @theme;
            color:#222;
            margin-top: -40px;
            margin-right: 40px;
            line-height: 40px;
            #logout{
                text-decoration: underline;
                color:black;
                cursor: pointer;
                &:hover{
                    color: red;
                }
            }
        }
    }
     @media screen and (max-width:1550px) {
          #menu{
            position: fixed;
            top: 40px;
            left: 0;
            width: 100%;
            background-color: #f5f5f5;
            height: 40px;
            border-bottom: 1px solid #BBB;
            box-shadow: 0 1px 3px gray;
            z-index: 99;
            ul{
                padding: 0 70px;
                font-size: 16px;
                height: 100%;
                li{
                    float: left;
                    margin-right: 25px;
                    line-height: 40px;
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
            .userInfo{
                width: 250px;
                height: 30px;
                float: right;
                // background-color: @theme;
                color:#222;
                margin-top: -33px;
                margin-right: 40px;
                line-height: 40px;
                font-size: 14px;
                #logout{
                    text-decoration: underline;
                    color:black;
                    cursor: pointer;
                    &:hover{
                        color: red;
                    }
                }
            }
        }
    }
</style>
