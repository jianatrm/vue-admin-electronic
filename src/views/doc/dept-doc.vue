<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align: left">
        <el-input v-model="search" placeholder="文档搜索" style="width: 50%;" size="small"></el-input>
        <el-button type="primary" @click="querydocList(search)" size="small">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="docList" style="width: 100%;margin-top:30px;" border size="small">
      <el-table-column type="index" align="center" label="序号" width="100">

      </el-table-column>

      <el-table-column align="left" label="文档名称" header-align="center">
        <template slot-scope="scope">
          <svg-icon icon-class="excel"  v-if="'xls,xlsx,csv'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="PPT" v-else-if="'ppt,pptx,pps,ppsx,pot'.indexOf(scope.row.docType) > -1" />
          <svg-icon icon-class="PDF" v-else-if="'pdf,dpt,odf'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="WORD" v-else-if="'doc,docx'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="image" v-else-if="'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,jpeg'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="wendang" v-else/>
          {{ scope.row.docName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          {{scope.row.operateTime&&new Date( scope.row.operateTime).format('yyyy-MM-dd') }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-download" @click="handleEdit(scope)">下载</el-button>
          <el-button type="success" size="small" icon="el-icon-search" @click="handlePreview(scope)">预览</el-button>
          <el-button type="info" size="small" icon="el-icon-search" @click="showNodeList(scope)">审批批注</el-button>
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
            handleEdit(scope) {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.doc = scope.row;
                this.doc.checkPass = scope.row.password

            },
            handleDelete({$index, row}) {
                this.$confirm('确定删除该用户吗?',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.deleteRole(row.docId, $index)
                }).catch(err => {
                    console.error(err)
                })
            },
            showNodeList(val){
                this.$router.push({path:'/work/worknodedetail',query:{workOrderId:val.row.workOrderId||12}})
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
                    this.$loading().close()
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
                                this.$loading().close()
                                if (res.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '新增成功'
                                    })
                                }
                            })
                        } else {
                            updatedoc(this.doc).then(res => {
                                this.$loading().close()
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
                    window.open(`${window.location.protocol+"//"+window.location.host}/electronic/pdf/documentConverterToPdf/${filename}`)
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
    .svg-icon{
      width: 2em !important;
      height: 2em !important;
      vertical-align: middle !important;
      fill: currentColor !important;
      overflow: hidden !important;
    }
  }
</style>
