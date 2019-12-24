<template>
    <div class="app-register">
        <div class="mask" v-show="isShow">
            <div class="protocol-wrap">
                <div class="protocol-header">注册协议及隐私政策</div>
                <div class="protocol-content">
                    <p>您注册成为京东用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议</p>
                    <p>请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）</p>
                    <p>请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）</p>
                    <p>请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）</p>
                </div>
                <div class="protocol-footer">
                    <div class="protocol-notice">
                        点击同意即表示您已阅读并同意<a hres="#">《京东用户注册协议》</a>与<a hres="#">《京东隐私政策》</a>并将您的订单信息共享给为完成此订单所必需的第三方合作方，关于<a hres="#">《订单共享与安全》</a>
                    </div>
                    <div class="protocol-btn">
                        <span class="btn no" @click="backNo">不同意</span>
                        <span class="btn yes" @click="getYes">同意</span>
                    </div>
                </div>
            </div>
        </div>
        <goback></goback>
        <div class="header">京东注册</div>
        <div class="register-form">
            <div>
                <input type="text" placeholder="请输入用户名" v-model="uname">
            </div>
            <div>
                <input type="password" placeholder="请输入密码" v-model="upwd">
            </div>
            <div>
                <input type="text" placeholder="请输入联系方式" v-model="mobile">
            </div>
            <div>
                <button @click="register">立即注册</button>
            </div>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            isShow:true,
            uname:"",
            upwd:"",
            mobile:""
        }
    },
    methods:{
        register(){
            if(!this.uname){
                Toast("用户名不能为空")
                return;
            }
            if(!this.upwd){
                Toast("密码不能为空");
                return;
            }
            var url="http://127.0.0.1:3000/register?";
            url+="uname="+this.uname;
            url+="&upwd="+this.upwd;
            url+="&mobile="+this.mobile;
            this.axios.get(url).then(result=>{
                Toast(result.data.msg);
                this.uname="";
                this.upwd="";
                this.$router.push("/login");
            })
        },
        getYes(){
            this.isShow=false;
        },
        backNo(){
            this.$router.push("/login");
        }
    }
}
</script>
<style scoped>
.register-form button{
    width:100px;
    height:40px;
}
.register-form>div{
    text-align: center;
}
.register-form{
    padding:20px;
    margin-top: 10px;
}
.header{
    height:40px;
    text-align: center;
    line-height: 40px;
    font-size:16px;
}
.mask{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,.6);
    z-index: 999;
}
.protocol-wrap{
    position: relative;
    left:7%;
    top:24%;
    width:85%;
    background-color: #fff;
    border-radius: 10px;
}
.protocol-header{
    font-size:16px;
    text-align:center;
    padding: 10px 10px;
    font-weight: bold;
}
.protocol-content{
    height:200px;
    overflow-y: scroll;
    margin-bottom: 10px;
    padding:20px;
}
.protocol-content>p{
    color:#333;
    margin-bottom: 10px;
}
.protocol-footer{
    border-radius: 5px 5px 0 0;
    box-shadow:0px -2px 3px #e0dede;
    
}
.protocol-notice{
    padding:20px;
}
.protocol-btn{
    display: flex;
}
.protocol-btn>.btn{
    display: block;
    width: 50%;
    height:50px;
    text-align: center;
    line-height: 50px;
}
.protocol-notice>a{
    color:#3b7adb;
    text-decoration: underline;
}
.protocol-btn>.no{
    border-top: 1px solid #ddd;
}
.protocol-btn>.yes{
    background-image: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);
    color:#fff;
    border-radius: 0 0 10px 0;
}
</style>