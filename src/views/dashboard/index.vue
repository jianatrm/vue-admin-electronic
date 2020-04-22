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
    <el-row class="middle" :gutter="18">
      <el-col :span="16">
        <el-card class="box-card box-left-t">
          <div slot="header" class="clearfix">
            <span>进行中的项目</span>
              <el-button style="float: right; padding: 3px 0" type="text">全部项目</el-button>
          </div>
          <div class="card-content">
            <el-row>
              <el-col :span="8" class="common-line">
                <div class="content-top">
                  <span>图标</span>&nbsp;
                  <span>Alipay</span>
                </div>
                <div class="content-middle">
                  那是一种内在东西，他们到达不了，也无法触及的
                </div>
                <div class="content-bottom">
                  <p>科学搬砖组</p>
                  <p>9 天前</p>
                </div>
              </el-col>
              <el-col :span="8" class="common-line">
                <div class="content-top">
                  <span>图标</span>&nbsp;
                  <span>Angular</span>
                </div>
                <div class="content-middle">
                  希望是一个好东西，也许是最好的，好东西是不会消亡的
                </div>
                <div class="content-bottom">
                  <p>全组都是吴彦祖</p>
                  <p>3 年前</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="content-top">
                  <span>图标</span>&nbsp;
                  <span>Ant Design</span>
                </div>
                <div class="content-middle">
                  城镇中有那么多的酒馆，她却偏偏走进了我的酒馆
                </div>
                <div class="content-bottom">
                  <p>中二少女团</p>
                  <p>9 天前</p>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top: -20px">
              <el-col :span="8" class="common-line top-line">
                <div class="content-top">
                  <span>图标</span>&nbsp;
                  <span>Ant Design Pro</span>
                </div>
                <div class="content-middle">
                  那时候我只会想自己想要什么，从不想自己拥有什么
                </div>
                <div class="content-bottom">
                  <p>程序员日常</p>
                  <p>3 年前</p>
                </div>
              </el-col>
              <el-col :span="8" class="common-line top-line">
                <div class="content-top">
                  <span>图标</span>&nbsp;
                  <span>Bootstrap</span>
                </div>
                <div class="content-middle">
                  凛冬将至
                </div>
                <div class="content-bottom">
                  <p>高逼格设计天团</p>
                  <p>3 年前</p>
                </div>
              </el-col>
              <el-col :span="8" class="top-line">
                <div class="content-top">
                  <span>图标</span>&nbsp;
                  <span>React</span>
                </div>
                <div class="content-middle">
                  生命就像一盒巧克力，结果往往出人意料
                </div>
                <div class="content-bottom">
                  <p>骗你来学计算机</p>
                  <p>3 年前</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div class="box-left-d">

        </div>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card box-right-t">
          <div slot="header" class="clearfix">
            <span>快速开始/便捷导航</span>
          </div>
          <div class="card-content2" style="display: flex;flex-wrap: wrap;">
            <p>操作一</p>
            <p>操作二</p>
            <p>操作三</p>
            <p>操作四</p>
            <p>操作五</p>
            <p>操作六</p>
            <div>添加</div>
          </div>
        </el-card>
        <div class="box-right-m"></div>
        <div class="box-right-d"></div>
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
      overflow: hidden;
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
      .middle{
        padding: 0px 20px 0px 20px;
        .box-left-t{
          background: #ffffff;
          height: 350px;
          margin-bottom: 20px;
          .common-line{
            border-right: 1px solid #ebeef5;
          }
          .top-line{
            border-top: 1px solid #ebeef5;
          }
          .content-middle{
            font-size: 14px;
            color: rgba(0,0,0,.45);
            margin-top: 10px;
          }
          .content-bottom{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: rgba(0,0,0,.45);
          }
        }
        .card-content .el-col{
          padding: 20px;
          height: 144px;
        }
        .card-content .el-col:hover{
          box-shadow: 3px 2px 3px 2px gray;
        }
        .box-left-d{
          background: #ffffff;
          height: 550px;
        }
        .box-right-t{
          background: #ffffff;
          height: 150px;
          margin-bottom: 20px;
          .card-content2{
            padding: 0px 20px 0px 30px;
            p{
              width: 25%;
              font-size: 14px;
              color: rgba(0,0,0,0.65);
            }
            div{
              width: 75px;
              height:25px;
              text-align: center;
              line-height: 23px;
              color: #1890ff;
              border: 1px solid #1890ff;
              margin-top: 8px;
            }
          }
        }
        .box-right-m{
          background: #ffffff;
          height: 420px;
          margin-bottom: 20px;
        }
        .box-right-d{
          background: #ffffff;
          height: 200px;
        }
      }
    }
  }

  .el-row {
    margin-bottom: 20px;
  }
  /deep/.el-card__body{
    padding: 0;
  }
</style>
