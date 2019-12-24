import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "@/components/HelloWorld.vue"
import Home from "@/components/tabbar/Home.vue"
import Newslist from "@/components/home/NewsList.vue"
import GoodsList from "@/components/goods/GoodsList.vue";
import NewsInfo from "@/components/home/NewsInfo.vue";
import GoodInfo from "@/components/goods/GoodInfo.vue";
import Login from "@/components/home/Login.vue";
import ShopCart from "@/components/home/ShopCart.vue";
import hotCircle from "@/components/home/hotCircle.vue";
import SearchList from "@/components/home/SearchList.vue"
import Myself from "@/components/home/myself.vue";
import SendHotCircle from "@/components/home/sendHotCilcre.vue";
import Register from "@/components/home/Register.vue";
import Order from "@/components/home/Order.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home,name:"首页"},
    {path:'/newslist',component:Newslist,name:"新闻资讯"},
    {path:'/goodslist',component:GoodsList},
    {path:'/newsinfo',component:NewsInfo},
    {path:'/goodsinfo',component:GoodInfo},
    {path:'/login',component:Login},
    {path:'/shopcart',component:ShopCart},
    {path:'/hotcircle',component:hotCircle},
    {path:'/searchlist',component:SearchList},
    {path:'/myself',component:Myself},
    {path:'/sendhotcircle',component:SendHotCircle},
    {path:'/register',component:Register},
    {path:'/order',component:Order}
  ]
})
