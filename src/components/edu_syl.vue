<template>
  <div class="chart">
    <div class="mapChart" id="mapContain"></div>
  </div>
</template>

<script>
    export default {
        name: 'chart',
        data () {
            return {
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
              let lista = [], listb=[],listc=[];
              data.map((item)=>{
                if(item.coletype === 'edua'){
                  lista.push((item))
                } else if(item.coletype === 'edub'){
                  listc.push((item))
                } else {
                  listb.push((item))
                }
              })
              let option = {
                title: {
                  show: true,
                  text: '2017双111一流大学及学科',
                  top : '15%',
                  left: 'center',
                  textStyle: {
                    color: '#fff'
                  }
                },
                tooltip: {
                  show: true,
                  trigger: 'item',
                  formatter(p){
                    console.log(p);
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
                      normal:{
                          show: true
                      },
                    emphasis: {
                      show: false,
                      fontSize: 12,
                      opacity: 0.2,
                    }
                  },
                  roam: true,
                  zoom: 1.0,
                  center: [104.070029, 36.583574],
                  itemStyle: {
                    normal: {
                      color: 'rgb(238,238,238)',
                      borderColor: '#404a59',
                      areaColor: 'rgba(255,255,255,.5)'
                    },
                    emphasis: {
                      color: 'rgb(238,238,238,.5)'
                    }
                  }
                },
                series: []
              };
              console.log(lista)
              option.series.push(_this.fomartCoord(listc,'orange'))
              option.series.push(_this.fomartCoord(listb,'blue'))
              option.series.push(_this.fomartCoord(lista,'red'))
              mychart.setOption(option);
            },
          fomartCoord: function (d,cor) {
            let series = {
              type : 'effectScatter',
              name : 'city',
              coordinateSystem: 'geo',
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  formatter: '{b}'
                },
                emphasis:{
                  show:true,
                  position: 'right',
                  formatter: '{b}'
                }
              },
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: cor
                },
                emphasis: {
                  color: cor
                }
              },
              tooltip: {
                formatter: function (params) {
                    console.log(params)
                  return ;
                }
              },
              data: []
            };
            d.forEach(function(res){
              series.data.push({
                'name': res.colName,
                'value': res.coords,
                'meta': res.coletype
              })
            })
            return series;
          },
        },
        created: function () {
        },
        mounted: function () {
            this.$ajax.get('/static/json/syl.json').then( res => {
                this.creatMap('mapContain', res.data);
            })
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
    background-color: #fff;
    background: url("/static/images/bg-a.jpg") no-repeat fixed;
    background-clip: content-box;
    background-size:100% 100%;
  }
  .mapChart{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
