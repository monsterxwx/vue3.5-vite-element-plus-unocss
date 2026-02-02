<template>
  <div class="w-100%!">
    <div class="ml-2px mb-10px text-30px lh-36px  font-bold text-center enter-x text-left">
      登录
    </div>
    <el-form
      class="p-4px enter-x"
      :model="formData"
      ref="formRef"
      @keypress.enter="handleLogin"
    >
      <el-form-item name="username" class="enter-x">
        <el-input
          size="large"
          v-model="formData.username"
          placeholder="账号"
          class="w-100%!"
        />
      </el-form-item>
      <el-form-item name="password" class="enter-x">
        <el-input
          size="large"
          type="password"
          show-password
          v-model="formData.password"
          placeholder="密码"
          class="w-100%!"
        />
      </el-form-item>
      <!-- <el-form-item name="code" class="enter-x">
        <div class="flex w-100%">
          <el-input
            class="w-100%!"
            size="large"
            v-model="formData.code"
            placeholder="短信验证码"
          />
          <img class="h-10px pl-2px" :src="codeUrl" @click="handleChangeCodeImg">
        </div>
      </el-form-item> -->
      <el-form-item class="enter-x">
        <el-button
          type="primary"
          size="large"
          class="w-100%"
          :loading="loading"
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useSystemStore from '@/store/system'
import useNavStore from '@/store/nav'

const formData = reactive({
  username: '',
  password: '', // admin123
  code: '',
  uuid: '',
  sms: ''
})
const systemStore = useSystemStore()
const codeUrl = ref('')
const router = useRouter()
const loading = ref(false)

const navStore = useNavStore()

const handleLogin = async () => {
  try {
    loading.value = true
    await systemStore.loginFunc(formData)
    router.push('/home')
    navStore.addNavItem({ name: 'home', path: '/home' })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
const handleChangeCodeImg = () => {

}
</script>

<style lang="scss" scoped>

</style>
