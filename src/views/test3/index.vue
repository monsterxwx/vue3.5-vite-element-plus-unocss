<template>
<BaseBox>
  <div class="form">
       <BaseForm
          label-width="90px"
          label-position="right"
          ref="formRef"
          v-model="formData"
          v-bind="formConfig"
          @validate="confim"
        >
          <template #tests>
            <el-button>ee</el-button>
          </template>
        </BaseForm>
        <el-button @click="add">
          提交
        </el-button>
        <el-button @click="reset">
          重置
        </el-button>
  </div>
</BaseBox>
</template>

<script setup>
import formConfig from './formConfig'
import { ref } from 'vue'
const formRef = ref(null)
const formData = ref({
  test1: '',
  test2: 15,
  test3: '',
  test4: [],
  test5: [],
  test6: '',
  test7: '',
  test8: '',
  tests: ''
})

const add = async () => {
  try {
    await formRef.value.validate()
    console.log('校验成功')
  } catch (error) {
    console.log('校验失败')
  }
}
const reset = () => {
  formRef.value.resetFields()
}
const confim = () => {
  console.log(formData.value)
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 700px;
}
</style>
