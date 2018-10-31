const service = require('../service/apiService');
var myPromise = require('bluebird');
const utilService = require('../service/utilService');
const userInfoDao = require('../dao/userInfoDao');
function registerService() {
}
/**
 * 
 */
registerService.prototype.deleteDocument = (name,trueName, password,Tel) => {
    return new myPromise(async(resolve, reject) => {
        try{
        let resultObj = {};
        let ifInuserTable = await userInfoDao.ifInuserTable(name);
        if(ifInuserTable == null){
            if(password == null){
                resultObj.code = "002";
                resultObj.responsecode = "密码为空";
            }else{
            let createTime = new Date();
            password = utilService.md5Password(password);
            let userId = utilService.createUserId(createTime);
            let data = await userInfoDao.addser(userId, name, trueName, password,Tel,createTime);
            if(data && data.length){
                resultObj.code = "003";
                resultObj.responsecode = "失败";
            }else{
                resultObj.code = "000";
                resultObj.responsecode = "成功";
            }
        }
        }else{
            resultObj.code = "001";
            resultObj.responsecode = "重新输入昵称"
        }
        resolve(resultObj);
    }catch (err){
        resolve(err);
    }
    })
}
registerService.prototype.saveDocument = (name,password) => {
    return new myPromise(async(resolve, reject) => {
        let resultObj = {};
        if (name == "null") {
            resultObj.code = "001"
            resultObj.responsecode = "重新输入昵称";
        } else if (password == "null") {
            resultObj.code = "002";
            resultObj.responsecode = "密码为空";
        }else{
        let ifInuserTable = await userInfoDao.ifInuserTable(name);
        if(ifInuserTable == null){
            resultObj.code = "001"
            resultObj.responsecode = "重新输入昵称";
        }else{
            password = utilService.md5Password(password);
            let data = await userInfoDao.findifHaveuser(name, password);
            if(data != null){
                resultObj.code = "000";
                resultObj.responsecode = "成功";
            }else{
                resultObj.code = "005";
                resultObj.responsecode = "重新输入密码"
            }
        }}
        resolve(resultObj);
    })
}



module.exports = registerService;