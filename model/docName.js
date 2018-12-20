const sequelize = require('../config/setting');
const Sequelize = require('Sequelize');
const UserInfo = require('../model/userInfo');
const  docName = sequelize.define('docName', {
    //用户id
    'userId': {
        'type': Sequelize.INTEGER,
        'field': 'user_Id'
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
    //文件名
    'orgname': {
        'type': Sequelize.STRING,
        'field': 'org_name'
    },
    //文件深度
    'originlevel': {
        'type': Sequelize.INTEGER,
        'field': 'origin_level'
    },
    //父节点
    'originparentid ': {
        'type': Sequelize.INTEGER,
        'field': 'origin_parent_id'
    },
    //操作时间
    'createTime ': {
        'type': Sequelize.DATE,
        'field': 'create_Time'
    },
    //文件类型
     'DocType ': {
     'type': Sequelize.INTEGER,
     'field': 'Doc_Type'
     },
    //备注
    'remark': {
        'type': Sequelize.INTEGER,
        'field': 'remark'
    }
}, {
    // 自定义表名称
    'freezeTableName': true,
    'tableName': 'doc_name',
    // 不需要时间戳
    'timestamps': false,
});
UserInfo.hasMany(docName,{foreignKey:'userId',sourceKey:'userId'});
docName.belongsTo(UserInfo,{foreignKey:'userId',targetKey:'userId'});


module.exports = docName;