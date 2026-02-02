import { setupPinia } from './pinia'
import { setupEcharts } from './echarts'
import { setupElementIcons } from './element'

export function setupPlugins (app) {
  setupPinia(app)
  setupEcharts(app)
  setupElementIcons(app)
}
