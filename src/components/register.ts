import BaseBox from './BaseBox.vue'
import SvgIcon from './SvgIcon.vue'
import BaseTable from './BaseTable/index.vue'
import BaseForm from './Form/BaseForm.vue'
import SearchForm from './Form/SearchForm.vue'

// 定义全局注册组件的函数
export function registerGlobalComponents(app) {
  app.component('BaseBox', BaseBox)
  app.component('BaseTable', BaseTable)
  app.component('BaseForm', BaseForm)
  app.component('SearchForm', SearchForm)
  app.component('SvgIcon', SvgIcon)
}
