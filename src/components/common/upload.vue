<template>
  <div class="el-form-item small el-form-item--mini">
    <label class="el-form-item__label" style="width: 80px">{{ label }}：</label>
    <div class="el-form-item__content" style="margin-left: 80px">
      <div class="upload-container">
        <div class="el-upload el-upload--text">
          <div class="el-upload-dragger">
            <i class="el-icon-upload"></i>
            <div
              v-if="item.val"
              class="image-preview"
              :style="{ backgroundImage: 'url(' + item.val + ')' }"
            >
              <i class="fa fa-window-close" @click.stop="delImg(item)"></i>
            </div>
            <div v-else class="el-upload__text">
              上传图片 或
              <em
                ><a href="javascript:;" @click.prevent="dialogShow = true"
                  >图片地址</a
                ></em
              >
            </div>
          </div>
          <input
            @change="upload"
            type="file"
            name="photoImg"
            class="upload-input"
          />
        </div>
        <div v-if="item.limit" class="upload-tips">
          <h3>图片限制</h3>
          格式：jpeg/png/gif<br />
          大小：小于{{ item.limit.s }}k<br />
          宽度：<font color="red">{{ item.limit.w }}px</font><br />
          高度：<font color="red">{{ item.limit.h }}px</font>
        </div>
        <div v-else class="upload-tips">
          <h3>图片限制</h3>
          格式：jpeg/png/gif<br />
          大小：jpeg/png小于100k，gif小于500k<br />
          宽度：小于750px
        </div>
      </div>
    </div>

    <el-dialog
      id="netImgDialog"
      title="网络图片"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible="dialogShow"
      @close="dialogShow = false"
      width="680px"
    >
      <el-tabs v-model="currentTab" type="card" @tab-click="clickTab">
        <el-tab-pane label="网络图片" name="outside">
          <el-form label-width="100px" style="margin-top: 20px">
            <el-form-item label="图片地址：">
              <el-input
                placeholder="图片地址，例：https://www.example.com/text.png"
                v-model="imgUrl"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="本站图片素材" name="inside">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="预览" width="80">
              <template>
                <img
                  style="max-width: 50px; max-height: 50px"
                  src="http://www.w3school.com.cn/i/eg_tulip.jpg"
                />
              </template>
            </el-table-column>
            <el-table-column prop="date" label="上传日期" width="100">
            </el-table-column>
            <el-table-column prop="address" label="图片地址"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="60">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >选择</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="setImgUrl">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from '@vue/composition-api'
const props = defineProps({
  label: { type: String },
  index: { type: Number, default: 0 },
  item: { type: Object },
})

const emit = defineEmits(['beforeUpload', 'uploadSuccess'])
const { $alert } = getCurrentInstance().proxy
const SUPPORT_TYPES = ['image/gif', 'image/png', 'image/jpg', 'image/jpeg']

const currentTab = ref('outside')
const imgUrl = ref('')
const dialogShow = ref(false)
const tableData = ref([])

function clickTab(tab) {
  currentTab.value = tab.name
}

function delImg(item) {
  item.val = ''
}

function getImageValid(Image) {
  // eslint-disable-next-line no-prototype-builtins
  if (props.item.hasOwnProperty('limit')) {
    if (Image.naturalWidth !== props.item.limit.w) {
      $alert('图片宽度必须为 ' + props.item.limit.w + 'px', '提示')
      return false
    }
    if (Image.naturalHeight !== props.item.limit.h) {
      $alert('图片高度必须为 ' + props.item.limit.h + 'px', '提示')
      return false
    }
  } else {
    if (Image.naturalWidth > 750) {
      $alert('图片宽度不能超过750px', '提示')
      return false
    }
  }
  return true
}

function getFileValid(Image, file) {
  // eslint-disable-next-line no-prototype-builtins
  if (props.item.hasOwnProperty('limit')) {
    if (Image.width !== props.item.limit.w) {
      $alert('图片宽度必须为 ' + props.item.limit.w + 'px', '提示')
      return false
    }
    if (Image.height !== props.item.limit.h) {
      $alert('图片高度必须为 ' + props.item.limit.h + 'px', '提示')
      return false
    }
    if (file.size / 1024 > props.item.limit.s) {
      $alert('图片大小不能超过 ' + props.item.limit.s + 'k', '提示')
      return false
    }
  } else {
    if (Image.width > 750) {
      $alert('图片宽度不能超过750px', '提示')
      return false
    }
    if (file.type === 'image/gif') {
      if (file.size / 1024 > 2048) {
        $alert('gif图片不能超过2048k', '提示')
        return false
      }
    } else {
      if (file.size / 1024 > 512) {
        $alert('jpeg、png图片不能超过512k', '提示')
        return false
      }
    }
  }
  return true
}

function triggerUploadSucc(img) {
  const width = 750
  const height = img.naturalHeight * (width / img.naturalWidth).toFixed(4)
  props.item.width = width
  props.item.height = height
  props.item.val = img.src
  dialogShow.value = false
  emit('uploadSuccess', props.item, img, props.index)
}

function setImgUrl() {
  try {
    const img = new Image()
    img.onload = () => {
      let invalide = getImageValid(img)
      if (invalide) {
        triggerUploadSucc(img)
      }
      img.src = imgUrl.value
    }
  } catch (e) {
    console.warn(e)
    img.src = ''
  }
}

function uploadFileAsync(e) {
  const file = e.target.files[0]
  if (!file) {
    $alert('图片格式须为jpg、jpeg、png、gif之一！', '提示')
    return Promise.reject()
  }
  return new Promise((resolve, reject) => {
    if (SUPPORT_TYPES.includes(file.type)) {
      const reader = new FileReader()
      reader.onloadend = () => {
        file.data = reader.result
        resolve(file)
      }
      reader.onerror = (err) => {
        console.error('reader error', err)
        reject(err)
      }
      reader.readAsDataURL(file)
    }
  })
}

function upload(e) {
  return uploadFileAsync(e).then((file) => {
    const img = new Image()
    img.onload = () => {
      let invalide = getFileValid(img, file)
      if (invalide) {
        triggerUploadSucc(img)
      }
    }
    img.src = file.data
    emit('beforeUpload', file, props.item, img, props.index)
  })
}
</script>
<script>
export default {
  name: 'upload',
}
</script>
<style lang="scss" scoped>
#netImgDialog {
  .el-dialog__body {
    padding-top: 10px;
  }
}

.upload-container {
  display: flex;

  .upload-tips {
    display: block;
    font-size: 12px;
    line-height: 1.5;
    padding: 5px;
    color: #666;

    h3 {
      margin: 0;
    }
  }
}

.el-upload-dragger {
  width: 100% !important;
  height: 100% !important;
  min-width: 150px;

  .el-icon-upload {
    margin-top: 20px;
  }
}

.image-preview {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ecf5ff;

  .fa-window-close {
    position: absolute;
    top: 0;
    right: 0;
    color: #666;
    font-size: 22px;
    z-index: 99;
  }
}

.upload-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 150px;
  height: 115px;
  cursor: pointer;
}
</style>
