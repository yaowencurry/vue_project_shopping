<template>
    <div>
        <h4>子组件2</h4>
        <button @click="send">发送数据</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            num:100
        }
    },
    methods:{
        send(){
            this.$emit("hel",this.num)
        }
    }
}
</script>
<style scoped>

</style>