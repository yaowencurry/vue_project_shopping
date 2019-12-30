<template>
    <div class="app-cart">
        <!--废弃的muicard组件
        <div class="mui-card-content">
            <div class="mui-card-content-inner app-cart-item" v-for="(item,i) in cartinfo" :key="i">
                <input type="checkbox" style="width:20px;height:20px;" :checked="item.cb"  @click="modifyItem" :data-i="i">
                <h4>{{item.lname.length>7 ? item.lname.substring(0,7)+"..." :item.lname}}</h4>
                <h4>{{item.price}}</h4>
                <div class="mui-numbox">
                    <button class="mui-btn mui-btn-numbox-minus" type="button" @click="updateCount($event,-1)" :data-id="item.id" :data-pid="item.pid" :data-price="item.price" :data-count="item.count">-</button>
                    <input class="mui-input-numbox" type="number" v-model="item.count"/>
                    <button class="mui-btn mui-btn-numbox-plus" type="button"  @click="updateCount($event,1)" :data-id="item.id" :data-pid="item.pid" :data-price="item.price" :data-count="item.count">+</button>
                </div>
                <button class="layui-btn layui-btn-sm" @click="delItem" :data-id="item.id">删除</button>
            </div>
        </div>-->
        <goback style="top:8px;"></goback>
        <div style="height:40px;"></div>
        <div class="cart-top">
            <span>购物车</span>
        </div>
        <div class="cart-handle">
            <div>
                <input type="checkbox" style="width:20px;height:20px;" @click="setectAll" :checked="cball">
                <button class="layui-btn layui-btn-sm layui-btn-primary" @click="removeItem">删除选中</button> 
            </div>
            <div>小计：￥<span style="color:red;font-size:18px;">{{countPrice.toFixed(2)}}</span> </div>
            <button class="layui-btn layui-btn-sm layui-btn-normal">立即下单</button>
        </div>
        <div v-for="(item,i) in cartinfo" :key="i" class="cart-box">
            <div class="cart-list">
                <div class="cart-checkbox">
                    <input type="checkbox" style="width:20px;height:20px;" :checked="item.cb"  @click="modifyItem" :data-i="i" class="checkbox">
                </div>
                <div class="cart-img">
                    <img :src="'http://49.232.158.155:3000/'+item.md">
                </div>
                <div class="cart-info">
                    <h4>{{item.title.length > 45 ? item.title.slice(0,45) +'...' : item.title}}</h4>
                    <span style="color:red;font-size:18px;">¥&nbsp;{{item.price.toFixed(2)}}</span>
                    <span class="cart-count-handle">
                        <div class="mui-numbox">
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="updateCount($event,-1)" :data-id="item.id" :data-pid="item.pid" :data-price="item.price" :data-count="item.count">-</button>
                            <input class="mui-input-numbox" type="number" v-model="item.count"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button"  @click="updateCount($event,1)" :data-id="item.id" :data-pid="item.pid" :data-price="item.price" :data-count="item.count">+</button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <tabbar></tabbar>
        <!--占位，避免fied元素挡住内容>
        <div style="height:50px;"></div-->
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import { MessageBox } from 'mint-ui'
export default {
    data(){
        return {
            cartinfo:[],
            cball:false
        }
    },
    computed:{
        countPrice(){
            var sum=0;
            for(var item of this.cartinfo){
                if(item.cb==true){
                    sum+=item.price*item.count
                }
            }
            return sum;
        }
    },
    methods:{
        getShopCart(){
            var uid=2;
            var url=`http://49.232.158.155:3000/getShopCart?uid=${uid}`;
            this.axios.get(url).then(result=>{
                //console.log(result.data.code);
                //如果未登录状态
                if(result.data.code==-1){
                    //MessageBox.confirm('您尚未登录，去登录吗？').then(action => {
                    //    this.$router.push("/login");
                    //});
                    //MessageBox.alert('您尚未登录，请登录').then(action => {
                      //  this.$router.push("/login");
                    //});
                    MessageBox.confirm('',{
                        title:'提示',
                        message:'您尚未登录，去登录吗？',
                        confirmButtonText:'确认',
                        cancelButtonText:'取消'
                    }).then(action => {
                        console.log(23);
                        if (action == 'confirm') {
                            this.$router.push("/login");
                        }
                    }).catch(error =>{
                        if(error == 'cancel'){
                            this.$router.push("/home");
                        }
                    });
                    return;
                }
                var rows=result.data.data;
                //修改全局购物车中商品的数量
                this.$store.commit("updateCartCount",rows.length);
                for(var item of rows){
                    item.cb=false;
                }
                this.cartinfo=rows;
                //console.log(this.cartinfo);
            })
        },
        updateCount(e,i){
            var id=e.target.dataset.id;
            var pid=e.target.dataset.pid;
            var count=i;
            var price=e.target.dataset.price;
            var url=`http://49.232.158.155:3000/addcart?pid=${pid}&count=${count}&price=${price}`;
            this.axios.get(url).then(result=>{
                Toast(result.data.msg);
                this.getShopCart();
            });
        },
        delItem(e){
            var ids=e.target.dataset.id;
            //console.log(ids);
            var url="http://49.232.158.155:3000/delItem?ids="+ids;
            //console.log(url);
            this.axios.get(url).then(result=>{
                Toast(result.data.msg);
                this.getShopCart();
            })
        },
        setectAll(e){
            this.cball=e.target.checked;
            for(var item of this.cartinfo){
                item.cb=this.cball;
            }
        },
        modifyItem(e){
            var cb=e.target.checked;
            var i=e.target.dataset.i;
            this.cartinfo[i].cb=cb;
            var sum=0;
            for(var item of this.cartinfo){
                if(item.cb==true){
                    sum++
                }
            }
            if(sum==this.cartinfo
            .length){
                this.cball=true;
            }else{
                this.cball=false;
            }
        },
        removeItem(){
            var html="";
            for(var item of this.cartinfo){
                if(item.cb==true){
                    html+=item.id+","
                }
            }
            html=html.substring(0,html.length-1);
            var url="http://49.232.158.155:3000/delItem?ids="+html;
            this.axios.get(url).then(result=>{
                Toast(result.data.msg);
                this.getShopCart();
            })
        }
    },
    created(){
        this.getShopCart();
    }
}
</script>
<style scoped>
.layui-btn-sm{
    width:50px;
    font-size: 10px;
    text-align: center;
    padding: 0;
}
.layui-icon-delete{
    color: #999;
    position: absolute;
    font-size:24px;
    margin-left: 5px;
}
.cart-info .cart-count-handle{
    margin-left: 30px;
}
.mui-numbox{
    width: 75px;
    height: 31px;
    padding: 0;
}
.mui-numbox [class*=numbox-btn], .mui-numbox [class*=btn-numbox]{
    width: 22px;
}
.layui-btn-normal{
    background-color: #f83c31;
    width:95px;
    height: 50px;
    font-size: 16px;
}
.cart-top{
    height:40px;
    width:100%;
    background-color: #fff;
    position: fixed;
    top:0;
    text-align:center;
    line-height:40px;
    z-index: 10;
    border-bottom:1px solid #e4e2e2;
}
.cart-top>span{
    margin:0 auto;
    color:#333333;
    font-size:18px;
    font-weight: bold;
}
.cart-list{
    padding:10px 10px;
    display:flex;
    justify-content: space-between;
    width:100%;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
.cart-checkbox{
    width:10%;
    line-height: 70px;
}
.cart-img{
    width:30%;
    line-height: 80px;
}
.cart-img>img{
    width:80px;
    height:80px;
}
.cart-info{
    width:60%;
}
.cart-info>h4{
    font-size:14px;
    line-height:23px;
    font-weight: 400;
    margin-bottom: 10px;
    font-weight: 549;
}
.cart-info>span{
    font-size:16px;
    margin:10px 0;
}
.cart-item{
    position: relative;
    top:50%;
    margin: 5px 0;
    line-height: 31px;
}
h4{
    line-height: 31px;
}
.checkbox{
    width:20px;
    height:20px;
    padding:0;
    margin:0;
    background:#fff;
    border:1px solid #333333;
}
.cart-handle{
    width:100%;
    height:50px;
    background:#fff;
    padding-left:20px;
    display:flex;
    justify-content: space-between;
    position: fixed;
    bottom:46px;
    left:0px;
    z-index:10;
    align-items: center;
}
</style>