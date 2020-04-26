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
          this.queryUserInfo
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
        queryUserInfo() {
            getUserInfo({},false).then(res => {
                this.$loading().close()
                if (res.success) {

                    let  admin = false;
                    for (let i = 0; i < res.result.sysRoleList.length; i++) {
                        if ( res.result.sysRoleList[i].roleType == 1){
                            admin = true;
                            break;
                        }
                    }
                    this.$store.commit("user/SET_ROLES",res.result.sysRoleList)
                    this.$store.commit("user/SET_AVATAR",res.result.userAvatar)
                    this.$store.commit("user/SET_USER",res.result)
                    // this.$store.commit("user/SET_ROLE_TYPE_LIST",admin)
                }
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
