<template>
  <div class="chart">
    <div class="mapChart" id="mapContain"></div>
    <div class="barBox" draggable="true">
      <ul class="checker">
        <li v-for="item in chartType" @click="creatFloatChart('floatChart',item.type)">{{ item.name }}</li>
      </ul>
      <div class="barChart" id="floatChart"></div>
    </div>
    <div id="pieDom" class="newbarmap" v-show="currentScatter!==''">根据map的散点显示数据</div>
    <div id="mapZoom">

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
                checkFlag: false,
                extendMapPie: false,
                pieOption: {
                  title : {
                    text: '',
                    subtext: '',
                    x:'center',
                    textStyle: {
                        fontSize: 12,
                    },
                  },
                  tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  series : [
                    {
                      name: '访问来源',
                      type: 'pie',
                      radius : '55%',
                      //center: ['50%', '60%'],
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      },
                      label: {
                          normal: {
                              position: 'inner'
                          }
                      },
                      data:[
                        {value:335, name:'邮件'},
                        {value:500, name:'微信'},
                      ],
                    }
                  ]
                },
                testPie: null,
                currentScatter: ''
            }
        },
        methods: {
            creatMap: function (id, data) {
              let _this = this;
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
                    show: false,
                    trigger: 'item',
                    formatter(p){
                        return '0';
                    },
                    axisPointer: {
                      snap: true
                    },
                    alwaysShowContent: true,
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
                    zoom: 1.0,
                    center: [104.070029,36.583574],
                    roam: false,
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
              option.series.push(_this.fomartCoord(data.dot));
              option.series.push(_this.fomartLines(data.driving));
              mychart.setOption(option);
              mychart.on('click', (p)=>{
                  if(p.componentType === "series" && p.seriesName === "city"){
                      this.createMapPie({
                        name: p.name ,
                        data: {
                            val1: Math.floor(Math.random()*100 + 5),
                            val2: Math.floor(Math.random()*100 + 5),
                            val3: Math.floor(Math.random()*100 + 5),
                        },
                        x: p.event.offsetX,
                        y: p.event.offsetY,
                      });
                  }else{
                      this.createMapPie(false);
                  }
              })
            },
            createMapPie: function (params) {
                if(params.name === this.currentScatter) return false;
                if(!params){
                    $('#pieDom').hide();
                    this.currentScatter ='';
                    return false;
                }
                $('#pieDom').show();
                $('#pieDom').css({
                    position: 'fixed',
                    top: (params.y>220 ? params.y-220 : params.y) + 'px',
                    left: (params.x + 20) + 'px',
                })
                this.currentScatter = params.name;
                let barChartDom = this.testPie;
                let option = this.pieOption;
                option.series[0].data = [
                  {value:params.data.val1, name:'邮件'},
                  {value:params.data.val2, name:'微信'},
                  {value:params.data.val3, name:'QQ'},
                ];
                option.title.text = params.name + ':广告分布';
                barChartDom.setOption(this.pieOption,true);
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
                    name : 'city',
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
                        color: 'rgba(7,95,171,.5)'
                      },
                      emphasis: {
                          color: 'rgba(87,95,199,1)'
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
                      trigger: 'item',
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
//              模拟触发tooltip
                mychart.dispatchAction({
                  type: 'showTip',
                  seriesIndex: 0, //指定series
                  dataIndex: 0  //指定data
                })
            },

        },
        created: function () {
        },
        mounted: function () {
            this.$ajax.get('/static/json/mapdata.json').then( res => {
                this.creatMap('mapContain', res.data);
            })
            this.creatFloatChart('floatChart');
            this.testPie = this.$echarts.init(document.getElementById('pieDom'));
        },
        watch: {
        }
    }
</script>

<style scoped>
  .chart{
    position: relative;
    width: 100%;
    height: 100%;
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
  .newbarmap{
    position: fixed;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
  }
</style>
