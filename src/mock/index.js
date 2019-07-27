import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableData, getDragList, uploadImage, getOrgData, getTreeSelectData } from './data'
import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'
import { getRoleData, getUserData,getMenuData, postMenuData, postUserData, postRoleData,getRoleAuth } from './sys'
import { postDemandData } from './demand'


// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/message\/init/, getMessageInit)
Mock.mock(/\/message\/content/, getContentByMsgId)
Mock.mock(/\/message\/has_read/, hasRead)
Mock.mock(/\/message\/remove_readed/, removeReaded)
Mock.mock(/\/message\/restore/, restoreTrash)
Mock.mock(/\/message\/count/, messageCount)
Mock.mock(/\/get_org_data/, getOrgData)
Mock.mock(/\/get_tree_select_data/, getTreeSelectData)

//sys
Mock.mock(/\/get_role_data/, getRoleData)
Mock.mock(/\/get_user_data/, getUserData)
Mock.mock(/\/post_user_data/, postUserData)
Mock.mock(/\/post_role_data/, postRoleData)
Mock.mock(/\/get_menu_data/, getMenuData)
Mock.mock(/\/post_menu_data/, postMenuData)
Mock.mock(/\/get_role_auth/, getRoleAuth)

//demand 需求管理
Mock.mock(/\/demand\/post/, postDemandData)

export default Mock
