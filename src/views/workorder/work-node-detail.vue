<template>
  <div class="contianer">
    <div>
      <p class="detail-title"><span>审批记录：</span></p>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="workOrderDetail.workNode.nodeId >=activity.nodeId?(activity.nodeOperateResult == '90'?'#67C23A':activity.nodeOperateResult ==70?'#F56C6C':'#3498db'):''"
          size="large"
          :timestamp="new Date(activity.nodeOperateTime).format('yyyy-MM-dd:hh:mm:ss')" placement="top">
          <p>审批人：{{activity.userName}}</p>
          <p class="approve-suggest">审批意见：{{activity.nodeOperateDesc}}</p>
          <p>审批批注：
            <el-link  type="primary" v-if="activity.nodeOperateResult==10"  :underline="false">审批中</el-link>
            <el-link  type="success" v-if="activity.nodeOperateResult==90"  :underline="false">审批通过</el-link>
            <el-link  type="danger" v-if="activity.nodeOperateResult==70"  :underline="false">审批驳回</el-link>
          </p>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="bottom-btn">
      <el-button type="primary" size="small" @click="goback()">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {queryWorkOrderDetail,approveWorkOrder} from "../../api/workOrder";
  import {querydept} from "../../api/dept";
  export default {
    name: "work-node-detail",
    data() {
      return {
        workOrderId: '',
        type:false,
        activities: [],
        workOrderDetail: {},
        dialogVisible:false,
        dialogVisibleSelectDept:false,
        operateStatus:'',
        approve: {},
        deptList: [],
        dept: {
          deptId: ''
        },
        rules: {
          deptId: [
            {required: true, message: '请选择部门', trigger: 'change'}
          ],
        }
      }
    },
    created() {
      this.workOrderId = this.$route.query.workOrderId;

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
      goback(val) {
        this.$router.go(-1)
      },
      handle(val) {
        this.dialogVisible = true;
        this.operateStatus = val;
      },
      onSubmit(val) {
        if (this.workOrderDetail.nodeCount == this.workOrderDetail.workNode.nodeOrder && val == '90') {
          this.dialogVisibleSelectDept = true
          this.queryDeptList()
        } else {
          this.approveSubmit(val);
        }

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
      onSubmitFinsh() {
        this.approveSubmit('90')
      },
      approveSubmit(val) {
        approveWorkOrder({
          workOrderId: this.workOrderDetail.workOrderId,
          currentNode: this.workOrderDetail.currentNode,
          workNode: {
            nodeId: this.workOrderDetail.workNode.nodeId,
            nodeOperateResult: val,
            nodeOperateDesc: this.approve.remark
          },
          sysDept: {
            deptId: this.dept.deptId
          }

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
      width: 520px;
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
    .approve-suggest{
      width: 550px;
      padding-left: 4.3rem;
      text-indent: -4.3rem;
      line-height: 20px;
    }
    .bottom-btn{
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .el-link {
      span:nth-child(1){
        display: inline-block;
        width: 300px;
      }
      span:nth-child(2) {
        margin-left: 300px;
      }
    }
    .el-divider--horizontal {
      height: 0.5px;
    }
  }
</style>
