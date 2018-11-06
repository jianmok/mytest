const myPromise = require('bluebird');
const docName = require('../model/docName');
const constant = require('../config/constant');
const docNameDao = {

    /**
     * 添加具体的文件到文件名表
     */
    adddocName:(userId, docfilename, level, docType, parentId) => {
        parseInt(docType);
        return new myPromise((resolve, reject) => {
            docName.create({
                userId: userId,
                orgname: docfilename,
                originlevel: level,
                DocType: docType,
                otiginparentid: parentId
            }).then(data => {
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
    /**
     * 添加具体的文件到文件表（与上面操作可合起来）
     */
    addaFile:(userId, docfilename, level, docType, parentId) => {
        let createTime = new Date();
        console.log("zhangjiajsjdlsjljfl",typeof(createTime),level,parentId, docType);
        return new myPromise((resolve, reject) => {
            docName.create({
                userId: userId,
                orgname: docfilename,
                originlevel: level,
                DocType: docType,
                originparentid : parentId,
                create_Time : createTime
            }).then(data => {
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
    /**
     * 
     */
    findfilesParentId:(userId, parentId) => {
        return new myPromise((resolve, reject) => {
            docName.findAll({
                where:{
                    userId: userId,
                    originlevel :parentId
                }
            }).then(data => {
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
    /**
     * docType有5001新建笔记5002：新建Markdowm 5003：新建模板笔记 5004 新建文件夹 5005 导入world 5006：上传文件 5007：上传文件夹
     * 对应600x代表其上操作的删除
     */
    deleteocName: (userId, fileId,docType) => {
        return new myPromise((resolve, reject) => {
            let whereParams;
            if(docType == constant.defaultDocument){
                whereParams = {
                    origin_parent_id: 0,
                    userId: userId
                }
            }else{
                whereParams = {
                    id: fileId,
                    userId: userId
                }
            }
            docName.destroy({
                where: whereParams
            }).then(data => {
                console.log(data);
                resolve(data);
            }, (err => {
                console.log("111111111",err);
                reject(err);
            }));
        })
    },
    findFileNamebyid:(userId) => {
        console.log("zzzzzzzzzzzz", userId);
        return new myPromise((resolve, reject) => {
            docName.findAll({
                where: {
                    user_Id: userId,
                    Doc_Type : 5004
                }
            }).then(data => {
                resolve(data);
            },(err => {
                console.log("111111111",err);
                reject(err);
            }))
        })
    }
}
module.exports = docNameDao; 