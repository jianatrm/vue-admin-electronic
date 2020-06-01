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
            <el-select v-model="doc.approve"  placeholder="请选择审批人" @change="selectApprove()" filterable>
              <el-option v-for="item in options" :key="item.userId" :label="item.staffName" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已选择审批人" prop="approveList">
            <el-tag v-for="tag in doc.approveList" :key="tag.userName" closable style="margin-right: 10px"  @close="handleClose(tag)">{{tag.staffName}}</el-tag>
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
                    approve: '',
                    approveList: [],
                },
                rules: {
                    docName: [
                        {required: true, message: '请输入文件名称', trigger: 'blur'},
                        {min: 3, max: 250, message: '长度在 3 到 250 个字符', trigger: 'blur'}
                    ],
                    remark: [
                        {required: true, message: '请填写文件描述', trigger: 'blur'}
                    ],
                    approveList: [
                        {required: true, message: '请选择审批人', trigger: 'change'}
                    ],
                },

                fileList: [],
                options: [],
                value: [],
                action:'',
                pageNum: 1,
                pageSize: 1000,
                tags: []
            };
        },
        mounted() {
            this.action = window.location.protocol+"//"+window.location.host+"/electronic/file/uploadFile",
                this.queryUserList()
        },
        methods: {
            handleClick() {
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            selectApprove(){
              let a = false
              this.doc.approveList.forEach(item=>{
                  if (item == this.doc.approve){
                      a=true
                  }
              })
              if (!a){
                  this.doc.approveList.push(this.doc.approve);
              }
              this.doc.approve = ''
            },
            handleClose(tag) {
                this.doc.approveList.splice(this.doc.approveList.indexOf(tag), 1);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.open()
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
                if (uploadFiles.length==0){
                    this.$message({
                        message: '请上传文件',
                        type: 'warning'
                    });
                    return
                }
                for (let i = 0; i < uploadFiles.length; i++) {
                    docList.push({
                        docName: uploadFiles[i].response.result.fileName.split("&&")[1],
                        docUrl: decodeURI(uploadFiles[i].response.result.fileDownloadUri),
                        docType:uploadFiles[i].response.result.fileType,
                        docRandomName:uploadFiles[i].response.result.fileName
                    })
                }
                for (let i = 0; i < this.doc.approveList.length; i++) {
                    nodeList.push({
                        userId: this.doc.approveList[i].userId,
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
                        this.$router.push({path: '/workorder/workdoc'})
                    }else {
                        this.$message({
                            type: 'error',
                            message: '提交失败'
                        });
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

            open() {
                this.$confirm('确定提交审批?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.submitDoc()
                })
            }
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

