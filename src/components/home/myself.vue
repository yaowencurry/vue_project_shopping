<template>
    <div class="app-myself">
        <tabbar></tabbar>
        <div style="width:100%;height:100%;background-color:rgba(0,0,0,0.8);z-index:999;position:fixed;" v-show="isLogin"></div>
        <div class="myself">
            <div class="common-myself myself-info">
                <div class="self-img">
                    <img :src="info.img_url" alt="">
                </div>
                <div class="self-content">
                    <h4>我的{{info.uname}} <span></span></h4>
                    <p>Mobile: {{info.mobile}}</p>
                    <p>签名: 我们终将逝去的青春···</p>
                </div>
            </div>
            <div class="common-myself myself-order">
                <ul>
                    <li>
                        <img src="../../assets/img/sell01.png" alt="">
                        <div>
                            <span>待发货订单</span>
                            <span>
                                <span>6</span>
                                <i class="layui-icon layui-icon-right"></i>
                            </span>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/sell02.png" alt="">
                        <div>
                            <span>待收货订单</span>
                            <span>
                                <span>6</span>
                                <i class="layui-icon layui-icon-right"></i>
                            </span>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/sell03.png" alt="">
                        <div>
                            <span>待评价订单</span>
                            <span>
                                <span>6</span>
                                <i class="layui-icon layui-icon-right"></i>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="common-myself myself-order">
                <ul>
                    <li>
                        <img src="../../assets/img/sell04.png" alt="">
                        <div>
                            <span>优惠专区</span>
                            <span>
                                <i class="layui-icon layui-icon-right"></i>
                            </span>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/vip.png" alt="">
                        <div>
                            <span>尊享会员</span>
                            <span>
                                <i class="layui-icon layui-icon-right"></i>
                            </span>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/wechat.png" alt="">
                        <div>
                            <span>微信支付</span>
                            <span>
                                <i class="layui-icon layui-icon-right"></i>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <button @click="loginout" class="layui-btn layui-btn-disabled">退出登录</button>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return {
            info:{},
            isLogin:false
        }
    },
    methods:{
        getMemberInfo(){
            var url="http://49.232.158.155:3000/myself"
            var _that = this;
            this.axios.get(url).then(result=>{
                if(result.data.code==-1){
                    _that.isLogin=true;
                    MessageBox.confirm('',{
                        title:'提示',
                        message:'您尚未登录，去登录吗？',
                        confirmButtonText:'确认',
                        cancelButtonText:'取消'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$router.push("/login");
                        }
                    }).catch(error =>{
                        if(error == 'cancel'){
                            this.$router.push("/home");
                        }
                    });
                }else{
                    console.log(result);
                    this.info=result.data.data[0];
                    _that.isLogin=false;
                }
            })
        },
        loginout(){
            var url="http://49.232.158.155:3000/loginout";
            this.axios.get(url).then(result=>{
                Toast(result.data.msg);
                this.$router.push("/home");
                //清除购物车数量
                //this.$store.commit("updateCartCount",0);
            })
        }
    },
    created(){
        this.getMemberInfo();
    }
}
</script>
<style scoped>
.layui-icon-right{
    float: right;
}
.layui-btn{
    position: absolute;
    top:80%;
    left:37%;
}
.myself-order>ul>li>div>span>span{
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #f83c31;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
}
.myself-order>ul>li:last-child>div{
    border:0;
}
.myself-order>ul>li>div{
    border-bottom:1px solid #ddd;
    padding-bottom:10px;
    width:100%;
}
.myself-order>ul>li>img{
    width:25px;
    height: 25px;
    margin-right: 15px;
}
.myself-order>ul>li{
    padding: 10px 0;
    margin-top: 5px;
    display: flex;
}
.myself-order{
    margin-top: 20px;
}
.self-content>p{
    font-size: 14px;
    padding:2px 0;
}
.self-content>h4{
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
    color:#333;
}
.self-content{
    height: 100px;
    padding-top:18px;
}
.self-img>img{
    width: 100px;
    height:100px;
    border:1px solid #ccc;
    border-radius: 10px;
}
.self-img{
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border-radius: 10px;
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
.common-myself{
    padding: 10px 20px;
    background-color: #fff
}
.myself-info{
    display: flex;
    align-items: center;
    padding: 20px 20px;
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