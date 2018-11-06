const crypto = require('crypto'); //加载加密文件
const md5 = crypto.createHash('md5'); 
const moment = require('moment')
const config = require('../config/config');
const errorCode = require('../config/errorCode');
const constant = require('../config/constant');

const util = {
//对返回的数据进行处理后，可直接使用
    dataValuesFormat:function(data){
        data = JSON.stringify(data);
        data = JSON.parse(data);
        return data;
    },
    //md5加密
    md5Password:function(data){
        md5.update(data); 
        data = md5.digest('hex'); 
        return data;
    },
    //动态生成用户id
    createUserId:function(createTime){
        createTime = moment(createTime).unix();
        return createTime;
    },
    //生成验证的token
    createToken: function(userId) {
        var infoStr = userId + config.version + config.salt;
        var buf = new Buffer(infoStr); //解决中文不一致的BUG
        var str = buf.toString("binary");
        var md5 = crypto.createHash('md5');
        md5.update(str);
        var sign = md5.digest('hex');
        return sign;
    },
    //获得当前用户
    getCurrentUserId: function(req) {
        return (req.headers.currentuserid != '0' ? req.headers.currentuserid : null);
    },
    
    responseCommon: function(sourceObj, typeStr) {
        var result = sourceObj;
        switch (typeStr) {
            case constant.ResponseInfo_Success:
                result.responCode = errorCode.ErrorCode_Success;
                result.responMessage = errorCode.ErrorCode_Success_Message;
                break;
            case constant.ResponseInfo_Null:
                result.responCode = errorCode.ErrorCode_Null;
                result.responMessage = errorCode.ErrorCode_Null_Message;
                break;
            case constant.ResponseInfo_Failed:
                result.responCode = errorCode.ErrorCode_Failed;
                result.responMessage = errorCode.ErrorCode_Failed_Message;
                break;
            case constant.ResponseInfo_InternetError:
                result.responCode = errorCode.ErrorCode_InternetError;
                result.responMessage = errorCode.ErrorCode_InternetError_Message;
                break;
            case constant.ResponseInfo_UnknowError:
                result.responCode = errorCode.ErrorCode_UnknowError;
                result.responMessage = errorCode.ErrorCode_UnknowError_Message;
                break;
            case constant.ResponseInfo_IsLogin_No:
                result.responCode = errorCode.ErrorCode_IsLogin_No;
                result.responMessage = errorCode.ErrorCode_IsLogin_No_Meg;
                break;
            default:
                result.responCode = errorCode.ErrorCode_Success;
                result.responMessage = errorCode.ErrorCode_Success_Message;
                break;
        }
        return result;
    },
}
module.exports = (util);