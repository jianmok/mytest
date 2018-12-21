const service = require('../service/apiService');
const MyPromise = require('bluebird');
const utilService = require('../service/utilService');
const userInfoDao = require('../dao/userInfoDao');
const docNameDao = require('../dao/docNameDao');
const constant = require('../config/constant');
const userOptionDao = require('../dao/userOptionDao');
const _ = require('underscore');
const inputInfoDao = require('../dao/inputInfoDao');


function docOptionService() {
}
/**
 * 保存文件
 */
docOptionService.prototype.saveDocument = (userId,docfileName,docComment, parentId, docType, level) => {
    return new MyPromise(async(resolve, reject) => {
        let level;
        let resultObj = {};
        parseInt(docType);
        let data = docNameDao.finddefaultFile(userId);//5001,5002,5003默认存储地方
        if(data && data.length){
            utilService.dataValuesFormat(data);
            parentId = data.parentId;
            level = 2; 
        }
        if(docType == 5001){
            if(docComment && docComment.length){
                docfileName = docComment.slice(0,20);
            }
        }
        if(docType == constant.defaultDocument){
            level = 1; 
            // parentId = 0;
        }
        let createTime = new Date();
        let optionType = constant.optionTypeAdd;
        let answer = await docNameDao.addaFile(userId, docfileName, level, docType, parentId,createTime, optionType);
        if(answer && answer.length){
            resultObj = utilService.responseCommon(resultObj,ResponseInfo_Success);
            resolve(resultObj);
        }  
    })
}
/**
 * 删除文件包括文件夹和文件 
 */
docOptionService.prototype.deleteDocument = (userId,fileId, docType) => {
    return new MyPromise(async(resolve, reject) => {
        try{
            let resultObj = {};
            let data = await docNameDao.deleteocName(userId, fileId, docType);
            // resultObj.list = data;
            console.log("22222222222", data);
            if(data){  
                resultObj = utilService.responseCommon(resultObj,constant.ResponseInfo_Null);
            }else{
                resultObj = utilService.responseCommon(resultObj,constant.ResponseInfo_Success);
            }
            resolve(resultObj);
        }catch (err){
            console.log("err",err);
            resolve(err);
        }
    })
}
/**
 * 
 */
docOptionService.prototype.getDocName = (userId) => {
    return new MyPromise((resolve, reject) => {
        let resultObj = {};
        docNameDao.findFileNamebyid(userId).then(data => {
            if(data && data.length){
                resultObj.list = data;
                resultObj = utilService.responseCommon(resultObj,constant.ResponseInfo_Success);
            }else{
                resultObj = utilService.responseCommon(resultObj,constant.ResponseInfo_Null);
            }
            resolve(resultObj);
        },(err => {
            reject(err);
        }))
    })
}
/**
 * 根据文件夹id获取其中的文件（文件id、创建时间）
 */
docOptionService.prototype.getDocFile = (userId, parentId) => {
    return new MyPromise((resolve, reject) => {
        let promList = [];
        let resultObj = {};
        promList.push(docNameDao.findFileNamebyParentId(userId, parentId));
        promList.push(userOptionDao.findFilebyParentId(userId, parentId));
        myPromise.all(promList).then(data => {
            if(data && data.length){
                resultObj.list = data;
                resultObj = utilService.responseCommon(resultObj,constant.ResponseInfo_Success);
            }else{
                resultObj = utilService.responseCommon(resultObj,constant.ResponseInfo_Null)
            }
            resolve(resultObj);
        },(err => {
            reject(err);
        }))
        })
}
/**
 * 获取可用文件名
 */
docOptionService.prototype.getUsefulDocName = (userId, docfileName, parentId) => {
    return new MyPromise((resolve, reject) => {
        docNameDao.ifInTable(userId, parentId).then(data => {
            data = utilService.dataValuesFormat(data);
            let resultObj = {};
            console.log("-=======jddddds", data);
            let ifInTable = _.find(data, 'docname');
            console.log("----------------", ifInTable);
            if (ifInTable) {
                let j = 1;
                let name = constant.defaultDocument + 'j';
                let ifnewdocIn = _.find(data, 'orgname');
                if (ifnewdocIn) {
                    j ++;
                }else{
                    resultObj.orgName = name;
                }
            } else {
                resultObj.orgName = docfileName;
            }
            resultObj = utilService.responseCommon(resultObj, constant.ResponseInfo_Success);
            resolve(resultObj);
        },(err => {
            reject(err);
        }))
    })
}
/**
 * 更新文件内容
 */
docOptionService.prototype.updateDoc = (userId, fileId, comment) => {
    return new MyPromise(async(resolve, reject) => {
        let resultObj = {};
        if(fileId){
            let data = await inputInfoDao.updateDoc(userId, fileId, parentId,  comment);
                if(data && data.length){
                    resultObj = utilService.responseCommon(resultObj, constant.ResponseInfo_Success);
                }else{
                    resultObj = utilService.responseCommon(resultObj, constant.ErrorCode_Failed);
                }
        }
    },(err =>{
        reject(err);
    }))
}
/**
 * 获取文件内容
 */
docOptionService.prototype.getDocFileInfo = (userId, fileId, parentId) => {
    return new MyPromise((resolve, reject) => {
        
    })
}
module.exports = docOptionService;