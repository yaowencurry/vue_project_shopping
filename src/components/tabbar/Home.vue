<template>
    <div class="app-home">
        <!--占位-->
        <div style="height:40px;"></div>
        <!--搜索-->
        <!--<search></search>-->
        <div class="top-header">
            <i class="layui-icon layui-icon-username" style="color:#fff;font-size:28px;" @click="jumpMyself"></i>
            <input type="text" name="" id="" placeholder="请输入商品名称">
            <i class="layui-icon layui-icon-cart" style="color:#fff;font-size:28px;" @click="jumpShopCart"></i>
        </div>
        <!--顶部栏-->
        <!--banner图片-->
        <mt-swipe>
            <mt-swipe-item v-for="(item,i) of list" :key="i">
                <router-link :to="'/goodsinfo?pid='+parseInt(i+5)">
                    <img class="banner-img" :src="item.img_url">
                </router-link>
            </mt-swipe-item>
        </mt-swipe>
        <!--爆款-->
        <div id="hot-goods">
            <a href="">
                <img src="https://m.360buyimg.com/mobilecms/jfs/t1/91734/5/2381/102866/5dceaceeEdd151713/9cda57f34bbd6750.gif">
            </a>
        </div>
        <!--九宫格-->
        <div style="padding:10px;" id="row-item">
            <div class="row-item-col" @click="jumpNew">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/20983/16/10753/6124/5c8a16aaE5d6b15d7/01e0e818a7505267.png.webp" alt="">
                <div>好品超市</div>
            </div>
            <div class="row-item-col" @click="goPhone">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/39401/17/2391/5859/5cc06fcfE2ad40668/28cda0a571b4a576.png.webp" alt="">
                <div>数码电器</div>
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
            <div class="row-item-col">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp" alt="">
                <div>好品到家</div>
            </div>
            <div class="row-item-col">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp" alt="">
                <div>好品到家</div>
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
    export default({
        data(){
            return {
                list:[],
                loadMore:true
            }
        },
        methods:{
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
                console.log(url);
                this.axios(url).then(res=>{
                    //console.log(res)
                    this.list=res.data;
                })
            }
        },
        created(){
            this.handleImg();
        },
        components:{
            "homproduct":homproduct,
        }
    })
</script>
<style scoped>
    .top-header{
        width:100%;
        height:40px;
        background-color: #c82519;
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        padding:0 10px;
        position: fixed;
        z-index: 10;
        top:0;
        left:0;
    }
    .top-header>input{
        width:80%;
        border-radius: 20px;
        margin-top:2.5px;
        height:35px;
        line-height: 40px;
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
        width:20%;
    }
    #row-item .row-item-col{
        height:80px;
        text-align:center;
        line-height:45px;
    }
    #row-item .row-item-col>div{
        line-height:35px;
        font-size:10px;
        color: #666;
    }
    #row-item img{
        width:60%;
    }
    .mint-swipe{
        width:90%;
        height:156px;
        margin:10px auto;
        border-radius: 20px;
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