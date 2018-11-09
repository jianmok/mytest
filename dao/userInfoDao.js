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
    /**
     * 用户注册
     * 向用户信息表添加注册信息
     */
    addUser:(userId, name,trueName, password,Tel,createTime) => {
        return new MyPromise((resolve, reject) => {
            console.log("1111111111",createTime);
            userInfo.create({
                userId: userId,
                userName: name,
                userPassword: password,
                userTrueName: trueName,
                Tel: Tel,
                createTime: createTime,
            }).then(data =>{
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
    /**
     * 判断是否密码匹配
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