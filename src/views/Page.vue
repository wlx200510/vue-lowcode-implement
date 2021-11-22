<template>
  <div class="page-con">
    <div class="btn-con">
      <el-button type="primary" icon="el-icon-plus" @click="addPage"
        >增加页面</el-button
      >
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
                <span>{{ o.name }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{
                    o.type === 1 ? '搭建页面' : '预制页面'
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
        <el-form-item label="页面名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="访问路径:" :label-width="formLabelWidth">
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="页面类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择页面类型">
            <el-option label="搭建页面" :value="1"></el-option>
            <el-option label="预制页面" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <Upload
          label="缩略图"
          :item="form.thumbnail"
          @uploadSuccess="trigger"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, computed } from '@vue/composition-api'
import { useRouter } from 'vue2-helpers/vue-router'

import Upload from '@/components/common/upload.vue'
import { activityPlugins } from '@/const/pageDict'

const formLabelWidth = '80px'
const router = useRouter()
const routeData = router.currentRoute
const pageData = ref([])
const dialogFormVisible = ref(false)
const form = reactive({
  name: '',
  path: '',
  type: '',
  thumbnail: {
    width: '',
    height: '',
    val: '',
  },
})
const plugins = computed(() => activityPlugins[routeData.query.type])

function addPage() {
  // 通过对话框新建页面配置
  dialogFormVisible.value = true
}

function trigger(data) {
  console.log(data)
}

function modifyPage(page) {
  if (page.type === 1) {
    router.push(`/Editor/${page.pageId}`)
  } else {
    router.push(`/PreBuild/${page.pageId}`)
  }
}

function editPage(page) {
  this.form = reactive(page)
  dialogFormVisible.value = true
}

onBeforeMount(() => {
  // 根据routeData.params.id来请求接口，获取此id下的所有页面
  pageData.value = [
    {
      pageId: 299,
      name: '首页',
      type: 1,
      path: '/',
      thumbnail: {
        width: 235,
        height: 236,
        val: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      },
    },
    {
      pageId: 110,
      name: '详情页',
      type: 1,
      path: '/detail',
      thumbnail: {
        width: 235,
        height: 236,
        val: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      },
    },
    {
      pageId: 211,
      name: '登录页',
      type: 2,
      path: '/login',
      thumbnail: {
        width: 235,
        height: 236,
        val: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      },
    },
  ]
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
