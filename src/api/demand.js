import axios from '@/libs/api.request'

export const postDemand = function(data){
    return axios.request({
        url: '/demand/post', 
        method: 'post',
        data:data
      })
}

export const get = function(data){
  return axios.request({
    url:'/demand/get',
    method:'get',
    params:data
  })
}

export const getList = function(data){
  return axios.request({
    url:'/demand/list',
    method:'get',
    params:data
  })
}