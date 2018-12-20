var constant = require('../config/constant');
const apiService = require('../service/apiService');
/**
 * 注册接口
 * @param {*} req 
 * @param {*} res 
 */
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
/**
 * 登录
 * @param {*} req 
 * @param {*} res 
 */
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
};