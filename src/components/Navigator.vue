<template>
  <div class="main-navi">
    <div class="navi-container">
      <ul>
        <template  v-for="(item, index) in menu">
          <router-link v-if="item.path" :to="item.path" @click="changeNavi($event,item.name)"><li class="navi-item" :title="item.descript"> {{item.name}} </li></router-link>
        </template>
      </ul>
      <!--<div class="navi-closer"></div>-->
    </div>
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
                    name: '双一流',
                    path: '/edu_syl',
                    descript: '双一流大学、学科分布'
                  },
                  {
                    name: '图片',
                    path: '/upImage',
                    descript: '图片上传预览组件'
                  },
                  {
                    name: 'Echarts',
                    path: '/chart',
                    descript: '百度eCharts做的一些demo'
                  },
                  {
                    name: '工具',
                    path: '/toolShow',
                    descript: '一些自制控件演示'
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
    height: 60px;
    line-height: 30px;
    margin: 20px 0;
    z-index: 99;
  }
  .navi-closer{
    display: block;
    width: 45px;
    height: 45px;
    position: absolute;
    top: 60px;
    right: 80px;
    background-image: url("../../static/images/navi_closer.png") ;
    background-repeat: no-repeat;
    cursor: pointer;
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
  .navi-item{
    background: #fff;
  }

</style>
