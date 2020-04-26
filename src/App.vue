<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {getUserInfo} from "./api/user";

  export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
      mounted(){

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
        },

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

</style>
