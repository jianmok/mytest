const myPromise = require('bluebird');
const docName = require('../model/docName');

const docNameDao = {
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
    addaFile:(userId, docfilename, level, docType, parentId, createTime) => {
        return new myPromise((resolve, reject) => {
            docName.create({
                userId: userId,
                orgname: docfilename,
                originlevel: level,
                DocType: docType,
                otiginparentid: parentId,
                createTime:createTime
            }).then(data => {
                resolve(data);
            },(err => {
                reject(err);
            }))
        })
    },
    findfilesParentId:(userId, parentId) => {
        return new myPromise((resolve, reject) => {
            docName.find({
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
    deleteocName: (userId, fileId) => {
        return new myPromise((resolve, reject) => {
            docName.destroy({
                where: {
                    id: fileId,
                    userId: userId
                }
            }).then(data => {
                console.log("222222222",data);
                resolve(data);
            }, (err => {
                console.log("111111111",err);
                resolve(err);
            }))
        })
    }
}
module.exports = docNameDao;