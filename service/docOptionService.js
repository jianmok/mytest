const service = require('../service/apiService');
var myPromise = require('bluebird');
const utilService = require('../service/utilService');
const userInfoDao = require('../dao/userInfoDao');
const docNameDao = require('../dao/docNameDao');
const constant = require('../config/constant');
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
        if(docType == 1){
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
            }
            resolve(resultObj);
        },(err => {
            reject(err);
        }))
    })
}
/**
 * 获取文件夹文档
 */
docOptionService.prototype.getDocFile = (userId, parentId) => {
    return new myPromise((resolve, reject) => {
        let resultObj = {};
        docNameDao.findFileNamebyParentId(userId, parentId).then(data => {
            if(data && data.length){
                resultObj.list = data;
                resultObj = utilService.responseCommon(resultObj,ResponseInfo_Success);
               
            }
        })
    })
}

module.exports = docOptionService;