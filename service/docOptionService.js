const service = require('../service/apiService');
var myPromise = require('bluebird');
const utilService = require('../service/utilService');
const userInfoDao = require('../dao/userInfoDao');
const docNameDao = require('../dao/docNameDao');
function docOptionService() {
}
/**
 * 保存文件
 */
docOptionService.prototype.saveDocument = (userId,docfileName,docComment, parentId, docType) => {
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
        }
        let createTime = new Date();
        console.log("zhang",docfileName);
        if(parentId == null){
            parentId = 0;
        }
        let answer = await docNameDao.addaFile(userId, docfilename, level, docType, parentId,createTime);
        if(answer && answer.length){
            resultObj.responseCode == "000";
            resultObj.responMessage == "成功";
            resolve(resultObj);
        }
    })
}
docOptionService.prototype.deleteDocument = (name,fileId) => {
    return new myPromise(async(resolve, reject) => {
        try{
        let resultObj = {};
        let createTime = new Date();
        let data = await docNameDao.deleteocName(name,fileId);
        resolve(data);
    }catch (err){
        resolve(err);
    }
    })
}



module.exports = docOptionService;