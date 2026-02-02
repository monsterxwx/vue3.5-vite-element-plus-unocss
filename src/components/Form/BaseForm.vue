<template>
  <div class="base-form">
    <el-form
      :model="formData"
      :rules="rules"
      ref="formRef"
      v-bind="$attrs"
    >
      <el-row v-bind="row">
        <el-col
          v-for="item in visibleFormList"
          :key="item.prop"
          v-bind="item.col"
        >
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            v-bind="item"
          >
            <!-- 输入框 -->
            <el-input
              v-if="item.type === 'input'"
              v-model="formData[item.prop]"
              v-bind="item.props"
            />
            <!-- 滑块 -->
            <el-slider
              v-if="item.type === 'slider'"
              v-model="formData[item.prop]"
              v-bind="item.props"
            />
            <!-- 单选 -->
            <el-radio-group
              v-if="item.type === 'radio'"
              v-model="formData[item.prop]"
              v-bind="item.groupProps"
            >
              <template
                v-for="ra in item.props?.data || []"
                :key="ra.value"
              >
                <el-radio-button
                  v-if="item.radioType==='radio-button'"
                  :label="ra.value"
                  v-bind="item.props"
                >
                  {{ ra.label }}
                </el-radio-button>
                <el-radio
                  v-else
                  :label="ra.value"
                  v-bind="item.props"
                >
                  {{ ra.label }}
                </el-radio>
              </template>
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'checkbox'"
              v-model="formData[item.prop]"
              v-bind="item.groupProps"
            >
              <el-checkbox
                v-for="ch in item.props?.data || []"
                :label="ch.value"
                :key="ch.value"
                v-bind="item.props"
              >
                {{ ch.label }}
              </el-checkbox>
            </el-checkbox-group>
            <!-- 日期  日期时间 起止时间 -->
            <el-date-picker
              v-if="item.type === 'date'"
              :type="item.dateType || 'date'"
              v-model="formData[item.prop]"
              v-bind="item.props"
            />
            <!-- 时间 -->
            <el-time-select
              v-if="item.type === 'time'"
              v-model="formData[item.prop]"
              v-bind="item.props"
            />
            <!-- 开关 -->
            <el-switch
              v-if="item.type === 'switch'"
              v-model="formData[item.prop]"
              v-bind="item.props"
            />
            <!-- 下拉框 -->
            <el-select
              v-if="item.type === 'select'"
              v-model="formData[item.prop]"
              v-bind="item.props"
            >
              <el-option
                v-for="op in item.props?.data || []"
                :label="op.label"
                :value="op.value"
                :key="op.value"
              >
                {{ op.label }}
              </el-option>
            </el-select>

            <!-- 🟢 新增：API 下拉框 (动态数据) -->
            <el-select
              v-if="item.type === 'apiSelect'"
              v-model="formData[item.prop]"
              v-bind="item.props"
              :loading="apiLoading[item.prop]"
            >
              <!-- 数据源来自于 apiOptionsMap，通过 prop 键名获取 -->
              <el-option
                v-for="op in apiOptionsMap[item.prop] || []"
                :label="op[item.labelKey || 'label']"
                :value="op[item.valueKey || 'value']"
                :key="op[item.valueKey || 'value']"
              />
            </el-select>

            <el-upload
              v-if="item.type === 'upload'"
              v-model:file-list="formData[item.prop]"
              v-bind="item.props"
              class="upload-demo"
              drag
              action="#"
              :auto-upload="false"
              :on-exceed="(files, uploadFiles) => handleExceed(files, uploadFiles, item)"
              :on-change="(file, fileList) => handleUploadChange(file, fileList, item)"
              :on-remove="(file, fileList) => handleRemove(file, fileList, item)"
              :on-preview="handlePreview"
              :class="{ 'limit-hidden': isLimitReached(item, formData[item.prop]) }"
            >
              <!-- 统一的拖拽区域 UI -->
              <el-icon class="el-icon--upload">
                <upload-filled />
              </el-icon>
              <div class="el-upload__text">
                拖拽文件到此处或 <em>点击选择</em>
              </div>

              <!-- 提示信息 -->
              <template #tip>
                <div class="el-upload__tip" v-if="item.upload?.tip">
                  {{ item.upload.tip }}
                </div>
              </template>
            </el-upload>
            <template v-if="item.type==='slot'">
              <slot
                :name="item.prop"
                v-bind="{ item, formData, formList }"
              />
            </template>
            <template v-if="item.type==='render'">
              <component
                :is="item.render"
                v-bind="{ item, formData, formList }"
              />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      v-model="previewVisible"
      title="图片预览"
      width="50%"
      append-to-body
    >
      <img :src="previewImageUrl" alt="Preview Image" style="width: 100%; height: auto;">
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, reactive } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormItemProps, SelectOption } from './FormTypes'

const prop = defineProps<{
  formList: FormItemProps[]
  modelValue: Record<string, any>
  row?: Record<string, any>
}>()
const emit = defineEmits(['validate', 'update:modelValue'])

const formData = ref({})

// 🟢 1. 存储 API 动态获取的选项数据
const apiOptionsMap = reactive({})
// 🟢 2. 存储 API 加载状态 (可选，提升体验)
const apiLoading = reactive({})

watch(() => prop.modelValue, (newValue) => {
  formData.value = newValue
}, { immediate: true })

watch(formData, (newValue) => {
  emit('update:modelValue', newValue)
})

// 🟢 3. 初始化 API 数据
const initApiOptions = async () => {
  if (!prop.formList || prop.formList.length === 0) return

  // 遍历配置项
  for (const item of prop.formList) {
    if (item.type === 'apiSelect' && typeof item.api === 'function') {
      try {
        apiLoading[item.prop] = true // 开启 loading
        // 调用传入的 api 函数
        const res = await item.api()

        let list = []
        // 如果配置了 resultFormat 函数，则使用该函数处理数据
        if (typeof item.resultFormat === 'function') {
          list = item.resultFormat(res)
        } else {
          // 否则默认取 res 或 res.data (根据你项目的通用接口结构调整，这里做一个简单的容错)
          list = Array.isArray(res) ? res : (res.data || [])
        }

        // 存入 map
        apiOptionsMap[item.prop] = list
      } catch (error) {
        console.error(`Fetch data for ${item.prop} failed:`, error)
        apiOptionsMap[item.prop] = []
      } finally {
        apiLoading[item.prop] = false // 关闭 loading
      }
    }
  }
}

// 🟢 4. 组件挂载时调用
onMounted(() => {
  initApiOptions()
})

const rules = computed(() => {
  const rules = prop.formList.reduce((map, i) => {
    if (i.rules) {
      map[i.prop] = i.rules
    }
    return map
  }, {})
  return rules
})

const visibleFormList = computed(() => {
  return prop.formList.filter(item => {
    // 如果没有配置 show 属性，默认显示
    if (typeof item.show !== 'function') {
      return true
    }
    // 执行 show 函数，传入当前的 formData 值，根据返回值决定是否显示
    return item.show(formData.value)
  })
})

const isLimitReached = (item, fileList) => {
  const limit = item.props?.limit
  // 如果没有设置 limit，永远不隐藏
  if (!limit) return false
  // 如果当前文件列表数量 >= 限制数量，则返回 true
  return fileList?.length >= limit
}

// 🟢 处理超出数量限制
const handleExceed = (files, uploadFiles, item) => {
  const limit = item.props?.limit || 1
  ElMessage.warning(`最多只能选择 ${limit} 个文件`)
}

const validateField = (prop) => {
  // formRef 可能为空（比如组件刚挂载），加个判断
  if (formRef.value) {
    // validateField 可以只校验某个字段，不校验整个表单
    formRef.value.validateField(prop)
  }
}

// 🟢 核心：文件状态改变时的校验逻辑 (替代 before-upload)
const handleUploadChange = (file, fileList, item) => {
  // 1. 只有当状态为 'ready' (新添加) 时才校验
  if (file.status !== 'ready') return

  const config = item.upload || {}
  let isError = false
  let errorMsg = ''

  // 2. 校验大小
  if (config.maxSize) {
    if (file.size / 1024 / 1024 > config.maxSize) {
      isError = true
      errorMsg = `文件大小不能超过 ${config.maxSize}MB`
    }
  }

  // 3. 校验类型
  if (!isError && config.fileType && config.fileType.length) {
    const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
    if (!config.fileType.includes(fileSuffix)) {
      isError = true
      errorMsg = `仅支持 ${config.fileType.join('/')} 格式`
    }
    // 1. 确保数据同步 (v-model通常会自动同步，但这步是双重保险)
    formData.value[item.prop] = fileList
    // 2. 🟢 核心：手动触发该字段的校验，消除红色报错
    validateField(item.prop)
  }

  // 4. 如果校验失败，报错并从列表中移除
  if (isError) {
    ElMessage.error(errorMsg)
    // 从 fileList 中移除当前文件
    const index = fileList.indexOf(file)
    if (index !== -1) {
      fileList.splice(index, 1)
    }
    // 强制更新一下 formData，确保视图同步
    formData.value[item.prop] = [...fileList]
  }
}

const handleRemove = (file, fileList, item) => {
  // 1. 更新数据
  formData.value[item.prop] = fileList
  // 2. 🟢 核心：删除后也要触发校验
  // (例如：原本限制必填，用户删完了，这里触发校验就能立刻报红)
  validateField(item.prop)
}

// 🟢 预览弹窗的状态
const previewVisible = ref(false)
const previewImageUrl = ref('')

// 🟢 点击文件列表中已上传的文件时的回调
const handlePreview = (uploadFile) => {
  let previewUrl = uploadFile.url

  // 🟢 核心改进：如果是新上传的文件，且 Element 没有生成 url，我们手动生成
  if (!previewUrl && uploadFile.raw) {
    previewUrl = URL.createObjectURL(uploadFile.raw)
  }

  if (!previewUrl) {
    ElMessage.error('无法预览此文件')
    return
  }

  // 判断是否为图片
  // 1. 优先通过 raw.type 判断 (MIME类型，如 image/png) - 新上传的文件都有这个
  // 2. 其次通过文件名后缀判断 - 回显的文件可能只有 name
  const isImage = (uploadFile.raw && uploadFile.raw.type.startsWith('image/')) ||
                  /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(uploadFile.name)

  if (isImage) {
    previewImageUrl.value = previewUrl
    previewVisible.value = true
  } else {
    // 非图片文件，新窗口打开
    window.open(previewUrl, '_blank')
  }
}
const formRef = ref(null)
// 验证表单

const validate = () => {
  return formRef.value.validate()
}
// 重置表单
const resetFields = () => {
  formRef.value.resetFields()
}
// 重置验证结果
const clearValidate = () => {
  formRef.value.clearValidate()
}
defineExpose({
  validate,
  clearValidate,
  resetFields
})
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 100%;
}
:deep(.limit-hidden) {
  .el-upload {
    display: none;
  }

  /* 🟢 新增：同时隐藏提示文字 */
  .el-upload__tip {
    display: none;
  }
}
</style>
