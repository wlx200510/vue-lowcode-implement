<template>
  <div class="activity-con">
    <el-dialog
      :title="form.id !== null ? '编辑项目' : '新建项目'"
      :visible.sync="projectFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="项目名称:" :label-width="formLabelWidth">
          <el-input v-model="form.projectName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" :label-width="formLabelWidth">
          <el-select v-model="form.projectType" placeholder="请选择项目类型">
            <el-option
              v-for="item in Object.keys(activityType)"
              :label="activityType[item]"
              :value="item"
              :key="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="插件方法" :label-width="formLabelWidth">
          <el-select
            v-model="form.projectPlugins"
            filterable
            multiple
            placeholder="支持多选"
          >
            <el-option
              v-for="item in pluginsData"
              :key="item.name"
              :value="item.name"
              :label="item.desc"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述:" :label-width="formLabelWidth">
          <el-input
            v-model="form.projectDesc"
            type="textarea"
            :rows="2"
            placeholder="请输入项目描述"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="projectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveProject">确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" @click="onButtonClick">创建项目</el-button>
    <el-table :data="$store.state.projects" style="width: 100%">
      <el-table-column label="更新日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">
            {{ handleDateFormat(scope.row.updateTime) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="type" label="项目类型">
        <template slot-scope="scope">
          {{ activityType[scope.row.projectType] }}
        </template>
      </el-table-column>
      <el-table-column label="包含页面数" width="180">
        <template slot-scope="scope">
          {{ scope.row.renderData.pages.length }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click.stop="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            @click.stop="handleRowModify(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click.stop="handleDelete(scope.$index, scope.row)"
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
      :total="$store.state.projects.length"
    ></el-pagination>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onBeforeMount,
  watch,
  onMounted,
  getCurrentInstance,
} from '@vue/composition-api'
import { useRouter } from 'vue2-helpers/vue-router'
import { activityType } from '@/const/pageDict'
import plugins from '@/kitLoader/loader/plugin'
// import baseData from '@d'

const formLabelWidth = '80px'
const router = useRouter()
const { $confirm, $message, $store } = getCurrentInstance().proxy
const currentPage = ref(1)
const projectFormVisible = ref(false)
const pluginsData = ref(plugins())
const form = reactive({
  id: null,
  projectName: '',
  projectType: null,
  projectDesc: '',
  projectPlugins: [],
  renderData: {
    pages: [],
    projectPlugins: [],
  },
})

onMounted(() => {
  $store.dispatch('getAllProjects')
})

function handleDateFormat(timeStr) {
  return new Date(timeStr).toLocaleDateString()
}

function handleCurrentChange(e) {
  console.log(e)
}
function handleSizeChange(e) {
  console.log(e)
}
function onButtonClick() {
  // 创建项目流程
  // 需要输入项目名称，选择项目类型，项目描述选填。
  projectFormVisible.value = true
}
function saveProject() {
  // 点击保存后生成初始化的json文件和id保存在dataBase中
  const projectPlugins = pluginsData.value.filter((item) =>
    form.projectPlugins.includes(item.name)
  )
  const saveJsonData = {
    ...form,
    renderData: {
      pages: [],
      projectPlugins,
    },
  }
  $store.dispatch('createNewProject', saveJsonData).then(() => {
    projectFormVisible.value = false
  })
}
function handleRowModify(index, row) {
  form.id = row.id
  form.projectName = row.projectName
  form.projectType = row.projectType
  form.projectDesc = row.projectDesc
  form.projectPlugins = row.renderData.projectPlugins.map((item) => item.name)
  projectFormVisible.value = true
}
function handleEdit(index, row) {
  console.log(row)
  router.push(`/Page/${row.id}?type=${row.projectType}`)
  // 编辑项目
}
function handleDelete(index, row) {
  console.log(index, row)
  $confirm('此操作将永久删除该项目页面, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      $store.dispatch('deleteProject', row.id).then(() => {
        $message({
          type: 'success',
          message: '删除成功!',
        })
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
