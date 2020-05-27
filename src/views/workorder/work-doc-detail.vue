<template>
  <div class="contianer" id="printMe">
    <div>
      <div style="float: right">
        <el-button @click="handle('90')" size="small" type="primary" v-if="type">审批通过</el-button>
        <el-button @click="handle('70')" size="small" type="danger" v-if="type">审批拒绝</el-button>
<!--        <el-button @click="onSubmitNextApprove()" size="small" style="background-color: #e67e22;color: #fff"-->
<!--                   v-if="type&&workOrderDetail.workNode&&workOrderDetail.nodeCount == workOrderDetail.workNode.nodeOrder">-->
<!--          审批推送-->
<!--        </el-button>-->
        <el-button size="small" style="background-color: #7f8c8d;color: #fff" v-print="'#printMe'">打印</el-button>
        <el-button @click="goback()" size="small" type="primary">返回</el-button>

      </div>
      <p class="detail-title"><span>文件信息</span></p>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p class="detail-lable">文件编号：<span class="detail-content">{{workOrderDetail.workOrderCode}}</span></p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p class="detail-lable">文件标题：<span class="detail-content">{{workOrderDetail.workOrderName}}</span></p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p class="detail-lable">创建人：<span class="detail-content">{{workOrderDetail.userName}}</span></p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p class="detail-lable">创建时间：<span class="detail-content">{{workOrderDetail.operateTime}}</span>
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p class="detail-lable">状态：<span class="detail-content">{{workOrderDetail.workOrderStatusDesc}}</span></p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <p class="detail-lable">描述：{{workOrderDetail.workOrderDesc}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="detail-title"><p>文件列表：</p>
      <el-row>
        <div class="fileList" v-for="(item,index) in workOrderDetail.workInfo">
          <el-link :key="index" :underline="false">
        <span>
          <svg-icon icon-class="excel" v-if="'xls,xlsx,csv'.indexOf(item.docType) > -1"/>
          <svg-icon icon-class="PPT" v-else-if="'ppt,pptx,pps,ppsx,pot'.indexOf(item.docType) > -1"/>
          <svg-icon icon-class="PDF" v-else-if="'pdf,dpt,odf'.indexOf(item.docType) > -1"/>
          <svg-icon icon-class="WORD" v-else-if="'doc,docx'.indexOf(item.docType) > -1"/>
          <svg-icon icon-class="image"
                    v-else-if="'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,jpeg'.indexOf(item.docType) > -1"/>
          <svg-icon icon-class="wendang" v-else/>
          {{item.docName}}
        </span>
          </el-link>
          <span>
            <a :href="item.docUrl" target="_blank"><el-button size="mini" type="primary">下载</el-button></a>
            <el-button @click="handlePreview(item.docUrl)" size="mini" type="success">预览</el-button>
          </span>

        </div>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div>
      <p class="detail-title"><span>审批记录：</span></p>
      <el-timeline>
        <el-timeline-item
          :color="workOrderDetail.workNode.nodeId >=activity.nodeId?(activity.nodeOperateResult == '90'?'#67C23A':activity.nodeOperateResult ==70?'#F56C6C':'#3498db'):''"
          :key="index"
          :timestamp="activity.nodeOperateTime&&new Date(activity.nodeOperateTime).format('yyyy/MM/dd hh:mm:ss')"
          placement="top"
          size="large" v-for="(activity, index) in activities">
          <p>审批人：{{activity.userName}}</p>
          <p class="approve-suggest">审批批注：{{activity.nodeOperateDesc}}</p>
          <p class="approve-suggest">抄送人员：
            <el-link :key="m" :underline="false" type="primary" v-for="(item,m) in activity.workCarbonVOList">
              {{item.userName}}、
            </el-link>
          </p>
          <p>审批结果：
            <el-link :underline="false" type="primary" v-if="activity.nodeOperateResult==10">审批中</el-link>
            <el-link :underline="false" type="success" v-if="activity.nodeOperateResult==90">审批通过</el-link>
            <el-link :underline="false" type="danger" v-if="activity.nodeOperateResult==70">审批驳回</el-link>
          </p>
        </el-timeline-item>
      </el-timeline>
    </div>

    <el-dialog :visible.sync="dialogVisible" title="审批处理">
      <el-form :model="approve" :rules="rules" ref="approve" class="demo-form-inline">
        <el-form-item label="审批批注" prop="remark">
          <el-input :rows="3" type="textarea" v-model="approve.remark"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="onSubmit(operateStatus,'approve')" size="small" type="primary">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleSelectDept" title="选择处理结果">

      <el-form label-width="80px">
        <el-form-item label="处理结果">
          <el-radio-group v-model="approveResult">
            <el-radio :label="1">审批结束</el-radio>
            <el-radio :label="2">审批推送</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form :model="dept" :rules="rules" label-width="80px" ref="dept" v-if="approveResult == 1">
        <el-form-item label="部门" prop="sysDeptList">
          <el-select filterable multiple placeholder="请选择部门" style="width: 100%" v-model="dept.sysDeptList">
            <el-option :key="index" :label="item.deptName" :value="item.deptId"
                       v-for="(item,index) in deptList"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:right;">
          <el-button @click="onSubmitFinsh('dept')" type="primary">提交</el-button>
        </div>

      </el-form>


      <el-form :model="carbon" :rules="rules" label-width="80px" ref="carbon" v-else>
        <el-form-item label="审批人" prop="nextApprove">
          <el-select filterable placeholder="请选择下一级审批人" style="width: 100%" v-model="carbon.nextApprove">
            <el-option :key="item.userId" :label="item.staffName" :value="item.userId"
                       v-for="item in nextApproveList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送人" >
          <el-select multiple placeholder="请选择抄送人" style="width: 100%" v-model="carbon.carbonList">
            <el-option :key="item.userId" :label="item.staffName" :value="item.userId"
                       v-for="item in nextApproveList"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:right;">
          <el-button @click="submitNextApprove('carbon')" type="primary">提交</el-button>
        </div>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
  import {queryWorkOrderDetail, approveWorkOrder, approverCarbonCopy} from "../../api/workOrder";
  import {querydept} from "../../api/dept";
  import {queryuser} from "../../api/user";

  export default {
    name: "work-foc-detail",
    data() {
      return {
        workOrderId: '',
        type: false,
        activities: [],
        workOrderDetail: {},
        dialogVisible: false,
        dialogVisibleSelectDept: false,
        operateStatus: '',
        approve: {},
        deptList: [],

        dept: {
          sysDeptList: [],
          deptId: ''
        },
        rules: {
          sysDeptList: [
            {required: true, message: '请选择部门', trigger: 'change'}
          ],
          nextApprove: [
            {required: true, message: '请选择审批人', trigger: 'change'}
          ],
          carbonList: [
            {required: true, message: '请选择抄送人', trigger: 'change'}
          ],
          remark: [
            {required: true, message: '请填写审批批注', trigger: 'blur'}
          ],
        },
        dialogVisibleNextApprove: false,
        nextApproveList: [],
        approveResult:1,
        carbon: {
          nextApprove: '',
          carbonList: '',
        },
      }
    },
    created() {
      this.workOrderId = this.$route.query.workOrderId;
      this.type = this.$route.query.type;

    },
    mounted() {
      this.queryWorkDetail();
    },
    methods: {
      queryWorkDetail() {
        queryWorkOrderDetail({
          workOrderId: this.workOrderId
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.workOrderDetail = res.result
            this.activities = JSON.parse(res.result.workNodeList)
            this.workOrderDetail.workInfo = JSON.parse(res.result.workInfo)
          }
        })
      },
      handlePreview(scope) {
        let number = decodeURI(scope).lastIndexOf('.');
        let filetype = decodeURI(scope).substring(number + 1);
        let reg = "pdf swf html ott fodt  sxw doc docx rtf  wpd  txt  ods  ots  fods sxc  xls xlsx  csv  tsv  odp  otp fodp  sxi  ppt pptx  odg  otg fodg  svg  png jpg  tif  gif bmp"
        if (reg.indexOf(filetype) == -1) {
          this.$message({
            showClose: true,
            message: '该文件不支持预览，请下载后查看',
            type: 'warning'
          });
          return
        }
        let filename = decodeURI(scope).substring(scope.lastIndexOf('/') + 1);
        if ("xls xlsx".indexOf(filetype) > -1) {
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
      goback(val) {
        this.$router.push({path:this.$route.query.route,query:{activeName:this.$route.query.activeName}});
      },
      handle(val) {
        this.dialogVisible = true;
        this.operateStatus = val;
      },
      onSubmit(val,formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.workOrderDetail.nodeCount == this.workOrderDetail.workNode.nodeOrder && val == '90') {
              this.dialogVisibleSelectDept = true
              this.queryDeptList()
              this.queryUserList();
            } else {
              this.approveSubmit(val);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      queryDeptList() {
        querydept({
          pageNum: 1,
          pageSize: 1000,
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.deptList = res.result.result
          }
        })
      },
      onSubmitFinsh(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.approveSubmit('90')
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      approveSubmit(val) {
        let array = [];
        for (let i = 0; i < this.dept.sysDeptList.length; i++) {
          let temp = {
            deptId: this.dept.sysDeptList[i]
          };
          array.push(temp)
        }
        approveWorkOrder({
          workOrderId: this.workOrderDetail.workOrderId,
          currentNode: this.workOrderDetail.currentNode,
          workNode: {
            nodeId: this.workOrderDetail.workNode.nodeId,
            nodeOperateResult: val,
            nodeOperateDesc: this.approve.remark
          },
          sysDeptList: JSON.stringify(array)

        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogVisibleSelectDept = false;
            this.dialogVisible = false;
            this.$router.go(-1)
          } else {
            this.$message({
              type: 'fail',
              message: '操作失败'
            })
          }
        })
      },
      onSubmitNextApprove() {
        let array = [];
        for (let i = 0; i < this.carbon.carbonList.length; i++) {
          let temp = {};
          temp.userId = this.carbon.carbonList[i];
          array.push(temp)
        }
        approverCarbonCopy({
          workOrderId: this.workOrderDetail.workOrderId,
          currentNode: this.workOrderDetail.currentNode,
          workNode: {
            userId: this.carbon.nextApprove,
            nodeId: this.workOrderDetail.workNode.nodeId,
            nodeOperateResult: '90',
            nodeOperateDesc: this.approve.remark
          },
          workCarbonList: JSON.stringify(array)
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.dialogVisible = false;
            this.dialogVisibleNextApprove = false;
            this.$router.go(-1)
          } else {
            this.$message({
              type: 'fail',
              message: '操作失败'
            })
          }
        })

      },
      queryUserList(val) {
        queryuser({
          pageSize: 10000,
          pageNum: 1,
        }, false).then(res => {
          if (res.success) {
            this.nextApproveList = res.result.result
          }
        })
      },
      submitNextApprove(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('success submit!!');
            this.onSubmitNextApprove()
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
  .contianer {
    padding: 5px 20px 20px 20px;

    .detail-title {
      margin-right: 12px;
      margin-bottom: 0;
      color: rgba(0, 0, 0, .85);
      font-weight: 600;
      font-size: 14px;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .detail-lable {
      color: rgba(0, 0, 0, .85);
      font-weight: 400;
      font-size: 14px;
      /*line-height: 1.5715;*/
      //width: 520px;
      padding-left: 2.6rem;
      text-indent: -2.6rem;
      line-height: 22px;
    }

    .detail-content {
      color: rgba(0, 0, 0, .65);
      font-size: 14px;
      line-height: 1.5715;
    }

    .deatil-state {
      font-size: 24px;
      font-family: -apple-system,
      BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol, noto color emoji;
    }

    .el-row {
      padding-left: 40px;
    }

    .el-timeline {
      margin-top: 20px;
    }

    .approve-suggest {
      //width: 85%;
      padding-left: 4.3rem;
      text-indent: -4.3rem;
      line-height: 20px;
      display: flex;

      .el-link {
        text-indent: initial;
      }
    }

    .el-link {
      span:nth-child(1) {
        display: inline-block;
        width: 300px;
      }

    }

    .el-divider--horizontal {
      height: 0.5px;
    }

    .fileList {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
