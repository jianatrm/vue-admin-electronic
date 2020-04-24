<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="填写信息" name="first">
        <el-form :model="doc" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-form-item label="标题" prop="docName">
            <el-input v-model="doc.docName"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input type="textarea" v-model="doc.remark" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="审批人选择">
            <el-select v-model="approve.approveList" multiple filterable allow-create default-first-option
                       placeholder="请选择审批人">
              <el-option v-for="item in options" :key="item.userId" :label="item.userName" :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已选择审批人" prop="approveList">
            <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" style="margin-right: 10px"  @close="handleClose(tag)">{{tag.name}}</el-tag>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              drag
              :action="action"
              :file-list="fileList"
              ref="upload"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">上传文件不超过100MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  size="small" @click="submitForm('ruleForm')">提交审批</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="dialogVisible" title="提交审批">
      <el-form :inline="true" :model="approve" class="demo-form-inline" ref="formInline" :rules="rules">

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false"  size="small">取消</el-button>
        <el-button type="primary" @click="onSubmit('formInline')"  size="small">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {startWorkOrder} from "../../api/workOrder";
    import {queryuser} from "../../api/user";

    export default {
        name: "uploadDoc",

        data() {
            return {
                activeName: 'first',
                dialogVisible: false,
                formInline: {
                    user: '',
                    region: ''
                },
                doc: {
                    docName: '',
                    remark: '',
                },
                rules: {
                    docName: [
                        {required: true, message: '请输入文件名称', trigger: 'blur'},
                        {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
                    ],
                    remark: [
                        {required: true, message: '请填写文件描述', trigger: 'blur'}
                    ],
                    approveList: [
                        {required: true, message: '请选择审批人', trigger: 'change'}
                    ],
                },
                approve: {
                    approveList: []
                },
                fileList: [],
                options: [],
                value: [],
                action:'',
                pageNum: 1,
                pageSize: 1000,
                tags: [
                    { name: '标签一', type: '' },
                    { name: '标签二', type: 'success' },
                    { name: '标签三', type: 'info' },
                    { name: '标签四', type: 'warning' },
                    { name: '标签五', type: 'danger' }
                ]
            };
        },
        mounted() {
            this.action = process.env.VUE_APP_BASE_API+"electronic/file/uploadFile"
        },
        methods: {
            handleClick() {
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleAvatarSuccess(res, file) {
                if (res.success) {
                    console.log(1)
                    this.fileList.push({
                        name: res.result.fileName,
                        url: res.result.fileDownloadUri
                    })
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.$refs.upload.uploadFiles)
                        this.dialogVisible = true;
                        this.queryUserList();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitDoc() {

                let docList = [];
                let nodeList = [];
                let uploadFiles = this.$refs.upload.uploadFiles;
                for (let i = 0; i < uploadFiles.length; i++) {
                    docList.push({
                        docName: uploadFiles[i].response.result.fileName,
                        docUrl: uploadFiles[i].response.result.fileDownloadUri
                    })
                }
                for (let i = 0; i < this.approve.approveList.length; i++) {
                    nodeList.push({
                        userId: this.approve.approveList[i],
                        nodeOrder: i + 1
                    })
                }

                startWorkOrder({
                    workOrderName: this.doc.docName,
                    workOrderDesc: this.doc.remark,
                    workInfo: JSON.stringify(docList),
                    workType: "doc",
                    workNodeList: JSON.stringify(nodeList)
                }).then(res => {
                    this.$loading().close()
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        })
                        this.$router.push({path: '/approve/docapprove'})
                    }
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submit()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            queryUserList(val) {
                queryuser({
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    userName: val
                }).then(res => {
                    this.$loading().close()
                    if (res.success) {
                        this.options = res.result.result
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  .app-container {
    width: 100%;
    padding: 20px;

    .upload {
      margin-top: 5vh;
    }

    .el-select {
      width: 100%;
    }
  }
</style>

