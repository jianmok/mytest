const express = require('express');
const myPromise = require('bluebird');
const constant = require('../config/constant');
const apiService = require('../service/apiService');
const utilService = require('../service/utilService');

/**
 * 根据userId获取文件夹id
 * 返回信息包括：文件id
 *              文件类型
 *              文件名  
 */
const getDoc = (req, res) => {
    const userId = utilService.getCurrentUserId(req);
    let docOptionServices = apiService.docOptionService;
    docOptionServices.getDocName(userId).then(data => {
        res.send(data);
    })
}

/**
 * 根据文件夹id获取其中的文件（文件id、创建时间）
 */
const getDocFile = (req, res) => {
    const userId = utilService.getCurrentUserId(req);
    let parentId = req.query.parentId;
    let docOptionServices = apiService.docOptionService;
    docOptionServices.getDocFile(userId, parentId).then(data => {
        res.send(data);
    })
}

/**
 * 
 * @param  docName  文件名
 * @param  docComment 文件内容
 * @param  docComment 文件类型(5001:笔记；5002：markdown; 5003:笔记模板; 5004：新建文件夹（此默认在我的文件中的我的收藏被添加）)
 * 
 * @param  option 添加或删除
 */
const newDoc = (req, res) => {
    const userId = utilService.getCurrentUserId(req);
    console.log("zhangjiaojiao",userId);
    let docfileName = req.query.docfileName;
    let docComment = req.body.docComment;
    let docType = req.query.docType;
    let parentId = req.query.parentId? parentId: null;
    let level = req.query.level? level: null;
    let docOptionServices = apiService.docOptionService;
    docOptionServices.saveDocument(userId, docfileName, docComment,parentId, docType, level).then(data => {
        res.send(data);
    }) 
}
/**
 * 删除文件包括文件夹和文件
 * @param {} req 
 * @param {*} res 
 */
const deleteDoc = (req, res) => {
    const userId = utilService.getCurrentUserId(req);
    let fileId = req.query.fileId;
    let docType = req.query.docType;
    let docOptionServices = apiService.docOptionService;
    docOptionServices.deleteDocument(userId, fileId, docType).then(data => {
        res.send(data);
    })
}
/**
 * 上传文件和文件夹
 */
const  docInput = (req,res) => {
    const userId = utilService.getCurrentUserId(req);
    console.log()
}
module.exports  = function(app, isAuthenticated) {
    var __base_path_api = constant.api_version + "/userOption"; 
    app.post(__base_path_api + '/NewDoc',isAuthenticated, newDoc);//新增文件
    app.post(__base_path_api + '/deleteDoc',deleteDoc)//删除文件
    app.get(__base_path_api + '/getDoc',getDoc)//获取文件列表信息（包括表名，表id，文件父id）
    app.get(__base_path_api + '/getDocFile',getDocFile);//（根据表id查询具体表的数据和近期操作数据
    // app.put(__base_path_api + 'saveDoc',saveDoc)//保存文件（保存按钮)
};