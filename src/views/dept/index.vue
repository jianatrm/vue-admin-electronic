<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align: left">
        <el-input v-model="search" placeholder="根据部门搜索" style="width: 30%;"></el-input>
        <el-button type="primary" @click="querydeptList(search)">查询</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" @click="handleAdddept">新建部门</el-button>
      </el-col>
    </el-row>
    <el-table :data="deptList" style="width: 100%;margin-top:30px;" border>
      <el-table-column type="index" align="center" label="序号" width="220">

      </el-table-column>

      <el-table-column align="center" label="部门名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.deptName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门编码">
        <template slot-scope="scope">
          {{ scope.row.deptCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门描述">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="24" style="text-align: right">
        <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"/>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑部门':'新建部门'">
      <el-form :model="dept" label-width="80px" label-position="left" :inline="true" :rules="rules" ref="dept">
        <el-form-item label="部门编号" prop="deptCode">
          <el-input v-model="dept.deptCode" placeholder="部门编号"/>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            v-model="dept.deptName"
            placeholder="邮箱"
          />
        </el-form-item>


      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submitForm('dept')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {querydept, updatedept, adddept} from "../../api/dept";
    import Pagination from '@/components/Pagination'

    export default {
        components: {Pagination},
        data() {
            return {
                rules: {
                    deptName: [
                        {required: true, message: '请输入账户', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                },

                search: '',
                dept: {
                    deptName: '',
                    deptCode: '',
                },
                deptList: [],
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
            this.querydeptList()
        },
        methods: {
            querydeptList(val) {
                querydept({
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    deptName: val
                }).then(res => {
                    this.$loading().close()
                    if (res.success) {
                        this.deptList = res.result.result
                        this.total = res.result.count
                    }
                })
            },
            getList() {
                this.pageNum++;
                this.querydeptList();
            },
            handleEdit(scope) {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.dept = scope.row;
                this.dept.checkPass = scope.row.password

            },
            handleDelete({$index, row}) {
                this.$confirm('确定删除该用户吗?', 'Warning', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.deleteRole(row.deptId, $index)
                }).catch(err => {
                    console.error(err)
                })
            },
            handleAdddept() {
                this.dialogType = 'new'
                this.dialogVisible = true
                this.dept = {}
            },
            deleteRole(deptId, $index) {
                updatedept({
                    status: 0,
                    deptId: deptId
                }).then(res => {
                    this.$loading().close()
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.pageNum = 1;
                        this.querydeptList();
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.dialogType == 'new') {
                            this.$loading().close()
                            adddept(this.dept).then(res => {
                                if (res.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '新增成功'
                                    })
                                }
                            })
                        } else {
                            this.$loading().close()
                            updatedept(this.dept).then(res => {
                                if (res.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    })
                                }
                            })
                        }
                        this.pageNum = 1;
                        this.querydeptList();
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
      margin-right: 100px;

      .el-input {
        width: 120%;
      }

      .el-select {
        width: 110%;
      }
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
