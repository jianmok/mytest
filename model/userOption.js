const sequelize = require('../config/setting');
const Sequelize = require('Sequelize');
const UserInfo = require('../model/userInfo');
const  UserOption = sequelize.define('UserOption', {
    //用户id
    'userId': {
        'type': Sequelize.INTEGER,
        'field': 'user_Id',
    },  
    //文件id
    'id': {
        'type': Sequelize.INTEGER,
        'field': 'id',
        'allowNull': false, 
        'unique': true,
        'primaryKey': true,
        'autoIncrement': true 
    },
    //文件名id
    'docNameid': {
        'type': Sequelize.STRING,
        'field': 'doc_Name_id'
    },
    //文件类型（文件夹等）
    'docType': {
        'type': Sequelize.INTEGER,
        'field': 'doc_Type'
     },
    'originparentid': {
        'type': Sequelize.INTEGER,
        'field': 'origin_parent_id'
    },
    //操作类型(添加删除等)
    'optionType': {
        'type': Sequelize.INTEGER,
        'field': 'option_Type'
    },
    //操作时间
    'create_Time': {
        'type': Sequelize.INTEGER,
        'field': 'create_Time'
    },
    //备注
    'remark': {
        'type': Sequelize.STRING,
        'field': 'remark'
    }
}, {
    // 自定义表名称
    'freezeTableName': true,
    'tableName': 'user_option',
    // 不需要时间戳
    'timestamps': false,
});
UserInfo.hasMany(UserOption,{foreignKey:'userId',sourceKey:'userId'});
UserOption.belongsTo(UserInfo,{foreignKey:'userId',targetKey:'userId'});

// docName.hasOne(UserOption,{foreignKey:'id',sourceKey:'docNameid'});
// UserOption.belongsTo(docName,{foreignKey:'id',targetKey:'docNameid'});

module.exports = UserOption;