<template>
    <div class="app-comment">
<div class="mui-card">
	<div class="mui-card-header">
    </div>
	<div class="mui-card-content">
		<div class="mui-card-content-inner">
			<textarea placeholder="请吐槽最多120个字" maxlength="120" v-model="msg" @keyup.13="addcomment"></textarea>
            <mt-button size="large" type="primary" @click="addcomment">发表评论</mt-button>
		</div>
	</div>
    <div class="mui-card-footer">
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in list" :key="item.id">
                <div class="cmt-item-info">
                    <span>第{{i+1}}楼</span>
                    <span>{{item.ctime | datetimefilter}}</span>
                </div>
                    <div>{{item.content}}</div>
                </div>
            </div>
        </div>
	</div>
</div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return {
            pno:0,
            pageSize:5,
            list:[],
            newlist:[],
            msg:""
        }
    },
    methods:{
        addcomment(){
            //console.log(123456);
            var m=this.msg;
            var size=m.trim().length;
            if(size==0){
                Toast("评论内容不能为空");
                return;
            };
            var nid=this.$route.query.nid;
            //var nid=this.$route.query.nid;
            var postData=this.qs.stringify({
                nid:nid,
                content:this.msg
            })
            var url="http://127.0.0.1:3000/addcomment";
            this.axios.post(url,postData).then(result=>{
                Toast("发表成功");
                this.msg="";
                this.pno=0;
                this.list=[];
                this.getMore();
            })
        },
        getMore(){
            this.pno++;
            var nid=this.$route.query.nid;
            //console.log(nid);
            var url="http://127.0.0.1:3000/getcomment?nid="+nid;
            url+="&pno="+this.pno;
            url+="&pageSize="+this.pageSize;
            this.axios.get(url).then(result=>{
                var rows=this.list.concat(result.data.data);
                this.list=rows;
                this.newlist=this.newlist.concat(result.data.data).reverse();
                //console.log(this.newlist);
            })
        },
    },
    created(){
        //this.addcomment();
        this.getMore();
    }
}
</script>
<style scoped>
    .comment-title{
        display:flex;
        justify-content: space-between;
        color:rgb(180, 178, 178);
        font-size:12px;
    }
    .comment-content{
        margin:7px 0 10px 0;
        color:#333333;
    }
    .mui-card-content-inner{
        padding:0 15px 0 15px;
    }
    .mui-card-content-inner hr{
        color:#fff;
    }
    .cmt-item-info span{
        display:block;
    }
    .cmt-item-info{
        width:198%;
        display: flex;
        justify-content:space-between;
    }
</style>