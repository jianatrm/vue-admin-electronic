<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
    data(){
      return{
          isRouterActive:true
      }
    },
    methods:{
        reload(){
            this.isRouterActive = false
            this.$nextTick(()=>{
                this.isRouterActive = true
            })
        }
    }
}
</script>
<style>
  #app{
    min-width: 1200px;

  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
  .svg-icon{
    width: 2em !important;
    height: 2em !important;
    vertical-align: middle !important;
    fill: currentColor !important;
    overflow: hidden !important;
  }
</style>
