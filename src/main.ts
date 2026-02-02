import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import { setupPlugins } from './plugins'
import 'virtual:uno.css'
import './style/index.scss'
import { registerGlobalComponents } from './components/register'
import 'virtual:svg-icons-register'

const app = createApp(App)

// 全局注册组件

registerGlobalComponents(app)

setupPlugins(app)

app.use(router).mount('#app')