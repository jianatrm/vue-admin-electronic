<template>
  <div class="contianer">
    <div>
      <div style="float: right">
        <el-button type="primary" @click="handle('90')" size="small" v-if="type">审批通过</el-button>
        <el-button type="danger" @click="handle('70')" size="small"  v-if="type">审批拒绝</el-button>
        <el-button type="primary" size="small" @click="goback()">返回</el-button>
      </div>
      <p class="detail-title"><span>工单信息</span></p>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p class="detail-lable">工单编号：<span class="detail-content">{{workOrderDetail.workOrderCode}}</span></p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p class="detail-lable">工单标题：<span class="detail-content">{{workOrderDetail.workOrderName}}</span></p>
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
            <p class="detail-lable">创建时间：<span class="detail-content">{{workOrderDetail.operateTime&&new Date(workOrderDetail.operateTime).format("yyyy-MM-dd:hh:mm:ss")}}</span>
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p class="detail-lable">状态：<span class="detail-content">{{workOrderDetail.workOrderStatusDesc}}</span></p>
<!--            <el-link class="deatil-state" type="primary" v-if="workOrderDetail.workOrderStatus==10" :underline="false">{{-->
<!--              workOrderDetail.workOrderStatusDesc }}-->
<!--            </el-link>-->
<!--            <el-link class="deatil-state" type="success" v-if="workOrderDetail.workOrderStatus==90" :underline="false">{{-->
<!--              workOrderDetail.workOrderStatusDesc }}-->
<!--            </el-link>-->
<!--            <el-link class="deatil-state" type="danger" v-if="workOrderDetail.workOrderStatus==70" :underline="false">{{-->
<!--              workOrderDetail.workOrderStatusDesc }}-->
<!--            </el-link>-->
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
        <div v-for="(item,index) in workOrderDetail.workInfo">
          <el-link :underline="false" :key="index" >
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
            <span>
            <a :href="item.docUrl" target="_blank"><el-button type="primary" size="mini">下载</el-button></a>
            <el-button type="success" @click="handlePreview(item.docUrl)" size="mini">预览</el-button>
          </span>
          </el-link>
        </div>
      </el-row>
    </div>
    <el-divider></el-divider>
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
          <p class="approve-suggest">审批批注：{{activity.nodeOperateDesc}}</p>
          <p>审批结果：
            <el-link  type="primary" v-if="activity.nodeOperateResult==10"  :underline="false">审批中</el-link>
            <el-link  type="success" v-if="activity.nodeOperateResult==90"  :underline="false">审批通过</el-link>
            <el-link  type="danger" v-if="activity.nodeOperateResult==70"  :underline="false">审批驳回</el-link>
          </p>
        </el-timeline-item>
      </el-timeline>
    </div>

    <el-dialog :visible.sync="dialogVisible" title="审批处理">
      <el-form class="demo-form-inline">
        <el-form-item label="审批批注" prop="remark">
          <el-input type="textarea" v-model="approve.remark" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="onSubmit(operateStatus)" size="small">提交</el-button>
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
    import {queryWorkOrderDetail,approveWorkOrder} from "../../api/workOrder";
    import {querydept} from "../../api/dept";
    export default {
        name: "work-foc-detail",
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
                if ("xls xlsx".indexOf(filetype) == -1) {
                    window.open(`${window.location.protocol+"//"+window.location.host}/electronic/pdf/documentConverterToPdf/${filename}`)
                }else{
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
              let array = [];
              for (let i = 0; i <this.sysDeptList.length ; i++) {
                let temp = {
                  deptId:this.sysDeptList[i]
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
      width: 85%;
      padding-left: 4.3rem;
      text-indent: -4.3rem;
      line-height: 20px;
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
