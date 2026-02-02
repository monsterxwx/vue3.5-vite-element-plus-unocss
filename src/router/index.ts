import { TOKEN_KEY } from '@/constants/index'
import useSystemStore from '@/store/system'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from '@/utils/nprogress'
import useNavStore from '@/store/nav'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/layouts/index.vue'),
      children: []
    },
    {
    // 找不到路由重定向到404页面
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/components/ErrorMessage/404.vue')
    }
  ]
})

const whiteList = ['/login']

router.beforeEach(async (to) => {
  NProgress.start()
  const systemStore = useSystemStore()
  const navStore = useNavStore()
  const hasToken = localStorage.getItem(TOKEN_KEY)

  if (hasToken) {
    if (to.path === '/login') {
      return true
    } else {
      if (!systemStore.loginFlag) {
        try {
          await systemStore.initUserInfo()
          await systemStore.getMenuList()
          const currentRoute = router.getRoutes().find(r => r.path === to.path)
          navStore.addNavItem({
            name: currentRoute?.name || to.path,
            path: to.path
          })
          return { path: to.path }
        } catch (error) {
          console.log('error', error)
          return { path: '/login', replace: true }
        }
      } else {
        return true
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      return true
    }
    return { path: '/login', replace: true }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
