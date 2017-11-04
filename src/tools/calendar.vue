<template>
  <div id="calendar" onselectstart="return false;">
    <div class="chead">
      <span @click="preMonth()"><</span>
      <span>{{ viewData.title }}</span>
      <span @click="nextMonth()">></span>
    </div>
    <div class="cweek">
      <ul>
        <li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
      </ul>
    </div>
    <div class="cbody">
      <ul>
        <li v-for="day in viewData.days" v-text="day" :key="day" :class="{checkday:checkDay==day, hidden: day<1 }" @click="pick(day)" ></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "calendar",
    data() {
      return {
        viewData:{
          title: "",
          days: [],
        },
        today: -1,
        checkDay: -1,
        currentYear: 1970,
        currentMonth: -1,
        currentDate: -1
      };
    },
    methods: {
      formatDate: function(year, month, day) {  // 返回 类似 2016-01-02 格式的字符串
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        var d = day;
        if (d < 10) d = "0" + d;
        return (y + "-" + m + "-" + d);
      },
      initDate: function(markDate) {//初始化
        var that = this,
          cur = new Date(markDate) || new Date(),
          cday = cur.getDate(),
          cmon = cur.getMonth()+1,
          cyear = cur.getFullYear();
        that.getDays(that.formatDate(cyear,cmon,cday));
        that.checkDay = cday;
      },
      getDays: function(date) {//通过改变days，title来改变视图
        let nd = date.split("-") || date.split("/"),
          _week = (new Date(nd[0], nd[1]-1, 1)).getDay(),
          d = new Date(nd[0], nd[1], 0),
          ds = d.getDate(),
          r = [];
        this.currentYear = nd[0];
        this.currentMonth = nd[1];
        this.currentDate = nd[2];
        this.viewData.title = nd[0]+'-'+nd[1];
        for (let d = -_week; d < 35; d++) {
          r.push(d<ds?d+1:0);
        }
        return (this.viewData.days = r);
      },
      preMonth: function(){
        this.currentMonth--;
        this.getDays(this.currentYear+'-'+this.currentMonth+'-'+this.currentDate);
      },
      nextMonth: function(){
        this.currentMonth++;
        this.getDays(this.currentYear+'-'+this.currentMonth+'-'+this.currentDate);
      },
      pick: function(day) {//向父级选中暴露日期
        this.checkDay=day;
      }
    },
    mounted: function() {
      this.initDate('2017-7-4');
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    box-sizing: border-box;
  }
  #calendar {
    padding: 0 30px;
    color: #000;
    position: relative;
    top: 150px;
    width: 400px;
    height: 300px;
    background-color: rgba(0, 184, 236, 1);
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 14px;
  }
  ul {
    list-style: none;
  }
  ul li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 25px;
    line-height: 30px;
    margin: 3px 7px;
  }

  .chead {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    display: flex;
    justify-content:space-around;
  }
  .chead span{
    cursor: pointer;
  }
  .cweek {
    padding-left: 10px;
  }
  .cweek ul {
    display: flex;
  }

  .cbody {
    position: relative;
    padding-left: 10px;
  }
  .cbody ul {
    display: flex;
    flex-wrap: wrap;
  }
  .cbody li {
    margin: 1px 7px;
    cursor: pointer;
  }
  .checkday {
    background-color: lightblue;
    color: #fff;
  }
  .hidden {
    visibility: hidden;
  }
</style>
