<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="16"><div class="grid-content bg-purple">
        <el-avatar  :size="100" fit="cover" :src="avatar||url" @click="toggleShow()"></el-avatar>
        <p @click="toggleShow()">点击切换头像</p>
      </div></el-col>
    </el-row>

    <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="userNick">
        <el-input v-model="user.nickName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="user.userEmail" placeholder="邮箱"/>
      </el-form-item>
      <el-form-item label="手机号" prop="userPhone">
        <el-input v-model="user.userPhone" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">提交</el-button>
      </el-form-item>
    </el-form>

    <div class="myUpload">
      <my-upload field="file"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :url="action"
                 img-format="png"></my-upload>
    </div>
  </div>
</template>

<script>
    import 'babel-polyfill';
    import {getUserInfo,updateuser} from '../../api/user'
    import myUpload from 'vue-image-crop-upload';
    import {mapGetters} from 'vuex'
    export default {
        components: {myUpload},
        computed: {
            ...mapGetters([
                'avatar',
            ])
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.user.checkPass !== '') {
                        this.$refs.user.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                drawer: true,
                direction: 'rtl',
                action: '',
                show: false,
                user: {
                    nickName: '',
                    userEmail: '',
                    userPhone: '',
                    password: '',
                    checkPass: '',
                    userAvatar:''
                },

                rules: {
                   /* userEmail: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    userPhone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        //{ type: 'phone', required: true, message: '请输入手机号', trigger: 'change' }
                    ],*/
                    password: [
                        //{required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            }
        },
        mounted() {
            this.action = process.env.NODE_ENV === 'development'?"http://localhost:8001/electronic/file/uploadFile": window.location.protocol + "//" + window.location.host + "/electronic/file/uploadFile"
            this.queryUserInfo()
        },
        methods: {
            toggleShow() {
                this.show = true
            },
            cropSuccess(imgDataUrl, field) {
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },

            cropUploadSuccess(jsonData, field) {
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
                this.user.userAvatar = jsonData.result.fileDownloadUri;
                this.$store.commit('user/SET_AVATAR',jsonData.result.fileDownloadUri);
                this.show = false
            },

            cropUploadFail(status, field) {
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            },
            queryUserInfo() {
                getUserInfo({}).then(res => {
                    if (res.success) {
                        this.user = res.result
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确定提交修改吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submit()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submit() {
                updateuser({
                    userId: this.user.userId,
                    userAvatar: this.user.userAvatar,
                    userEmail: this.user.userEmail,
                    userPhone: this.user.userPhone,
                    password: this.user.password,
                    nickName: this.user.nickName,
                    operType:'1'
                }).then(res=>{
                    this.$loading().close()
                    if (res.success){
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        })
                        this.open()
                    }
                })
            },
            open() {
                this.$alert('请退出重新登陆！', '退出登录', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.logout()
                    }
                });
            },
            async logout() {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login`)
            },
        }
    };
</script>

<style>
  .container{
    height: 100vh;
    padding: 20px;
  }
</style>
