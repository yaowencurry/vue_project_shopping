<template>
    <div>
        <div v-show="isshow" class="back">
            <i class="layui-icon layui-icon-left"></i>
            <span @click="back">返回</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isshow:true
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.back{
   position: fixed;
   top:8px;
   left:15px;
   z-index: 100;
   color:#333333;
   font-size:16px;
}
</style>