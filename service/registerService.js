const service = require('../service/apiService');
var myPromise = require('bluebird');
const utilService = require('../service/utilService');
const userInfoDao = require('../dao/userInfoDao');
const userTokenDao = require('../dao/userTokenDao');
const constant = require('../config/constant');
const docNameDao = require('../dao/docNameDao');
const _ = require('underscore');
function registerService() {
}
/**
 * 注册
 */
registerService.prototype.loginInterface = (name,trueName, password,Tel) => {
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
            let data = await userInfoDao.addUser(userId, name, trueName, password,Tel,createTime);//
            console.log("datataaaaaaaaaaaaaa",data);
            let token = utilService.createToken(userId);
            let userToken = await userTokenDao.addUserToken(userId, token);//
            let docfileName = constant.defaultdocumentName;
            let docType = constant.defaultDocument;
            console.log("ccccccccccccc",docfileName);
            let level = constant.doclevel;
            let parentId = constant.parentIdone;
            let defaultdocName = await  docNameDao.addaFile(userId, docfileName, level, docType, parentId);//
            if(data && data.length && userToken && userToken.length && defaultdocName && defaultdocName.length){
                resultObj.code = "003";
                resultObj.responsecode = "失败";
            }else{
                resultObj = utilService.responseCommon(resultObj, constant.ResponseInfo_Success);
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
/**
 * 登录
 */
registerService.prototype.iflogin = (name,password) => {
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
                resultObj = utilService.responseCommon(resultObj,constant.ResponseInfo_Success);
            }else{
                resultObj.code = "005";
                resultObj.responsecode = "重新输入密码"
            }
        }}
        resolve(resultObj);
    })
}



module.exports = registerService;