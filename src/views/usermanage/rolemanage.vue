<template>
  <el-container style="height: 100%">
    <el-aside width="25%" style="margin-top: 25px;">
      <el-card class="box-card" style="height: 100%">
        <div class="custom-tree-container" >
          <div class="block" style="width:100%">
            <el-tree :data="data"  node-key="id" default-expand-all :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>  <i class="iconfont icon-bumenguanli"></i>{{ node.label }}</span>
                <span>
                  <el-button type="text" size="mini" @click="() => append(data)">
                    <i class="el-icon-plus"></i>
                  </el-button> <el-button type="text" size="mini" @click="() => append(data)">
                    <i class="el-icon-edit"></i>
                  </el-button>
                  <el-button type="text" size="mini" @click="() => remove(node, data)">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </span>
               </span>
            </el-tree>
          </div>
        </div>

      </el-card>
    </el-aside>


    <el-main>
      <el-card class="box-card" style="margin-top: 5px">
        <el-row :gutter="20" >
          <el-col :span="24">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="500px">
              <el-form-item label="" >
                <el-input v-model="w" placeholder="请输入持证主体代码" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row :gutter="20" >
          <el-col :span="24">
            <el-card class="box-card" :body-style="{ padding: '10px' }">
              <div>
                <span>已选中2项</span>
                <el-divider direction="vertical"></el-divider>
                <span class="user-btn"><i class="el-icon-delete "></i> 删除</span>
                <el-divider direction="vertical"></el-divider>
                <span class="user-btn"><i class="el-icon-edit-outline"></i> 编辑</span>
                <el-divider direction="vertical"></el-divider>
                <span class="user-btn"><i class="iconfont icon-fenpei"></i>分配角色</span>
                <el-divider direction="vertical"></el-divider>
                <span class="user-btn"> <i class="iconfont icon-yuangonglizhi"></i>离职</span>
                <el-divider direction="vertical"></el-divider>
                <span class="user-btn"> <i class="el-icon-circle-close"></i>禁用</span>
                <el-divider direction="vertical"></el-divider>
                <span class="user-btn"> <i class="el-icon-refresh"></i>重置密码</span>

              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%;margin-top: 10px">
          <el-table-column type="selection" width="55" align="center"></el-table-column>

          <el-table-column prop="date" label="证照类型" width="80" align="center"></el-table-column>

          <el-table-column prop="name" label="证照代码" width="100" align="center"></el-table-column>

          <el-table-column prop="address" label="颁发机构" align="center"></el-table-column>

          <el-table-column prop="address" label="持证主体" align="center"></el-table-column>

          <el-table-column prop="address" label="持证主体代码" width="150" align="center"></el-table-column>

          <el-table-column prop="address" label="注册状态" align="center"></el-table-column>

          <el-table-column prop="address" label="证照状态" align="center"></el-table-column>

          <el-table-column prop="address" label="操作" align="center"></el-table-column>

        </el-table>
        <el-row :gutter="20" >
          <el-col :span="24" style="text-align: right">
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
          </el-col>
        </el-row>

      </el-card>

    </el-main>
  </el-container>
</template>

<script>
  let id = 1000;
  import Pagination from '@/components/Pagination'
  export default {
    components: { Pagination},
    data() {

      const data = [
        {
          id: 1,
          label: '一级 1',
          icon:'el-icon-plus',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }];
      return {
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data)),
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
    },

    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      }
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .user-btn{
    cursor: pointer;
    color: #409EFF;
  }

  .el-tree {
    width: 100%;
    overflow: scroll;
  }

  .el-tree>.el-tree-node {
    display: inline-block;
    min-width: 100%;
  }
</style>
