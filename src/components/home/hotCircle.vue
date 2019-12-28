<template>
    <div class="hotcircle">
        <!--goback></goback>
        <div class="header"></div-->
        <div class="content-class-parent">
            <ul class="content-class">
                <li><a href="" class="class-active">推荐</a></li>
                <li><a href="" >体育</a></li>
                <li><a href="">娱乐</a></li>
                <li><a href="">新闻</a></li>
                <li><a href="">运动</a></li>
                <li><a href="">鞋子</a></li>
                <li><a href="">NBA</a></li>
                <li><a href="">休闲</a></li>
                <li><a href="">娱乐</a></li>
                <li><a href="">新闻</a></li>
                <li><a href="">运动</a></li>
                <li><a href="">NBA</a></li>
                <li><a href="">休闲</a></li>
                <li><a href="">娱乐</a></li>
                <li><a href="">新闻</a></li>
                <li><a href="">运动</a></li>
                <li><a href="">NBA</a></li>
                <li><a href="">休闲</a></li>
                <li><a href="">娱乐</a></li>
                <li><a href="">新闻</a></li>
                <li><a href="">运动</a></li>
                <li><a href="">NBA</a></li>
                <li><a href="">休闲</a></li>
                <li><a href="">娱乐</a></li>
                <li><a href="">新闻</a></li>
                <li><a href="">运动</a></li>
            </ul>
        </div>
        <div v-for="(item,i) in list" :key="i">
            <div class="content">
                <div class="myimg">
                    <img src="../../../public/1.png" alt="">
                </div>
                <div class="content-item">
                    <p class="uname">{{item.uname}}</p>
                    <!--div class="fellow">关注</div>
                    <div class="fellow">已关注</div-->
                    <p class="ctime">{{item.ctime | datetimefilter}}</p>
                    <div class="content-all">{{item.content}}</div>
                    <div class="content-img">
                        <img :src="item.content_img1">
                        <img :src="item.content_img2">
                        <img :src="item.content_img1">
                        <img :src="item.content_img2">
                        <img :src="item.content_img2">
                        <!--img :src="item.content_img3"-->
                    </div>
                    <div class="like" @click="likeme">赞一个({{item.zan_count}})</div>
                </div>
            </div>
            <hr>
        </div>
        <div class="post-content">
            <a @click="sendContent">写心情</a>
        </div>
        <tabbar></tabbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    methods:{
        sendContent(){
            this.$router.push("/sendhotcircle");
        },
        likeme(){

        },
        getlist(){
            var contentClass = 1;
            var url = "http://49.232.158.155:3000/gethotcircle?class=";
            url += contentClass;
            this.axios.get(url).then((result)=>{
                this.list=result.data.data.reverse();
            })
        }
    },
    created(){
        this.getlist();
    }
}
</script>
<style scoped>
.post-content{
    position: fixed;
    bottom:80px;
    right:30px;
    background-color:red;
    padding:10px 20px;
    border-radius: 20px;
    line-height:20px;
}
.post-content>a{
    color:#fff;
}
.content-item>.uname{
    font-size:12px;
    font-weight: bold;
    color:#333333;
    margin-bottom: 5px;
}
.content-item>.fellow{
    width: 60px;
    height:25px;
    border:1px solid red;
    position:absolute;
    text-align: center;
    line-height: 25px;
    right: 10px;
    top:0;
}
.content-item>.ctime{
    font-size:10px;
    color:#333333;
     margin-bottom: 5px;
}
.content-item>.content-all{
    font-size:12px;
    line-height: 20px;
    margin-bottom: 5px;
    overflow: hidden;
}
.content-item>.content-img{
    width:100%;
    display: flex;
    justify-content:flex-start;
    flex-wrap: wrap;
}
.content-item>.content-img>img{
    width:85px;
    height:85px;
    margin-right:5px;
    margin-bottom: 5px;
}
.content-item>.like{
    float:right;
}
.content>.myimg{
    width:20%;
}
.content>.myimg>img{
    width:50px;
    height:50px;
    border-radius: 10px;
}
.content>.content-item{
    width:80%;
}
.content{
    padding: 0 10px;
    margin-top:10px;
    position: relative;
    display: flex;
}
.content-class>li>a.class-active{
    height:100%;
    display:block;
    padding: 0 15px;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
    color:red;
}
.content-class{
    height:40px;
    background-color: red;
    overflow-x: scroll;
    overflow-y: hidden;
}
.content-class-parent{
    overflow: hidden;
    overflow-x: auto;
}
.content-class>li>a{
    color:#fff;
}
.content-class>li{
    display: inline-block;
    overflow: hidden;  
    line-height: 40px;
    padding-left:15px;
}
.header{
    width:100%;
    height:40px;
    background-color: #fff;
}
.hotcircle .back{
    color:#fff;
}
</style>