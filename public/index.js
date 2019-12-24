import gobackComponent from "../src/components/sub/back.vue";
import tabbarComponent from "../src/components/tabbar/tabbar.vue";
const baseComponent={
    install:function(Vue){
        Vue.component('goback',gobackComponent),
        Vue.component('tabbar',tabbarComponent)
    }
};
export default baseComponent;