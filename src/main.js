// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//引入tabbar/goback两个全局组件
import gobackComponent from "@/components/sub/back.vue";
import tabbar from "@/components/tabbar/tabbar.vue";
Vue.component('goback',gobackComponent);
Vue.component('tabbar',tabbar);

//全局组件注册另外一种写法
// import goback from "./assets/js/base.js";
// Vue.use(goback);
// import tabbar from "./assets/js/base.js";
// Vue.use(tabbar);

//引入elemen Ui组件
/*
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import { Select } from 'element-ui';
Vue.component(Select.name, Select);
*/

//引入vuex
import Vuex from "vuex"
//注册vuex
Vue.use(Vuex);
//创建store对象
var store=new Vuex.Store({
  state:{
    cartCount:sessionStorage.getItem("cartCount") || 0
  },
  mutations:{
    increment(state){
      state.cartCount++;
    },
    updateCartCount(state,count){
      state.cartCount=count;
      sessionStorage.setItem("cartCount",count)
    }
  },
  getters:{
    optCartCount:function(state){
      return state.cartCount;
    }
  }
})

import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
//7.导入 MUI 的样式表， 和 Bootstrap 用法没有差别
// import './assets/lib/mui/css/mui.css'
// // 导入 MUI 的样式表，扩展图标样式，购物车图标
// // 还需要加载图标字体文件
// import './assets/lib/mui/css/icons-extra.css'

// //引入layui
// import './assets/lib/layui/css/layui.css'
// import './assets/lib/layui/css/layui.mobile.css'

//从static中引入mintui和layui
import '../static/lib/mui/css/mui.css'
import '../static/lib/mui/css/icons-extra.css'
import '../static/lib/layui/css/layui.css'
import '../static/lib/layui/css/layui.mobile.css'


//配置测试和正式环境下的接口地址
import BaseUrl from './assets/js/apiUrl.js';
Vue.prototype.BaseUrl = BaseUrl;

import Mint from 'mint-ui';
Vue.use(Mint);



import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button)
//1:引入axios库
import axios from "axios";
//2:配置跨域访问保存session
axios.defaults.withCredentials=true;
//3:将axios库配置到Vue实例对象中
Vue.prototype.axios=axios;
//8.引入qs
import qs from "qs";
Vue.prototype.qs=qs;


//创建日期的过滤器
Vue.filter("datetimefilter",function(val){
  //1.创建日期对象
  var date=new Date(val);
  //2.获取年月日时分秒
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var mi=date.getMinutes();
  var s=date.getSeconds();
  //3.返回字符串   年-月-日  时-分-秒
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`
})
//新闻中的日期过滤器
Vue.filter("nesDateFilter",function(val){
  //1.创建日期对象
  var date=new Date(val);
  //2.获取年月日时分秒
  var y=date.getFullYear();
  var m=date.getMonth();
  var d=date.getDate();
  var mi;
  switch(m){
    case m=0:
      mi="Jan.";
      break;
    case m=1:
      mi="Feb.";
      break;    
    case m=2:
      mi="Mar.";
      break;    
    case m=3:
      mi="Apr.";
      break;    
    case m=4:
      mi="May.";
      break;    
    case m=5:
      mi="June.";
      break;    
    case m=6:
      mi="July.";
      break;    
    case m=7:
      mi="Aug.";
      break;    
    case m=8:
      mi="Sept.";
      break;    
    case m=9:
      mi="Oct.";
      break;    
    case m=10:
      mi="Nov.";
      break;    
    case m=11:
      mi="Dec.";
      break;    
  }
  return `${mi}  ${d},${y}`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
