<template>
    <div class="app-login">
        <goback></goback>
        <h3>好品登录注册</h3>
        <div>
            <input type="text" placeholder="用户名/邮箱/手机号" class="layui-input" v-model="uname">
            <input type="password" placeholder="请输入密码" v-model="upwd">
            <div class="missupwd">
                <a href="#">忘记密码?</a>
            </div>
            <button class="layui-btn layui-btn-radius layui-btn-warm" @click="login">登录</button><br>
            <button class="layui-btn layui-btn-radius layui-btn-primary" @click="register">一键注册</button>
        </div>
        <div class="othermethod">
            <span><a href="#">短信验证码登录</a></span>
            <span><a href="#">手机快速注册</a></span>
        </div>
        <div>
            <h4 class="othermethod-2">其他登录方式</h4>
            <div class="icon">
                <span>
                    <a href="#"><i class="layui-icon layui-icon-login-wechat"></i></a>
                    <br>
                    <span>微信</span>
                </span>
                <span>
                    <a href="#"><i class="layui-icon layui-icon-login-qq"></i></a><br>
                    <span>腾讯QQ</span>
                </span> 
            </div>
            <p class="userpromise">登录即代表您已同意<a href="">好品隐私政策</a></p>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return {
            uname:"",
            upwd:""
        }
    },
    methods:{
        register(){
            // var uname=this.uname;
            // var upwd=this.upwd;
            // var url="http://127.0.0.1:3000/register?";
            // url+="uname="+this.uname;
            // url+="&upwd="+this.upwd;
            // this.axios.get(url).then(result=>{
            //     Toast(result.data.msg);
            //     this.uname="";
            //     this.upwd="";
            // })
            this.$router.push("/register");
        },
        login(){
            var uname=this.uname;
            var upwd=this.upwd;
            var url="http://127.0.0.1:3000/login?"
            url+="uname="+this.uname;
            url+="&upwd="+this.upwd;
            this.axios.get(url).then(result=>{
                //console.log(result);
                if(result.data.code==1){
                    Toast(result.data.msg);
                    this.$router.push("/myself");
                }else{
                    Toast(result.data.msg);
                }
            });
        }
    }
}
</script>
<style scoped>
.userpromise{
    text-align: center;
}
.userpromise>a{
    color:#4790df;
}
.icon{
    text-align:center;
    display: flex;
    justify-content: center
}
.icon>span{
    margin:20px;
}
.layui-icon{
    font-size:38px;
}
.othermethod-2{
    color:#999999;
    text-align: center;
    margin-bottom:10px;
}
.app-login{
    background-color: #fff;
    height:600px;
    width:100%;
    padding:20px 20px 0 20px;
}
h3{
    font-size:16px;
    text-align:center;
    margin-bottom:20px;
}
input{
    background:none;
    outline:none;
    border:0px;
}
.missupwd{
    width:100%;
    margin:0 0 10px 83%;
}
.missupwd>a{
    color:#f9361e;
}
.layui-btn-warm{
    background-color: #f9361e;
}
.layui-btn-warm,.layui-btn-primary{
    width:100%;
    margin-bottom:15px;
}
.othermethod{
    margin-top:10px;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
}
.othermethod>span>a{
    color:#999999;
}
</style>