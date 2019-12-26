<template>
    <div class="app-myself">
        <tabbar></tabbar>
        <div class="myself-top">
            <h4>个人中心</h4>
        </div>
        <div class="myself">
            <div class="myself-info">
                <div class="self-img">
                </div>
                <div class="self-content">
                    <h4>用户名: {{info.uname}}</h4>
                    <p>手机号: {{info.mobile}}</p>
                </div>
            </div>
            <div class="myself-order">
                <ul>
                    <li>
                        <span>待发货订单</span>
                        <span>
                            <span>6</span>
                            <i class="layui-icon layui-icon-right"></i>
                        </span>
                    </li>
                    <li>
                        <span>待收货订单</span>
                        <span>
                            <span>6</span>
                            <i class="layui-icon layui-icon-right"></i>
                        </span>
                    </li>
                    <li>
                        <span>待评价订单</span>
                        <span>
                            <span>6</span>
                            <i class="layui-icon layui-icon-right"></i>
                        </span>
                    </li>
                </ul>
            </div>
            <button @click="loginout" class="layui-btn">退出登录</button>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return {
            info:{}
        }
    },
    methods:{
        getMemberInfo(){
            var url="http://49.232.158.155:3000/myself"
            this.axios.get(url).then(result=>{
                //console.log(result);
                if(result.data.code==-1){
                    MessageBox.confirm('',{
                        title:'提示',
                        message:'您尚未登录，去登录吗？',
                        confirmButtonText:'确认',
                        cancelButtonText:'取消'
                    }).then(action => {
                        console.log(23);
                        if (action == 'confirm') {
                            this.$router.push("/login");
                        }
                    }).catch(error =>{
                        if(error == 'cancel'){
                            this.$router.push("/home");
                        }
                    });
                }else{
                    this.info=result.data.data[0];
                }
            })
        },
        loginout(){
            var url="http://49.232.158.155:3000/loginout";
            this.axios.get(url).then(result=>{
                Toast(result.data.msg);
                this.$router.push("/home");
                this.$store.commit("updateCartCount",0);
            })
        }
    },
    created(){
        this.getMemberInfo();
    }
}
</script>
<style scoped>
.layui-btn{
    position: absolute;
    top:70%;
    left:37%;
}
.myself-order>ul>li>span>span{
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #f83c31;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
}
.myself-order>ul>li{
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
}
.myself-order{
    margin-top: 20px;
}
.self-content>h4{
    margin-bottom: 10px;
}
.self-content{
    height: 100px;
    padding-top: 30px;
}
.self-img{
    width: 100px;
    height: 100px;
    border:1px solid #ccc;
    margin-right: 30px;
    border-radius: 50%;
    background-image: url('/static/img/1132b0b9cf6fac68.a25f743.png');
    background-size: 100px;
}
.myself-top>h4{
    line-height: 40px;
    color: #fff;
}
.myself-top{
    height:40px;
    text-align: center;
    background-color: #f83c31;
}
.myself{
    padding: 0 20px;
}
.myself-info{
    display: flex;
    margin-top: 20px;
}
.header>.myimg{
    width:70px;height:70px;
    background-color: pink;
    border-radius: 50%;
}
.header>div{
    margin:0 auto;
    font-size:16px;
    font-weight: bold;
    padding:10px 0;
    color:#fff;
}
.header{
    width:100%;
    height:150px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    background-image:url(../../../public/1.png)
}
.app-myself>.top>h4{
    line-height: 40px;
    font-size:14px;
    color:#fff;
    font-weight: bold;
}
.app-myself>.top{
    width:100%;
    height:40px;
    background-color: red;
    text-align: center;
}
</style>