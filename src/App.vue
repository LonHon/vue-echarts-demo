<template>
  <div id="app">
    <div class="navigarea">
      <Navi></Navi>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navi from '@/components/Navigator'
export default {
  name: 'app',
  data(){
    return{
    }
  },
  methods: {
  },
  components: { Navi }
}
</script>

<style>
  @import '../static/style/reset.css';
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
  h2{
    font-size: 20px;
    margin: 10px;
  }
  .navigarea{
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 99999;
  }
  .main {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
