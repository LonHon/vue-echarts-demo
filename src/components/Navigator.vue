<template>
  <div class="main-navi">
    <ul>
      <li v-for="item in menu"> {{item}} </li>
    </ul>

  </div>
</template>

<script>
    export default {
        name: 'navigation',
        data () {
            return {
                menu: ['主页', '随笔', '相册', '影音']
            }
        }
    }
</script>

<style scoped>
  .main-navi{
    width: 100%;
    line-height: 30px;
    margin: 20px 0;
  }
  li{
    position: relative;
    display: inline-block;
    width: 100px;
    height: 30px;
    margin: 0 10px;
    border: 1px solid lavender;
    cursor: pointer;
  }
  li:after{
    content: "";
    position: absolute;
    display: block;
    bottom: 0;
    right: 0;
    left: 0;
    height: 0;
    transition: all 0.3s;
    background-color: rgba(0,0,255,0.1);
  }
  li:hover:after{
    content: "";
    height: 100%;
  }
  ul span{
    font-family: icon;
  }

</style>
