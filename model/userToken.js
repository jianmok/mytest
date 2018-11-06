const sequelize = require('../config/setting');
const Sequelize = require('Sequelize');
const UserInfo = require('../model/userInfo');
const  UserToken = sequelize.define('userToken', {
    //id
    'id':{
        'type': Sequelize.INTEGER,
        'field': 'id',
        'allowNull': false,
        'unique': true,
        'primaryKey': true,
        'autoIncrement': true 
    },
    //用户id
    'userId': {
        'type': Sequelize.INTEGER,
        'field': 'user_Id',
        'allowNull': false,
    },  
    'userToken':{
        type :Sequelize.STRING,
        'field': "user_Token"
    },
    //备注
    'remark': {
        'type': Sequelize.STRING,
        'field': 'remark'
    }
}, {
    // 自定义表名称
    'freezeTableName': true,
    'tableName': 't_user_token',
    // 不需要时间戳
    'timestamps': false,
});
UserInfo.hasOne(UserToken,{foreignKey:'userId',sourceKey:'userId'});
UserToken.belongsTo(UserInfo,{foreignKey:'userId',targetKey:'userId'});
module.exports = UserToken;