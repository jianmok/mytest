const userInfo = require('../model/UserInfo');
var MyPromise = require('bluebird');
const _ = require('underscore');
const userToken = require('../model/userToken');
const docName = require('../model/docName');

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
     * 然后创建用户的token信息
     * 然后创建用户默认文件夹
     */
    addUser:(userId, name, trueName, password,Tel,createTime,token, docfileName,level,docType,parentId) => {
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
                return  userToken.create({
                    userId: userId,
                    userToken: token
                }).then(tokenInfo => {
                    // docType = parseInt(docType);
                    console.log("222222========================2",level,parentId, typeof(docType), typeof(level));
                    return docName.create({
                        userId: userId,
                        orgname: docfileName,
                        originlevel: level,
                        DocType: docType,    
                        originparentid : parentId
                    }).then(docNameInfo => {
                        resolve(docNameInfo);   
                    },(err => {
                        reject(err);   
                    }))
                })
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