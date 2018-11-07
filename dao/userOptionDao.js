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
}
module.exports = userOptionDao;