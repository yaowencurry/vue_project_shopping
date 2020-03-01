<template>
    <div class="app-home">
        <!--占位-->
        <div style="height:40px;"></div>
        <!--搜索-->
        <!--<search></search>-->
        <div class="top-header">
            <i class="layui-icon layui-icon-username" style="color:#fff;font-size:28px;" @click="jumpMyself"></i>
            <div class="serach">
                <input type="text" name="" id="" placeholder="请输入商品名称" v-model="content" @keyup.13="search">
                <i class="layui-icon layui-icon-search" @click="search"></i>
            </div>
            <i class="layui-icon layui-icon-cart" style="color:#fff;font-size:28px;" @click="jumpShopCart">
                <span style="width:18px;height:18px;background-color:#fff;display:inline-block;border-radius:50%;position:absolute;top:8px;right:6px;color:#f83c31;font-size:14px;line-height:19px;text-align:center;">
                    {{$store.getters.optCartCount}}
                </span>
            </i>
        </div>
        <!--顶部栏-->
        <!--banner图片-->
        <div class="banner">
            <mt-swipe>
                <mt-swipe-item v-for="(item,i) of list" :key="i">
                    <router-link :to="'/goodsinfo?pid='+parseInt(i+5)">
                        <img class="banner-img" :src="item.img_url">
                    </router-link>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!--爆款-->
        <div id="hot-goods">
            <router-link to="/goodslist">
                <img src="https://m.360buyimg.com/mobilecms/jfs/t1/91734/5/2381/102866/5dceaceeEdd151713/9cda57f34bbd6750.gif">
            </router-link>
        </div>
        <!--九宫格-->
        <div id="row-item">
            <div class="row-item-col" @click="jumpNew">
                <img src="../../../public/home/01.png" alt="">
                <div>好品新闻</div>
            </div>
            <div class="row-item-col" @click="goPhone">
                <img src="../../../public/home/02.png" alt="">
                <div>好品超市</div>
            </div>
            <div class="row-item-col">
                <img src="../../../public/home/03.png" alt="">
                <div>好品服饰</div>
            </div>
            <div class="row-item-col">
                <img src="../../../public/home/04.png" alt="">
                <div>好品生鲜</div>
            </div>
            <div class="row-item-col">
                <img src="../../../public/home/05.png" alt="">
                <div>好品到家</div>
            </div>
            <div class="row-item-col">
                <img src="../../../public/home/06.png" alt="">
                <div>充值缴费</div>
            </div>
            <div class="row-item-col">
                <img src="../../../public/home/07.png" alt="">
                <div>领券拼团</div>
            </div>
            <div class="row-item-col">
                <img src="../../../public/home/08.png" alt="">
                <div>天天淘</div>
            </div>
        </div>
        <!--咨询信息-->
        <div class="first-news">
            <div>最新<br>快讯</div>
            <div>
                <p v-for="(item,i) in items" :key="i">{{item.name}}</p>
            </div>
        </div>
        <!--秒杀区域-->
        <div class="clock-shop"></div>
        <homproduct></homproduct>
        <div v-show="loadMore" style="margin:0 auto;text-align:center;">哎呀 没有更多了</div>
        <!--tabbar-->
        <tabbar></tabbar>
    </div>
</template>
<script>
    import homproduct from "../sub/homeProduct.vue"
    import search from "../sub/search.vue"
    import {Toast} from "mint-ui"
    export default({
        data(){
            return {
                list:[],
                loadMore:true,
                content:"",
                items:[
                    {name:"1.2亿次速度蓝牙面板Jabra耳机飞速到天际"},
                    {name:"华为FreeBuds 3真机体验，续航能力长.…"},
                    {name:"华为MatePad Pro新配色亮相，现已开…"},
                    {name:"三星Notebook 7释放惊喜价，256G售…"},
                    {name:"Amazfit GTS新品体验：性能升级超强…"},
                    {name:"重新定义运动耳机，黑科技加持更出色"}
                ]
            }
        },
        methods:{
            scroll(){
                this.animate=true;
                setTimeout(() => {
                    this.items.push(this.items[0]);
                    this.items.shift();
                    this.animate=false;
                }, 1700);
            },
            search(){
                var content=this.content;
                var size=content.trim().length;
                if(size==0){
                    Toast("输入不能为空");
                    return;
                }
                this.$router.push("/searchlist?content="+content);
                location.reload();
            },
            jumpMyself(){
                this.$router.push("/myself")
            },
            jumpShopCart(){
                this.$router.push("/shopcart")
            },
            goPhone(){
                this.$router.push("/goodslist")
            },
            jumpNew(){
                this.$router.push("/newslist")
            },
            handleImg(){
                var url = "http://49.232.158.155:3000/imageList";
                this.axios(url).then(res=>{
                    //console.log(res)
                    this.list=res.data;
                })
            }
        },
        created(){
            this.handleImg();
            setInterval(this.scroll,1500);
        },
        components:{
            "homproduct":homproduct,
        }
    })
</script>
<style scoped>
.anim{
    transition: all 0.2s;
    margin-top: -30px;
}
.first-news>div>p{
    color: #f83c31;
    padding:3.5px 0;
    font-size: 12px;
}
.first-news>div:last-child{
    padding: 5px 0;
    margin-left: 10px;
    overflow: hidden;
}
.first-news>div{
    height: 80px;
}
.first-news>div:first-child{
    width:22%;
    font-size:20px;
    text-align: center;
    padding-top: 10px;
    color: #f83c31;;
    border-right: 1px solid #eee;
}
.first-news{
    height:80px;
    background-color: #fff;
    display: flex;
    margin-bottom: 15px;
    margin-top: 15px;
}
.top-header .serach input{
    width:100%;
    border-radius: 20px; 
    height:35px;
    line-height: 40px;
    border:none;
}
.serach i{
    font-size:28px;
    color: #f83c31;
    position: absolute;
    right: 10px;
    top: -5px;
}
.serach{
    position: relative;
    margin-top:6.5px;
    width: 75%;
}
.banner{
    padding:20px 0;
    background-image: url(/static/img/1132b0b9cf6fac68.a25f743.png);
    background-repeat: no-repeat;
    background-size: 100% 300px;
}
.top-header{
    width:100%;
    height:60px;
    background-color: #f83c31;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    padding:0 10px;
    position: fixed;
    z-index: 10;
    top:0;
    left:0;
}
#hot-goods{
    padding:0 10px;
    width:100%;
    border-radius:20px;
}
#hot-goods img{
    border-radius:20px;
    width:100%;
}
#row-item{
    margin-top:8px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
}
#row-item .row-item-col{
    width:25%;
    text-align:center;
    line-height:45px;
}
#row-item .row-item-col>div{
    line-height:35px;
    font-size:12px;
    color: #666;
}
#row-item img{
    width:60%;
}
.mint-swipe{
    width:90%;
    height:156px;
    margin:10px auto;
    margin-top: 30px;
    border-radius: 20px;
    background-image: url('../../assets/img/1132b0b9cf6fac68.png')
}
.banner-img{
    height:156px;
}
.mui-grid-9 img{
    width:60px;
}
.app-home .mui-grid-9{
    background:#fff;
}
</style>