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
              <el-button type="primary" size="small" @click="handleEdit(scope)">详情</el-button>
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
              <el-button type="primary" size="small" @click="handle(scope)">审批</el-button>
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
    <el-dialog :visible.sync="dialogVisible" title="审批处理">
      <el-form  class="demo-form-inline" >
        <el-form-item label="审批说明" prop="remark">
          <el-input type="textarea" v-model="approve.remark"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="onSubmit('formInline')">审批通过</el-button>
        <el-button type="danger" @click="onSubmit('formInline')">审批拒绝</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {queryWorkOrder,queryWorkOrderToMe} from "../../api/workOrder";
    import Pagination from '@/components/Pagination'

    export default {
      components: {Pagination},
        name: "docapprove",
        data (){
          return{
            dialogVisible:false,
            activeName:'first',
            workList:[],
            workToMeList:[],
            pageNum: 1,
            pageSize: 10,
            total: 10,
            approve:{}
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
            nodeStatus:1
          }).then(res=>{
            if (res.success){
              this.workToMeList = res.result.result;
            }
          })
        },
        handle(){
          this.dialogVisible =true;
        },
        onSubmit(){}
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
  }
</style>
