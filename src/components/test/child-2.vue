<template>
    <div>
        <h4>子组件2</h4>
        <button @click="send">发送数据</button>
        <p>vuex中接收的数据{{count}}</p>
        <button @click="add">+20</button>
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
        },
        add(){
            this.$store.state.count+=20
        }
    },
    computed:{
        count(){
            return this.$store.state.count
        }
    }
}
</script>
<style scoped>

</style>