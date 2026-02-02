<template>
  <BaseBox>
    <v-chart :option="option" autoresize />
  </BaseBox>
</template>

<script setup>
import { ref } from 'vue'

const option = ref({
  title: {
    text: '简单示例'
  },
  xAxis: {
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20, 5]
  }]
})
</script>

<style lang="scss" scoped>

</style>
