<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="我的申请" name="first">
        <el-table :data="workList" style="width: 100%;margin-top:30px;" border size="small">
          <el-table-column align="center" label="文件编码" width="220">
            <template slot-scope="scope">
              {{ scope.row.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="文件名称">
            <template slot-scope="scope">
              {{ scope.row.workOrderName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-link type="primary" v-if="scope.row.workOrderStatus==10" :underline="false">{{
                scope.row.workOrderStatusDesc }}
              </el-link>
              <el-link type="success" v-if="scope.row.workOrderStatus==90" :underline="false">{{
                scope.row.workOrderStatusDesc }}
              </el-link>
              <el-link type="danger" v-if="scope.row.workOrderStatus==70" :underline="false">{{
                scope.row.workOrderStatusDesc }}
              </el-link>

            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="queryWorkDetail(scope.row.workOrderId)">详情</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.row.workOrderId)">删除</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <span>未查询到数据</span>
          </div>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="queryWorkOrderList()"/>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="文件审批" name="second">
        <el-table :data="workToMeList" style="width: 100%;margin-top:30px;" border size="small">
          <el-table-column align="center" label="文件编码" width="220">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="文件名称">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.createTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-link type="primary" v-if="scope.row.workOrderVO.workOrderStatus==10" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>
              <el-link type="success" v-if="scope.row.workOrderVO.workOrderStatus==90" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>
              <el-link type="danger" v-if="scope.row.workOrderVO.workOrderStatus==70" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>

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
            <span>未查询到数据</span>
          </div>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize"
                        @pagination="queryWorkOrderToMeList()"/>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="审批记录" name="three">
        <el-table :data="workToMeList" style="width: 100%;margin-top:30px;" border size="small">
          <el-table-column align="center" label="文件编码">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="文件名称">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.createTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-link type="primary" v-if="scope.row.workOrderVO.workOrderStatus==10" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>
              <el-link type="success" v-if="scope.row.workOrderVO.workOrderStatus==90" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>
              <el-link type="danger" v-if="scope.row.workOrderVO.workOrderStatus==70" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>

            </template>
          </el-table-column>
          <el-table-column align="center" label="提交人">
            <template slot-scope="scope">
              {{ scope.row.userName }}
            </template>
          </el-table-column>


          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="queryWorkDetail(scope.row.workOrderId)">详情</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <span>未查询到数据</span>
          </div>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize"
                        @pagination="queryWorkOrderHistory()"/>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我的抄送" name="four">
        <el-table :data="carbonListResult" style="width: 100%;margin-top:30px;" border size="small">
          <el-table-column align="center" label="文件编码">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderCode }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="文件名称">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.workOrderName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.createTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-link type="primary" v-if="scope.row.workOrderVO.workOrderStatus==10" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>
              <el-link type="success" v-if="scope.row.workOrderVO.workOrderStatus==90" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>
              <el-link type="danger" v-if="scope.row.workOrderVO.workOrderStatus==70" :underline="false">{{
                scope.row.workOrderVO.workOrderStatusDesc }}
              </el-link>

            </template>
          </el-table-column>
          <el-table-column align="center" label="提交人">
            <template slot-scope="scope">
              {{ scope.row.workOrderVO.userName }}
            </template>
          </el-table-column>


          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="queryWorkDetail(scope.row.workOrderId)">详情</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <span>未查询到数据</span>
          </div>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right">
            <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="queryCarbonList()"/>
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
        <p style="margin-left: 40px;display: flex;justify-content: space-between;padding-right: 60px"
           v-for="(item,index) in workOrderDetail.workInfo" :key="index">
          <span>{{item.docName}}</span>
          <span>
            <a :href="item.docUrl" target="_blank"><el-button type="primary" size="small">下载</el-button></a>
          <el-button type="primary" @click="handlePreview(item.docUrl)" size="small">预览</el-button>
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
      <el-form :model="approve" :rules="rules" ref="approve" class="demo-form-inline">
        <el-form-item label="审批批注" prop="remark">
          <el-input type="textarea" v-model="approve.remark" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="onSubmit('90','approve')" size="small">审批通过</el-button>
        <el-button type="danger" @click="onSubmit('70','approve')" size="small">审批拒绝</el-button>
        <!--        <el-button style="background-color: #e67e22;color: #fff" @click="onSubmitNextApprove()" size="small" v-if="workOrderDetail.workNode&&workOrderDetail.nodeCount == workOrderDetail.workNode.nodeOrder">审批推送</el-button>-->
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleSelectDept" title="选择处理结果">
      <el-form label-width="80px">
        <el-form-item label="处理结果">
          <el-radio-group v-model="approveResult">
            <el-radio :label="2">审批推送</el-radio>
            <el-radio :label="1">审批结束</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-form :model="dept" :rules="rules" ref="dept" label-width="80px" v-show="approveResult == 1">
        <el-form-item label="部门" prop="sysDeptList">
          <el-select multiple v-model="dept.sysDeptList" filterable placeholder="请选择部门" style="width: 100%">
            <el-option :label="item.deptName" :value="item.deptId" v-for="(item,index) in deptList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:right;">
          <el-button type="primary" @click="onSubmitFinsh('dept')">提交</el-button>
        </div>
      </el-form>

      <el-form :model="carbon" :rules="rules" ref="carbon" label-width="80px"  v-show="approveResult == 2">
        <el-form-item label="审批人" prop="nextApprove">
          <el-select v-model="carbon.nextApprove" placeholder="请选择下一级审批人" style="width: 100%" filterable>
            <el-option v-for="item in nextApproveList" :key="item.userId" :label="item.staffName"
                       :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送人" >
          <el-select multiple v-model="carbon.carbonList" placeholder="请选择抄送人" style="width: 100%" >
            <el-option v-for="item in nextApproveList" :key="item.userId" :label="item.staffName"
                       :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:right;">
          <el-button type="primary" @click="submitNextApprove('carbon')">提交</el-button>
        </div>
      </el-form>


    </el-dialog>
  </div>
</template>

<script>
  import {
    queryWorkOrder,
    queryWorkOrderToMe,
    queryWorkOrderDetail,
    approveWorkOrder,
    approverCarbonCopy,
    queryApproverCarbonCopy,
      deleteWorkOrder
  } from "../../api/workOrder";
  import {querydept} from "../../api/dept";
  import Pagination from '@/components/Pagination'
  import {queryuser} from "../../api/user";

  export default {
    components: {Pagination},
    name: "docapprove",
    inject: ['reload'],
    data() {
      return {
        dialogVisible: false,
        dialogVisibleDetail: false,
        dialogVisibleSelectDept: false,
        dialogVisibleNextApprove: false,
        activeName: 'first',
        workList: [],
        workToMeList: [],
        carbonListResult: [],
        workOrderDetail: {},
        pageNum: 1,
        pageSize: 10,
        total: 0,
        approve: {},
        activities: [],
        approveResult: 2,
        deptList: [],
        nextApproveList: [],

        dept: {
          deptId: [],
          sysDeptList: [],
        },
        carbon: {
          nextApprove: '',
          carbonList: '',
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
        }
      }
    },
    mounted() {
      this.queryWorkOrderList();
      if (this.$route.query.activeName){
        this.activeName = this.$route.query.activeName
        if (this.$route.query.activeName == 'second'){
          this.queryWorkOrderToMeList(false);
        }else if (this.$route.query.activeName == 'three') {
          this.queryWorkOrderHistory(false);
        } else if (this.$route.query.activeName == 'four') {
          this.queryCarbonList(false)
        }
      }

    },
    methods: {
      handleClick(tab, event) {
        this.total = 0
        this.pageNum = 1
        if (tab.index == 0) {
          this.queryWorkOrderList();
        } else if (tab.index == 1) {
          this.queryWorkOrderToMeList();
        } else if (tab.index == 2) {
          this.queryWorkOrderHistory();
        } else if (tab.index == 3) {
          this.queryCarbonList()
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
            this.total = res.result.count
          }
        })
      },
      queryWorkOrderToMeList(loading =true) {
        queryWorkOrderToMe({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          nodeOperateStatus: 1
        },loading).then(res => {
          if (loading){this.$loading().close()}
          if (res.success) {
            this.workToMeList = res.result.result;
            this.total = res.result.count
          }
        })
      },
      queryWorkOrderHistory(loading = true) {
        queryWorkOrderToMe({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          nodeOperateStatus: 2
        },loading).then(res => {
          if (loading){this.$loading().close()}
          if (res.success) {
            this.workToMeList = res.result.result;
            this.total = res.result.count
          }
        })
      },
      queryCarbonList(loading =true) {
        queryApproverCarbonCopy({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },loading).then(res => {
          if (loading) {this.$loading().close()}
          if (res.success) {
            this.carbonListResult = res.result.result
            this.total = res.result.count
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

      queryWorkDetail(workOrderId, type) {
        this.$router.push({path: '/workorder/workdocdetail', query: {route:this.$route.fullPath,workOrderId: workOrderId, type: type,activeName:this.activeName}})
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
            this.reload();
          }
        })

      },
      queryUserList(val) {
        queryuser({
          pageSize: 10000,
          pageNum: this.pageNum,
          userName: val
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

      },
      handleDelete(workOrderId){
          this.$confirm('确定删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              deleteWorkOrder({
                  workOrderId:workOrderId
              }).then(res=>{
                  if (res.success) {
                      this.$message({
                          type: 'success',
                          message: '操作成功'
                      })
                      this.pageNum =1
                      this.queryWorkOrderList()
                  }else {
                      this.$message({
                          type: 'error',
                          message: '提交失败'
                      });
                  }
              })
          })
      }

    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    width: 100%;
    height: 140vh;
    padding: 20px;

    .upload {
      margin-top: 5vh;
    }

    .el-input {
      width: 50%;
    }
  }
</style>
