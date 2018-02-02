<template>
  <span @mouseover="shover($event)" @mouseout="smo($event)" v-bind:style="styleObj">
  {{ txt }}
  </span>
</template>

<script>
    export default {
        name: 'search',
        data () {
            return {
                styleObj: {
                    transform: 'translateX(0)'
                }
            }
        },
        props: [ 'txt' ],
        methods: {
            shover(e){
                e = e.target;
                let w = e.clientWidth,  //内容长度
                    pw = e.parentElement.clientWidth,  //父容器宽度
                    mw = pw-w<0?pw-w-10:0,  //计算X需偏移数量及10px边距
                    mt = mw>-100? 0.5: mw/-100;  //溢出宽度100内则固定0.5S
                this.styleObj = {
                    transform : `translateX(${mw}px)`,
                    transition: `transform ${mt}s linear`
                }
            },
            smo(e){
                this.styleObj = {
                    transform : `translateX(0px)`,
                    transition: 'transform .5s linear'
                }
            },
        },
    }
</script>

<style scoped>
    span{
        white-space: nowrap;
        display:inline-block;
    }
</style>
