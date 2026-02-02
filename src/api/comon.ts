import { webCenterGet, webScsGet } from '@/utils/http'

export const getInfo = () => webCenterGet('getInfo', {})

// 菜单
export const menuList = data => webCenterGet('/system/menu/list', data)

export const informationList = data => (
  {
    rows: [{
      name: 'admin',
      postCn: '管理员',
      sexCn: '男'
    }],
    total: 0
  }
)
