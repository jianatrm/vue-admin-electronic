<template>
  <div>
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="24" :offset="1">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="500px">
          <el-form-item label="" >
            <el-select v-model="formInline" placeholder="活动区域" style="width: 150px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" >
            <el-input v-model="w" placeholder="请输入持证主体代码" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">

      <el-table-column prop="date" label="证照类型" width="180" align="center"></el-table-column>

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
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
      </el-col>
    </el-row>

  </div>
</template>


<script>
  import Pagination from '@/components/Pagination'
  export default {
    name: 'eleCertificatelist',
    components: { Pagination},
    data(){
      return {
        total: 100,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
