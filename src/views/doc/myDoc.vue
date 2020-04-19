<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align: left">
        <el-input v-model="search" placeholder="搜索文档" style="width: 30%;"></el-input>
        <el-button type="primary" @click="querydocList(search)">查询</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" @click="uploaddoc">上传文档</el-button>
      </el-col>
    </el-row>
    <el-table :data="docList" style="width: 100%;margin-top:30px;" border>
      <el-table-column type="index" align="center" label="序号" width="220">

      </el-table-column>

      <el-table-column align="center" label="文档名称">
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
    <el-dialog :visible.sync="dialogVisible" title='新建文档'>
      <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:8088/electronic/file/uploadFile"
            :on-success="handleAvatarSuccess"
            :file-list="fileList"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {querydoc, updatedoc, adddoc} from "../../api/doc";
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    data() {
      return {
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
        fileList: [],
        pageNum: 1,
        pageSize: 10,
        total: 10
      }

    },
    mounted() {
      this.querydocList()
    },
    methods: {
      querydocList(val) {
        querydoc({
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
      handleEdit() {
        this.fileList = [];
        this.dialogVisible = true
      },

      uploaddoc() {
        this.dialogType = 'new'
        this.dialogVisible = true
        this.doc = {}
      },

      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.fileList.push({
            name: res.result.fileName,
            url: res.result.fileDownloadUri
          })
        }
      },

      submitForm() {
        let docList = [];
        for (let i = 0; i <this.fileList.length; i++) {
          docList.push({
            docName:this.fileList[i].name,
            docUrl:this.fileList[i].url
          })
        }
        adddoc({
          docList:JSON.stringify(docList)
        }).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.fileList = [];
            this.this.dialogVisible = false
          }
          this.pageNum = 1;
          this.querydocList();
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .el-form-item {
      margin-right: 100px;

      .el-select {
        width: 110%;
      }
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
