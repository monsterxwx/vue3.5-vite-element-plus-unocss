<template>
  <Container :aside-width="navStore.collapse ? '64px' : '230px'">
    <template #header>
      <Header />
    </template>
    <template #aside>
      <Menu :collapse="navStore.collapse" />
    </template>
    <template #tab>
      <Tab />
    </template>
    <template #main>
      <router-view v-slot="{Component}">
        <transition
          name="slide-left"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </template>
  </Container>
  <div class="drawer">
    <el-drawer
      v-model="navStore.isShowMenu"
      :with-header="false"
      direction="ltr"
      size="230px"
    >
      <div v-if="!navStore.collapse" class="text-center  font-700 text-18px p-[20px_15px] border-b-1px border-b-solid border-b-color-$border-color mb-20px">
        后台管理
      </div>
      <div v-else class="w-100% flex justify-center">
        <img class="w-[25px] h-[25px] my-10px" src="@/assets/vue.svg" alt="">
      </div>
      <div class="flex-[1_0] min-h-0 w-100%">
        <Menu />
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import Container from './Container/index.vue'
import Tab from './Tab/index.vue'
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import useNavStore from '@/store/nav'
const navStore = useNavStore()

</script>

<style lang="scss" scoped>
.drawer {
  :deep(.el-drawer.ltr) {
    background-color: var(--el-bg-color);
  }
  :deep(.el-drawer__body) {
    padding: 0;
    background-color: var(--el-bg-color);
  }
}

</style>
