const sequelize = require('../config/setting');
const Sequelize = require('Sequelize');
const  UserInfo = sequelize.define('userInfo', {
    //用户id
    'userId': {
        'type': Sequelize.INTEGER,
        'field': 'user_Id',
        'allowNull': false,
        'unique': true,
        'primaryKey': true
    },  
    //用户姓名
    'userTrueName': {
        'type': Sequelize.STRING,
        'field': 'user_True_Name'
    },
    //用户昵称
    'userName': {
        'type': Sequelize.STRING,
        'field': 'user_Name'
    },
    //用户密码
    'userPassword': {
        'type': Sequelize.STRING,
        'field': 'user_Password'
    },
    //电话
    'userTel ': {
        'type': Sequelize.STRING,
        'field': 'user_Tel'
    },
    //性别
    'userSex ': {
        'type': Sequelize.INTEGER,
        'field': 'user_Sex'
    },
    //创建时间
    'createTime ': {
        'type': Sequelize.BIGINT,
        'field': 'create_Time'
    },
    //最近登录时间
     'inTimes ': {
     'type': Sequelize.STRING,
     'field': 'in_Times'
     },
    //备注
    'remark': {
        'type': Sequelize.STRING,
        'field': 'remark'
    }
}, {
    // 自定义表名称
    'freezeTableName': true,
    'tableName': 't_userinfo',
    // 不需要时间戳
    'timestamps': false,
});
module.exports = UserInfo;