<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align: left">
        <el-input v-model="search" placeholder="文档搜索" style="width: 30%;"></el-input>
        <el-button type="primary" @click="querydocList(search)">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="docList" style="width: 100%;margin-top:30px;" border>
      <el-table-column type="index" align="center" label="序号" width="220">

      </el-table-column>

      <el-table-column align="center" label="文档名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.docName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          {{ scope.row.operateTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-download" @click="handleEdit(scope)">下载</el-button>
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleEdit(scope)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="24" style="text-align: right">
        <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {queryDeptElectronicDoc} from "../../api/dept";
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    data() {
      return {
        rules: {
          docName: [
            {required: true, message: '请输入账户', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
        },

        search: '',
        doc: {
          docName: '',
          docCode: '',
        },
        docList: [],
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
      this.querydocList()
    },
    methods: {
      querydocList(val) {
          queryDeptElectronicDoc({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          docName:val
        }).then(res => {
          if (res.success) {
            this.docList = res.result.result
            this.total = res.result.count
          }
        })
      },
      getList() {
        this.pageNum++;
        this.querydocList();
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.doc = scope.row;
        this.doc.checkPass = scope.row.password

      },
      handleDelete({$index, row}) {
        this.$confirm('确定删除该用户吗?', 'Warning', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.deleteRole(row.docId, $index)
        }).catch(err => {
          console.error(err)
        })
      },
      handleAdddoc() {
        this.dialogType = 'new'
        this.dialogVisible = true
        this.doc = {}
      },
      deleteRole(docId, $index) {
        updatedoc({
          status: 0,
          docId: docId
        }).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.pageNum = 1;
            this.querydocList();
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogType == 'new') {
              adddoc(this.doc).then(res => {
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: '新增成功'
                  })
                }
              })
            } else {
              updatedoc(this.doc).then(res => {
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                }
              })
            }
            this.pageNum = 1;
            this.querydocList();
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
