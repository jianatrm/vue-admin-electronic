<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark home-title">
          {{title}}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark home-content">
          {{content}}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark home-time">
          <p>公司人事部</p>
          {{time}}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="block">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="开始日期"
          value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          :picker-options="pickerOptionsStart">
        </el-date-picker>
        <span> 至 </span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="结束日期"
          value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          :picker-options="pickerOptionsEnd">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="CertificatesCount">搜索</el-button>
      </div>
    </el-row>
    <el-row style="text-align: center">
      <div id="myChart" :style="{'width': '95%', height: '400px'}"/>
    </el-row>
  </div>
</template>

<script>
  import { certificatesCount } from '@/api/server'

  export default {
    name: 'Dashboard',
    mounted() {
      this.drawLine()
    },
    data() {
      return {
        startTime: '',
        endTime: '',
        pickerOptionsStart: {
          disabledDate: time => {
            if (this.endTime) {
              return time.getTime() > new Date(this.endTime).getTime()
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            if (this.startTime) {
              return time.getTime() < new Date(this.startTime).getTime() - 86400000
            }
          }
        },
        title: '公司公告',
        content: '通知 新进公司的全体员工： 经公司领导班子研究决定，新进公司的员工，一年转正定级后，公司给统一办理缴纳社保。现在由员工自己缴纳社保，缴费收据上交到公司人事部门。为保证员工的合法权益，公司将以现金的形式给予补偿，每月每人补人民币180元，体现在个人的工资里。此规定从2010年6月1日起执行。',
        time: '2019-09-20'
      }
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '证照注册数量统计',
            x: 'left',
            align: 'right'
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty'
            },
            {
              type: 'slider',
              yAxisIndex: 0,
              filterMode: 'empty'
            },
            {
              type: 'inside',
              xAxisIndex: 0,
              filterMode: 'empty'
            },
            {
              type: 'inside',
              yAxisIndex: 0,
              filterMode: 'empty'
            }
          ],
          xAxis: {
            type: 'category',
            data: [
              '2019-08-22',
              '2019-08-23',
              '2019-08-24',
              '2019-08-25',
              '2019-08-26',
              '2019-08-27',
              '2019-08-28',
              '2019-08-29',
              '2019-08-30',
              '2019-08-31',
              '2019-09-01',
              '2019-09-02',
              '2019-09-03',
              '2019-09-04',
              '2019-09-05',
              '2019-09-06',
              '2019-09-07',
              '2019-09-08',
              '2019-09-09',
              '2019-09-10',
              '2019-09-11',
              '2019-09-12',
              '2019-09-13',
              '2019-09-14',
              '2019-09-15',
              '2019-09-16',
              '2019-09-17',
              '2019-09-18',
              '2019-09-19',
              '2019-09-20',
              '2019-09-21'
            ]
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '0',
              '0',
              '0',
              '0',
              '234',
              '234',
              '124',
              '234',
              '0',
              '423',
              '0',
              '130',
              '0',
              '13',
              '123',
              '0',
              '0',
              '0',
              '0',
              '0',
              '0',
              '0',
              '0',
              '0',
              '0'
            ],
            type: 'line'
          }]
        })
      },
      CertificatesCount() {
        var param = {
          beginTime: this.startTime,
          endTime: this.endTime
        }
        certificatesCount(param).then(res => {
          console.log(res)
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;

      .home-title {
        text-align: center;
        font-size: 20px;
        font-family: '微软雅黑';
        color: #ff0000;
      }

      .home-content {
        font-size: 16px;
        font-family: '微软雅黑';
        color: #6a676f;
        text-indent: 2rem;
        padding: 0 15%;
      }

      .home-time {
        text-align: right;
        font-size: 16px;
        font-family: '微软雅黑';
        color: #6a676f;
        padding: 0 15%;
      }

      .block {
        text-align: right;
        padding-right: 15%;
        position: absolute;
        width: 100%;
      }

      .mychart {
        text-align: center;
      }
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .el-row {
    margin-bottom: 20px;
  }
</style>
