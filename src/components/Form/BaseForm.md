

---

# BaseForm 通用表单组件

基于 Element Plus `el-form` 封装的数据驱动型表单组件。通过配置 `formList` 数组即可快速生成表单，支持动态显隐、自定义插槽、以及增强的文件上传功能。

## ✨ 核心特性

*   **配置化驱动**：通过 JSON 数组定义表单结构。
*   **双向绑定**：完美支持 `v-model`。
*   **动态联动**：支持字段间的显隐联动控制（`show` 属性）。
*   **增强上传**：内置统一的拖拽上传样式，支持大小/类型/数量校验，支持达到上限自动隐藏上传框。
*   **扩展性强**：支持 `slot` 插槽和 `render` 函数自定义渲染。

---

## 🚀 基础用法

```html
<template>
  <div>
    <BaseForm
      ref="baseFormRef"
      v-model="formData"
      :formList="formList"
      label-width="100px"
    >
      <!-- 自定义插槽示例 -->
      <template #customSlot="{ formData }">
        <el-input v-model="formData.remark" placeholder="我是自定义插槽" />
      </template>
    </BaseForm>
    
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button @click="handleReset">重置</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseForm from '@/components/BaseForm.vue' // 假设路径

const baseFormRef = ref(null)
const formData = ref({
  name: '',
  category: '1',
  files: []
})

const formList = [
  {
    label: '名称',
    type: 'input',
    prop: 'name',
    props: { placeholder: '请输入名称', clearable: true },
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    label: '类型',
    type: 'select',
    prop: 'category',
    props: {
      data: [
        { label: '技术部', value: '1' },
        { label: '运营部', value: '2' }
      ]
    }
  },
  // 上传组件配置
  {
    label: '附件',
    type: 'upload',
    prop: 'files',
    // 增强配置
    upload: {
      maxSize: 5, // MB
      fileType: ['jpg', 'png', 'pdf'],
      tip: '只能上传 jpg/png/pdf，且不超过5MB'
    },
    // 原生属性
    props: {
      limit: 3,
      multiple: true
    },
    // 数组校验规则
    rules: [{ required: true, type: 'array', message: '请上传至少一个文件', trigger: 'change' }]
  }
]

const handleSubmit = async () => {
  await baseFormRef.value.validate()
  console.log('提交数据:', formData.value)
}

const handleReset = () => {
  baseFormRef.value.resetFields()
}
</script>
```

---

## 📚 API 文档

### Props (组件属性)

| 参数         | 说明                                                                   | 类型     | 默认值 |
| ------------ | ---------------------------------------------------------------------- | -------- | ------ |
| `modelValue` | 表单数据对象 (v-model)                                                 | `Object` | `{}`   |
| `formList`   | 表单配置数组 (详见下文)                                                | `Array`  | `[]`   |
| `row`        | `el-row` 的配置项 (如 gutter)                                          | `Object` | `-`    |
| `...$attrs`  | 支持所有 `el-form` 的原生属性 (如 `label-width`, `inline`, `disabled`) | `-`      | `-`    |

### Methods (通过 ref 调用)

| 方法名            | 说明                                             |
| ----------------- | ------------------------------------------------ |
| `validate()`      | 对整个表单进行校验，返回 Promise                 |
| `resetFields()`   | 重置该表单项，将其值重置为初始值，并移除校验结果 |
| `clearValidate()` | 移除表单项的校验结果                             |

---

## ⚙️ formList 配置项详解

`formList` 数组中的每个对象代表一个表单项：

| 属性    | 说明                       | 类型                | 示例                                                                                                                                        |
| ------- | -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`  | 组件类型                   | `String`            | `'input'`, `'select'`, `'apiSelect'`, `'radio'`, `'checkbox'`, `'date'`, `'time'`, `'switch'`, `'slider'`, `'upload'`, `'slot'`, `'render'` |
| `prop`  | 绑定字段名                 | `String`            | `'userName'`                                                                                                                                |
| `label` | 表单项标签                 | `String`            | `'用户名'`                                                                                                                                  |
| `rules` | 校验规则 (同 Element Plus) | `Array`             | `[{ required: true }]`                                                                                                                      |
| `props` | 透传给内部组件的原生属性   | `Object`            | `{ placeholder: '...', disabled: true }`                                                                                                    |
| `show`  | **动态显隐控制**           | `Function(curData)` | `(cur) => cur.type === '1'`                                                                                                                 |
| `col`   | `el-col` 布局属性          | `Object`            | `{ span: 12 }`                                                                                                                              |

### 特殊类型说明

#### 1.1 Select / Radio / Checkbox 数据源
通过 `props.data` 传入选项数组：
```javascript
{
  type: 'select',
  props: {
    data: [
      { label: '选项A', value: 'a' },
      { label: '选项B', value: 'b' }
    ]
  }
}
```

#### 1.2 API Select 下拉选择框
`apiSelect` 通过传入api接口获取数据，可以配置`labelKey`和`valueKey`指定选项的显示文本和值。也可以通过`resultFormat`函数对返回数据进行处理。

```
{
  label: '拉黑事由',
  type: 'apiSelect',
  placeholder: '请选择拉黑事由',
  prop: 'test2',
  api: reasonList,
  labelKey: 'name',
  valueKey: 'code',
  rules: [
    { required: true, message: '请输入拉黑事由' }
  ]
},
```



#### 2. Upload 上传组件 (增强版)
该组件经过封装，统一使用**拖拽列表样式**，默认为手动上传模式（不自动请求接口，仅管理文件流）。

*   **`upload` 对象 (增强配置)**
    *   `maxSize` (Number): 单个文件大小限制，单位 MB。
    *   `fileType` (Array): 允许的文件后缀，如 `['png', 'jpg']`。
    *   `tip` (String): 底部提示文案。

*   **`props` 对象 (原生配置)**
    *   `limit`: 最大允许上传数量（达到数量后会自动隐藏上传框）。
    *   `multiple`: 是否允许多选。

*   **校验注意事项**: 必须设置 `type: 'array'`。

```javascript
{
  type: 'upload',
  prop: 'fileList',
  upload: {
    maxSize: 2,
    fileType: ['png', 'jpg'],
    tip: '请上传身份证正反面'
  },
  props: {
    limit: 2
  },
  rules: [{ required: true, type: 'array', message: '必填' }]
}
```

#### 3. Slot 自定义插槽
当内置类型无法满足需求时，使用插槽在父组件中自定义内容。
```javascript
// 配置
{ type: 'slot', prop: 'mySlot' }

// 使用
<template #mySlot="{ formData, item }">
   <div style="border: 1px solid red">
      <input v-model="formData.customVal" />
   </div>
</template>
```

#### 4. Render 函数
支持直接传入 Vue 的 `h` 函数或组件进行渲染（适合高阶用法）。
```javascript
import { h } from 'vue'
import { ElButton } from 'element-plus'

// 配置
{
  type: 'render',
  prop: 'renderBtn',
  render: h(ElButton, { type: 'primary' }, () => '我是渲染出来的按钮')
}
```

---

## 🎯 最佳实践

1.  **上传文件处理**：
    由于组件默认禁用了 `auto-upload`，`formData` 中的文件对象包含 `raw` 属性（原生 File 对象）。在提交表单时，你需要遍历文件列表，将 `raw` 文件上传到 OSS 或服务器。

2.  **动态联动**：
    利用 `show` 函数可以轻松实现“选择了A才显示B”的逻辑，无需在 template 中写大量的 `v-if`。

3.  **布局控制**：
    可以给 `formList` 中的项配置 `col: { span: 12 }` 来实现一行多列布局。