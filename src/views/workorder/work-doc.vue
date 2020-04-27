<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="我的申请" name="first">
        <el-table :data="workList" style="width: 100%;margin-top:30px;" border  size="small">
          <el-table-column align="center" label="工单编码" width="220">
            <template slot-scope="scope">
              {{ scope.row.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="工单名称">
            <template slot-scope="scope">
              {{ scope.row.workOrderName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间">
            <template slot-scope="scope">
              {{ new Date(scope.row.createTime ).format("yyyy-MM-dd")}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-link  type="primary" v-if="scope.row.workOrderStatus==10"  :underline="false">{{ scope.row.workOrderStatusDesc }}</el-link>
              <el-link  type="success" v-if="scope.row.workOrderStatus==90"  :underline="false">{{ scope.row.workOrderStatusDesc }}</el-link>
              <el-link  type="danger" v-if="scope.row.workOrderStatus==70"  :underline="false">{{ scope.row.workOrderStatusDesc }}</el-link>

            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="queryWorkDetail(scope.row.workOrderId)">详情</el-button>
<!--              <el-button type="danger" size="small" @click="handleDelete(scope)">取消</el-button>-->
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
      </el-tab-pane>
      <el-tab-pane label="审批工单" name="second">
        <el-table :data="workToMeList" style="width: 100%;margin-top:30px;" border  size="small">
          <el-table-column align="center" label="工单编码" width="220">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="工单名称">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间">
            <template slot-scope="scope">
              {{ new Date(scope.row.workOrderVO.createTime ).format("yyyy-MM-dd")}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-link  type="primary" v-if="scope.row.workOrderVO.workOrderStatus==10"  :underline="false">{{ scope.row.workOrderVO.workOrderStatusDesc }}</el-link>
              <el-link  type="success" v-if="scope.row.workOrderVO.workOrderStatus==90"  :underline="false">{{ scope.row.workOrderVO.workOrderStatusDesc }}</el-link>
              <el-link  type="danger" v-if="scope.row.workOrderVO.workOrderStatus==70"  :underline="false">{{ scope.row.workOrderVO.workOrderStatusDesc }}</el-link>

            </template>
          </el-table-column>
          <el-table-column align="center" label="提交人">
            <template slot-scope="scope">
              {{ scope.row.userName }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handle(scope.row.workOrderId)">审批</el-button>
              <el-button type="primary" size="small" @click="queryWorkDetail(scope.row.workOrderId,true)">详情</el-button>

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
      </el-tab-pane>
      <el-tab-pane label="审批记录" name="three">
        <el-table :data="workToMeList" style="width: 100%;margin-top:30px;" border  size="small">
          <el-table-column align="center" label="工单编码">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="工单名称">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间">
            <template slot-scope="scope">
              {{ new Date(scope.row.workOrderVO.createTime ).format("yyyy-MM-dd")}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-link  type="primary" v-if="scope.row.workOrderVO.workOrderStatus==10"  :underline="false">{{ scope.row.workOrderVO.workOrderStatusDesc }}</el-link>
              <el-link  type="success" v-if="scope.row.workOrderVO.workOrderStatus==90"  :underline="false">{{ scope.row.workOrderVO.workOrderStatusDesc }}</el-link>
              <el-link  type="danger" v-if="scope.row.workOrderVO.workOrderStatus==70"  :underline="false">{{ scope.row.workOrderVO.workOrderStatusDesc }}</el-link>

            </template>
          </el-table-column>
          <el-table-column align="center" label="提交人">
            <template slot-scope="scope">
              {{ scope.row.userName }}
            </template>
          </el-table-column>


          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="queryWorkDetail(scope.row.workOrderId)" >详情</el-button>
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
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="dialogVisibleDetail" title="审批详情">
      <p style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件名称</span>：{{workOrderDetail.workOrderName}}
      </p>
      <p style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件描述</span>：{{workOrderDetail.workOrderDesc}}
      </p>
      <div style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件列表：</span>
        <p style="margin-left: 40px;display: flex;justify-content: space-between;padding-right: 60px" v-for="(item,index) in workOrderDetail.workInfo" :key="index">
          <span >{{item.docName}}</span>
          <span>
            <a :href="item.docUrl" target="_blank"><el-button type="primary" size="small">下载</el-button></a>
          <el-button type="primary" @click="handlePreview(item.docUrl)"  size="small">预览</el-button>
          </span>
        </p>
      </div>

      <p style="font-size: 18px;"><span style="color:  #000;font-weight:bold">审批记录：</span></p>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="activity.nodeOperateResult == '90'?'#3498db':activity.nodeStatus ==70?'red':''"
          size="large"
          :timestamp="activity.operateTime">
          {{activity.userName}}
        </el-timeline-item>
      </el-timeline>
      <div style="text-align:right;">
        <el-button type="primary" @click="onSubmit('formInline')">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" title="审批处理">
      <el-form class="demo-form-inline">
        <el-form-item label="审批批注" prop="remark">
          <el-input type="textarea" v-model="approve.remark" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="onSubmit('90')" size="small">审批通过</el-button>
        <el-button type="danger" @click="onSubmit('70')" size="small">审批拒绝</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleSelectDept" title="选择文档分配部门">
      <el-form :model="dept" :rules="rules" ref="dept" label-width="80px">
        <el-form-item label="部门" prop="deptId">
          <el-select v-model="dept.deptId" placeholder="请选择部门">
            <el-option :label="item.deptName" :value="item.deptId" v-for="(item,index) in deptList"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="onSubmitFinsh()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {queryWorkOrder, queryWorkOrderToMe, queryWorkOrderDetail, approveWorkOrder} from "../../api/workOrder";
  import {querydept} from "../../api/dept";
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    name: "docapprove",
    inject: ['reload'],
    data() {
      return {
        dialogVisible: false,
        dialogVisibleDetail: false,
        dialogVisibleSelectDept: false,
        activeName: 'first',
        workList: [],
        workToMeList: [],
        workOrderDetail: {},
        pageNum: 1,
        pageSize: 10,
        total: 10,
        approve: {},
        activities: [],
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
    mounted() {
      this.activeName = this.$route.query.isOrder?'second':this.activeName;
      this.queryWorkOrderList();

    },
    methods: {
      handleClick(tab, event) {
        if (tab.index == 0) {
          this.queryWorkOrderList();
        } else if (tab.index == 1) {
          this.queryWorkOrderToMeList();
        } else if (tab.index == 2) {
          this.queryWorkOrderHistory();
        }
      },
      getList() {
      },
      queryWorkOrderList() {
        queryWorkOrder({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.workList = res.result.result;
          }
        })
      },
      queryWorkOrderToMeList() {
        queryWorkOrderToMe({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          nodeOperateStatus: 1
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.workToMeList = res.result.result;
          }
        })
      },
      queryWorkOrderHistory() {
        queryWorkOrderToMe({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          nodeOperateStatus: 2
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.workToMeList = res.result.result;
          }
        })
      },
      handle(workOrderId) {
        this.dialogVisible = true;
        queryWorkOrderDetail({
          workOrderId: workOrderId
        }).then(res => {
          this.$loading().close()
          if (res.success) {
            this.workOrderDetail = res.result
            this.activities = JSON.parse(res.result.workNodeList)
            this.workOrderDetail.workInfo = JSON.parse(res.result.workInfo)
          }
        })
      },
      onSubmit(val) {
        if (this.workOrderDetail.nodeCount == this.workOrderDetail.workNode.nodeOrder && val == '90') {
          this.dialogVisibleSelectDept = true
          this.queryDeptList()
        } else {
          this.approveSubmit(val);
        }

      },

      queryWorkDetail(workOrderId,type) {
        this.$router.push({path:'/workorder/workdocdetail',query:{workOrderId:workOrderId,type:type}})
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
            this.queryWorkOrderToMeList()
            this.reload()
          } else {
            this.$message({
              type: 'fail',
              message: '操作失败'
            })
          }
        })
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

    .el-input {
      width: 50%;
    }
  }
</style>
