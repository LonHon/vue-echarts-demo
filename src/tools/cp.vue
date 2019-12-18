<!--
 * @Author: lonhon
 * @Date: 2018-01-25 17:26:44
 * @Last Modified by:   github.lonhon
 * @Last Modified time: 2018-01-25 17:26:44
-->
<template>
  <div id="calendar-cp" class="cale-cp-container" onselectstart="return false;">
    <singleCale :initDay="startOption.day" :lockDay="startOption.dis"  v-on:changeDate="getDatea"></singleCale>
    <singleCale :initDay="endOption.day" v-bind:lockDay="endOption.dis"  v-on:changeDate="getDateb"></singleCale>
  </div>
</template>

<script>
import singleCale from './calendar.vue'

export default {
  data () {
    return {
      startOption: {
        day: '',
        dis: ''
      },
      endOption: {
        day: '',
        dis: ''
      },
      outDate: {
        s: '',
        e: ''
      }
    }
  },
  props: ['initOpt'], // 初始化选项
  components: { singleCale },
  methods: {
    getDateByDate: function (currDate, num) { // 根据日期和num获取指定日期
      currDate = currDate.replace(/\./g, '/')
      num = Math.floor(num)
      var myDate = new Date(currDate)
      var lw = new Date(myDate - 1000 * 60 * 60 * 24 * -num) // num表示天数
      var lastY = lw.getFullYear()
      var lastM = lw.getMonth() + 1
      var lastD = lw.getDate()
      var startdate = lastY + '.' + (lastM < 10 ? '0' + lastM : lastM) + '.' + (lastD < 10 ? '0' + lastD : lastD)
      return startdate
    },
    getSubDays: function (sDate1, sDate2) { // 获取两日期之差
      var time1 = Date.parse(new Date(sDate1))
      var time2 = Date.parse(new Date(sDate2))
      var nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24))
      return nDays
    },
    dateCompare: function (da, db) { // 日期比较 小于等于为false
      if (new Date(da).getTime() > new Date(db).getTime()) {
        return true
      }
      return false
    },
    getDatea: function (d) { // 开始日期
      this.endOption.dis = d
      this.outDate.s = d
      if (this.dateCompare(d, this.outDate.e)) { // 重置结束日期
        this.endOption.day = this.outDate.e = this.getDateByDate(d, 1)
      }
      this.outPut()
    },
    getDateb: function (d) { // 结束日期
      this.outDate.e = d
      this.outPut()
    },
    outPut: function () { // 传出
      let date = this.outDate.s + '-' + this.outDate.e
      this.$emit('changeRangeDate', date)
    }
  },
  created: function () {
    this.startOption.day = this.initOpt.start
    this.endOption.day = this.initOpt.end
    if (this.initOpt.isDis) {
      this.startOption.dis = this.outDate.s = this.initOpt.start
      this.endOption.dis = this.outDate.e = this.initOpt.end
    }
  },
  mounted: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cale-cp-container{
  width: 100%;
  height: 100%;
  position: relative;
  border:solid;
  display: flex;
}
</style>
