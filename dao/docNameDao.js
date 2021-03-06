const myPromise = require('bluebird');
const docName = require('../model/docName');
const constant = require('../config/constant');
const userOption = require('../model/userOption');
const inputInfo = require('../model/inputInfo');
const docNameDao = {
    /**
     * 添加具体的文件到文件表
     */
    addaFile: (userId, docfileName, level, docType, parentId, createTime, optionType) => {
        parentId = parseInt(parentId);
        console.log("zhangjiajsjdlsjljfl", docType);
        return new myPromise((resolve, reject) => {
            try {
                docName.create({
                    userId: userId,
                    docType: docType,
                    orgname: docfileName,
                    originlevel: level,
                    originparentid: parentId,
                    // userOption: {
                    //     userId: userId,
                    //     docType: docType,
                    //     optionType: optionType,
                    //     createTime: createTime,
                    //     originparentid: parentId
                    // },
                    // inputInfo: { 
                    //     userId: userId,
                    //     originParentId: parentId,
                    //     createTime: createTime,
                    //     lastChangeTime: createTime
                    // }
                }
                // ,{
                    // include: [userOption],
                    // include: [inputInfo]
                // }
                ).then(data => {
                    return userOption.create({
                        userId: userId,
                        docType: docType,
                        optionType: optionType,
                        createTime: createTime,
                        originparentid: parentId
                    }).then(optionInfo => {
                        return inputInfo.create({
                            userId: userId,
                            originparentid: parentId,
                            createTime: createTime,
                            lastChangeTime: createTime
                        }).then(inputInfo => {
                            resolve(inputInfo);
                        })
                    })
                }, (err => {
                    console.log("3333333333", err);
                    reject(err);
                }))
            } catch (err) {
                reject(err);
            }
        })
    },
    /**
     * 获取某一文件夹的内容
     */
    findfilesParentId: (userId, parentId) => {
        return new myPromise((resolve, reject) => {
            docName.findAll({
                where: {
                    userId: userId,
                    originlevel: parentId
                }
            }).then(data => {
                resolve(data);
            }, (err => {
                reject(err);
            }))
        })
    },
    /**
     * docType有5001新建笔记5002：新建Markdowm 5003：新建模板笔记 5004 新建文件夹 5005 导入world 5006：上传文件 5007：上传文件夹
     * 对应600x代表其上操作的删除
     */
    deleteocName: (userId, fileId, docType) => {
        return new myPromise((resolve, reject) => {
            let whereParams;
            if (docType == constant.defaultDocument) {
                whereParams = {
                    origin_parent_id: 0,
                    userId: userId
                }
            } else {
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
                console.log("111111111", err);
                reject(err);
            }));
        })
    },
    /**
     * 获取某一用户的所有文件夹
     */
    findFileNamebyid: (userId) => {
        console.log("zzzzzzzzzzzz", userId);
        return new myPromise((resolve, reject) => {
            docName.findAll({
                where: {
                    user_Id: userId,
                    Doc_Type: 5004
                }
            }).then(data => {
                console.log("aaaaaaaaaaaaaa", data);
                resolve(data);
            }, (err => {
                console.log("111111111", err);
                reject(err);
            }))
        })
    },
    /**
     * 
     */
    findFileNamebyParentId: (userId, parentId) => {
        return new myPromise((resolve, reject) => {
            docName.findAll({
                where: {
                    origin_parent_id: parentId,
                    user_Id: userId
                }
            }).then(data => {
                resolve(data);
            }, (err => {
                resolve(err);
            }))
        })
    },
    /**
     * 判断是否该用户还保留初始文件夹目录
     */
    finddefaultFile: (userId) => {
        return new myPromise((resolve, reject) => {
            docName.findOne({
                where: {
                    user_Id: userId,
                    docType: constant.defaultdocType,
                    docName: constant.defaultdocumentName,
                    level: constant.levelOne
                }
            }).then(data => {
                resolve(data);
            }, (err => {
                reject(err);
            }))
        })

    },
    /**
     * 获取某一用户的某一父节点的所有文件信息
     */
    ifInTable: (userId, parentId) => {
        return new myPromise((resolve, reject) => {
            docName.findAll({
                where: {
                    userId: userId,
                    origin_parent_id: parentId,
                    Doc_Type: 5004
                }
            }).then(data => {
                resolve(data);
            }, (err => {
                reject(err);
            }))
        })
    }
}
module.exports = docNameDao;