import axios from '@/libs/api.request'

export const getRoleData = () => {
  return axios.request({
    url: 'get_role_data',
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
