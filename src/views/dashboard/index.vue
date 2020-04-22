<template>
  <div class="dashboard-container" >
    <el-row class="header">
      <el-col :span="2">
        <el-avatar shape="circle" :size="80" fit="cover" :src="url"></el-avatar>
      </el-col>
      <el-col :span="16">
        <div>
          <p class="content-title">早安，Serati Ma，祝你开心每一天！</p>
          <p class="content">交互专家 |蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <p class="doc-title">我的文档数量</p>
          <p class="doc-content">12</p>
        </div>

      </el-col>
      <el-divider direction="vertical"></el-divider>
      <el-col :span="2">
        <div>
          <p class="doc-title">部门文档数量</p>
          <p class="doc-content">32</p>
        </div>

      </el-col>
      <el-divider direction="vertical"></el-divider>
      <el-col :span="2">
        <div>
          <p class="doc-title">公司文档数量</p>
          <p class="doc-content">122</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="middle">
      <el-col :span="16">
        <div class="box-left-t">
           123
        </div>
        <div>

        </div>
      </el-col>
      <el-col :span="8">
        <div></div>
        <div></div>
        <div></div>
      </el-col>
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
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      }
    },
    methods: {


    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
     background-color: #f1f2f5;
      height: 100vh;
      .header{
        background-color: #fff;
        height: 120px;
        display: flex;
        align-items: center;
        .el-col:nth-child(1){
          padding-left: 20px;
        }
        .el-col:nth-child(2){
          .content-title{
            color: rgba(0,0,0,.85);
            font-weight: 500;
            font-size: 20px;
          }
          .content{
            color: rgba(0,0,0,.45);
            line-height: 22px;
            font-size: 14px;
          }
        }
        .doc-title{
          margin: 10px 0;
          text-align: center;
          color: rgba(0,0,0,.45);
          font-size: 14px;
        }
        .doc-content{
          margin: 10px 0;
          color: rgba(0,0,0,.85);
          font-size: 24px;
          text-align: center;
        }
        .el-divider{
          height: 3em;
        }
      }
    }
    &-middle{
      .box-left-t{
        background: #ffffff;
        width: 100%;
        height: 300px;
      }
    }
  }

  .el-row {
    margin-bottom: 20px;
  }
</style>
