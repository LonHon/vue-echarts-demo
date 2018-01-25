<!--
 * @Author: lonhon
 * @Date: 2018-01-25 17:26:44
 * @Last Modified by:   github.lonhon
 * @Last Modified time: 2018-01-25 17:26:44
-->
<template>
  <div id="calendar" onselectstart="return false;">
    <div class="chead">
      <span class="tle">{{ curY +"/"+ curM }}</span>
      <div class="mbtn">
        <span @click="preMonth()"><i>&#xe892;</i></span>
        <span @click="nextMonth()"><i>&#xe891;</i></span>
      </div>
    </div>
    <div class="cweek">
      <ul>
        <li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
      </ul>
    </div>
    <div class="cbody">
      <ul>
        <li v-for="day in days" :key="day">
          <span v-text="day.num" :title="day.date"
          :class="{otherMonth: day.otherMonth, today:day.date===today,checkday: day.date===checkDay}"
          @click="pick(day.date)">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      checkDay: "", //选中日期
      today: "", //今日
      curY: 0, //check年份
      curM: 0, //check月份
      days: [
        // num: 号数,
        // date: 完整日期,
        // otherMonth: 是否其它月
      ]
    };
  },
  props: ["initDay"], //默认选中日期
  methods: {
    formatDate: function(year, month, day) {
      // 返回 类似 2016-01-02 格式的字符串
      let y = year,
        m = month;
        if(m>12){ //明年
            y += 1;
            m -= 12;
        }
        if(m<1){ //去年
            y -= 1;
            m += 12;
        }
      if (m < 10) m = "0" + m;
      let d = day;
      if (d < 10) d = "0" + d;
      return y + "/" + m + "/" + d;
    },
    initDate: function(markDate) {
      //初始化
      let that = this,
        today = new Date(),
        cur = markDate ? new Date(markDate) : today, //初始日期
        cday = cur.getDate(), //号数
        cmon = cur.getMonth() + 1, //月份
        cyear = cur.getFullYear(); //年份
      this.today = this.formatDate(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
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
        total = sumDay + week + 1 > 35 ? 42 : 35; //适应最大展示数量

      for (let i = 0; i < total; i++) {
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
      this.render(cy, cm);
      return this.sentToFather(this.checkDay);
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
    sentToFather: function(d) {
      d = d.replace(/\//g, "-");
      this.$emit("changeDate", d);
    }
  },
  created: function() {},
  mounted: function() {
    let d = this.initDay;
    d = d.replace(/-/g, "/");
    this.checkDay = d;
    this.initDate(d);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
#calendar {
  width: 100%;
  position: relative;
  font-size: 14px;
  color: #000;
  padding: 20px 15px 25px 15px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
ul {
  list-style: none;
}
ul li {
  display: inline-block;
  position: relative;
  width: 13%;
  margin: 5px 0;
}

.chead {
  position: relative;
  width: 100%;
  margin-bottom: 35px;
}
.chead .tle {
  font-size: 19px;
  position: absolute;
  left: 16px;
}
.chead .mbtn {
  display: flex;
  justify-content: space-between;
  width: 50px;
  font-size: 18px;
  position: absolute;
  right: 30px;
  color: #888;
}
.chead .mbtn span:hover {
  color: rgb(0, 189, 255);
}
.chead .mbtn span:active {
  font-size: 17px;
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
.cbody span {
  cursor: pointer;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
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
