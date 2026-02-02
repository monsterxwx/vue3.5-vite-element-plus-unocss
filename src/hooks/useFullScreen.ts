import { ref } from 'vue'

/**
 * 控制page的全屏状态
 */
export default function useFullScreen () {
  const isFullScreen = ref(false)

  const fullScreen = () => {
    isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    isFullScreen.value = !isFullScreen.value
  }

  document.addEventListener('fullscreenchange', () => {
    isFullScreen.value = document.fullscreenElement !== null
  })

  return {
    isFullScreen,
    fullScreen
  }
}
