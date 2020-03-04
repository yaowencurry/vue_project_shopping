<template>
    <div>
        <h4>子组件</h4>
        <p>父组件传递过来的数据----{{msg}}</p>
        <p>接收兄弟组件传递的数据--{{msg2}}</p>
        <p>vuex中的数据:{{count}}</p>
        <button @click="add"> +10 </button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            info:"子组件中的数据",
            str:"儿子的数据"
        }
    },
    props:["msg","msg2"],
    created(){
        this.$emit("tap",this.str)
    },
    computed:{
        count(){
            return this.$store.state.count
        }
    },
    methods:{
        add(){
            this.$store.state.count+=10
        }
    }
}
</script>
<style scoped>

</style>