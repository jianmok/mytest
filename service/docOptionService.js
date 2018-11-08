const service = require('../service/apiService');
const myPromise = require('bluebird');
const utilService = require('../service/utilService');
const userInfoDao = require('../dao/userInfoDao');
const docNameDao = require('../dao/docNameDao');
const constant = require('../config/constant');
const userOptionDao = require('../dao/userOptionDao');
function docOptionService() {
}
/**
 * 保存文件
 */
docOptionService.prototype.saveDocument = (userId,docfileName,docComment, parentId, docType, level) => {
    return new myPromise(async(resolve, reject) => {
        let level;
        let resultObj = {};
        parseInt(docType);
        if(docType == 5001){
            if(docComment && docComment.length){
                docfileName = docComment.slice(0,20);
            }
        }
        if(docType == 4){
            level = 1; 
            parentId = 0;
        }else{
            level = 2;
        }

        console.log("zhang",docfileName);
        let answer = await docNameDao.addaFile(userId, docfileName, level, docType, parentId);
        if(answer && answer.length){
            resultObj = utilService.responseCommon(resultObj,ResponseInfo_Success);
            resolve(resultObj);
        }
    })
}
docOptionService.prototype.deleteDocument = (userId,fileId, docType) => {
    return new myPromise(async(resolve, reject) => {
        try{
            let resultObj = {};
            let data = await docNameDao.deleteocName(userId, fileId, docType);
            resultObj.list = data;
            // if(data && data.length){
            //     resultObj = utilService.responseCommon(resultObj,ResponseInfo_Success);
            // }
            resolve(resultObj);
        }catch (err){
            resolve(err);
        }
    })
}

docOptionService.prototype.getDocName = (userId) => {
    return new myPromise((resolve, reject) => {
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
    return new myPromise((resolve, reject) => {
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

module.exports = docOptionService;