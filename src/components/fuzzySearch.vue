<template>
  <div id="search">
    <label for="cotain">输入查询内容：</label>
    <input id="cotain" v-model="key" @input="searchData" type="text">
    <div class="contain">
      <ul id="sourceData">
        <h1>源数据</h1>
        <li v-for="bitem in source">{{ bitem }}</li>
      </ul>
      <ul id="resualt">
        <li v-for="item in products">{{item}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'search',
        data () {
            return {
                source: [],
                key: '',
                products: []
            }
        },
        methods: {
          searchData: function() {
            let key = this.key;
            this.products = [];
            let pro = this.products ;
            if(key){
              this.source.filter(function (ssource) {
                  if(ssource.indexOf(key)>-1){
                      pro.push(ssource);
                  }
              })
            }
          },
        },
        computed: {
        },
        created: function(){
            let source = this.source;
            this.$ajax.get('/static/json/mapdata.json').then( res => {
                res.data.driving.forEach(function (el,i) {
                  source.push(el.city + '<---->' + el.descript);
                })
            })
        }
    }
</script>

<style scoped>
  #search{
    padding-top: 100px;
  }
  #sourceData{
    position: relative;
    left: 30%;
    top: 10%;
  }
  #resualt{
    position: absolute;
    margin-top: 5px;
    width: auto;
    top: 15%;
    left: 30%;
    border: 1px solid #000000;
  }
  #resualt li{
    margin: 10px;
  }
</style>
