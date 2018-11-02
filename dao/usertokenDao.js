const userInfo = require('../model/UserInfo');
const userToken = require('../model/userToken');
var MyPromise = require('bluebird');
const userInfoDao = {

    addUserToken:(userId,token) => {
        return new MyPromise((resolve, reject) => {
            userToken.create({
                userId: userId,
                userToken: token
            }).then(data =>{
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
}
module.exports = userInfoDao;