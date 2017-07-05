<template>
  <div class="main-navi">
    <ul>
      <template  v-for="(item, index) in menu">
        <router-link v-if="item.path" :to="item.path" @click="changeNavi($event,item.name)"><li :title="item.descript"> {{item.name}} </li></router-link>
      </template>
    </ul>

  </div>
</template>

<script>
    export default {
        name: 'navigation',
        data () {
            return {
                currentNavi: '',
                menu: [
                  {
                      name: '主页',
                      path: '/',
                      descript: 'home'
                  },
                  {
                    name: '图片',
                    path: '/hhh',
                    descript: '图片上传预览组件'
                  },
                  {
                    name: '相册',
                    path: ''
                  },
                  {
                    name: '影音',
                    path: ''
                  }
                ]
            }
        },
        methods: {
          changeNavi: function(e, n){
              this.currentNavi = n;
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
