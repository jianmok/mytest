const sequelize = require('../config/setting');
const Sequelize = require('Sequelize');
const  UserInfo = sequelize.define('userInfo', {
    //用户id
    'userId': {
        'type': Sequelize.INTEGER,
        'field': 'user_Id  ',
        'allowNull': false,
        'unique': true,
        'primaryKey': true
    },  
    //文件id
    'id': {
        'type': Sequelize.INTEGER,
        'field': 'id '
    },
    //文件名id
    'doc_Name_id': {
        'type': Sequelize.STRING,
        'field': 'doc_Name_id '
    },
    //文件类型（文件夹等）
    'docType': {
        'type': Sequelize.INTEGER,
        'field': 'doc_Type  '
    },
    //操作时间
    'create_Time ': {
        'type': Sequelize.INTEGER,
        'field': 'create_Time '
    },
    //备注
    'remark': {
        'type': Sequelize.STRING,
        'field': 'remark'
    }
}, {
    // 自定义表名称
    'freezeTableName': true,
    'tableName': 'user_Option',
    // 不需要时间戳
    'timestamps': false,
});
module.exports = UserInfo;