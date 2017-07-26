<template>
  <div id="rcontainer">
    <ul class="rnavi">
      <li :class=" {set:states.witchl} " @click="states.witchl= true">问题反馈</li>
      <li :class=" {set:!states.witchl} "  @click="states.witchl= false">历史反馈</li>
    </ul>
    <div v-if="states.witchl" class="rcontent">
      <div class="wrap">
        <h2 class="rheadp">反馈及意见</h2>
        <textarea class="rtextarea" id="rtext" placeholder="请描述您遇到的问题或反馈意见。若功能异常，上传页面截图会更快解决!" maxlength="300" @input="getword($event)">{{usertext}}</textarea>
        <p class="countwords"> {{ states.wordsCounter +"/300字"}}</p>
        <h2 class="rheadp">图片上传</h2>
        <div class="imgarea">

        </div>
      </div>
    </div>
    <div v-if="!states.witchl" class="rcontent">
      <div class="wrap">
        <h2 class="rheadp">历史反馈</h2>
      </div>

    </div>

  </div>
</template>

<script>
import imgUp from '@/components/imgUpLoad'
    export default {
        name: 'respons',
        data () {
            return {
                states:{
                    witchl: true,
                    wordsCounter: 0
                },
                usertext: "",
                rlist:[],

            }
        },
        components: { imgUp },
        methods: {
            getword: function (e) {
              this.states.wordsCounter = String(e.target.value).length;
            },
            setStorage: function (k) {//存入local

            },
            getStorage: function (k) {//读取local

            }
        }
    }
</script>

<style scoped>
  #rcontainer{
    position: absolute;
    top: 20%;
    left: 30%;
    width: 950px;
    height: 600px;
    background-color: rgb(24,41,71);
    color: #fff;
    text-align: left;
  }
  /*
    左侧导航
  */
  .rnavi{
    position: absolute;
    width: 220px;
    height: 100%;
    background-color: rgb(33,67,113);
    font-size: 14px;
    cursor: pointer;
  }
  .rnavi li{
    position: relative;
    text-indent: 10px;
    height: 30px;
    line-height: 30px;
  }
  .rnavi li:hover{
    background-color: rgb(22,41,71);
  }
  .rnavi .set{
    background-color: rgb(25,54,90);
  }
  .rnavi .set:before{
    content: ".";
    display: inline-block;
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    width: 2px;
    background-color: rgb(128,188,232);
  }

  /*
    新建反馈部分
  */
  .rcontent{
    width: 730px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 220px;
    overflow: auto;
  }
  .wrap{
    width: 90%;
    margin: 20px auto;
    border: 1px solid #fff;
  }
  .rheadp{
    font-weight: normal;
    font-size: 18px;
    margin: 10px 10px 20px 10px;
  }
  .rtextarea{
    resize: none;
    width: 645px;
    height: 200px;
    border: none;
    outline: none;
    background-color: rgb(33,67,113);
    padding: 10px 0 0 10px;
    color: #fff;
  }
  .countwords{
    text-align: right;
    margin-top: 10px;
    color: #6c7b98;
  }

</style>
