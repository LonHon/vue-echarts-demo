<template>
  <div id="calendar" onselectstart="return false;">
    <div class="chead">
      <span class="tle">{{ curY +"-"+ curM }}</span>
      <div class="mbtn">
        <span @click="preMonth()"><</span>
        <span @click="nextMonth()">></span>
      </div>
    </div>
    <div class="cweek">
      <ul>
        <li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
      </ul>
    </div>
    <div class="cbody">
      <ul>
        <li v-for="day in days" :key="day"
        v-text="day.num" :title="day.date"
        :class="{otherMonth: day.otherMonth, today:day.date===today,checkday: day.date===checkDay}"
        @click="pick(day.date)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      checkDay: "",
      today:"",
      curY: 0,
      curM: 0,
      days: [
        // num: 号数,
        // date: 完整日期,
        // otherMonth: 是否其它月
      ]
    };
  },
  methods: {
    formatDate: function(year, month, day) {
      // 返回 类似 2016-01-02 格式的字符串
      let y = year,
        m = month;
      if (m < 10) m = "0" + m;
      let d = day;
      if (d < 10) d = "0" + d;
      return y + "/" + m + "/" + d;
    },
    initDate: function(markDate) {
      //初始化
      let that = this,
        today = new Date(),
        cur = markDate? new Date(markDate) : today, //初始日期
        cday = cur.getDate(), //号数
        cmon = cur.getMonth() + 1, //月份
        cyear = cur.getFullYear(); //年份
        console.log(cur)
      this.today = this.formatDate(today.getFullYear(),today.getMonth()+1,today.getDate());
      return this.render(cyear, cmon);
    },
    render: function(y, m) {
      //渲染内容  m=1~12
      this.curY = y;
      this.curM = m;
      this.days = [];
      let cur = new Date(y, m - 1, 1),
        sumDay = new Date(y, m, 0).getDate(), //当月总天数
        lastSumDay = new Date(y, m - 1, 0).getDate(), //上月总天数
        week = cur.getDay(), //本月1号周几
        total = sumDay + week + 1 > 35 ? 42 : 35;

      for (let i = 0; i < total; i++) {
        //固定5行
        if (i < week) {
          this.days.push({
            //上月
            num: lastSumDay - week + i + 1,
            date: this.formatDate(y, m - 1, lastSumDay - week + i + 1),
            otherMonth: true
          });
        } else if (i - week < sumDay) {
          this.days.push({
            //本月
            num: i - week + 1,
            date: this.formatDate(y, m, i - week + 1),
            otherMonth: false
          });
        } else {
          this.days.push({
            //下月
            num: i - sumDay - week + 1,
            date: this.formatDate(y, m + 1, i - sumDay - week + 1),
            otherMonth: true
          });
        }
      }
    },
    pick: function(date) {
      //选中日期并传出
      this.checkDay = date;
      let cur = new Date(date),
        cy = cur.getFullYear(),
        cm = cur.getMonth() + 1;
      return this.render(cy, cm);
    },
    preMonth: function() {
      let nd = new Date(this.curY, Number(this.curM) - 1, 1),
        y = nd.getFullYear(),
        m = nd.getMonth();
      if (m === 0) {
        y = y - 1;
        m = 12;
      }
      return this.render(y, m);
    },
    nextMonth: function() {
      let nd = new Date(this.curY, Number(this.curM) + 1, 1),
        y = nd.getFullYear(),
        m = nd.getMonth();
      if (m === 0) {
        y = y - 1;
        m = 12;
      }
      return this.render(y, m);
    },
    sentToFather: function(date) {
      //返回给调用该组件的父级
    }
  },
  mounted: function() {
    this.initDate();
    this.checkDay = "2017/11/08";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
#calendar {
  margin: 0 auto;
  width: 320px;
  position: relative;
  top: 150px;
  font-size: 14px;
  color: #000;
  padding: 35px 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
ul {
  list-style: none;
}
ul li {
  display: inline-block;
  width: 8.28%;
  border-radius: 15px;
  line-height: 30px;
  margin: 3px 7px;
}

.chead {
  position: relative;
}
.chead .tle{
  font-size: 19px;
  position: absolute;
  left: 16px;
}
.chead .mbtn{
  display: flex;
  justify-content: space-between;
  width: 50px;
  font-size: 18px;
  position: absolute;
  right: 30px;
  color: #888;
}
.chead .mbtn span:hover{
  color: rgb(0, 189, 255);
}
.chead span {
  cursor: pointer;
}
.cweek {
  margin-top: 25px;
  border-bottom: 1px solid rgb(0, 189, 255);
}
.cbody {
  position: relative;
}
.cbody li {
  cursor: pointer;
}
.today {
  background-color: #eee;
}
.checkday {
  background-color: rgb(0, 189, 255);
  color: #fff;
}
.otherMonth {
  color: #aaa;
}
</style>
