<template>
  <div class="dashboard-container">
    <el-row class="header">
      <el-col :span="3" style="text-align: center">
        <el-avatar shape="circle" :size="80" fit="cover" :src="avatar||url"></el-avatar>
      </el-col>
      <el-col :span="18">
        <div>
          <p class="content-title">早安，{{userInfo.userName}}，祝你开心每一天！</p>
          <p class="content">前端开发 | {{userInfo.companyName}}－{{userInfo.deptName}}</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <p class="doc-title">我的文档数量</p>
          <p class="doc-content">{{userInfo.userCount}}</p>
        </div>

      </el-col>
      <el-divider direction="vertical"></el-divider>
      <el-col :span="2">
        <div>
          <p class="doc-title">部门文档数量</p>
          <p class="doc-content">{{userInfo.deptCount}}</p>
        </div>

      </el-col>
     <!-- <el-divider direction="vertical"></el-divider>
      <el-col :span="2">
        <div>
          <p class="doc-title">公司文档数量</p>
          <p class="doc-content">{{userInfo.companyCount}}</p>
        </div>
      </el-col>-->
    </el-row>
    <el-row class="middle" :gutter="18">
      <el-col :span="16">
        <div class="box-left-d">
          <div style="text-align: right;height: 80px;line-height: 80px;padding-right: 40px"><span>切换日期：</span>
            <el-date-picker v-model="value" type="year" placeholder="选择年份"></el-date-picker>
          </div>
          <div id="myChart" :style="{'width': '95%', height: '400px'}"/>
        </div>
        <el-card class="box-card box-left-t">
          <div slot="header" class="clearfix">
            <span>我的文档分类</span>
            <el-button style="float: right; padding: 3px 0" type="text">全部项目</el-button>
          </div>
          <div class="card-content">
            <el-row>
              <el-col :span="8" class="common-line">
                <div class="content-top">
                  <span>
                      <svg-icon icon-class="image"/>
                  </span>&nbsp;
                  <span>图片</span>
                </div>
                <div class="content-middle">
                  那是一种内在东西，他们到达不了，也无法触及的
                </div>
                <div class="content-bottom">
                  <p>文档数量</p>
                  <p>{{imageCount}}</p>
                </div>
              </el-col>
              <el-col :span="8" class="common-line">
                <div class="content-top">
                  <span>
                    <svg-icon icon-class="WORD"/>
                  </span>&nbsp;
                  <span>Word</span>
                </div>
                <div class="content-middle">
                  希望是一个好东西，也许是最好的，好东西是不会消亡的
                </div>
                <div class="content-bottom">
                  <p>文档数量</p>
                  <p>{{wordCount}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="content-top">
                  <span>
                    <svg-icon icon-class="excel"/>
                  </span>&nbsp;
                  <span>Excel</span>
                </div>
                <div class="content-middle">
                  城镇中有那么多的酒馆，她却偏偏走进了我的酒馆
                </div>
                <div class="content-bottom">
                  <p>文档数量</p>
                  <p>{{excelCount}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top: -20px">
              <el-col :span="8" class="common-line top-line">
                <div class="content-top">
                  <span>

                   <svg-icon icon-class="PDF"/>

                  </span>&nbsp;
                  <span>PDF</span>
                </div>
                <div class="content-middle">
                  那时候我只会想自己想要什么，从不想自己拥有什么
                </div>
                <div class="content-bottom">
                  <p>文档数量</p>
                  <p>{{pdfCount}}</p>
                </div>
              </el-col>
              <el-col :span="8" class="common-line top-line">
                <div class="content-top">
                  <span>

                    <svg-icon icon-class="PPT"  />
                  </span>&nbsp;
                  <span>PPT</span>
                </div>
                <div class="content-middle">
                  凛冬将至
                </div>
                <div class="content-bottom">
                  <p>文档数量</p>
                  <p>{{pptCount}}</p>
                </div>
              </el-col>
              <el-col :span="8" class="top-line">
                <div class="content-top">
                  <span>
                    <svg-icon icon-class="wendang"/>
                  </span>&nbsp;
                  <span>其他类型</span>
                </div>
                <div class="content-middle">
                  生命就像一盒巧克力，结果往往出人意料
                </div>
                <div class="content-bottom">
                  <p>文档数量</p>
                  <p>{{otherCount}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card box-right-t">
          <div slot="header" class="clearfix">
            <span>公司公告</span>
          </div>
          <div class="card-content2" style="display: flex;flex-wrap: wrap;">
            <p>{{content}}</p>
            <p>{{new Date().format('yyyy-MM-dd')}}</p>
          </div>
        </el-card>
        <el-card class="box-card box-right-m">
          <div slot="header" class="clearfix">
            <span>我的动态</span>
          </div>
          <div class="card-content2">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="我的申请" name="first">
                <ul v-if="workList.length>0" class="infinite-list" style="overflow:auto">
                  <li v-for="item in workList" class="infinite-list-item" :key="item.workOrderCode">
                    <span>{{item.workOrderCode}}</span>
                    <span>{{item.workOrderDesc}}</span>
                    <span>{{new Date(item.operateTime).format('yyyy-MM-dd')}}</span>
                  </li>
                </ul>
                <div v-else style="width: 100%;text-align: center;">
                  <img src="../../assets/images/no-result.png">
                </div>
              </el-tab-pane>
              <el-tab-pane label="审批申请" name="second">
                <ul v-if="workToMeList.length>0" class="infinite-list" style="overflow:auto">
                  <li v-for="item in workToMeList" class="infinite-list-item" :key="item.workOrderCode">
                    <span>{{item.workOrderCode}}</span>
                    <span>{{item.workOrderDesc}}</span>
                    <span>{{new Date(item.operateTime).format('yyyy-MM-dd')}}</span>
                  </li>
                </ul>
                <div v-else style="width: 100%;text-align: center;">
                  <img src="../../assets/images/no-result.png">
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {getUserInfo, selectCountByMonth} from '../../api/user'
    import {queryWorkOrder, queryWorkOrderToMe} from "../../api/workOrder";
    import {mapGetters} from 'vuex'
    export default {
        name: 'Dashboard',
        computed: {
            ...mapGetters([
                'avatar',
            ])
        },
        mounted() {

            this.queryUserInfo()
            this.queryCountByMonth()
            this.queryWorkOrderList()
            this.queryWorkOrderToMeList()
        },
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                value: new Date(),
                count: 4,
                content: '通知 新进公司的全体员工： 经公司领导班子研究决定，新进公司的员工，一年转正定级后，公司给统一办理缴纳社保。现在由员工自己缴纳社保，缴费收据上交到公司人事部门。为保证员工的合法权益，公司将以现金的形式给予补偿，每月每人补人民币180元，体现在个人的工资里。此规定从2010年6月1日起执行。',
                activeName: 'first',
                userInfo: {},
                imageCount: 0,
                wordCount: 0,
                excelCount: 0,
                pdfCount: 0,
                pptCount: 0,
                otherCount: 0,
                pageSize:10,
                pageNum:1,
                workList:[],
                workToMeList:[],
                options:{
                    title: {
                        text: '文档数量统计',
                        x: 'left',
                        align: 'right',
                        left: 20
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: []
                        }
                    ]
                }

            }
        },
        methods: {
            queryUserInfo() {
                getUserInfo({}).then(res => {
                    this.$loading().close()
                    if (res.success) {
                        this.userInfo = res.result
                        try {
                            let sUserElectronicDocs = res.result.sUserElectronicDocs;
                            for (let i = 0; i < sUserElectronicDocs.length; i++) {
                                let sUserElectronicDoc = sUserElectronicDocs[i];
                                if ("bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,jpeg".indexOf(sUserElectronicDoc.docType) > -1) {
                                    this.imageCount += sUserElectronicDoc.count
                                } else if ("doc,docx".indexOf(sUserElectronicDoc.docType) > -1) {
                                    this.wordCount += sUserElectronicDoc.count
                                } else if ("xls,xlsx,csv".indexOf(sUserElectronicDoc.docType) > -1) {
                                    this.excelCount += sUserElectronicDoc.count
                                } else if ("pdf,dpt,odf".indexOf(sUserElectronicDoc.docType) > -1) {
                                    this.pdfCount += sUserElectronicDoc.count
                                } else if ("ppt,pptx,pps,ppsx,pot".indexOf(sUserElectronicDoc.docType) > -1) {
                                    this.pptCount += sUserElectronicDoc.count
                                } else {
                                    this.otherCount += sUserElectronicDoc.count
                                }

                            }
                        } catch (e) {

                        }
                    }
                })
            },

            queryCountByMonth() {
                selectCountByMonth({
                    year: '2020'
                }).then(res => {
                    if (res.success) {
                       let array =  [0,0,0,0,0,0,0,0,0,0,0,0,]
                        for (let i = 0; i <res.result.length ; i++) {
                            let resultElement = res.result[i];
                            array[resultElement.months-1] = resultElement.count
                        }
                        this.options.series[0].data = array
                        this.drawLine()
                    }
                })
            },

            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption(this.options)
            },
            handleClick(){},
            queryWorkOrderList() {
                queryWorkOrder({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    workOrderStatus:10
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

        }
    }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      background-color: #f1f2f5;
      overflow: hidden;
      //height: 100vh;
      .header {
        background-color: #fff;
        height: 120px;
        display: flex;
        align-items: center;

        .el-col:nth-child(1) {
          padding-left: 20px;
        }

        .el-col:nth-child(2) {
          .content-title {
            color: rgba(0, 0, 0, .85);
            font-weight: 500;
            font-size: 20px;
          }

          .content {
            color: rgba(0, 0, 0, .45);
            line-height: 22px;
            font-size: 14px;
          }
        }

        .doc-title {
          margin: 10px 0;
          text-align: center;
          color: rgba(0, 0, 0, .45);
          font-size: 14px;
        }

        .doc-content {
          margin: 10px 0;
          color: rgba(0, 0, 0, .85);
          font-size: 24px;
          text-align: center;
        }

        .el-divider {
          height: 3em;
        }
      }

      .middle {
        padding: 0px 20px 0px 20px;

        .box-left-t {
          background: #ffffff;
          height: 350px;
          margin-bottom: 20px;

          .common-line {
            border-right: 1px solid #ebeef5;
          }

          .top-line {
            border-top: 1px solid #ebeef5;
          }

          .content-middle {
            font-size: 14px;
            color: rgba(0, 0, 0, .45);
            margin-top: 10px;
          }

          .content-bottom {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: rgba(0, 0, 0, .45);
          }
        }

        .card-content .el-col {
          padding: 20px;
          height: 144px;
        }

        .card-content .el-col:hover {
          box-shadow: 3px 2px 3px 2px gray;
        }

        .box-left-d {
          background: #ffffff;
          height: 500px;
          margin-bottom: 20px;


        }

        .box-right-t {
          background: #ffffff;
          height: 250px;
          margin-bottom: 20px;

          .card-content2 {
            padding: 0px 20px 0px 30px;

            p {
              width: 100%;
              text-indent: 2em;
              font-size: 14px;
              line-height: 24px;
              color: rgba(0, 0, 0, 0.65);
            }

            p:nth-child(2) {
              text-align: right;
            }
          }
        }

        .box-right-m {
          background: #ffffff;
          height: 600px;
          margin-bottom: 20px;

          .infinite-list{
            margin: 0;
            padding: 0;
          }
          .infinite-list .infinite-list-item {
            display: flex;
            align-items: center;
            justify-content: space-around;

            height: 50px;
            background: #e8f3fe;
            margin: 10px;
            color: #7dbcfc;
          }
        }

        .box-right-d {
          background: #ffffff;
          height: 100px;
        }
      }
    }
  }

  .el-row {
    margin-bottom: 20px;
  }

  /deep/ .el-card__body {
    padding: 0;
  }
</style>
