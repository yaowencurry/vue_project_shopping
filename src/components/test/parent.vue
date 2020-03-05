<template>
    <div>
        <h3>父组件</h3>
        <p>子组件传递过来的数据----{{hello}}</p>
        <p>子组件2传递过来的数据----{{sayhi}}</p>
        <hr>
        <child :msg="num" @tap="handle" :msg2="sayhi"></child>
        <hr>
        <child-1 @hel="sayHi"></child-1>
        <div>
            <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">1</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">1</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">2</div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
        </div>
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
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>