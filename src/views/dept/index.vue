<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align: left">
        <el-input v-model="search" placeholder="根据部门搜索" style="width: 50%;"  size="small"></el-input>
        <el-button type="primary" @click="querydeptList(search)"  size="small">查询</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" @click="handleAdddept"  size="small" :disabled="!admin">新建部门</el-button>
<!--        :disabled="!admin"-->
      </el-col>
    </el-row>
    <el-table :data="deptList" style="width: 100%;margin-top:30px;" border  size="small">
      <el-table-column type="index" align="center" label="序号" width="220">

      </el-table-column>

      <el-table-column align="center" label="部门名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.deptName? scope.row.deptName:'暂无设置'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门编码">
        <template slot-scope="scope">
          {{ scope.row.deptCode?scope.row.deptCode:'暂无设置'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门描述">
        <template slot-scope="scope">
          {{ scope.row.remark?scope.row.remark:'暂无设置'}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)" :disabled="!admin">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)" :disabled="!admin">删除</el-button>
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
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑部门':'新建部门'">
      <el-form :model="dept" label-width="80px" label-position="middle"  :rules="rules" ref="dept" style="margin-left: 40px">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="dept.deptName" placeholder="部门名称"/>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="dept.deptCode" placeholder="部门编号"/>
        </el-form-item>
        <el-form-item label="部门描述" prop="remark">
          <el-input type="textarea" v-model="dept.remark" :autosize="{ minRows: 4, maxRows: 4}" placeholder="部门描述..."/>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false" size="small">取消</el-button>
        <el-button type="primary" @click="submitForm('dept')" size="small">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {querydept, updatedept, adddept} from "../../api/dept";
    import Pagination from '@/components/Pagination'
    import { mapGetters } from 'vuex'

    export default {
        components: {Pagination},
        computed: {
            ...mapGetters([
                'admin',
            ])
        },
        data() {
            return {
                rules: {
                    deptName: [
                        {required: true, message: '部门名称不能为空', trigger: 'blur'},
                    ]
                },

                search: '',
                dept: {
                    deptName: '',
                    deptCode: '',
                    remark:''
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
                total: 0
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

            },
            handleDelete({$index, row}) {
                this.$confirm('确定删除该部门吗?', {
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
                                    this.dialogVisible=false;
                                    this.$message({
                                        type: 'success',
                                        message: '新增成功'
                                    })
                                    this.querydeptList();
                                }
                            })
                        } else {
                            this.$loading().close()
                            updatedept(this.dept).then(res => {
                                if (res.success) {
                                  this.dialogVisible=false;
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    })
                                }
                            })
                        }
                        this.pageNum = 1;
                        setTimeout(()=>{
                          this.querydeptList();
                        },1000)
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
      //margin-right: 100px;

      /*.el-input {*/
      /*  width: 120%;*/
      /*}*/

      /*.el-select {*/
      /*  width: 110%;*/
      /*}*/
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
