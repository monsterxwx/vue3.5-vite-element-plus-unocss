<template>
  <Icon
    v-if="icon"
    :style="{fontSize: size+'px',color:color}"
    :icon="icon"
    v-bind="$attrs"
  />
  <svg
    v-else
    class="svg-icon"
    :width="size"
    :height="size"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use
      :href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed, toRefs } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  icon: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number],
    default: '16'
  },
  color: { // 颜色不生效删除svg中的fill属性即可
    type: String
  }
})

const { prefix, name } = toRefs(props)

const symbolId = computed(() => `#${prefix.value}-${name.value}`)
</script>

<style lang="scss" scoped>
  .svg-icon {
    vertical-align: middle;
    fill: currentcolor;
    object-fit: contain;
  }
</style>
