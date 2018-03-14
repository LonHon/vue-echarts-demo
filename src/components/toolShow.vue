<template>
  <div id="search">
    <div class="left-side-box">
      <label for="calendar-value">日期:{{ calendarInitDay }}</label>
      <input v-show="false" v-model="calendarInitDay" id="calendar-value" type="text" @click="calendarShow=!calendarShow" style="cursor:pointer;" readonly placeholder="点击我显示日历">
      <!-- 日历容器{宽度、定位}  点击容器后关闭日历 -->
      <div v-show="false" class="calendar-box">
        <calendar
          v-on:changeDate="getDate"
          :initDay="calendarInitDay"
          :lockDay="false">
          <!-- 可传入初始值 -->
        </calendar>
      </div>
      <div v-show="calendarShow" class="cale-cp">
        <calendarCp :initOpt="opt" v-on:changeRangeDate="getDateRange"></calendarCp>
      </div>
    </div>
    <p class="ap">
      <movespan :txt="stxt"></movespan>
    </p><br>
    <p style="text-align:center;">
      {{stxt}}
    </p>
  </div>
</template>

<script>
    import calendar from '@/tools/calendar'
    import calendarCp from '@/tools/cp'
    import movespan from '@/tools/scrollSpan'
    export default {
        name: 'search',
        data () {
            return {
                calendarInitDay: '2017-12-29',
                calendarShow: false,
                opt:{
                  start: '2018.01.29',
                  end:'2018.01.30',
                  isDis: false
                },
                stxt:"容器装不下--------你才胖test"
            }
        },
        components: {calendar,calendarCp,movespan},
        methods: {
          getDate: function(d){//获取组件返回的日期
            this.calendarInitDay = d;
          },
          getDateRange: function(rd){//获取双日历返回日期范围
            this.calendarInitDay = rd;
          }
        },
    }
</script>

<style scoped>
  #search{
    padding-top: 100px;
  }
  .left-side-box{
    width: 400px;
    height: 400px;
    margin: 0 auto;

  }
  .calendar-box{
    width: 300px;
    position: relative;
    top: 15px;
    left: 100px;
  }
  .cale-cp{
    width: 600px;
    position: relative;
    top: 15px;
    left: 100px;
  }
  .ap{
    width:100px;
    height: 50px;
    line-height: 50px;
    border: 2px solid steelblue;
    padding: 0 5px;
    margin-left: 900px;
    cursor:pointer;
    overflow:hidden;
  }
</style>
