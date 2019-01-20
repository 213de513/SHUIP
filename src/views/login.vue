<template>
  <div id="login">
    <div id='loginBG'>
        <div id='loginHeader'>
            <img src="./../assets/images/logo.jpg" alt="logo">
            上海大学研究生信息可视化平台
        </div>
        <div id='loginContainer'>
            <h2>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</h2>
            <div class='login-form'>
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="ID" class="col-sm-2 control-label">账号</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="ID" placeholder="请输入账号" v-model="username">
                        </div>
                    </div>
                    <div class="form-group" style='margin-top:50px;'>
                        <label for="name" class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                        <input type="password" class="form-control" id="name" placeholder="请输入密码" v-model="password" @keyup.enter="login">
                        </div>
                    </div>
                    <div class="form-group" style='margin-top:80px;'>
                        <div class="col-sm-12">
                            <input type='button' id='btn' class="btn btn-info" @click="login" value='登录'>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
     <my-loading v-show='showLoading'></my-loading>
  </div>
</template>

<script>

import myLoading from '@/components/loading'
export default {
  name: 'Login',
  data(){
      return {
          username:'',
          password:'',
          showLoading:false
      }
  },
  methods:{
      login(){
            if(this.username==''){
           this.$message({
            message: '账号不能为空',
            type: 'warning'
            });
            }else if(this.password==''){
                this.$message({
                message: '密码不能为空',
                type: 'warning'
                });
            }else{
                this.showLoading = true;
                var data1 = JSON.stringify({sID:this.username,sPass:this.password})
                 this.$http({url:'/apis/user/login',method:'post',data:data1,headers:{'Content-type':'application/json'}}).then(res=>{
                        this.showLoading = false;
                        var result = res.data;
                        if(result.code==2000){
                            var storage=window.localStorage;
                                // storage.setItem('username',result.data.name);
                                storage.setItem('userID',result.data.sID);
                                storage.setItem('status','on');
                                storage.setItem('college',result.data.role);
                                this.$router.push('/content');
                        }else if(result.code==2002||result.code==2001){
                            this.$message.error(result.message);
                            this.password = '';
                        }
                    })
            }         
      }
  },
  components:{
      myLoading
  },
  mounted(){
      var storage = window.localStorage;
      var status = storage.getItem('status');
      if(status==='on'){
          this.$router.push('/content');
      }
  }
}
</script>

<style lang='less'>
   #loginBG{
       height: 100vh;
       background: url('./../assets/images/login.jpg') no-repeat;
       background-size: cover;
       #loginHeader{
           height: 100px;
            background-color: rgba(255,255,255,0.6);
            padding: 10px 100px;
            font-size: 40px;
            line-height: 100px;
            text-align: center;
            color: white;
            font-weight: 500;
            img{
                height: 85px;
                width: 75px;
                display: block;
                float: left;
            }
       }
       #loginContainer{
           width: 360px;
           height: 450px;
           background-color: rgba(255,255,255,0.4);
           border-radius: 10px;
           position: absolute;
           top: 180px;
           right: 200px;
           padding: 50px 20px;
           h2{
               text-align: center;
               font-size: 25px;
               padding-bottom: 10px;
            //    border-bottom: 2px solid #ddd;
           }
           .login-form{
               margin-top: 50px;
               height: 300px;
                #btn{
                    width: 100%;
                    letter-spacing:10px;
                    text-align: center;
                    font-size: 20px;
                }
           }
       }
   }
  

</style>