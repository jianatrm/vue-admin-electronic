<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="员工文档" name="first">
        <el-row :gutter="20" style="margin-left: 0;padding-top: 20px">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="文档名称">
              <el-input v-model="formInline.docName" placeholder="请输入文档名称"></el-input>
            </el-form-item>

            <el-form-item label="选择日期">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="提交人">
              <el-select v-model="formInline.region" placeholder="请选择提交人">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="querydocList(search)">查询</el-button>
            </el-form-item>
          </el-form>
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
          <el-table-column align="center" label="提交人">
            <template slot-scope="scope">
              {{ scope.row.operateTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-download" @click="handleEdit(scope)">下载</el-button>
              <el-button type="primary" size="small" icon="el-icon-search" @click="handlePreview(scope)">预览</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"/>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="部门文档" name="second">
        <el-row :gutter="20" style="margin-left: 0;padding-top: 20px">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="文档名称">
              <el-input v-model="formInline.docName" placeholder="请输入文档名称"></el-input>
            </el-form-item>

            <el-form-item label="选择日期">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="归属部门">
              <el-select v-model="formInline.region" placeholder="请选择归属部门">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="querydocList(search)">查询</el-button>
            </el-form-item>
          </el-form>
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
          <el-table-column align="center" label="提交人">
            <template slot-scope="scope">
              {{ scope.row.operateTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-download" @click="handleEdit(scope)">下载</el-button>
              <el-button type="primary" size="small" icon="el-icon-search" @click="handlePreview(scope)">预览</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"/>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import {queryDeptElectronicDoc} from "../../api/dept";
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    data() {
      return {
        activeName: 'first',
        search: '',
        doc: {
          docName: '',
          docCode: '',
        },
        docList: [],
        dialogVisible: false,
        dialogType: 'new',
        checkStrictly: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        date:'',
        formInline:{}
      }

    },
    mounted() {
      this.querydocList()
    },
    methods: {
      queryUserdocList(val) {
        queryDeptElectronicDoc({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          docName: val
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.docList = res.result.result
            this.total = res.result.count
          }
        })
      },
      queryDeptdocList(val) {
        queryDeptElectronicDoc({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          docName: val
        }).then(res => {
          this.$loading().close()
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
      handlePreview(scope) {
        let number = decodeURI(scope.row.docUrl).lastIndexOf('.');
        let filetype = decodeURI(scope.row.docUrl).substring(number + 1);
        let reg = "pdf swf html ott fodt  sxw doc docx rtf  wpd  txt  ods  ots  fods sxc  xls xlsx  csv  tsv  odp  otp fodp  sxi  ppt pptx  odg  otg fodg  svg  png jpg  tif  gif bmp"
        if (reg.indexOf(filetype) == -1) {
          this.$message({
            showClose: true,
            message: '该文件不支持预览，请下载后查看',
            type: 'warning'
          });
          return
        }
        let filename = decodeURI(scope.row.docUrl).substring(scope.row.docUrl.lastIndexOf('/') + 1);
        if ("xls xlsx".indexOf("this.filetype") == -1) {
          window.open(`http://localhost:8001/electronic/pdf/documentConverterToPdf/${filename}`)
        }
        const {href} = this.$router.resolve({
          path: "/pdfPreview",
          query: {
            filename: filename,
            filetype: filetype
          }
        });
        window.open(href, '_blank');
      },
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
