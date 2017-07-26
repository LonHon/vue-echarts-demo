<template>
  <div class="chart">
    <div class="mapChart" id="mapContain"></div>
    <div class="barBox" draggable="true">
      <ul class="checker">
        <li v-for="item in chartType" @click="creatFloatChart('floatChart',item.type)">{{ item.name }}</li>
      </ul>
      <div class="barChart" id="floatChart"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'chart',
        data () {
            return {
                chartType: [
                  {
                    name: '柱状',
                    type: 'bar'
                  },
                  {
                    name: '折线',
                    type: 'line'
                  },
                  {
                    name: '散点',
                    type: 'scatter'
                  }
                  ],
                checkFlag: false
            }
        },
        methods: {
            creatMap: function (id, data) {
              let mychart = this.$echarts.init(document.getElementById(id));
              let option = {
                backgroundColor: '#fff',
                title : {
                    show: false,
                    text: '一次骑行轨迹',
                    left: 'center',
                    textStyle : {
                      color: '#000'
                    }
                },
                tooltip : {
                    trigger: 'item'
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false,
                            textStyle:{
                              color: '#000',
                            }
                        }
                    },
                    zoom: 1.2,
                    center: [104.070029,36.583574],
                    roam: true,
                    itemStyle: {
                        normal: {
                            color: 'rgb(238,238,238)',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            color: 'rgb(238,238,238)'
                        }
                    }
                },
                series: []
              };
              option.series.push(this.fomartCoord(data.dot));
              option.series.push(this.fomartLines(data.driving));
              mychart.setOption(option);
//              mychart.on('click', function (params) {
//                console.log(params)
//              });

            },
            fomartLines: function (d) {
              let series = {
                  type : 'lines',
                  name : '318国道',
                  coordinateSystem: 'geo',
                  label: {
                    normal: {
                      show: false,
                      position: 'right',
                      formatter: '{b}'
                    },
                    emphasis:{
                      show:false
                    }
                  },
                  lineStyle: {
                    normal: {
                      color: 'rgb(176,58,91)',
                      width: 3,
                      curveness: 0.2
                    }
                  },
                  data: []
              };
              for(let i = 0 ; i < d.length-1 ; i++){
                  series.data.push({
                      name: d[i].city + '-' + d[i+1].city,
                      coords: [d[i].coords, d[i+1].coords]
                  })
              }
//              series.data.push({
//                name: '成都-拉萨',
//                coords: [[104.070029,30.583574], [91.107313,29.665072]]
//              })
              return series;
            },
            fomartCoord: function (d) {
                let series = {
                    type : 'scatter',
                    name : '喜欢的地方',
                    coordinateSystem: 'geo',
                    label: {
                      normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                      },
                      emphasis:{
                        show:true
                      }
                    },
                    symbolSize: 15,
                    itemStyle: {
                      normal: {
                        color: 'rgba(7,95,171,1)'
                      }
                    },
                    tooltip: {
                      formatter: function (params) {
                          return ;
                      }
                    },
                    data: []
                };
                d.forEach(function(res){
                    series.data.push({
                        'name': res.city,
                        'value': res.coords
                    })
                })
                return series;
            },
//            createTooltip: function (params) {
//                //做一个提示框
//            },
            creatFloatChart: function ( id ,chartType) {
                chartType = chartType || 'bar';
                let mychart = this.$echarts.init(document.getElementById(id));
                let option = {
                    title: {
                        text: '步行图',
                        left: '34%'
                    },
                    color: ['#3398DB'],
                    tooltip : {
                      trigger: 'axis',
                      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                    },
                    grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    legend: {
                        data: ['上周','本周'],
                        top: '5px',
                        right: 0
                    },
                    xAxis : [
                      {
                        type : 'category',
                        data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        axisTick: {
                          alignWithLabel: true
                        },
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value',
                        splitLine:{
                          show:false
                        }
                      }
                    ],
                    series : [
                      {
                        name: '上周',
                        type: chartType,
                        barWidth: '20%',
                        itemStyle: {
                            normal:{
                            }
                        },
                        data:[9582, 6242, 3812, 11110, 10596, 929, 4609]
                      },
                      {
                        name: '本周',
                        type: chartType,
                        barWidth: '20%',
                        itemStyle: {
                          normal:{
                              color: 'darkBlue'
                          }
                        },
                        data:[8320, 5907]
                      }
                    ]
                };
                mychart.setOption(option,true);
            },

        },
        mounted: function () {
            this.$ajax.get('/static/json/mapdata.json').then( res => {
                this.creatMap('mapContain', res.data);
            })
            this.creatFloatChart('floatChart');

        }
    }
</script>

<style scoped>
  .chart{
    position: relative;
    width: 100%;
    height: 900px;
    background-color: lavender;
  }
  .mapChart{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .barChart{
    margin: 10px;
    width: 380px;
    height: 320px;
  }
  .barBox{
    position: absolute;
    width: 400px;
    top: 10%;
    left: 3%;
    z-index: 2;
  }
  .checker li{
    display: inline-block;
    margin-right: 10px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #888;
  }
  .checker .set{
    color: lavender;
  }
</style>
