import { defineStore } from 'pinia'
import router from '@/router'
import { getInfo } from '@/api/comon'
import { TOKEN_KEY } from '@/constants/index'
import { login } from '@/api/login'

const useSystemStore = defineStore({
  id: 'router',
  state: () => ({
    loginFlag: false,
    userInfo: {},
    menuList: []
  }),
  actions: {
    async loginFunc (formData) {
      // const res = await login({
      //   ...formData
      // })
      const res = {
        token: 'test'
      }
      localStorage.setItem(TOKEN_KEY, res.token)
    },
    async logout () {
      localStorage.removeItem(TOKEN_KEY)
      this.$reset()
      router.replace({ path: '/login' })
      this.removeRoute('layout')
    },
    removeRoute (name) {
      if (router.hasRoute(name)) {
        const route = router.getRoutes().find(r => r.name === name)
        if (route && route.children) {
          route.children.forEach(child => {
            if (child.name) {
              router.removeRoute(child.name)
            }
          })
        }
      }
    },
    async initUserInfo () {
      // const { user = {} } = await getInfo()
      const user = {
        name: 'admin'
      }
      this.userInfo = user
    },
    async getMenuList () {
      //   const { rows = [] } = await menuList({ pid: 'f289d508788b4a039e1ac03b33176fee' })
      // this.menuList = rows

      // 菜单数据结构（同时用于菜单显示和路由注册，支持多级菜单）
      const menuData = [
        {
          name: '仪表盘',
          id: '1',
          children: [
            {
              path: '/home',
              name: '工作台',
              component: '/home/index.vue',
              meta: {
                title: '工作台',
                icon: 'mynaui:home-solid'
              }
            }
          ]
        },
        {
          name: '测试页面',
          id: '2',
          children: [
            {
              path: '/test1',
              name: '表格测试',
              component: '/test1/index.vue',
              icon: 'mdi-light:home'
            },
            {
              path: '/test2',
              name: 'echarts测试',
              icon: 'mdi-light:home',
              component: '/test2/index.vue'
            },
            {
              path: '/test3',
              name: '表单测试',
              icon: 'mdi-light:home',
              component: '/test3/index.vue'
            },
            {
              path: '/test4',
              name: '页面404测试',
              icon: 'mdi-light:home',
              component: '/test4/index.vue'
            }
          ]
        }
      ]

      // 递归从菜单数据中提取路由配置（支持多级菜单）
      const extractRoutes = (menuData) => {
        const routes = []

        const traverseMenu = (items) => {
          items.forEach(item => {
            // 如果当前项有path和component，说明是可注册的路由
            if (item.path && item.component) {
              routes.push({
                path: item.path,
                name: item.name.toLowerCase().replace(/\s+/g, ''), // 将名称转换为小写且无空格作为路由名
                component: item.component,
                meta: item.meta || {},
                ...(item.icon && { icon: item.icon })
              })
            }

            // 如果有子菜单，递归处理
            if (item.children && item.children.length > 0) {
              traverseMenu(item.children)
            }
          })
        }

        traverseMenu(menuData)
        return routes
      }

      const compList = import.meta.glob('@/views/**/index.vue')
      console.log('compList', compList)

      // 从菜单数据生成路由配置
      const routerMap = extractRoutes(menuData)
      console.log('提取到的路由配置:', routerMap)

      const newRouterMap = routerMap.map(item => {
        const componentPath = `/src/views${item.component}`
        const componentLoader = compList[componentPath]

        if (!componentLoader) {
          console.error(`组件未找到: ${componentPath}`)
          return {
            ...item,
            component: () => import('@/components/errorMessage/404.vue')
          }
        }

        return {
          ...item,
          component: componentLoader
        }
      })

      // 设置菜单数据用于显示
      this.menuList = menuData
      console.log('menu', this.menuList)

      // 添加路由
      newRouterMap.forEach((route) => {
        router.addRoute('layout', route)
      })
      this.loginFlag = true
    }
  }
})

export default useSystemStore
