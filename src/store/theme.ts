import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => {
    return {
      isDark: useDark()
    }
  },
  actions: {
    changeTheme (e) {
      const x = e.clientX
      const y = e.clientY
      // 计算鼠标点击位置距离视窗的最大圆半径
      const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

      // 设置CSS变量
      document.documentElement.style.setProperty('--x', x + 'px')
      document.documentElement.style.setProperty('--y', y + 'px')
      document.documentElement.style.setProperty('--r', endRadius + 'px')

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          this.isDark = !this.isDark
        })
      } else {
        this.isDark = !this.isDark
      }
    }
  },
  persist: true
})
export default useThemeStore
