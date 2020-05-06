<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" style="text-align: left">
        <el-input v-model="search" placeholder="文档搜索" style="width: 50%;" size="small"></el-input>
        <el-button type="primary" @click="querydocList(search)" size="small">查询</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary" @click="uploaddoc" size="small">上传文档</el-button>
      </el-col>
    </el-row>
    <el-table :data="docList" style="width: 100%;margin-top:30px;" border size="small">
      <el-table-column type="index" align="center" label="序号" width="100">

      </el-table-column>

      <el-table-column align="left" label="文档名称" header-align="center">
        <template slot-scope="scope">
          <svg-icon icon-class="excel" v-if="'xls,xlsx,csv'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="PPT" v-else-if="'ppt,pptx,pps,ppsx,pot'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="PDF" v-else-if="'pdf,dpt,odf'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="WORD" v-else-if="'doc,docx'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="image"
                    v-else-if="'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,jpeg'.indexOf(scope.row.docType) > -1"/>
          <svg-icon icon-class="wendang" v-else/>
          {{ scope.row.docName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          {{scope.row.operateTime}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-download" @click="handleEdit(scope)">下载</el-button>
          <el-button type="success" size="small" icon="el-icon-search" @click="handlePreview(scope)">预览</el-button>
          <el-button type="info" size="small" icon="el-icon-edit-outline" @click="showNodeList(scope)">审批批注</el-button>
        </template>
      </el-table-column>
      <div slot="empty">
        <span>未查询到数据</span>
      </div>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="24" style="text-align: right">
        <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"/>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title='新建文档'>
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            :action=action
            :file-list="fileList"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">上传不超过100MB的文件</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false" size="small">取消</el-button>
        <el-button type="primary" @click="submitForm()" size="small">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {queryDeptElectronicDoc} from "../../api/dept";
  import Pagination from '@/components/Pagination'
  import {adddeptdoc} from "../../api/doc";

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
        total: 0,
        action:'',
        fileList: [],
      }

    },
    mounted() {
      this.action = window.location.protocol+"//"+window.location.host+"/electronic/file/uploadFile"
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
        this.$confirm('确定删除该用户吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.deleteRole(row.docId, $index)
        }).catch(err => {
          console.error(err)
        })
      },
      showNodeList(val) {
        if (val.row.operateType == 1){
            this.$alert('该文件未经过审批，是直接上传文件，无审批批注记录', '提示', {
              confirmButtonText: '确定',
            });
          return;
        }
        this.$router.push({path: '/workorder/worknodedetail', query: {workOrderId: val.row.workOrderId}})
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
      submitForm() {
        let docList = [];
        let uploadFiles = this.$refs.upload.uploadFiles;
        for (let i = 0; i < uploadFiles.length; i++) {
          docList.push({
            docName: uploadFiles[i].response.result.fileName.split("&&")[1],
            docUrl: decodeURI(uploadFiles[i].response.result.fileDownloadUri),
            docType: uploadFiles[i].response.result.fileType,
            docRandomName: uploadFiles[i].response.result.fileName
          })
        }
        adddeptdoc({
          electronicDocList: JSON.stringify(docList)
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.fileList = [];
            this.dialogVisible = false
          }
          this.pageNum = 1;
          this.querydocList();
        })
      },
      handlePreview(scope) {
        let number = decodeURI(scope.row.docUrl).lastIndexOf('.');
        let filetype = decodeURI(scope.row.docUrl).substring(number + 1);
        let reg = "pdf swf html ott fodt  sxw doc docx rtf  wpd  txt  ods  ots  fods sxc  xls xlsx  csv  tsv  odp  otp fodp  sxi  ppt pptx  odg  otg fodg  svg  png jpg  tif  gif bmp"
        if (reg.indexOf(filetype) > -1) {
          this.$message({
            showClose: true,
            message: '该文件不支持预览，请下载后查看',
            type: 'warning'
          });
          return
        }
        let filename = decodeURI(scope.row.docUrl).substring(scope.row.docUrl.lastIndexOf('/') + 1);
        if ("xls xlsx".indexOf(filetype) == -1) {
          window.open(`${window.location.protocol + "//" + window.location.host}/electronic/pdf/documentConverterToPdf/${filename}`)
        } else {
          const {href} = this.$router.resolve({
            path: "/pdfPreview",
            query: {
              filename: filename,
              filetype: filetype
            }
          });
          window.open(href, '_blank');
        }
      },
      uploaddoc() {
        this.dialogType = 'new'
        this.dialogVisible = true
        this.doc = {}
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

    .svg-icon {
      width: 2em !important;
      height: 2em !important;
      vertical-align: middle !important;
      fill: currentColor !important;
      overflow: hidden !important;
    }
  }
</style>
