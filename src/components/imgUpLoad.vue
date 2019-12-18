<template>
  <div class="hello">
    <div class="imgArea">
      <h2>图片上传预览</h2>
      <ul>
        <li v-for="(item,index) in mmm" :key="index">
          <span>+</span>
          <img v-if="item.data != ''" v-bind:src=" item.data || index " >
          <input type="file" :id=" item.name " @change="pushImg($event,index)" accept="image/jpeg,image/png,image/gif" alt="">
          <span class="clear" v-if="item.data != ''" @click="delImg($event,index)">删</span>
        </li>
      </ul>
    </div>
    <div class="tips" v-if="flag.change">添加成功</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      flag: {
        change: false
      },
      mmm: [
        {
          name: 'AAAAA',
          data: ''
        },
        {
          name: 'AAAAB',
          data: ''
        },
        {
          name: 'AAAAC',
          data: ''
        },
        {
          name: 'AAAAB',
          data: ''
        },
        {
          name: 'AAAAC',
          data: ''
        }
      ]
    }
  },
  methods: {
    pushImg: function (e, i) {
      let mm = this.mmm; let flag = this.flag; let file = e.target; let reader = new FileReader()
      reader.readAsDataURL(file.files[0])
      reader.onload = function () {
        mm[i].data = this.result
        flag.change = true
        setTimeout(() => {
          flag.change = false
        }, 2000)
      }
    },
    delImg: function (e, i) {
      this.mmm[i].data = ''
      let dom = document.getElementById(this.mmm[i].name)
      dom.value = ''
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .imgArea{
    width: 400px;
    height: 200px;
    margin: 120px auto;
  }
  .imgArea ul{
    margin-top: 30px;
  }
  .imgArea li{
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    position: relative;
    border: 1px solid #485214;
    margin-right: 10px;
  }
  .imgArea img{
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
  }
  .imgArea input{
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 5;
  }
  .imgArea .clear{
    font-size: 16px;
    color: orangered;
    position: absolute;
    right: -5px;
    top: -25px;
    cursor: pointer;
  }
  .tips{
    font-size: 25px;
    width: 200px;
    height: 100px;
    margin: 0 auto;
    border: 1px solid rosybrown;
  }
</style>
