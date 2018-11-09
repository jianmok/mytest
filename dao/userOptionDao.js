const userOption = require('../model/userOption');
const MyPromise = require('bluebird');
const userOptionDao = {

    findFilebyParentId:(userId, parentId) => {
        console.log("jjjjjjjjjj",userId, parentId);
        return new MyPromise((resolve, reject) => {
            userOption.create({
                userId: userId,
                originparentid : parentId,
                create_Time :{
                    $gt:90
                }
            }).then(data =>{
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
    /**
     * 添加用户操作信息
     */
    adduserOption:(userId, docNameid, optionType, docType) => {
        return new MyPromise((resolve, reject) => {
            userOption.create({
                userId: userId,
                docNameid: docNameid,
                docType:docType,
                optionType: optionType
            }).then(data => {
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    }


}
module.exports = userOptionDao;