<template>
  <div class="page-con">
    <div class="btn-con" v-if="projectData">
      <el-button type="primary" icon="el-icon-plus" @click="addPage"
        >增加页面</el-button
      >
      <div class="source" v-if="projectData.projectDesc">
        <span>项目备注：</span>
        <p>{{ projectData.projectDesc }}</p>
      </div>
      <div class="source">
        <span>项目支持的功能：</span>
        <el-tag
          type="success"
          v-for="(o, idx) in plugins"
          :key="idx"
          style="margin-right: 10px"
          >{{ o.value }}
        </el-tag>
      </div>
    </div>
    <el-row>
      <el-col
        :span="4"
        v-for="(o, index) in pageData"
        :key="index"
        :offset="index > 0 ? 1 : 0"
      >
        <el-card
          :body-style="{ padding: '0px', cursor: 'pointer' }"
          @click.native="modifyPage(o)"
        >
          <img :src="o.thumbnail.val" class="image" />
          <div style="padding: 14px">
            <div class="space-between">
              <div>
                <span>{{ o.showPageName }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{
                    o.pageType === 0 ? '搭建页面' : '预制页面'
                  }}</time>
                </div>
              </div>
              <el-button class="button" @click.stop="editPage(o)"
                >编辑</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="form.pageId ? '编辑页面' : '新建页面'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="展示名称:" :label-width="formLabelWidth">
          <el-input v-model="form.showPageName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="页面类型:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.pageType">
            <el-radio :label="0">搭建页面</el-radio>
            <el-radio :label="1">预制页面</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.pageType === 1"
          label="预制页面:"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.prePageData" placeholder="请选择预制页面">
            <el-option
              v-for="choice in prePageArr"
              :label="choice.name"
              :value="choice"
              :key="choice.folderKey"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="margin-left: 16px">
          <Upload
            label="缩略图"
            :item="form.thumbnail"
            @uploadSuccess="trigger"
          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
// @todo: 如果是预制页面，则需要从所有预制页面中选择对应的选项
import { reactive, ref, onBeforeMount, computed } from '@vue/composition-api'
import { useRouter } from 'vue2-helpers/vue-router'

import Upload from '@/components/common/upload.vue'
import { activityPlugins } from '@/const/pageDict'
import getUseablePrePages from '/client/prePages'
import baseData from '@d'

const formLabelWidth = '100px'
const router = useRouter()
const routeData = router.currentRoute
const projectData = ref(null)
const pageData = ref([])
const dialogFormVisible = ref(false)
const prePageArr = ref([])
let form = ref({
  showPageName: '',
  pageType: '',
  thumbnail: {
    width: '',
    height: '',
    val: '',
  },
  prePageData: null,
})
const plugins = computed(() => activityPlugins[routeData.query.type])

function addPage() {
  // 通过对话框新建页面配置
  form.value = {
    showPageName: '',
    pageType: '',
    thumbnail: {
      width: '',
      height: '',
      val: '',
    },
    prePageData: null,
  }
  dialogFormVisible.value = true
}

function trigger(data) {
  console.log(data)
}

function modifyPage(page) {
  if (page.pageType === 0) {
    router.push(`/Editor/${projectData.value.id}/${page.pageId}`)
  } else {
    router.push(`/PreBuild/${projectData.value.id}/${page.pageId}`)
  }
}

function editPage(page) {
  form.value = page
  dialogFormVisible.value = true
}
function savePage() {
  if (form.value.pageId) {
    const curEditPage = pageData.value.find(
      (item) => item.pageId === form.pageId
    )
    Object.assign(curEditPage, { ...form.value })
  } else {
    pageData.value.push({
      ...form.value,
      pageId: pageData.value[pageData.value.length - 1].pageId + 1,
      config: form.pageType === 0 ? [] : null,
      pageConfig: null,
    })
  }
  console.log(JSON.stringify(pageData.value))
  dialogFormVisible.value = false
}

onBeforeMount(() => {
  // 根据routeData.params.id来请求接口，获取此id下的所有页面
  projectData.value = baseData.find(
    (item) => item.id === Number(routeData.params.id)
  )
  pageData.value = projectData.value.pages
  prePageArr.value = getUseablePrePages(projectData.value.projectType)
})
</script>

<style lang="scss" scoped>
.page-con {
  padding: 20px;
  .btn-con {
    padding-bottom: 20px;
    .source {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
  .image {
    width: 100%;
    display: block;
  }
  .space-between {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    .time {
      font-size: 13px;
      color: #999;
    }
    .button {
      padding: 0;
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
