<template>
<div>
  <el-tabs type="border-card" style="margin-top: 25px">
    <el-tab-pane label="用户管理">
      <el-button type="primary" style="margin-bottom: 10px">注册</el-button>
    </el-tab-pane>
    <el-tab-pane label="配置管理"></el-tab-pane>



    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55" align="center"></el-table-column>

      <el-table-column prop="date" label="证照名称" width="180" align="center" ></el-table-column>

      <el-table-column prop="name" label="证照名称代码" width="180" align="center"></el-table-column>

      <el-table-column prop="address" label="证照颁发机构" align="center"></el-table-column>

      <el-table-column prop="address" label="持证主体" align="center"></el-table-column>

      <el-table-column prop="address" label="持证主体代码" align="center"></el-table-column>

      <el-table-column prop="address" label="注册状态" align="center"></el-table-column>

      <el-table-column prop="address" label="电子证照状态" align="center"></el-table-column>

      <el-table-column prop="address" label="操作" align="center"></el-table-column>

    </el-table>
    <el-row :gutter="20" >
      <el-col :span="24" style="text-align: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-col>
    </el-row>
  </el-tabs>
</div>
</template>

<script>
  //目录
  export default {
    name: 'directorymanagelist'
  }
</script>

<style scoped>

</style>
