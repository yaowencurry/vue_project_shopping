<template>
    <div class="app-searchlist">
        <search></search>
        <div class="app-searchlist-item" style="font-weight:bold">
            <span>序号</span>
            <span>商品名称</span>
            <span>商品价格</span>
            <span>操作</span>
        </div>
        <div class="app-searchlist-item" v-for="(item,i) in list" :key="i" :data-lid="item.lid" @click="jump" >
            <span>{{i+1}}</span>
            <span>{{item.lname.length >7 ? item.lname.substring(0,7)+"..." : item.lname}}</span>
            <span>{{item.price}}</span>
            <button :data-lid="item.lid" @click="jump" class="layui-btn">查看详情</button>
        </div>
        <span style="padding:20px;display:block;">当前搜索到 <span style="color:red;font-size:16px;font-weight:bold;">{{list.length}}</span> 条记录</span>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import search from "../sub/search"
export default {
    data(){
        return {
            list:[],
            content:this.$route.query.content
        }
    },
    methods:{
        getsearchlist(){
            var content=this.$route.query.content;
            var size=content.trim().length;
            if(size==0){
                Toast("输入不能为空");
                return;
            }
            var url=`http://49.232.158.155:3000/getsearchlist?content=${content}`;
            this.axios.get(url).then(result=>{
                this.list=result.data.data;
                //console.log(result);
            })
        },
        jump(e){
            var pid=e.target.dataset.lid;
            //console.log(pid);
            this.$router.push("/goodsinfo?pid="+pid)
        }
    },
    created(){
        this.getsearchlist();
    },
    watch:{

    },
    components:{
        "search":search
    }
}
</script>
<style scoped>
.app-searchlist-item{
    width:100%;
    height:60px;
    padding:0 20px;
    line-height: 50px;
    background:#fff;
    font-size:16px;
    display:flex;
    justify-content: space-between;
}
.layui-btn{
    background-color: #c82519;
    width:80px;
    height:30px;
    text-align:center;
    padding:0;
    line-height:30px;
    margin-top:10px;
}
</style>