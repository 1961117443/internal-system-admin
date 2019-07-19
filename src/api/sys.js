import axios from '@/libs/api.request'

export const getRoleData = () => {
  return axios.request({
    url: 'get_role_data',
    method: 'get'
  })
}
export const getRoleAuthData = () => {
  return axios.request({ 
    url: 'get_role_auth',
    method: 'get'
  })
}

export const postRoleData = (data) => { 
  return axios.request({
    url: 'post_role_data',
    method: 'post',
    params: data
  })
}

export const getUserData = () => {
  return axios.request({
    url: 'get_user_data',
    method: 'get'
  })
}

export const postUserData = (data) => {
  return axios.request({
    url: 'post_user_data',
    method: 'post',
    params: data
  })
}


export const getMenuData = () => {
  return axios.request({
    url: 'get_menu_data',
    method: 'get'
  })
}

export const postMenuData = (data) => { 
  return axios.request({
    url: 'post_menu_data',
    method: 'post',
    params: data
  })
}