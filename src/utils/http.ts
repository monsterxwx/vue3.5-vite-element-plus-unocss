import axios from 'axios'
import { TOKEN_KEY } from '@/constants'
import { ElMessage } from 'element-plus'
import router from '@/router'

function withToken (config) {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.authorization = token
  }
}

// 定义不同的 baseURL
const baseURLs = {
  webScsApi: '/web-scs-api',
  webCenterApi: '/web-center-api'
}

// 创建通用的请求拦截器函数
const requestInterceptor = (config) => {
  withToken(config)
  return config
}

// 创建通用的响应拦截器函数
const responseInterceptor = (response) => {
  if (response.status == 200) {
    console.log('asdfwe', response)

    if (response.data.code < 400) {
      return Promise.resolve(response)
    } else {
      errorInterceptor(response.data)
    }
  }
  return Promise.reject(response)
}

const errorInterceptor = async (response) => {
  const status = response?.code
  if (!status) {
    return Promise.reject(response)
  }
  switch (status) {
    case 401:{
      ElMessage({
        message: '登录过期，请重新登录',
        type: 'error'
      })
      if (router.currentRoute.value.path !== '/login') {
        ElMessage.error('登录过期，请重新登录')
        router.replace({ path: '/login' })
      }
      break
    }
    case 404:
      ElMessage({
        message: '网络请求不存在',
        type: 'error'
      })
      break
    default:
      ElMessage({
        message: response?.msg || '网络请求错误',
        type: 'error'
      })
  }
  return Promise.reject(response)
}

// 为每个 baseURL 创建 axios 实例
const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 30000
  })
  instance.interceptors.request.use(requestInterceptor)
  instance.interceptors.response.use(responseInterceptor)
  return instance
}

// 创建各个实例
const webScsInstances = createInstance(baseURLs.webScsApi)
const webCenterInstances = createInstance(baseURLs.webCenterApi)

// 为每个实例创建对应的 get 和 post 方法
function createGetPost (instance) {
  const get = (url, params) => {
    return new Promise((resolve, reject) => {
      instance
        .get(url, {
          params: {
            // projectId: projectStore?.projectId || '',
            ...params
          }
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const post = (url, params) => {
    return new Promise((resolve, reject) => {
      instance
        .post(url, {
          // projectId: projectStore?.projectId || '',
          ...params
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { get, post }
}

const { get: webScsGet, post: webScsPost } = createGetPost(webScsInstances)
const { get: webCenterGet, post: webCenterPost } = createGetPost(webCenterInstances)

// 导出实例和对应的请求方法
export {
  webScsInstances, webScsGet, webScsPost,
  webCenterInstances, webCenterGet, webCenterPost
}
