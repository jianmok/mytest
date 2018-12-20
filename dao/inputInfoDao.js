const userInfo = require('../model/UserInfo');
const inputInfo = require('../model/inputInfo');
var MyPromise = require('bluebird');
const inputInfoDao = {

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
}
module.exports = inputInfoDao;