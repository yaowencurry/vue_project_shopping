<template>
<div id="app-newsinfo">
    <div class="mui-card">
        <div class="mui-card-header mui-card-media" style="height:40vw;background-image:url(http://127.0.0.1:3000/1.png)"></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>Posted on {{info.ctime | nesDateFilter}}</p>
                    <p style="color: #333;">
                        {{info.content}}
                    </p>
                </div>
            </div>
            <div class="mui-card-footer">
                <a class="mui-card-link">Like</a>
                <a class="mui-card-link">写评论</a>
            </div>
    </div>
    <comment></comment>
</div>
</template>
<script>
import comment from "../sub/comment.vue"
export default {
    data(){
        return {
            info:{}
        }
    },
    methods:{
        getNewsInfo(){
            var id=this.$route.query.nid;
            //console.log(id);
            var url="http://127.0.0.1:3000/newsinfo?id="+id;
            this.axios.get(url).then(result=>{
                //console.log(result.data.data[0]);
                this.info=result.data.data[0];
                //console.log(this.info);
                //console.log(this.info.img_url);
            })
        }
    },
    created(){
        this.getNewsInfo();
    },
    components:{
        "comment":comment
    }
}
</script>
<style scoped>
    #app-newsinfo input{
        width:95%;
        height: 100px;
        display:block;
        margin:0 auto;
        font-size:12px;
    }
    #app-newsinfo .content-btn{
        width:95%;
    }
</style>