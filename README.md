# Vue3.5 + Vite + TypeScript Admin Template

中文 | [English](./README.en.md)

一个基于 **Vue 3.5**、**Vite 6** 和 **TypeScript** 构建的现代化、轻量级且高性能的后台管理系统模板。本项目集成了 **Element Plus**、**UnoCSS** 和 **Pinia**，为构建企业级后台应用提供了坚实的基础。

## 🚀 功能特性

- **最新技术栈**: 基于 Vue 3.5、Vite 6 和 TypeScript 5.6 构建，确保极速的构建速度和极致的开发体验。
- **UI 框架**: 预配置 **Element Plus** 和 **UnoCSS**，支持快速且灵活的 UI 开发。
- **动态路由**: 实现了后端驱动的菜单和动态路由生成机制。
- **主题系统**: 内置 **黑色模式 (Dark Mode)** 支持，并利用 View Transition API 实现丝滑的主题切换动画。
- **状态管理**: 使用 **Pinia** 进行集中式状态管理，并支持持久化存储。
- **网络请求**: 封装了 **Axios**，包含请求/响应拦截器、自动错误处理和多实例支持。
- **数据可视化**: 集成 **ECharts** (通过 `vue-echarts`)，轻松创建丰富的交互式图表。
- **代码质量**: 配置了 ESLint、Stylelint 和 TypeScript 严格模式，确保代码风格一致性和质量。

## 🌟 核心亮点

### 1. Hook 方式集成表格 (`useTable`)

不再需要手动维护 loading、data、total 等状态，一行 Hook 搞定表格逻辑：

```ts
// 核心代码示例
const [registerTable, { reload, loading }] = useTable({
  api: getUserList, // 你的 API 接口
  searchInfo: searchForm // 搜索条件
})

// 在模板中使用
<BaseTable
  @register="registerTable"
  :columns="columns"
/>
```

### 2. JSON 配置化表单 (`BaseForm`)

告别繁琐的 template 模版，使用 JSON 配置生成复杂表单，支持 render 和 slot：

```tsx
const formConfig = {
  formList: [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      rules: [{ required: true }]
    },
    {
      type: 'select',
      prop: 'role',
      label: '角色',
      props: {
        data: [{ label: '管理员', value: 1 }]
      }
    },
    {
      type: 'render',
      label: '自定义',
      render: () => <el-tag>JSX 渲染支持</el-tag>
    }
  ]
}
```

## 🛠 技术栈

- **核心框架**: [Vue 3.5](https://vuejs.org/)
- **构建工具**: [Vite 6](https://vitejs.dev/)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **路由管理**: [Vue Router 4](https://router.vuejs.org/)
- **UI 组件库**: [Element Plus](https://element-plus.org/)
- **CSS 引擎**: [UnoCSS](https://unocss.dev/) & [Sass](https://sass-lang.com/)
- **HTTP 客户端**: [Axios](https://axios-http.com/)
- **图表库**: [ECharts](https://echarts.apache.org/)
- **工具库**: [VueUse](https://vueuse.org/)

## 📂 项目结构

```text
src/
├── api/             # API 请求模块
├── assets/          # 静态资源
├── components/      # 公共组件
├── hooks/           # 组合式函数 (Hooks)
├── layouts/         # 布局组件 (侧边栏、头部等)
├── router/          # 路由配置
├── store/           # Pinia 状态管理
├── style/           # 全局样式
├── utils/           # 工具函数 (如 http 封装)
├── views/           # 页面视图
├── App.vue          # 根组件
└── main.ts          # 应用入口
```

## 📦 快速开始

### 前置要求

- Node.js >= 18
- pnpm (推荐)

### 安装

```bash
# 克隆仓库
git clone https://github.com/monsterxwx/vue3.5-vite-element-plus-unocss.git

# 进入项目目录
cd vue3.5-vite-ts-demo

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动本地开发服务器
pnpm run dev
```

### 构建

```bash
# 构建生产环境代码
pnpm run build

# 本地预览构建结果
pnpm run preview
```

### 代码检查

```bash
# 运行代码检查
pnpm run lint
```

## 📄 许可证

[MIT](./LICENSE) License.
