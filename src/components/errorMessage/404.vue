<template>
  <BaseBox>
    <div class="error404">
      <div class="image" />
      <div class="button">
        <el-button @click="goIndex">
          返回首页
        </el-button>
      </div>
    </div>
  </BaseBox>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goIndex = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.error404 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  .image {
    width: 500px;
    height: 500px;
    background: url("@/assets/images/status/404.jpeg") no-repeat center center;
  }

}
</style>
