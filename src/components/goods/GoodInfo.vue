<template>
    <div class="app-goodinfo">
        <goback></goback>
        <div  class="goodinfo-header">
            <div class="goodinfo-top">商品详情</div>
        </div>
        <swiper-box :list="rows"></swiper-box>
        <div class="goodinfo">
            <div class="info-header">
                <div class="info-price">¥ <span>{{goodinfo.price.toFixed(2)}}</span></div>
                <div class="info-title">{{goodinfo.title}}</div>
                <div class="info-promise">{{goodinfo.promise}}</div>
            </div>
        </div>
        <div class="cart-section-info">
            <div class="cart-section">
                <span>规格</span>
                <span>{{goodinfo.spec}}</span>
            </div>
            <div class="cart-section">
                <span>cpu</span>
                <span>{{goodinfo.cpu}}</span>
            </div>
            <div class="cart-section">
                <span>硬盘</span>
                <span>{{goodinfo.disk}}</span>
            </div>
            <div class="cart-section">
                <span>销量</span>
                <span>{{goodinfo.sold_count}}</span>
            </div>
            <div class="cart-section">
                <span>在售</span>
                <span>{{goodinfo.is_onsale==1 ? "是" : "否"}}</span>
            </div>
        </div>
        <!--商品详情、规格参数、商品评价-->
        <div>
            <div class="info-section-parent">
                <ul class="info-section">
                    <li class="product-info" @click="goodInfo" :class="isShow==10 ? 'info-active' : '' ">商品详情</li>
                    <li class="product-spec" @click="goodSpec" :class="isShow==20 ? 'info-active' : '' ">规格参数</li>
                    <li class="product-commit" @click="goodCommit" :class="isShow==30 ? 'info-active' : '' ">商品评价</li>
                </ul>
            </div>
            <div class="product-img"  v-if = "isShow==10">
                <img :src="goodinfo.nmd" alt="">
                <img :src="goodinfo.nlg" alt="">
            </div>
            <div class="spec-info" v-else-if = "isShow==20">
                <ul>
                    <li>操作系统: {{goodinfo.os}}</li>
                    <li>内存: {{goodinfo.memory}}</li>
                    <li>分辨率: {{goodinfo.resolution}}</li>
                    <li>CPU: {{goodinfo.cpu}}</li>
                    <li>固态硬盘: {{goodinfo.disk}}</li>
                    <br><br><br><br><br><br>
                </ul>
            </div>
            <div class="commit-info" v-else>
                评价详情
            </div>
        </div>
        <!--底部加购物车、立即购买按钮框-->
        <div class="good-handle">
            <div class="cart-icon">
                <i class="layui-icon layui-icon-rate"><span>{{this.$store.getters.commit('optCartCount')}}</span></i>
                <i class="layui-icon layui-icon-cart" @click="jumpCart"></i>
            </div>
            <div class="cart-handle" @click="AddCart">加入购物车</div>
            <div class="shop-handle" @click="goShop">立即购买</div>
        </div>
        <!--加入购物车弹出页面-->
        <div class="cart-container" v-show="cartShow">
            <div class="cart-info-parent">
                <div class="cart-info">
                    <div class="cart-info-header">
                        <img :src="goodinfo.nmd" class="cart-img">
                        <i class="layui-icon layui-icon-close" @click="closeCart"></i>
                    </div>
                </div>
                <div class="cart-spec-info">
                    <ul>
                        <li v-for="(item,i) in spec" :key="i">{{item.spec}}</li>
                    </ul>
                </div>
                <div class="cart-mui-numbox">
                    购买数量:
                        <div class="mui-numbox">
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="getCount(-1)">-</button>
                            <input class="mui-input-numbox" type="number" v-model="count"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button"  @click="getCount(1)">+</button>
                        </div>
                    </div>
                <div class="cart-confirm" @click="addCart">确认</div>
            </div>
        </div>
    </div>
</template>
<script>
//1.引入swiper子组件
import swiperBox from "../sub/swiperBox.vue";
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            count:1,
            goodinfo:{price:0},
            rows:[],
            isShow:10,
            cartShow:false,
            spec:[]
        }
    },
    methods:{
        goShop(){
            var pid = this.$route.query.pid;
            this.$router.push("/order?lid="+pid+"&count="+this.count+"&price="+this.goodinfo.price+"&spec="+this.goodinfo.spec+"&title="+this.goodinfo.title+"&lname="+this.goodinfo.lname+"&img_md="+this.goodinfo.nmd);
        },
        getSpec(){
            var pid = this.$route.query.pid;
            var url = "http://49.232.158.155:3000/getspec?pid="+pid;
            this.axios.get(url).then(result=>{
                this.spec = result.data.data;
            });
        },
        jumpCart(){
            this.$router.push("/shopcart")
        },
        closeCart(){
            this.cartShow=false;
        },
        AddCart(){
            this.cartShow=true;
            this.getSpec();
        },
        goodInfo(){
            this.isShow=10;
        },
        goodSpec(){
            this.isShow=20;
        },
        goodCommit(){
            this.isShow=30;
        },
        //轮播图请求数据
        getImages(){
            var url = "http://49.232.158.155:3000/imageList";
            this.axios.get(url).then(result=>{
                this.rows = result.data;
            })
        },
        getCount(i){
            this.count+=i;
            if(this.count<1){
                this.count=1;
            }
        },
        //商品详细信息请求数据
        getgoodinfo(){
            var pid=this.$route.query.pid;
            var url = "http://49.232.158.155:3000/getgoodinfo?pid="+pid;
            this.axios.get(url).then(result=>{
                var obj = result.data.data[0];
                obj.nmd = "http://49.232.158.155:3000/"+obj.md;
                obj.nlg = "http://49.232.158.155:3000/"+obj.lg;
                this.goodinfo = obj;
            })
        },
        addCart(){
            //console.log(123);
            var pid=this.$route.query.pid;
            var price=this.goodinfo.price;
            var count=this.count;
            var date=new Date();
            date.toLocaleString();
            var ctime=`${date.getFullYear()}-${date.getMonth()+1>10 ? date.getMonth()+1 : "0"+date.getMonth()+1}-${date.getDate()>10?date.getDate():"0"+date.getDate()}%20${date.getHours()>10?date.getHours():"0"+date.getHours()}:${date.getMinutes()>10?date.getMinutes():"0"+date.getMinutes()}:${date.getSeconds()>10?date.getSeconds():"0"+date.getSeconds()}`;
            var url=`http://49.232.158.155:3000/addcart?pid=${pid}&count=${count}&price=${price}&ctime=${ctime}`;
            encodeURI(url);
            this.axios.get(url).then(result=>{
                Toast(result.data.msg);
                //修改全局购物车商品数量
                // this.$store.commit("increment");
            })
            this.cartShow=false;
        }
    },
    created(){
        this.getgoodinfo();
        this.getImages();
    },
    //2.注册轮播图子组件
    components:{
        "swiper-box":swiperBox
    }
}
</script>
<style scoped>
.goodinfo-header{
    width:100%;
    height:40px;
}
.goodinfo-top{
    width:100%;
    height:40px;
    background-color:#fff;
    text-align:center;
    line-height:40px;
    font-size:14px;
    font-weight:bold;
    position: fixed;
    border-bottom: 1px solid #ccc;
}
.cart-mui-numbox{
    padding:20px;
}
.cart-spec-info li{
    display: inline-block;  
    border:1px solid #ccc;
    padding:10px;
    margin:5px 0;
}
.cart-spec-info{
    width:100%;
    padding:20px;
}
.cart-section>span:last-child{
    color:#333;
}
.cart-section>span:first-child{
    display: inline-block;
    width:40px;
    color:#999;
    margin-right: 20px;
}
.cart-section{
    padding:5px 0;
}
.cart-section-info{
    width:100%;
    background-color: #fff;
    margin-top: 15px;
    padding:20px;
}
.spec-info li{
    padding:5px 0;
}
.spec-info{
    padding:20px;
    color:#777;
    background-color: #fff;
}
.cart-confirm{
    width:100%;
    height:50px;
    background-image: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);
    position: fixed;
    bottom: 0;
    color:#fff;
    font-size:16px;
    text-align: center;
    line-height: 50px;
}
.layui-icon-close{
    position: absolute;
    right:10px;
    top:10px;
}
.cart-info-header{
    position: relative;
}
.cart-img{
    width:80;
    height:80px;
    border:1px solid #ddd;
}
.cart-info-parent{
    width:100%;
    height:500px;
    background-color: #fff;
    position: fixed;
    bottom:0;
}
.cart-container{
    width:100%;
    height:100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    bottom:0;
    z-index: 999;
    border-top:1px solid #ddd;
}
.product-img>img{
    width:100%;
}
.info-section .info-active{
    color:#eb3c40;
}
.info-section-parent{
    margin-top:15px;
    width:100%;
}
.info-section>li{
    float: left;
    width:33%;
    text-align:center;
    color: #333;
    line-height: 50px;
}
.info-section{
    width:100%;
    height:50px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
.info-promise{
    font-size: 12px;
    color:rgb(185, 184, 184);
}
.info-title{
    font-size:16px;
    font-weight: bold;
    padding:0 0 10px 0;
    line-height: 1.5;
}
.info-price>span{
    font-size: 24px;
    font-weight: bold;
}
.info-price{
    color:#eb3c40;
    padding: 10px 0;
}
.info-header{
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding:10px;
}
.shop-handle{
    width:37%;
    background: linear-gradient(-41deg,#ff4f18,#ff2000 24%,#f10000);
    color:#fff;
}
.cart-handle{
    width:37%;
    background: linear-gradient(138deg,#ffa600,#ffb000 77%,#ffbc00);
    color: #fff;
}
.layui-icon span{
    position: absolute;
    left: 70px;
    background-color:#eb3c40;
    display: inline-block;
    width:20px;
    height: 20px;
    border-radius: 50%;
    color:#fff;
    font-size: 12px;
    line-height: 20px;
}
.layui-icon{
    font-size: 28px;
}
.cart-icon{
    width:26%;
    color:#eb3c40;
    display: flex;
    justify-content: space-between;
    padding:0 15px;
    position: relative;
}
.good-handle{
    position: fixed;
    bottom: -2px;
    display: flex;
    width: 100%;
    height:50px;
    border-top:1px solid #ddd;
    text-align: center;
    line-height: 50px;
    z-index: 999;
    background-color: #fff;
}
.mint-swipe{
    height:130px;
}
.banner-img{
    width:100%;
}
.goodinfo-price{
    color:red;
    font-size:16px;
}
</style>