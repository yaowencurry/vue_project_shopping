<template>
    <div class="send-content">
        <div class="header">
            发表内容
        </div>
        <goback></goback>
        <textarea name="" id="" cols="30" rows="7" placeholder="请开始你的表演" v-model="content"></textarea>
        <div class="content-img">
            <div class="add-img">
               <i class="layui-icon layui-icon-add-1"></i>
               <input type="file" @change="uploadImg" ref="uploadFile" name="file" style="width: 100%; height: 100%;cursor: pointer;opacity: 0"> 
            </div>
            <div class="img-show">
                <img :src="imgUrl" id="img" v-show="show">
            </div>
        </div>
        <div class="send-btn">
            <input type="button" value="发表" @click="sendContent">
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return {
            show:false,
            imgUrl:'',
            uploadMsg:'',
            content:''
        }
    },
    methods:{
        sendContent(){
            if(this.content==''){
                Toast("发表失败");
                return;
            }
            this.axios(`http://127.0.0.1:3000/hotcircle?content=${this.content}`).then(result=>{
                if(result.data.code==0){
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
                }else if(result.data.code==1){
                    Toast("发表成功");
                    this.$router.push("/hotcircle");
                }else{
                    Toast("发表失败");
                }
            })
        },
        uploadImg(){
            this.uploadMsg=this.$refs.uploadFile.files[0];
            this.imgUrl=this.getImg(this.uploadMsg);
            this.show=true;
            console.log(this.$refs.uploadFile.files);
        },
        getImg(file){
            let url='';
            if (window.createObjectURL !== undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL !== undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL !== undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }
    }
}
</script>
<style scoped>
    .send-btn input{
        margin:0 auto;
        width:70px;
        background-color: #f00;
        color:#fff;
        border:none;
    }
    .send-btn{
        position: relative;
        margin-top:80px;
        width:100%;
        height:50px;
        padding:10px;
        text-align:center;
    }
    .img-show{
        padding:10px;
        height: 100px;
    }
    .img-show img{
        width:100px;
        height:100px;
    }
    .add-img{
        width:100px;
        height:100px;
        position:relative;
        border:1px solid #ddd;
        margin-left:10px;
    }
    .layui-icon-add-1{
        font-size:48px;
        color:#aaa;
        position: absolute;
        left:25%;
        top:25%;
    }
    .send-content textarea{
        padding:10px;
    }
    .send-content .header{
        width:100%;
        height:40px;
        background:#fff;
        text-align:center;
        line-height:40px;
        font-size:14px;
        font-weight:bold;
    }
</style>