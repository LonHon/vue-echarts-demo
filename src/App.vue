<template>
  <div id="app">
    <hello></hello>
    <p>上面是作为模块引入的</p>
    <button @click="test()" >玩玩箭头函数</button>
    <router-link to="/hhh"> <h5>图片上传</h5></router-link>
    <Navi></Navi>
    <p>下面是路由到页面中的</p>
    <router-view></router-view>
    <hr>
  </div>
</template>

<script>
  import Navi from '@/components/Navigator'
  import Hello from '@/components/Hello'
export default {
  name: 'app',
  data(){
    return{
    }
  },
  methods: {
      test: ()=>{
          let arr= [true,666666,3];
          let [q,w,e] = arr;
          console.log(q,w,e)
      }
  },
  components: { Navi, Hello }
}
</script>

<style>
  @import '../src/assets/style/reset.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
