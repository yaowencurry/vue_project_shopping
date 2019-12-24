import gobackComponent from "@/components/sub/back.vue";
import tabbarComponent from "@/components/tabbar/tabbar.vue";
const baseComponent={
    install:function(Vue){
        Vue.component('goback',gobackComponent),
        Vue.component('tabbar',tabbarComponent)
    }
};
export default baseComponent;