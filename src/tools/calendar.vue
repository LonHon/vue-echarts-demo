<template>
  <div id="calendar">
    <div class="chead">
      <p>< 2017-11-01 ></p>
    </div>
    <div class="cweek">
      <ul>
        <li>7</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
    <div class="cbody">
      <ul>
        <li v-for="day in days" :key="day">{{day}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      days: []
    };
  },
  methods: {
    // 执行日历
    initDate: function(markDate) {},
    getDays: function(date) {
      //获取当前月份有多少天
      let nd = date.split("-"),
        d = new Date(nd[0], nd[1], 0),
        ds = d.getDate(),
        r = [];
      for (let d = 0; d < ds; d++) {
        r.push(d + 1);
      }
      return (this.days = r);
    },
    // 当前日期
    pick: function(date) {},
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    }
  },
  mounted: function() {
    this.getDays("2017-11-01");
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
  width: 14%;
  height: 30px;
  background-color: gray;
}
.chead {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
.cweek ul {
  display: flex;
}

</style>
