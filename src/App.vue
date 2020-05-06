<template>
  <div id="app">
    <router-view v-if="isRouterActive"/>
  </div>
</template>

<script>
    import {getUserInfo} from "./api/user";
    import { mapGetters } from 'vuex'
    import {constantRoutes} from "./router";
    import {asyncRouter} from "./router/asyncRouter";

    export default {
        name: 'App',
        computed: {
            ...mapGetters([
                'admin',
            ])
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        created(){

        },
        mounted() {
            window.addEventListener('beforeunload', e => {
                localStorage.setItem('new', 'new');
            });
        },
        data() {
            return {
                isRouterActive: true
            }
        },
        methods: {
            reload() {
                this.isRouterActive = false
                this.$nextTick(() => {
                    this.isRouterActive = true
                })
            },

        }
    }
</script>
<style>
  #app {
    min-width: 1200px;

  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

</style>
