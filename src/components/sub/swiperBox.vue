<template>
    <div class="swipe-box">
        <mt-swipe>
            <mt-swipe-item v-for="(item,i) in list" :key="i">
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    },
    props:["list"]
}
</script>
<style scoped>
    .swipe-box .mint-swipe{
        height:140px;
    }
    .swipe-box .mint-swipe img{
        width:100%;
    }
</style>