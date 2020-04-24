<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="员工文档" name="first">
        <el-row :gutter="20" style="margin-left: 0;padding-top: 20px">
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="文档名称">
              <el-input v-model="docName" placeholder="请输入文档名称" size="small"></el-input>
            </el-form-item>

            <el-form-item label="选择日期">
              <el-date-picker
                v-model="rangeTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" size="small">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="提交人">
              <el-select v-model="userId" placeholder="请选择提交人" size="small">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryUserdocList()" size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table :data="docList" style="width: 100%;margin-top:30px;" border size="small">
          <el-table-column type="index" align="center" label="序号" width="100">

          </el-table-column>

          <el-table-column align="center" label="文档名称" width="220">
            <template slot-scope="scope">
              {{ scope.row.docName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="修改时间">
            <template slot-scope="scope">
              {{ scope.row.operateTime&&new Date(scope.row.operateTime).format('yyyy-MM-dd') }}
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
              <el-button type="success" size="small" icon="el-icon-search" @click="handlePreview(scope)">预览</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="queryUserdocList"/>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="部门文档" name="second">
        <el-row :gutter="20" style=" margin-left: 0;padding-top: 20px">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="文档名称">
              <el-input v-model="docName" placeholder="请输入文档名称" size="small"></el-input>
            </el-form-item>

            <el-form-item label="选择日期">
              <el-date-picker
                v-model="rangeTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" size="small">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="归属部门">
              <el-select v-model="deptId" placeholder="请选择归属部门" size="small">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryDeptdocList()" size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table :data="docList" style="width: 100%;margin-top:30px;" border size="small">
          <el-table-column type="index" align="center" label="序号" width="100">

          </el-table-column>

          <el-table-column align="center" label="文档名称" width="220">
            <template slot-scope="scope">
              {{ scope.row.docName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="修改时间">
            <template slot-scope="scope">
              {{ scope.row.operateTime&&new Date(scope.row.operateTime).format('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="归属部门">
            <template slot-scope="scope">
              {{ scope.row.operateTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-download" @click="handleEdit(scope)">下载</el-button>
              <el-button type="success" size="small" icon="el-icon-search" @click="handlePreview(scope)">预览</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="queryDeptdocList"/>
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
                docName:'',
                docList: [],
                pageNum: 1,
                pageSize: 10,
                rangeTime: '',
                userId: '',
                deptId:'',
                startTime: '',
                endTime: '',
                total: 0,
                date: '',
                formInline: {}
            }

        },
        mounted() {
            this.queryUserdocList()
        },
        methods: {
            handleClick(tab, event) {
                this.docName = '';
                this.pageNum = 1;
                this.rangeTime = '';
                this.startTime = '';
                this.endTime = '';
                this.deptId = '';
                this.userId = '';
                this.docList = [];
                if (tab.index == 0) {
                    this.queryUserdocList();
                } else if (tab.index == 1) {
                    this.queryDeptdocList();
                }
            },
            queryUserdocList() {
                if (this.rangeTime) {
                    this.startTime = new Date(this.rangeTime[0]).format('yyyy-MM-dd')
                    this.endTime = new Date(this.rangeTime[1]).format('yyyy-MM-dd')
                }
                queryDeptElectronicDoc({
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    docName: this.docName,
                    userId: this.userId,
                    startTime: this.startTime,
                    endTime: this.endTime
                }).then(res => {
                    this.$loading().close()
                    if (res.success) {
                        this.docList = res.result.result
                        this.total = res.result.count
                    }
                })
            },
            queryDeptdocList() {
                if (this.rangeTime) {
                    this.startTime = new Date(this.rangeTime[0]).format('yyyy-MM-dd')
                    this.endTime = new Date(this.rangeTime[1]).format('yyyy-MM-dd')
                }
                queryDeptElectronicDoc({
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    docName: this.docName,
                    deptId: this.deptId,
                    startTime: this.startTime,
                    endTime: this.endTime
                }).then(res => {
                    this.$loading().close()
                    if (res.success) {
                        this.docList = res.result.result
                        this.total = res.result.count
                    }
                })
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
      margin-right: 50px;

      .el-input {
        width: 100%;
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
