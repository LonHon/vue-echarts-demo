<template>
  <div id="search">
    <div class="left-side-box">
      <label for="calendar-value">日期:</label>
      <input v-model="calendarInitDay" id="calendar-value" type="text" @click="calendarShow=!calendarShow" style="cursor:pointer;" readonly placeholder="点击我显示日历">
      <!-- 日历容器{宽度、定位}  点击容器后关闭日历 -->
      <div v-show="calendarShow" class="calendar-box">
        <calendar v-on:changeDate="getDate" :initDay="calendarInitDay">
          <!-- 可传入初始值 -->
        </calendar>
      </div>
    </div>
  </div>
</template>

<script>
    import calendar from '@/tools/calendar'
    export default {
        name: 'search',
        data () {
            return {
                calendarInitDay: '2017-12-12',
                calendarShow: true
            }
        },
        components: {'calendar':calendar},
        methods: {
          getDate: function(d){//获取组件返回的日期
            this.calendarInitDay = d;
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
</style>
