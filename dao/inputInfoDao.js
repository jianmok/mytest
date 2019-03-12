const userInfo = require('../model/UserInfo');
const inputInfo = require('../model/inputInfo');
var MyPromise = require('bluebird');
const inputInfoDao = {
    /**
     * 更新文件内容
     */
    updateDoc:(userId, fieldId, parentId, comment) => {
        console.log("jjjjjjjjjj",userId, parentId);
        return new MyPromise((resolve, reject) => {
            inputInfo.update({
                detailInfo: comment,
                where: {
                userId: userId,
                docNameId : fieldId,
                originparentid: parentId
                }
            }).then(data =>{
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
    readFile:(userId, fileId, parentId) => {
        return new MyPromise((resolve, reject) => {
            userInfo.findOne({
                where:{
                    userId: userId,
                    docNameId: fieldId,
                
                }
            })
        })
    }
}
module.exports = inputInfoDao;