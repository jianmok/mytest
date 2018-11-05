const express = require('express');
const myPromise = require('bluebird');
const constant = require('../config/constant');
const apiService = require('../service/apiService');
const utilService = require('../service/utilService');
/**
 * 
 * @param  docName  文件名
 * @param  docComment 文件内容
 * @param  docComment 文件类型(1:笔记；2：markdown; 3:笔记模板; 4：新建文件夹（此默认在我的文件中的我的收藏被添加）)
 * @param  
 */
const newDoc = (req, res) => {
    const userId = utilService.getCurrentUserId(req);
    console.log("zhangjiaojiao",userId);
    let docfileName = req.query.docfileName;
    let docComment = req.body.docComment;
    let docType = req.query.docType;
    let parentId = req.query.parentId? parentId: null;
    let docOptionServices = apiService.docOptionService;
    docOptionServices.saveDocument(userId, docfileName, docComment,parentId, docType).then(data => {
        res.send(data);
    }) 
}

const deleteDoc = (req, res) => {
    const userId = utilService.getCurrentUserId(req);
    let fileId = req.query.fileId;
    let docOptionServices = apiService.docOptionService;
    docOptionServices.deleteDocument(userId, fileId).then(data => {
        res.send(data);
    })
}
/**
 * 上传文件和文件夹
 */
const  docInput = (req,res) => {
    const userId = utilService.getCurrentUserId(req);
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getDoc = (req, res) => {
    const userId = utilService.getCurrentUserId(req);
    let name = req.query.name;
    let password = req.query.password; 
    let docOptionServices = apiService.docOptionService;
    docOptionServices.deleteDocument(name, password).then(data => {
        res.send(data);
    })
}

module.exports  = function(app, isAuthenticated) {
    var __base_path_api = constant.api_version + "/userOption"; 
    app.post(__base_path_api + '/NewDoc',isAuthenticated, newDoc);//新增文件
    app.post(__base_path_api + '/deleteDoc',deleteDoc)//删除文件
    app.get(__base_path_api + '/getDoc',getDoc)//获取文件列表
    // app.put(__base_path_api + 'saveDoc',saveDoc)//保存文件（保存按钮)
};