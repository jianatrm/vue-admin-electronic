<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">

      <div class="title-container">
        <h3 class="title">山西铁路装备制造集团</h3>
        <h3 class="title">机车车辆有限公司公文审批系统</h3>
        <!--<h3 class="title">电子文档审批系统</h3>-->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          autocomplete="new-password"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-button :loading="loading"  style="width:520px;margin-bottom:30px;background-color: rgba(0,0,0,0.8);color: #fff"
                 @click.native.prevent="handleLogin">登录
      </el-button>


    </el-form>
  </div>
</template>

<script>
  import {constantRoutes,resetRouter} from "../../router";
  import {validUsername} from '@/utils/validate'
  import {getUserInfo} from "../../api/user";
  import {asyncRouter} from "../../router/asyncRouter";

  export default {
        name: 'Login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('Please enter the correct user name'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 3) {
                    callback(new Error('The password can not be less than 6 digits'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: 'admin',
                    password: 'admin'
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                loading: false,
                passwordType: 'password',
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                //this.$router.push({ path: this.redirect || '/' })
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('user/login', this.loginForm).then((res) => {
                            this.loading = false
                            if (res.success) {
                                this.queryUserInfo();

                              // this.redirect ||
                            } else {
                                return false
                            }
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
         async queryUserInfo() {
           await getUserInfo({},false).then(res => {
              this.$loading().close()
              if (res.success) {

                let  admin = false;
                try {
                  if (res.result.level == '1'){
                      admin = true;
                  }
                }catch (e) {

                }
                this.$store.commit("user/SET_ROLES",res.result.sysRoleList)
                this.$store.commit("user/SET_AVATAR",res.result.userAvatar)
                this.$store.commit("user/SET_USER",res.result)
                this.$store.commit("user/SET_ROLE_TYPE_LIST",admin)
                localStorage.setItem('new', 'new');
                this.$router.push({path: '/'})
              }
            })
          },
        }
    }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    background:url("../../assets/images/bj01.jpg") no-repeat;
    background-size: cover;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.6);
      background: rgba(0, 0, 0, 0.6);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    display: flex;
    align-items: center;
    .login-form {
      position: relative;
      width: 560px;
      max-width: 100%;
      padding: 0px 35px 160px;
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      align-items: center;
      flex-direction: column;
      .el-form-item{
        width: 520px;
      }
      .el-button{
        width: 520px;
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .title:nth-child(1){
        margin-bottom: 10px;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
