const express = require('express');
const myPromise = require('bluebird');
var constant = require('../config/constant');
const apiService = require('../service/apiService');
const newDoc = (req, res) => {
    // let userId = req.query.userId ? userId: null;
    let name = req.query.name;
    let trueName = req.query.trueName? trueName:null;
    let password = req.query.password;
    let Tel = req.query.Tel? Tel:null;
    let docOptionServices = apiService.docOptionService;
    docOptionServices.saveDocument(name,trueName, password,Tel).then(data => {
        res.send(data);
    }) 
}

const deleteDoc = (req, res) => {
    let name = req.query.name;
    let password = req.query.password; 
    let docOptionServices = apiService.docOptionService;
    docOptionServices.deleteDocument(name, password).then(data => {
        res.send(data);
    })
}
const getDoc = (req, res) => {
    let name = req.query.name;
    let password = req.query.password; 
    let docOptionServices = apiService.docOptionService;
    docOptionServices.deleteDocument(name, password).then(data => {
        res.send(data);
    })
}
module.exports  = function(app, isAuthenticated) {
    var __base_path_api = constant.api_version + "/userOption"; 
    app.post(__base_path_api + 'NewDoc',isAuthenticated, newDoc);//新增文件
    app.post(__base_path_api + 'deleteDoc',deleteDoc)//删除文件
    app.get(__base_path_api + 'getDoc',getDoc)//获取文件列表
    // app.put(__base_path_api + 'saveDoc',saveDoc)//保存文件（保存按钮)
};