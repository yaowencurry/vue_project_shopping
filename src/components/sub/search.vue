<template>
    <div>
        <div class="top" v-show="searchIsshow">
            <div class="app-search">
                <input type="text" v-model="content" @keyup.13="search" id="search-input" placeholder="请输入商品关键词">
                <button class="layui-btn" @click="search">搜索</button>
            </div>
            <div class="logo">
                <i class="layui-icon layui-icon-username" style="color:#fff;font-size:26px;"></i>
            </div>
            <div class="cart-icon" @click="jumpShopCart">
                <i class="layui-icon layui-icon-cart" style="color:#fff;font-size:26px;"></i>
            </div>    
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            searchIsshow:true,
            content:""
        }
    },
    methods:{
        jumpShopCart(){
            this.$router.push("/shopcart");
            this.$forceUpdate();
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
            console.log(this.$route.path);
        },
    }
}
</script>
<style scoped>
.app-search{
   width:75%;
   display: flex;
   margin:0 auto;
}
#search-input{
   width:100%;
   margin:0;
   border-radius:20px;
}
.app-search button{
    position:absolute;
    border:1px solid #c82519;
    right:47px;
    top:11px;
}
.app-search button{
   margin-left:-2px;
   margin-top:0.5px;
   background:#fff;
   color:#c82519;
   border-radius:20px;
}
.logo{
   position: absolute;
   top:15px;
   left:13px;
}
.cart-icon{
   position: absolute;
   top:15px;
   right:13px;
}
.top{
   width:100%;
   height: 60px;
   background:#c82519;
   position: relative;
   padding-top:10px;
}
</style>