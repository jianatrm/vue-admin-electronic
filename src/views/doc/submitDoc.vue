<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="填写信息" name="first">
        <el-form :model="doc" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="文件名称" prop="docName">
            <el-input v-model="doc.docName"></el-input>
          </el-form-item>
          <el-form-item label="文件描述" prop="remark">
            <el-input type="textarea" v-model="doc.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              drag
              action="http://localhost:8001/electronic/file/uploadFile"
              :on-success="handleAvatarSuccess"
              :file-list="fileList"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>

            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交审批</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="dialogVisible" title="提交审批">
      <el-form :inline="true" :model="approve" class="demo-form-inline" ref="formInline" :rules="rules">
        <el-form-item label="审批人" prop="approveList">
          <el-select v-model="approve.approveList" multiple filterable allow-create default-first-option placeholder="请选择审批人">
            <el-option v-for="item in options" :key="item.userId" :label="item.userName" :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="onSubmit('formInline')">提交</el-button>
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
        dialogVisible:false,
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
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
        },
        approve:{
          approveList:[]
        },
        fileList: [],
        options: [],
        value: [],
        pageNum: 1,
        pageSize: 1000,
      };
    },
    mounted() {

    },
    methods: {
      handleClick() {
      },
      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.fileList.push({
            name: res.result.fileName,
            url: res.result.fileDownloadUri
          })
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = true;
            this.queryUserList();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitDoc (){
        let docList = [];
        let nodeList = [];
        for (let i = 0; i <this.fileList.length; i++) {
          docList.push({
            docName:this.fileList[i].name,
            docUrl:this.fileList[i].url
          })
        }
        for (let i = 0; i <this.approve.approveList.length; i++) {
          nodeList.push({
            userId:this.approve.approveList[i],
            nodeOrder:i+1
          })
        }

        startWorkOrder({
          workOrderName:this.doc.docName,
          workOrderDesc:this.doc.remark,
          workInfo:JSON.stringify(docList),
          workType:"doc",
          workNodeList:JSON.stringify(nodeList)
          }).then(res=>{
            if (res.success){
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.$router.push({path:'/approve/docapprove'})
            }
        })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitDoc()
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
          userName:val
        }).then(res => {
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
    height: 100vh;
    padding: 20px;

    .upload {
      margin-top: 5vh;
    }
    .el-select{
      width: 350%;
    }
  }
</style>

