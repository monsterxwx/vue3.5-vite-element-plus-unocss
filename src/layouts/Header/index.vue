<template>
  <div class="flex justify-between items-center h-50px bg-$bg-color">
    <div class="flex items-center">
      <div
        v-if="!navStore.isSmallScreen"
        class=" flex items-center p-[0_15px]"
        @click="navStore.changeCollapse"
      >
        <div :class="[themeStore.isDark ? 'color-#c7c7d1' : 'color-#7987a1']" class="text-18px transition-all transition-duration-300 p-[8px_10px] hover:bg-$hover-bg-color rounded cursor-pointer flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            class=" inline"
          ><path fill="currentColor" d="M3 4h18v2H3zm0 7h12v2H3zm0 7h18v2H3z" /></svg>
        </div>
      </div>
      <div
        class="cursor-pointer p-[0_20px]"
        v-else
        @click="navStore.changeMenuShow"
      >
        <el-icon
          size="22"
          color="#409eff"
        >
          <Menu />
        </el-icon>
      </div>
      <Breadcrumb v-if="!navStore.isSmallScreen" />
    </div>

    <div class="flex items-center gap-20px p-[0_15px]">
      <el-icon
        :color="themeStore.isDark ? '#c7c7d1' : '#7987a1'"
        size="18px"
        @click="fullScreen"
      >
        <div class="transition-all transition-duration-300 p-8px hover:bg-$hover-bg-color rounded cursor-pointer flex justify-center items-center">
          <FullScreen />
        </div>
      </el-icon>

      <el-icon
        :color="themeStore.isDark ? '#c7c7d1' : '#7987a1'"
        size="18px"
      >
        <div class="transition-all transition-duration-300 p-8px hover:bg-$hover-bg-color rounded cursor-pointer flex justify-center items-center">
          <Setting />
        </div>
      </el-icon>
      <el-icon
        :color="themeStore.isDark ? '#c7c7d1' : '#7987a1'"
        size="18px"
        @click="themeStore.changeTheme"
        v-if="themeStore.isDark"
      >
        <div class="transition-all transition-duration-300 p-8px hover:bg-$hover-bg-color rounded cursor-pointer flex justify-center items-center">
          <Moon />
        </div>
      </el-icon>
      <el-icon
        :color="themeStore.isDark ? '#c7c7d1' : '#7987a1'"
        size="18px"
        v-else
        @click="themeStore.changeTheme"
      >
        <div class="transition-all transition-duration-300 p-8px hover:bg-$hover-bg-color rounded cursor-pointer flex justify-center items-center">
          <Sunny />
        </div>
      </el-icon>
      <div class="flex items-center">
        <el-dropdown>
          <div class="flex items-center cursor-pointer">
            <div class="mr-10px">
              {{ 'admin' }}
            </div>
            <el-icon>
              <arrow-down />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from './Breadcrumb.vue'
import useNavStore from '@/store/nav'
import useThemeStore from '@/store/theme'
import useFullScreen from '@/hooks/useFullScreen'
import { useRouter } from 'vue-router'
const navStore = useNavStore()
const themeStore = useThemeStore()
const { fullScreen } = useFullScreen()

const router = useRouter()

const logout = () => {
  // 退出登录逻辑
  router.replace('/login')
}

</script>

<style lang="scss" scoped>

</style>
