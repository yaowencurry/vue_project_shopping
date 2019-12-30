<template>
    <div class="app-tabar">
        <nav class="mui-bar mui-bar-tab" style="bottom:-5px;">
            <router-link class="mui-tab-item" to="/home" :class="{active:shows==1}" @click.native="getActive1">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/hotcircle" :class="{active:shows==2}" @click.native="getActive2">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">好品圈</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcart" :class="{active:shows==3}" @click.native="getActive3">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">
                        {{$store.getters.optCartCount}}
                    </span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" href="#tabbar-with-chat" to="/myself" :class="{active:shows==4}" @click.native="getActive4">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
export default {
    name: "tabbar",
    data(){
        return {
                shows:1,
        }
    },
    methods:{
        getActive4(){this.shows=4},
        getActive1(){this.shows=1},
        getActive2(){this.shows=2},
        getActive3(){this.shows=3},
    },
    created(){
        if(this.$route.path=="/home"){
            this.shows=1
        }else if(this.$route.path=="/hotcircle"){
            this.shows=2
        }else if(this.$route.path=="/shopcart"){
            this.shows=3
        }else if(this.$route.path=="/myself"){
            this.shows=4
        }
    },
    watch:{
        $route(){
            if(this.$route.path=="/home"){
                this.shows=1
            }else if(this.$route.path=="/hotcircle"){
                this.shows=2
            }else if(this.$route.path=="/shopcart"){
                this.shows=3
            }else if(this.$route.path=="/myself"){
                this.shows=4
            }
        }
    }
}
</script>
<style scoped>

</style>