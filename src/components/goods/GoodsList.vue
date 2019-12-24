<template>
    <div id="app-goodslist">
        <div class="good-item" v-for="item in list" :key="item.lid">
            <img :src="'http://127.0.0.1:3000/'+item.md"  @click="jump" :data-lid="item.lid">
            <h4>{{item.lname}}</h4>
            <div class="info">
                <span class="now">{{(item.price).toFixed(2)}}</span>
            </div>
            <div class="sell">
                <span>热卖中</span>
            </div>
        </div>
        <mt-button type="primary" @click="getMore" size="large">查看更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            pno:0,
            pageSize:10,
        }
    },
    created(){
        this.getMore();
    },
    methods:{
        jump(e){
            var pid=e.target.dataset.lid;
            this.$router.push("/goodsinfo?pid="+pid);
        },
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
    }
}
</script>
<style scoped>
    #app-goodslist{
        display:flex;
        justify-content:space-between;
        flex-wrap:wrap;
        padding:4px;
    }
    #app-goodslist div.good-item{
        width:49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin:4px 0;
        padding:2px;
        display:flex;
        flex-direction: column;/*子元素垂直排列*/
        min-height:230px;
        justify-content: space-between;
    }
    #app-goodslist div.good-item img{
        width:100%;

    }
    #app-goodslist div.good-item h4{
        font-size:18px;
    }
    #app-goodslist div.good-item .now{
        color:red;
        font-size:16px;
        font-weight:bold;
    }
</style>