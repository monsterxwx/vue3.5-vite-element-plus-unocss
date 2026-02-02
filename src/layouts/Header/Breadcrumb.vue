<template>
  <el-breadcrumb
    separator="/"
  >
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="index"
    >
      <a
        @click.prevent="handleLink(item)"
        class="!font-normal"
      >{{ getBreadcrumbTitle(item) }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useSystemStore from '@/store/system'

const route = useRoute()
const router = useRouter()
const systemStore = useSystemStore()

// 获取面包屑标题
const getBreadcrumbTitle = (routeItem) => {
  // 优先使用meta中的title
  if (routeItem.meta?.title) {
    return routeItem.meta.title
  }

  // 使用name作为标题
  if (routeItem.name) {
    return routeItem.name
  }

  // 使用路径作为后备
  return routeItem.path
}

// 构建面包屑列表
const breadcrumbList = computed(() => {
  const matched = route.matched.filter(item => item.name && item.path !== '/')

  // 如果没有匹配的，返回空数组
  if (!matched.length) {
    return []
  }

  // 获取当前路由的完整路径
  const currentPath = route.path

  // 查找菜单数据来获取层级结构
  const findMenuHierarchy = (menuList, targetPath) => {
    for (const menu of menuList) {
      if (menu.children) {
        for (const child of menu.children) {
          if (child.path === targetPath) {
            return [menu, child]
          }
        }
      }
    }
    return null
  }

  // 尝试从菜单数据中获取层级
  const hierarchy = findMenuHierarchy(systemStore.menuList, currentPath)

  if (hierarchy) {
    // 如果找到菜单层级，使用菜单数据
    return hierarchy.map(item => ({
      name: item.name,
      path: item.path || '',
      meta: { title: item.name }
    }))
  }

  // 如果没有找到菜单层级，使用路由匹配
  return matched.map(item => ({
    ...item,
    meta: {
      title: getBreadcrumbTitle(item)
    }
  }))
})

const handleLink = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>

</style>
