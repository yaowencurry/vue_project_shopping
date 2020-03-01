<template>
    <div>
        <h3>父组件</h3>
        <p>子组件传递过来的数据----{{hello}}</p>
        <p>子组件2传递过来的数据----{{sayhi}}</p>
        <hr>
        <child :msg="num" @tap="handle" :msg2="sayhi"></child>
        <hr>
        <child-1 @hel="sayHi"></child-1>
    </div>
</template>
<script>
import child from "./child.vue"
import child1 from "./child-2.vue"
export default {
    data(){
        return {
            str:"父组件中的数据",
            num:20,
            hello:"",
            sayhi:""
        }
    },
    components:{
        "child":child,
        "child-1":child1
    },
    methods:{
        handle(msg){
            this.hello=msg
        },
        sayHi(msg){
            this.sayhi=msg
        }
    }
}
</script>
<style scoped>

</style>