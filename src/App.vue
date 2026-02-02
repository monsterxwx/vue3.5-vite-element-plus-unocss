<template>
  <el-config-provider :locale="zhCn">
    <div class="w-100% h-100vh">
      <RouterView v-if="isRouterAlive" />
    </div>
  </el-config-provider>
</template>
<script setup>
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import useNavStore from '@/store/nav'
import { useWindowSize } from '@vueuse/core'
import { ref, provide, nextTick, watch } from 'vue'

const navStore = useNavStore()
const { width } = useWindowSize()

watch(width, () => {
  if (width.value < 768) {
    // 当屏幕小于768时，执行代码段（手机端）
    navStore.changeScreen(true)
  } else {
    // 其他时候，执行（比如电脑端）
    navStore.changeScreen(false)
    navStore.changeMenuShow(false)
  }
}, {
  immediate: true
})

const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false // 先关闭，
  nextTick(() => {
    isRouterAlive.value = true // 再打开
  })
}
provide('reload', reload)

</script>
<style>

</style>
