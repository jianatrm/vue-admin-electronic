<template>
  <div class="tab-container">
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="18">
        <el-tabs v-model="activeName"  type="border-card">
          <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
            <keep-alive>
              <tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes"/>
            </keep-alive>
          </el-tab-pane>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                      @pagination="getList"/>

        </el-tabs>
      </el-col>

      <el-col :span="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>证照列表说明</span>
          </div>
          <div class="component-item">
            <el-row :gutter="20" >
              <el-col :span="11" class="justify">有 效：</el-col><el-col :span="13" >可正常使用</el-col>
            </el-row>

              <el-row :gutter="20" >
                <el-col :span="11" class="justify">未 激 活：</el-col><el-col :span="13" >已颁发证照，未被主动激活，不能使用</el-col>
              </el-row>

              <el-row :gutter="20" >
                <el-col :span="11" class="justify">暂时失效：</el-col><el-col :span="13" >被临时限制，不能使用</el-col>
              </el-row>


              <el-row :gutter="20" >
                <el-col :span="11"class="justify" >失 效：</el-col><el-col :span="13">永久限制，不能使用</el-col>
              </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import tabPane from './components/TabPane'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'certificatelist',//证件列表
    components: { tabPane ,Pagination},
    data() {
      return {
        tabMapOptions: [
          { label: '全部', key: 'CN' },
          { label: '未激活', key: 'US' },
          { label: '有效', key: 'JP' },
          { label: '暂时失效', key: 'EU' },
          { label: '失效', key: 'pa' }
        ],
        activeName: 'CN',
        createdTimes: 0,
        total: 100,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
      }
    },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
      }
    },
    created() {
      // init the default selected tab
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
    },
    methods: {
      showCreatedTimes() {
        this.createdTimes = this.createdTimes + 1
      }
    }
}
</script>

<style lang="scss" scoped>
  .tab-container {
    margin: 30px;
    width: 100%;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
    display: inline-block;
  }
  .clearfix {
    text-align: center;
  }
  .component-item {
    min-height: 100px;
    .el-row {
      margin-top: 10px;
      font-size: 14px;

    }
    .el-col{
      padding-right: 0 !important;
      color: red;
    }
  }
  .justify {
    text-align: justify;
  }


</style>
