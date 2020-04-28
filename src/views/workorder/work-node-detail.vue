<template>
  <div class="contianer">
    <div class="approve-record">
      <p class="detail-title"><span>审批记录：</span> <el-button type="primary" size="small" @click="goback">返回</el-button></p>
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
  </div>
</template>

<script>
  import {queryWorkOrderDetail} from "../../api/workOrder";
  export default {
    name: "work-node-detail",
    data() {
      return {
        workOrderId: '',
        workOrderDetail:{},
        activities: []
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
          }
        })
      },
      goback(val) {
        // this.$router.push({path:this.$route.query.route});
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contianer {
    padding: 5px 20px 20px 20px;
    .approve-record{
      margin-left: 30px;
      .approve-suggest{
        width: 850px;
        padding-left: 4.4rem;
        text-indent: -4.4rem;
        line-height: 23px;
      }
    }
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
      display: flex;
      justify-content: space-between;
    }
    .el-row {
      padding-left: 40px;
    }
    .el-timeline {
      margin-top: 20px;
    }
    .bottom-btn{
      display: flex;
      justify-content: center;
      /*margin-top: 20px;*/
      position: absolute;
      left: 48%;
      bottom: 5%;
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
