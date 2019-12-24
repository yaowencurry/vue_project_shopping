<template>
    <div class="app-newslist">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item of list" :key="item.id">
                <router-link :to="'/newsinfo?nid='+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>{{item.ctime | datetimefilter}}</span>
                            <span>点击次数：{{item.point}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            pno:1,
            pageSize:7
        }
    },
    methods:{
        getMore(){
            //1.修改当前页码+1
            this.pno++;
            //2.发送请求get
            var url="http://127.0.0.1:3000";
            url+="/newsList?pno="+this.pno;
            url+="&pageSize="+this.pageSize;
            this.axios.get(url).then(res=>{
                //3.获取下一页数据保存在list中
                //3.1拼接两个数组
                var row=this.list.concat(res.data.data)
                //3.2赋值给list
                this.list=row;
                //this.list=res.data.data;
            })
        },
        getnewsList(){
            var url="http://127.0.0.1:3000/newsList";
            this.axios.get(url).then(res=>{
                this.list=res.data.data;
            })
        }
    },
    created(){
        this.getnewsList();
    }
}
</script>
<style scoped>
    .app-newslist .mui-ellipsis{
        display:flex;
        justify-content: space-between;
        color:blue;
        font-size:12px;
    }
</style>