<template>
    <div class="app-myself">
        <div class="top">
            <h4>个人中心</h4>
        </div>
        <div class="header">
            <div class="myimg"></div>
            <div>{{info.uname}}</div>
        </div>
        <div class="content">
            
        </div>
        <tabbar></tabbar>
        用户名:{{info.uname}}<br>
        密码:{{info.upwd}}
        <button @click="loginout" class="layui-btn">退出登录</button>
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