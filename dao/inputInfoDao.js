// const userInfo = require('../model/UserInfo');
// const inputInfo = require('../model/inputInfo');
// var MyPromise = require('bluebird');
// const inputInfoDao = {

//     findFilebyParentId:(userId, parentId) => {
//         console.log("jjjjjjjjjj",userId, parentId);
//         return new MyPromise((resolve, reject) => {
//             inputInfo.create({
//                 userId: userId,
//                 originparentid : parentId
//             }).then(data =>{
//                 resolve(data);
//             },(err => {
//                 reject(err);
//             }))
//         })
//     },
// }
// module.exports = inputInfoDao;