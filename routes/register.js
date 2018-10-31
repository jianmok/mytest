const express = require('express');
const myPromise = require('bluebird');
var constant = require('../config/constant');
const apiService = require('../service/apiService');
const testRegister = (req, res) => {
    // let userId = req.query.userId ? userId: null;
    let name = req.query.name;
    let trueName = req.query.trueName? trueName:null;
    let password = req.query.password;
    let Tel = req.query.Tel? Tel:null;
    let registerServices = apiService.registerService;
    registerServices.loginInterface(name,trueName, password,Tel).then(data => {
        res.send(data);
    }) 
}

const register = (req, res) => {
    let name = req.query.name;
    let password = req.query.password; 
    let registerServices = apiService.registerService;
    registerServices.iflogin(name, password).then(data => {
        res.send(data);
    })
}

module.exports  = function(app) {
    var __base_path_api = constant.api_version + "/register"; 
    app.post(__base_path_api + '/testRegister', testRegister); //注册
    app.get(__base_path_api + '/register',register);//登录
    // app.post(__base_path_api + 'NewDoc',newDoc);//新增文件
    // app.post(__base_path_api + 'deleteDoc',deleteDoc)//删除文件
    //获取文件
    //保存文件（保存按钮)

};