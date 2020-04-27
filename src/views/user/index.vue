<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align: left">
        <el-input v-model="search" size="small" placeholder="根据用户名搜索" style="width: 50%;"></el-input>
        <el-button type="primary" size="small" @click="queryUserList(search)">查询</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" size="small" @click="handleAddUser" :disabled="!admin">新建人员</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" style="width: 100%;margin-top:30px;" border size="small">
      <el-table-column type="index" align="center" label="序号" width="100px"></el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          {{ scope.row.userEmail }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          {{ scope.row.userPhone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门">
        <template slot-scope="scope">
          {{ scope.row.sysDept.deptName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理员">
        <template slot-scope="scope">
          <el-link  type="primary" v-if="scope.row.level==1"  :underline="false">是</el-link>
          <el-link v-else type="info" :underline="false">否</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-link  type="primary" v-if="scope.row.status==1"  :underline="false">在职</el-link>
          <el-link v-else type="danger" :underline="false">离职</el-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)" :disabled="!admin">编辑</el-button>
          <el-button type="warning" size="mini" @click="handleReset(scope.row.userId)" :disabled="!admin">重置密码</el-button>
          <el-button type="danger" size="mini" @click="handleJob(scope,0)" v-if="scope.row.status==1" :disabled="!admin">离职</el-button>
          <el-button type="primary" size="mini" @click="handleJob(scope,1)" v-if="scope.row.status==0" :disabled="!admin">在职</el-button>
        </template>
      </el-table-column>
      <div slot="empty">
        <span >未查询到数据</span>
      </div>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="24" style="text-align: right">
        <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"/>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑人员':(dialogType==='onjob'?'在职编辑':'新建人员')" width="50%">
      <el-form :model="user" label-width="80px" :inline="true" :rules="rules" ref="user">
        <el-form-item label="登录账户" prop="userName">
          <el-input v-model="user.userName" placeholder="姓名"  />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="user.nickName" placeholder="昵称"  />
        </el-form-item>
        <el-form-item label="真实姓名" prop="staffName">
          <el-input v-model="user.staffName" placeholder="真实姓名"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user.sex" placeholder="请选择" >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="user.userEmail"
            placeholder="邮箱"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input
            v-model="user.userPhone"
            placeholder="请输入手机号"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password" v-if="dialogType == 'new'">
          <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" v-if="dialogType == 'new'">
          <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="归属部门" prop="deptId">
          <el-select v-model="user.deptId" placeholder="请选择部门">
            <el-option v-for="(item,index) in deptList" :label="item.deptName" :value="item.deptId"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="管理员" style="margin-left: -15px;">
          <el-select v-model="user.level" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" size="medium" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" size="medium" @click="submitForm('user')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {queryuser, updateuser, adduser,restpassword} from "../../api/user";
  import Pagination from '@/components/Pagination'
  import {querydept} from "../../api/dept";
  import { mapGetters } from 'vuex'

  export default {
    components: {Pagination},
      computed: {
          ...mapGetters([
              'admin',
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
      var validateUser = (rule, value, callback) => {
        var reg = /^[0-9a-zA-Z]+$/;
       if(!reg.test(value)){
         callback(new Error('登录账号必须为字母或数字组合'));
        }else{
         callback();
        }
      }
      return {
        rules: {
          userName: [
            {required: true, message: '请输入账户', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'},
            {validator: validateUser,trigger: 'blur'}
          ],
          userEmail: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          userPhone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            //{ type: 'phone', required: true, message: '请输入手机号', trigger: 'change' }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          deptId: [
            {required: true, message: '请选择部门', trigger: 'change'}
          ]
        },

        search: '',
        user: {
          userName: '',
          userEmail: '',
          userPhone: '',
          password: '',
          checkPass: '',
          deptId: ''
        },
        deptList: [],
        userList: [],
        dialogVisible: false,
        dialogType: 'new',
        checkStrictly: false,
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        pageNum: 1,
        pageSize: 10,
        total: 10
      }

    },
    mounted() {
      this.queryUserList()
    },
    methods: {
      queryUserList(val) {
        queryuser({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          userName: val
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.userList = res.result.result
            this.total = res.result.count
          }
        })
      },
      queryDeptList() {
        querydept({
          pageNum: 1,
          pageSize: 1000,
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.deptList = res.result.result
          }
        })
      },

      getList() {
        this.pageNum++;
        this.queryUserList();
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.user = scope.row;
        this.user.checkPass = scope.row.password

      },
      handleReset(data){
        this.$confirm('确定重置密码吗?',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.resetPwd(data);
        })
          .catch(err => {
            console.error(err)
          })
      },
      handleJob({$index, row},val) {
        this.$confirm(val==0?'确定修改为离职吗?':'确定修改为在职吗?',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.deleteRole(row.userId, $index,val)
        })
          .catch(err => {
            console.error(err)
          })
      },
      handleAddUser() {
        this.dialogType = 'new'
        this.dialogVisible = true
        this.user = {}
        this.queryDeptList();
      },
      deleteRole(userId, $index,val) {
        updateuser({
          status: val,
          userId: userId
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.pageNum = 1;
            this.queryUserList();
          }
        })
      },
      resetPwd(userId){
        restpassword({
          userId:userId
        }).then(res=>{
          if (res.success) {
            this.$loading().close()
            this.$message({
              type: 'success',
              message: '重置成功'
            })
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogType == 'new') {
              adduser(this.user).then(res => {

                this.$loading().close()
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: '新增成功'
                  })
                  this.dialogVisible = false
                  this.queryUserList();
                }
              })
            } else {
              updateuser(this.user).then(res => {
                this.$loading().close()
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                  this.dialogVisible = false
                }
              })
            }
            this.pageNum = 1;
            this.queryUserList();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .el-form-item {
      margin-right:18px;
      .el-input {
        width: 108%;
      }

      .el-select {
        width: 100%;
      }
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
