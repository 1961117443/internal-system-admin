import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import testData from './data/test-data'
// import { treeData } from './data/tree-select'
// const Random = Mock.Random

export const getRoleAuth = req => { 
  console.log(testData)
  return testData.roleAuth
}
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

export const postRoleData = req=>{ 
  let role = {}
  doCustomTimes(5, () => {
    role=Mock.mock({
      id: '@guid',
      name: '@name',
      // email: '@email',
      createTime: '@date'
    })
  })
  return role
}

export const getUserData = req => {
  let tableData = []
  doCustomTimes(10, () => {
    tableData.push(Mock.mock({
      id: '@guid',
      userCode: '@first',
      userName: '@name',
      isDisable: '@boolean',
      // email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const postUserData = req => {
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
  return 'ok'
}


export const getMenuData = req => { 
  return testData.menu
}

export const postMenuData = req=>{ 
  let role = {}
  doCustomTimes(5, () => {
    role=Mock.mock({
      id: '@guid',
      name: '@name',
      url:"@email",
      httpMethod:"@name",
      // email: '@email',
      createTime: '@date'
    })
  })
  return role
}