<template>
  <el-menu
    :default-active="$route.path"
    :collapse="collapse"
    :collapse-transition="false"
    router
  >
    <MenuItem
      v-for="(item, index) in sysStore.menuList"
      :key="index"
      :menu="item"
    />
  </el-menu>
</template>

<script setup>
import useSystemStore from '@/store/system'
import MenuItem from './MenuItem.vue'
const sysStore = useSystemStore()
defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
.el-menu {
  width: 100%;
  border: none;
}

</style>
