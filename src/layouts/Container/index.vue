<template>
  <div class="container-wrap">
    <div
      class="aside"
      v-if="!navStore.isSmallScreen"
      :style="{ width: asideWidth }"
    >
      <div v-if="!navStore.collapse" class="text-center  font-700 text-18px p-[20px_15px] border-b-1px border-b-solid border-b-color-$border-color mb-20px">
        后台管理
      </div>
      <div v-else class="w-100% flex justify-center">
        <img class="w-[25px] h-[25px] my-10px" src="@/assets/vue.svg" alt="">
      </div>
      <div class="flex-[1_0] min-h-0 w-100%">
        <slot name="aside" />
      </div>
    </div>
    <div class="content">
      <div class="common">
        <slot name="header" />
        <slot
          name="tab"
        />
      </div>
      <div class="scroll">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useNavStore from '@/store/nav'
const navStore = useNavStore()
defineProps({
  asideWidth: {
    type: String,
    default: '200px'
  }
})
</script>

<style lang="scss" scoped>
.container-wrap {
  --un-ring-offset-shadow: 0 0 rgb(0 0 0 / 0%);
  --un-ring-shadow: 0 0 rgb(0 0 0 / 0%);
  --un-shadow: 0 0 1px rgb(136 136 136);

  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: var(--bg-color);
  .aside {
    overflow: hidden;
    width: 200px;
    height: 100%;
    border-right: 1px solid var(--el-fill-color);
    background-color: var(--el-bg-color);
    box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
    transition: width 0.3s;
  }
  .content {
    display: flex;
    overflow: hidden;
    min-height: 0;
    flex: 1;
    flex-direction: column;
    .common {
      width: 100%;
    }
    .scroll {
      overflow-x: hidden;
      overflow-y: auto;
      padding:0 16px 16px;
      min-height: 0;
      flex: 1;
    }
  }
}
</style>
