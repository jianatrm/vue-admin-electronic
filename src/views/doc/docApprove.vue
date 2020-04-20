<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="我的申请" name="first">
        <el-table :data="workList" style="width: 100%;margin-top:30px;" border>
          <el-table-column align="center" label="工单编码" width="220">
            <template slot-scope="scope">
              {{ scope.row.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="工单名称" >
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
              {{ scope.row.workOrderStatusDesc }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="queryWorkDetail(scope.row.workOrderId)">详情</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope)">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"/>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="审批工单" name="second">
        <el-table :data="workToMeList" style="width: 100%;margin-top:30px;" border>
          <el-table-column align="center" label="工单编码" width="220">
            <template slot-scope="scope">
              {{ scope.row.workOrder.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="工单名称" >
            <template slot-scope="scope">
              {{ scope.row.workOrder.workOrderName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间">
            <template slot-scope="scope">
              {{ new Date(scope.row.workOrder.createTime ).format("yyyy-MM-dd")}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              {{ scope.row.workOrder.workOrderStatusDesc }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handle(scope.row.workOrderId)">审批</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList"/>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="dialogVisibleDetail" title="审批详情">
      <p style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件名称</span>：{{workOrderDetail.workOrderName}}</p>
      <p style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件描述</span>：{{workOrderDetail.workOrderDesc}}</p>
      <div  style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件列表：</span>
        <p style="margin-left: 80px" v-for="(item,index) in workOrderDetail.workInfo" :key="index">
          <a :href="item.docUrl" target="_blank">{{item.docName}}</a>
        </p>
      </div>

      <p  style="font-size: 18px;"><span style="color:  #000;font-weight:bold">审批记录：</span></p>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="activity.nodeStatus == '90'?'#3498db':activity.nodeStatus ==70?'red':''"
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
      <p style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件名称</span>：{{workOrderDetail.workOrderName}}</p>
      <p style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件描述</span>：{{workOrderDetail.workOrderDesc}}</p>
      <div  style="font-size: 18px;"><span style="color:  #000;font-weight:bold">文件列表：</span>
        <p style="margin-left: 80px" v-for="(item,index) in workOrderDetail.workInfo" :key="index">
          <a :href="item.docUrl" target="_blank">{{item.docName}}</a>
        </p>
      </div>

      <p  style="font-size: 18px;"><span style="color:  #000;font-weight:bold">审批记录：</span></p>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="activity.nodeStatus == '90'?'#3498db':activity.nodeStatus ==70?'red':''"
          size="large"
          :timestamp="activity.operateTime">
          {{activity.userName}}
        </el-timeline-item>
      </el-timeline>
      <el-form  class="demo-form-inline" >
        <el-form-item label="审批说明" prop="remark">
          <el-input type="textarea" v-model="approve.remark"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="onSubmit('90')">审批通过</el-button>
        <el-button type="danger" @click="onSubmit('70')">审批拒绝</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleSelectDept" title="选择文档分配部门">
      <el-form :model="dept" :rules="rules" ref="dept" label-width="80px">
        <el-form-item label="活动区域" prop="deptId">
          <el-select v-model="dept.deptId" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    import {queryWorkOrder,queryWorkOrderToMe,queryWorkOrderDetail,approveWorkOrder} from "../../api/workOrder";
    import Pagination from '@/components/Pagination'

    export default {
      components: {Pagination},
        name: "docapprove",
        data (){
          return{
            dialogVisible:false,
            dialogVisibleDetail:false,
            dialogVisibleSelectDept:false,
            activeName:'first',
            workList:[],
            workToMeList:[],
            workOrderDetail:{},
            pageNum: 1,
            pageSize: 10,
            total: 10,
            approve:{},
            activities: [],
            dept:{
                deptId:''
            },
              rules: {
                  deptId: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
              }
          }
        },
      mounted() {
          this.queryWorkOrderList();
          this.queryWorkOrderToMeList();
      },
      methods:{
        handleClick(){},
        getList(){},
        queryWorkOrderList(){
          queryWorkOrder({
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }).then(res=>{
            if (res.success){
              this.workList = res.result.result;
            }
          })
        },
        queryWorkOrderToMeList(){
          queryWorkOrderToMe({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            nodeOperateStatus:1
          }).then(res=>{
            if (res.success){
              this.workToMeList = res.result.result;
            }
          })
        },
        handle(workOrderId){
          this.dialogVisible =true;
          this.queryWorkDetail(workOrderId);
        },
        onSubmit(val){
            if (this.workOrderDetail.nodeCount == this.workOrderDetail.workNode.nodeOrder){
                this.dialogVisibleSelectDept= true
            }else {
                this.approveSubmit(val);
            }

        },

        queryWorkDetail(workOrderId){
            this.dialogVisibleDetail =true
            queryWorkOrderDetail({
               workOrderId: workOrderId
            }).then(res=>{
                if (res.success){
                    this.workOrderDetail = res.result
                    this.activities =  JSON.parse(res.result.workNodeList)
                    this.workOrderDetail.workInfo = JSON.parse(res.result.workInfo)
                }
            })
        },


         approveSubmit(val){
             approveWorkOrder({
                 workOrderId:this.workOrderDetail.workOrderId,
                 currentNode:this.workOrderDetail.currentNode,
                 workNode:{
                     nodeId:this.workOrderDetail.workNode.nodeId,
                     nodeOperateResult:val,
                     nodeOperateDesc:this.approve.remark
                 },
                 sysDept:{
                     deptId:this.dept.deptId
                 }

             }).then(res=>{
                 if (res.success){
                     this.$message({
                         type: 'success',
                         message: '操作成功'
                     })
                 }else {
                     this.$message({
                         type: 'fail',
                         message: '操作失败'
                     })
                 }
             })
         }
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
    .el-input{
      width: 50%;
    }
  }
</style>
