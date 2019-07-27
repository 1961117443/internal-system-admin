import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'


export const postDemandData = res =>{ 
    let data = {
        success:true,
        data:res,
        msg:'成功'
    }
    return data
}