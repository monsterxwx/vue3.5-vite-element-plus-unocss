# Vue3.5 + Vite + TypeScript Admin Template

[中文](./README.md) | English

A modern, lightweight, and high-performance management system template built with **Vue 3.5**, **Vite 6**, and **TypeScript**. This project integrates **Element Plus**, **UnoCSS**, and **Pinia**, providing a solid foundation for building enterprise-level back-office applications.

## 🚀 Features

- **Latest Tech Stack**: Built on Vue 3.5, Vite 6, and TypeScript 5.6, ensuring fast build times and a great development experience.
- **UI Framework**: Pre-configured with **Element Plus** and **UnoCSS** for rapid and flexible UI development.
- **Dynamic Routing**: Implementation of server-side driven menu and dynamic routing generation.
- **Theme System**: Built-in **Dark Mode** support featuring the new View Transition API for smooth theme switching animations.
- **State Management**: Centralized state management using **Pinia** with persistence support.
- **Network Request**: Encapsulated **Axios** with request/response interceptors, automatic error handling, and multi-instance support.
- **Data Visualization**: Integrated **ECharts** (via `vue-echarts`) for creating rich interactive charts.
- **Code Quality**: configured with ESLint, Stylelint, and TypeScript strict mode to ensure code consistency.

## 🌟 Key Highlights

### 1. Hook-based Table Integration (`useTable`)

Stop manually managing loading, data, and pagination states. Handle table logic with a single Hook:

```ts
// Core example
const [registerTable, { reload, loading }] = useTable({
  api: getUserList, // Your API function
  searchInfo: searchForm // Search parameters
})

// Usage in template
<BaseTable
  @register="registerTable"
  :columns="columns"
/>
```

### 2. JSON-based Form Configuration (`BaseForm`)

Say goodbye to verbose templates. Generate complex forms using JSON configuration, with support for render functions and slots:

```tsx
const formConfig = {
  formList: [
    {
      type: 'input',
      prop: 'username',
      label: 'Username',
      rules: [{ required: true }]
    },
    {
      type: 'select',
      prop: 'role',
      label: 'Role',
      props: {
        data: [{ label: 'Admin', value: 1 }]
      }
    },
    {
      type: 'render',
      label: 'Custom',
      render: () => <el-tag>JSX Render Support</el-tag>
    }
  ]
}
```

## 🛠 Tech Stack

- **Core**: [Vue 3.5](https://vuejs.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Router**: [Vue Router 4](https://router.vuejs.org/)
- **UI Library**: [Element Plus](https://element-plus.org/)
- **CSS Engine**: [UnoCSS](https://unocss.dev/) & [Sass](https://sass-lang.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Charts**: [ECharts](https://echarts.apache.org/)
- **Utils**: [VueUse](https://vueuse.org/)

## 📂 Project Structure

```text
src/
├── api/             # API request modules
├── assets/          # Static assets
├── components/      # Common components
├── hooks/           # Composable hooks
├── layouts/         # Layout components (Sidebar, Header, etc.)
├── router/          # Router configuration
├── store/           # Pinia store modules
├── style/           # Global styles
├── utils/           # Utility functions (http, etc.)
├── views/           # Page views
├── App.vue          # Root component
└── main.ts          # Application entry
```

## 📦 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/monsterxwx/vue3.5-vite-element-plus-unocss.git

# Enter the project directory
cd vue3.5-vite-ts-demo

# Install dependencies
pnpm install
```

### Development

```bash
# Start local development server
pnpm run dev
```

### Build

```bash
# Build for production
pnpm run build

# Preview the build locally
pnpm run preview
```

### Linting

```bash
# Lint code
pnpm run lint
```

## 📄 License

[MIT](./LICENSE) License.
