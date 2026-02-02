<template>
  <div class="base-search">
    <el-form :model="searchParam" label-width="auto" label-position="right">
      <el-row :gutter="20">
        <!-- 动态渲染表单项 -->
        <template v-for="item in visibleList" :key="item.prop">
          <el-col :span="getColSpan(item)">
            <el-form-item :label="item.label ? item.label + ' :' : ''">
              <!-- 文本框 -->
              <template v-if="item.type === undefined || item.type === 'input'">
                <el-input
                  v-model="searchParam[item.prop]"
                  placeholder="请输入"
                  v-bind="item.props"
                  :clearable="clearable(item)"
                />
              </template>
              <!-- 下拉选择框 -->
              <template v-else-if="item.type === 'select' || item.type === 'multipleSelect'">
                <el-select
                  v-model="searchParam[item.prop]"
                  :multiple="item.type === 'multipleSelect'"
                  placeholder="请选择"
                  v-bind="item.props"
                  :clearable="clearable(item)"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                    :disabled="option.disabled"
                  />
                </el-select>
              </template>
              <!-- 3. 【新增】API 动态下拉选择框 (apiSelect) -->
              <template v-else-if="item.type === 'apiSelect'">
                <el-select
                  v-model="searchParam[item.prop]"
                  placeholder="请选择"
                  v-bind="item.props"
                  :clearable="clearable(item)"
                  style="width: 100%;"
                >
                  <!-- 这里的 options 数据来源是 apiOptions -->
                  <el-option
                    v-for="op in apiOptions[item.prop] || []"
                    :label="op[item.labelKey || 'label']"
                    :value="op[item.valueKey || 'value']"
                    :key="op[item.valueKey || 'value']"
                    :disabled="op[item.disabledKey || 'disabled']"
                  />
                </el-select>
              </template>
              <!-- 下拉树形选择框 -->
              <template v-else-if="item.type === 'treeSelect' || item.type === 'multipleTreeSelect'">
                <el-tree-select
                  v-model="searchParam[item.prop]"
                  :multiple="item.type === 'multipleTreeSelect'"
                  :data="item.options"
                  v-bind="item.props"
                  style="width: 100%;"
                />
              </template>
              <!-- 日期/时间范围选择器 -->
              <template v-else-if="['date', 'timerange', 'daterange', 'datetimerange'].includes(item.type)">
                <el-date-picker
                  v-model="searchParam[item.prop]"
                  :type="item.type"
                  :value-format="getDateValueFormat(item.type)"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="请选择日期"
                  v-bind="item.props"
                  :clearable="clearable(item)"
                  style="width: 100%;"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>

        <!-- 按钮组 -->
        <el-col :span="finalButtonColSpan">
          <el-form-item label="">
            <div class="button-group" :style="buttonGroupStyle">
              <el-button type="primary" :icon="Search" @click="search">
                搜索
              </el-button>
              <el-button :icon="Delete" @click="reset">
                重置
              </el-button>
              <el-link
                v-if="isOverflowing"
                type="primary"
                :underline="false"
                @click="toggleExpand"
                class="text-nowrap ml-5px"
              >
                {{ isExpanded ? '收起' : '展开' }}
                <el-icon class="el-icon--right">
                  <ArrowUp v-if="isExpanded" />
                  <ArrowDown v-else />
                </el-icon>
              </el-link>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { FormItemProps, SelectOption } from './FormTypes'

const props = defineProps<{
  list: FormItemProps[]
}>()

const emit = defineEmits(['reset', 'search'])

const searchParam = reactive<Record<string, any>>({})
const isExpanded = ref(false)

// 【新增】用于存储 apiSelect 类型请求回来的数据
// 结构示例: { userList: [{label: '张三', value: 1}], deptList: [...] }
const apiOptions = reactive({})

// --- 栅格与布局计算 ---

// 按钮组在收起状态下预留的栅格宽度
const buttonColSpan = 6

// 获取每个表单项的栅格宽度 (span)
const getColSpan = (item) => {
  if (item.col) return item.col
  const type = item.type || 'input'
  if (['timerange', 'daterange', 'datetimerange'].includes(type)) return 8
  return 6
}

// 判断所有项加起来是否超出一行，决定是否需要“展开/收起”功能
const isOverflowing = computed(() => {
  const totalSpan = props.list.reduce((sum, item) => sum + getColSpan(item), 0)
  return totalSpan + buttonColSpan > 24
})

// 根据展开/收起状态，决定实际显示的表单项
const visibleList = computed(() => {
  if (isExpanded.value || !isOverflowing.value) {
    return props.list
  }

  const itemsToShow = []
  let currentSpan = 0
  const availableSpan = 24 - buttonColSpan // 为按钮组预留空间

  for (const item of props.list) {
    const itemSpan = getColSpan(item)
    if (currentSpan + itemSpan <= availableSpan) {
      itemsToShow.push(item)
      currentSpan += itemSpan
    } else {
      break
    }
  }
  return itemsToShow
})

// 【核心改动】计算按钮组<el-col>的动态栅格宽度
const finalButtonColSpan = computed(() => {
  if (!isExpanded.value || !isOverflowing.value) {
    return buttonColSpan
  }

  const totalItemSpan = props.list.reduce((sum, item) => sum + getColSpan(item), 0)
  const lastRowUsedSpan = totalItemSpan % 24

  if (lastRowUsedSpan === 0) return 24

  return 24 - lastRowUsedSpan
})

// 【核心改动】计算按钮组的动态对齐样式
const buttonGroupStyle = computed(() => {
  if (isExpanded.value && isOverflowing.value) {
    return { justifyContent: 'flex-end' }
  }
  return { justifyContent: 'flex-start' }
})

// --- 功能方法 ---

// 【新增】处理 apiSelect 的数据请求
const initApiSelectData = async () => {
  // 遍历配置列表
  for (const item of props.list) {
    // 只有类型为 apiSelect 且 存在 api 函数时才执行
    if (item.type === 'apiSelect' && typeof item.api === 'function') {
      try {
        // 1. 调用接口，可以传递 item.apiParams 作为参数
        const res = await item.api(item.apiParams || {})

        // 2. 如果配置了 resultFormat 函数，则用它格式化数据；否则直接使用返回值
        if (item.resultFormat && typeof item.resultFormat === 'function') {
          apiOptions[item.prop] = item.resultFormat(res)
        } else {
          // 默认假设接口直接返回了 [{label, value}] 结构，如果不是，建议在配置中使用 resultFormat
          apiOptions[item.prop] = res?.data || []
        }
      } catch (error) {
        console.error(`Fetch data for ${item.prop} failed:`, error)
        apiOptions[item.prop] = []
      }
    }
  }
}

// 【新增】组件挂载时初始化数据
onMounted(() => {
  initApiSelectData()
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const getDateValueFormat = (type) => {
  const formats = {
    date: 'YYYY-MM-DD',
    timerange: 'HH:mm:ss',
    daterange: 'YYYY-MM-DD',
    datetimerange: 'YYYY-MM-DD HH:mm:ss'
  }
  return formats[type] || 'YYYY-MM-DD'
}

const clearable = (item) => {
  return item.initSearchParam === null || item.initSearchParam === undefined
}

const search = () => {
  // 1. 深拷贝一份当前的搜索参数，避免污染显示的表单数据
  const finalParams = JSON.parse(JSON.stringify(searchParam))

  // 2. 遍历配置列表，处理特殊字段
  props.list.forEach(item => {
    // 处理日期范围拆分逻辑
    if (['daterange', 'datetimerange', 'monthrange'].includes(item.type) && Array.isArray(item.startEndKeys)) {
      const value = finalParams[item.prop]
      const [startKey, endKey] = item.startEndKeys // 获取你定义的字段名，如 ['updateTimeStart', 'updateTimeEnd']

      // 情况A：有值，且是数组
      if (value && Array.isArray(value) && value.length === 2) {
        finalParams[startKey] = value[0]
        finalParams[endKey] = value[1]
      }
      // 情况B：【关键点】值为空（被清空了），必须显式设置为 null
      else {
        finalParams[startKey] = null // 或者 undefined
        finalParams[endKey] = null
      }

      // (可选) 如果不需要传那个数组字段给后端，可以在这里删掉
      delete finalParams[item.prop]
    }
  })
  emit('search', finalParams)
}

const reset = () => {
  Object.keys(searchParam).forEach(item => {
    searchParam[item] = null
  })
  emit('reset')
  search()
}
</script>

<style lang="scss" scoped>
.base-search {
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  .el-form-item {
    margin-bottom: 18px;
  }
  .button-group {
    display: flex;
    width: 100%;
    .el-icon--right {
      margin-left: 4px;
    }
  }
}
</style>
