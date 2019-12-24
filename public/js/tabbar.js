import tabbarComponent from "../src/components/tabar/tabar.vue";
const tabbar={
    install:function(Vue){
        Vue.component('tabbar',tabbarComponent)
    }
};
export default tabbar;