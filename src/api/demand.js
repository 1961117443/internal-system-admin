import axios from '@/libs/api.request'

export const postDemand = function(data){
    return axios.request({
        url: '/demand/post', 
        method: 'post',
        data:data
      })
}