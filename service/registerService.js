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
            let token = utilService.createToken(userId);
            let docfileName = constant.defaultdocumentName;
            let docType = constant.defaultDocument;//文件操作
            let level = constant.doclevel;//文件表信息
            let parentId = constant.parentIdone;//文件表信息
            let data = await userInfoDao.addUser(userId, name, trueName, password,Tel,createTime,token, docfileName,level,docType,parentId);//向用户表中插入信息
            if(data){
                resultObj = utilService.responseCommon(resultObj, constant.ResponseInfo_Success);
            }else{
                resultObj.responCode = "003";
                resultObj.responsecode = "失败";
            }
        }
        }else{
            resultObj.responCode = "001";
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
            resultObj.responCode = "001"
            resultObj.responsecode = "重新输入昵称";
        } else if (password == "null") {
            resultObj.responCode = "002";
            resultObj.responsecode = "密码为空";
        }else{
        let ifInuserTable = await userInfoDao.ifInuserTable(name);
        if(ifInuserTable == null){
            resultObj.responCode = "001"
            resultObj.responsecode = "重新输入昵称";
        }else{
            password = utilService.md5Password(password);
            let data = await userInfoDao.findifHaveuser(name, password);
            if(data != null){
                resultObj = utilService.responseCommon(resultObj,constant.ResponseInfo_Success);
            }else{
                resultObj.responCode = "005";
                resultObj.responsecode = "重新输入密码"
            }
        }}
        resolve(resultObj);
    })
}



module.exports = registerService;