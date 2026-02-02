<template>
  <div class="login-class relative w-full h-full px-16px overflow-hidden">
    <div class="  relative h-full w-full py-40px flex">
      <div class="h-full pl-160px mr-16px flex flex-col w-50%">
        <AppLogo class="-enter-x" />
        <div class="my-auto">
          <img
            :alt="title"
            src="@/assets/svg/login-box-bg.svg"
            class="w-1/2 -mt-64px -enter-x"
          >
          <div class="mt-20px  text-white dark:text-gray-500 -enter-x">
            请使用账号密码登录
          </div>
        </div>
      </div>
      <div class="flex w-full  py-20px h-100% py-0 my-0 w-40%">
        <div
          class="relative w-full px-20px py-32px mx-auto my-auto border-rd-6px  shadow-md ml-64px bg-transparent  p-16px shadow-none   w-100% enter-x"
        >
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppLogo from './components/AppLogo.vue'
import LoginForm from './components/LoginForm.vue'

</script>

<style lang="scss" scoped>
.login-class {
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: -48%;
    width: 100%;
    height: 100%;
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: "";
    background-image: url("@/assets/svg/login-bg.svg");

  }
}

</style>
