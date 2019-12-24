<template>
    <div class="app-homeproduct">
        <div class="introduction">
            <img src="https://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png">
        </div>
        <div class="product-card" v-for="(item,i) in list" :key="i">
            <router-link :to="'/goodsinfo?pid='+item.lid">
                <img :src="'http://127.0.0.1:3000/'+item.md">
                <p>
                    {{item.title.length > 30 ? item.title.substring(0,30)+"..." : item.title}}
                </p>
                <a href="">￥{{item.price.toFixed(2)}}</a>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            pno:0,
            pageSize:10
        }
    },
    mounted () {
        window.addEventListener("scroll", this.handleScroll, true); 
        // 监听（绑定）滚轮 滚动事件
    },
    methods:{
        getMore(){
            this.pno++;
            var url="http://127.0.0.1:3000/products";
            url+="?pno="+this.pno;
            url+="&pageSize="+this.pageSize;
            //console.log(url);
            this.axios.get(url).then(res=>{
                var rows=this.list.concat(res.data.data);
                this.list=rows;
                //console.log(res.data.data);
            })
        }
    },
    created(){
        this.getMore();
    },
    mounted(){
        var that=this;
        window.addEventListener('scroll',function(){
            var scr=document.documentElement.scrollTop || document.body.scrollTop;//向上滚动部分的高度
            var clientHeight = document.documentElement.clientHeight;//屏幕高度也就是当前设备静态下你所看到的视觉高度
            var scrHeight=document.documentElement.scrollHeight || document.body.scrollHeight;//整个网页的高度
            if(scr + clientHeight + 10 >= scrHeight){
                that.pno++;
                that.getMore();
            }
        })
    }
}
</script>
<style scoped>
.app-homeproduct{
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    margin-top:5px;
    flex-wrap: wrap
}
.app-homeproduct .introduction{
    width:100%;
}
.app-homeproduct .introduction img{
    width:100%;
}
.product-card{
    width:49.5%;
    height:220px;
    border:1px solid rgb(233, 229, 229);
    margin-bottom:5px;
    background-color: #fff;
}
.product-card a img{
    width:100%;
    height:144px;
    border-radius: 15px 15px 0 0;
}
.product-card a p{
    padding: 5px;
    color:#333333;
    font-size:12px;
}
.product-card a a{
    padding: 5px;
    margin-top:5px;
    color:red;
    font-size:16px;
}
</style>