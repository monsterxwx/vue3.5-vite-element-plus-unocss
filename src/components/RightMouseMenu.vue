<template>
  <div
    class="right-menu"
    :style="{ left: menuLeft + 'px', top: menuTop + 'px' }"
    v-if="modelValue"
    ref="rightMenuRef"
  >
    <div
      class="right-menu-item"
      :class="navStore.navList.length<=1?'disabled-menu':''"
      @click="itemSelectClick(item)"
      v-for="item in rightMenuList"
      :key="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import useNavStore from '@/store/nav'
import { ref, inject, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
const navStore = useNavStore()
const reLoad = inject('reload')
const prop = defineProps({
  left: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  },
  index: {
    type: Number,
    default: -1
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
const rightMenuRef = ref(null)
const menuLeft = ref(0)
const menuTop = ref(0)
const rightMenuList = ['重新加载', '关闭当前标签页', '关闭其他标签页']
onClickOutside(rightMenuRef, () => {
  emit('update:modelValue', false)
})
watchEffect(() => {
  menuLeft.value = prop.left
  menuTop.value = prop.top
})

const itemSelectClick = (item) => {
  if (navStore.navList.length <= 1) return
  switch (item) {
    case '重新加载':
      reLoad()
      break
    case '关闭当前标签页':
      navStore.deleteNavItem(prop.index)
      break
    case '关闭其他标签页':
      navStore.deleteOtherItem(prop.index)
      break
    default:
      break
  }
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
  .right-menu {
    position: fixed;
    z-index: 999;
    padding: 5px 0;
    border: 1px solid #f3f3f3;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow:
      rgb(0 0 0 / 20%) 0 12px 28px 0,
      rgb(0 0 0 / 10%) 0 2px 4px 0,
      rgb(255 255 255 / 5%) 0 0 0 1px inset;
    .right-menu-item {
      padding: 10px;
      font-size: 14px;
      color: #666666;
      cursor: pointer;
      &:hover {
        color: #409eff;
        background-color: #ecf5ff;
      }
    }
    .disabled-menu {
      cursor: no-drop;
      color: #c0c4cc;
      &:hover {
        color: #c0c4cc;
        background-color: transparent;
      }
    }
  }
</style>
