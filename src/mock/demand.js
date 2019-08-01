import Mock from 'mockjs'
import { doCustomTimes,getParams } from '@/libs/util' 


export const postDemandData = res => {
    let data = {
        success: true,
        data: res,
        msg: '成功'
    }
    return data
}
let demandList = []
doCustomTimes(50, () => {
    demandList.push(Mock.mock({
        id: "@guid",
        billCode: "@integer(10)",
        inputDate: "@date",
        theoryDate: "@date",
        plannedCompletionDate: "@date",
        suggestDate: "@date",
        customerName: "@cname",
        "priority|1": ["急","一般","不急"],
        versionNumber: "@integer(0, 20)", 
        "clientRelationship|1": ['实施中','维护中','其他'],
        implement: "@cname",
        demander: "@cname",
        telephone: "@natural(1000)",
        moduleName: "@cword(5,8)",
        describe: "@cparagraph"
    }))
  })

export const getDemandList = res=>{
    return demandList
}  
export const getDemandData = req => { 
    let data = 
    {
        "id": "",
        "billCode": "",
        "inputDate": "",
        "theoryDate": "",
        "plannedCompletionDate": "",
        "suggestDate": "",
        "customerName": "",
        "priority": "",
        "versionNumber": "",
        "clientRelationship": "",
        "implement": "",
        "demander": "",
        "telephone": "",
        "moduleName": "",
        "describe": ""
    }
    if (req.url.indexOf("?")>0) {
        let query =getParams(req.url)
        data =  demandList.find(item => item.id.toLowerCase().indexOf(query.id.toLowerCase()) > -1); 
    } 
    return data
    
}