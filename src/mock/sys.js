import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
// import orgData from './data/org-data'
// import { treeData } from './data/tree-select'
// const Random = Mock.Random

export const getRoleData = req => {
  let tableData = []
  doCustomTimes(10, () => {
    tableData.push(Mock.mock({
      id: '@guid',
      name: '@name',
      // email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getUserData = req => {
  let tableData = []
  doCustomTimes(10, () => {
    tableData.push(Mock.mock({
      id: '@guid',
      code: '@first',
      name: '@name',
      isDisable: '@boolean',
      // email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const postUserData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      id: '@guid',
      code: '@first',
      name: '@name',
      isDisable: '@boolean',
      // email: '@email',
      createTime: '@date'
    }))
  })
  return 'ok'
}
