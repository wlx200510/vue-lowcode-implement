<template>
  <div class="activity-con">
    <el-button type="primary" @click="onButtonClick">创建活动</el-button>
    <el-table :data="ActivityData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="活动名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="type" label="活动类型">
        <template slot-scope="scope">
          {{ activityType[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="includePages"
        label="包含页面数"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button-group></el-button-group>
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="20"
    ></el-pagination>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
} from '@vue/composition-api'
import { useRouter } from 'vue2-helpers/vue-router'
import { activityType } from '@/const/pageDict'
const router = useRouter()
const { $confirm, $message } = getCurrentInstance().proxy
const ActivityData = ref([
  {
    createDate: '2021-11-01',
    id: 1,
    name: '赠送课时1',
    type: 'Recommend',
    includePages: 3,
  },
  {
    createDate: '2021-11-03',
    id: 2,
    name: '分销官招募',
    type: 'Distribution',
    includePages: 2,
  },
  {
    createDate: '2021-12-01',
    id: 3,
    name: '裂变',
    type: 'Exceed',
    includePages: 3,
  },
  {
    createDate: '2021-12-31',
    id: 4,
    name: '赠送课时2',
    type: 'Recommend',
    includePages: 4,
  },
])
const currentPage = ref(1)
function handleCurrentChange(e) {
  console.log(e)
}
function handleSizeChange(e) {
  console.log(e)
}
function onButtonClick() {
  // 创建活动流程
}
function handleEdit(index, row) {
  console.log(row)
  router.push(`/Page/${row.id}?type=${row.type}`)
  // 编辑活动
}
function handleDelete(index, row) {
  console.log(index, row)
  $confirm('此操作将永久删除该活动, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      $message({
        type: 'success',
        message: '删除成功!',
      })
    })
    .catch(() => {
      $message({
        type: 'info',
        message: '已取消删除',
      })
    })
}
</script>

<style lang="scss" scoped>
.activity-con {
  padding: 20px;
}
.demo-border {
  border: 1px grey dashed;
  min-height: 1rem;
  border-radius: 5px;
}
.icon {
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
}
</style>
