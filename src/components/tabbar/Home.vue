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
            <i class="layui-icon layui-icon-cart" style="color:#fff;font-size:28px;" @click="jumpShopCart"></i>
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
        <div style="padding:10px;" id="row-item">
            <div class="row-item-col" @click="jumpNew">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/20983/16/10753/6124/5c8a16aaE5d6b15d7/01e0e818a7505267.png.webp" alt="">
                <div>好品新闻</div>
            </div>
            <div class="row-item-col" @click="goPhone">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/39401/17/2391/5859/5cc06fcfE2ad40668/28cda0a571b4a576.png.webp" alt="">
                <div>好品超市</div>
            </div>
            <div class="row-item-col">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/17169/3/4127/4611/5c2f35cfEd87b0dd5/65c0cdc1362635fc.png.webp" alt="">
                <div>好品服饰</div>
            </div>
            <div class="row-item-col">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t17725/156/1767366877/17404/f45d418b/5ad87bf0N66c5db7c.png.webp" alt="">
                <div>好品生鲜</div>
            </div>
            <div class="row-item-col">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp" alt="">
                <div>好品到家</div>
            </div>
            <div class="row-item-col">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t18454/342/2607665324/6406/273daced/5b03b74eN3541598d.png.webp" alt="">
                <div>充值缴费</div>
            </div>
            <div class="row-item-col">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp" alt="">
                <div>领券拼团</div>
            </div>
            <div class="row-item-col">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp" alt="">
                <div>好品到家</div>
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
                }, 1500);
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
    color:#333;
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
    color: #FE8537;
    border-right: 1px solid #eee;
}
.first-news{
    height:80px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    margin-bottom: 15px;
    margin-top: -10px;
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
}
#row-item .row-item-col{
    width:25%;
}
#row-item .row-item-col{
    height:100px;
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