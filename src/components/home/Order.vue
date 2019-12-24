<template>
    <div class="app-order">
        <goback></goback>
        <div class="order-top">确认订单</div>
        <div class="order order-address">
            <div class="address-info">
                <span>收货人</span>
                <span>李四</span>
            </div>
            <div class="address-info">
                <span>联系方式</span>
                <span><input type="text" v-model="address"></span>
            </div>
            <div class="address-info">
                <span>收货地址</span>
                <span>山东省青岛市崂山区海尔路1号</span>
            </div>
            <a href="#" class="adress-update">更改收货地址</a>
        </div>
        <div class="order order-info">
            <div class="info-product good-info">
                <div class="product-img">
                    <img :src="obj.img_md" alt="">
                </div>
                <div class="product-info">
                    <p class="product-name">{{obj.title}}</p>
                    <span class="product-spec">{{obj.spec}}</span>
                    <div class="product-price">
                        <span>￥{{obj.price}}</span>
                        <span>数量{{obj.count}}个</span>
                    </div>
                </div>
            </div>
            <div class="info-product">
                <span>配送服务</span>
                <span>快递包邮</span>
            </div>
            <div class="info-product">
                <span>买家备注</span>
                <input type="text" placeholder="请输入备注信息" v-model="remark">
            </div>
        </div>
        <div class="order order-other">
            <div class="other-flex">
                <span>商品金额</span>
                <span>199.99</span>
            </div>
            <div class="other-flex">
                <span>运费</span>
                <span>0.00</span>
            </div>
            <div class="other-flex pay-money">
                <span></span>
                <span>实付金额: {{pay_money.toFixed(2)}}</span>
            </div>
            <div>
                <button @click="createOrder">提交订单</button>
            </div>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            obj:{},
            address:"山东省青岛市城阳区",
            remark:""
        }
    },
    computed:{
        pay_money(){
            return this.obj.price*this.obj.count;
        }
    },
    methods:{
        createOrder(){
            var postData = this.qs.stringify({
                order_address:this.address,
                order_money:this.pay_money,
                lid:this.obj.lid,
                order_count:this.obj.count,
                order_remark:this.remark
            });
            var url = "http://49.232.158.155:3000/order";
            this.axios.post(url,postData).then(res=>{
                if(res.data.code==-1){
                    Toast("当前用户未登录");
                    return;
                }
                Toast("订单创建成功");
                this.$router.push("/myself");
            })
        }
    },
    created(){
        this.obj = this.$route.query;
    }
}
</script>
<style scoped>
.order-address .address-info input{
    padding: 0;
    border:none;
    margin: 0;
}
div.pay-money span{
    font-size: 16px;
    font-weight: bold;
}
.other-flex>span:last-child{
    color: #eb3c40;
}
.other-flex{
    display: flex;
    justify-content: space-between;
}
.order-other>div>button{
    border:none;
    width:100%;
    background-color: #eb3c40;
    height: 50px;
    color: #fff;
    font-size: 16px;
}
.order-other>div{
    margin-bottom:10px;
}
.product-price>span:first-child{
    color: #eb3c40;
    font-weight: bold;
}
.product-price>span{
    line-height: 1.5;
}
.product-price{
    display: flex;
    justify-content: space-between;
}
.product-spec{
    color: #aaa;
    font-size:12px;
}
.product-info .product-name{
    color:#333;
    font-weight: bold;
    font-size:14px;
}
.product-name,.product-spec,.product-price{
    padding:5px 0;
}
.product-info{
    width:75%;
}
.product-img img{
    width:95%;
    border:1px solid #ddd;
}
.product-img{
    width:25%;
    height: 60px;
    padding: 0 5px 0 0;
}
.info-product:nth-child(3){
    line-height: 4;
}
.info-product:nth-child(2){
    padding:10px 0;
}
.info-product>span:first-child{
    width:25%;
}
.info-product input{
    margin-top:10px;
    border:none;
}
.info-product{
    border-bottom: 1px solid #eee;
    display: flex;
}
.adress-update{
    position: absolute;
    top: 13px;
    right: 16px;
    color: #eb3c40;
    text-decoration: underline;
    cursor: pointer;
}
.address-info span:first-child{
    color:#aaa;
    width:25%;
}
.address-info span{
    display: inline-block;
}
.address-info{
    padding:5px 0;
}
.order-address{
    position: relative;
}
.order{
    width:100%;
    background-color: #fff;
    margin-bottom: 15px;
    padding: 10px 20px;
}
.order-top{
    width:100%;
    height: 40px;
    background-color: #f7f7f7;
    color: #333;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
}
</style>