<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :span="24" :offset="1">
        <el-button type="primary">新建证照类型</el-button>
      </el-col>
    </el-row>
    <el-divider ></el-divider>
    <el-container>
      <el-aside width="20%" v-if="tableData.length>0">
        <el-table :data="tableData"   stripe style="width: 100%" :show-header="false" :size="small">

          <el-table-column prop="date" align="center"></el-table-column>

          <el-table-column prop="操作"  align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-aside>

      <el-main style="border-left: 1px solid #e5e5e5">
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <span>基础信息</span>
          </div></el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-table :data="tableData"  stripe style="width: 100%"  border class="eltable">

                <el-table-column prop="date" label="序号" align="center"></el-table-column>

                <el-table-column prop="name"  label="元数据" align="center"></el-table-column>

                <el-table-column prop="name"  label="内容" align="center"></el-table-column>

              </el-table>
          </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <span>自定义信息 <i class="el-icon-circle-plus-outline" style="cursor: pointer"></i></span>
          </div></el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-table :data="tableData" stripe style="width: 100%"  border>

                <el-table-column prop="date" label="序号" align="center"></el-table-column>

                <el-table-column prop="name"  label="中文名称" align="center"></el-table-column>

                <el-table-column prop="name"  label="英文名称" align="center"></el-table-column>
                <el-table-column prop="name"  label="数据类型" align="center"></el-table-column>
                <el-table-column prop="name"  label="约束" align="center"></el-table-column>
                <el-table-column prop="name"  label="取值示例" align="center"></el-table-column>
                <el-table-column prop="name"  label="编辑" align="center"></el-table-column>
                <el-table-column prop="name"  label="删除" align="center"></el-table-column>

              </el-table>
            </div>
          </el-col>
        </el-row>


      </el-main>
    </el-container>
  </div>

</template>

<script>
  export default {
    name: 'certificatetype',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-divider{
    margin: 10px 0 0  0 ;
  }
  .eltable th{
    padding: 5px 0 !important;
  }

</style>
