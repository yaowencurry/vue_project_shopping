<template>
 <div class="app-container">
    <!--2：占位符用来显示其他的组件-->
    <router-view></router-view>
    <!--3:添加公共组件tarbar-->
   

 </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
   data(){
      return {
         i:0
      }
   },
   methods:{},
   created(){
      //监控路由变换，控制返回按钮的显示
      if(this.$route.path=="/home" || this.$route.path=="/shopcart" || this.$route.path=="/Search" || this.$route.path=="/myself" || this.$route.path=="/searchlist" || this.$route.path=="/login"){
         this.isshow=false;
      }else{
         this.isshow=true;
      }
   },
   watch:{
      $route(){     //监控路由变换，控制返回按钮的显示
         if(this.$route.path=="/home" || this.$route.path=="/shopcart" || this.$route.path=="/Search" || this.$route.path=="/myself" || this.$route.path=="/searchlist" || this.$route.path=="/login"){
            this.isshow=false;
         }else{
            this.isshow=true;
         }
      }
   },
}
</script>
<style>
   .active{
      color: #007aff !important
   }
   .app-container{
     padding-bottom:50px;
     overflow-x:hidden;
   }

   .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
   }
   .mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
   }
   .mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}

</style>
