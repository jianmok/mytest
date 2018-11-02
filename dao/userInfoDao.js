const userInfo = require('../model/UserInfo');
var MyPromise = require('bluebird');
const userInfoDao = {
    ifInuserTable:(name) => {
        return new MyPromise((resolve, reject) => {
            userInfo.findOne({
                where:{
                    user_Name:name
                }
            }).then(data =>{
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },

    addUser:(userId, name,trueName, password,Tel,createTime) => {
        return new MyPromise((resolve, reject) => {
            userInfo.create({
                userId: userId,
                userName: name,
                userPassword: password,
                userTrueName: trueName,
                Tel: Tel,
                createTime: createTime,
            }).then(data =>{
                console.log("111111",data);
                console.log("222222222,",data.get({
                    plain:true
                }))
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
    /**
     * 判断是否登录
     */
    findifHaveuser:(name, password) => {
        return new MyPromise((resolve, reject) => {
            userInfo.findOne({
                where:{
                    user_Name:name,
                    user_Password: password
                }
            }).then(data =>{
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
}
module.exports = userInfoDao;