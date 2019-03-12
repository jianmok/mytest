const sequelize = require('../config/setting');
const Sequelize = require('Sequelize');
const UserInfo = require('../model/userInfo');
const inputInfo = sequelize.define('inputInfo', {
    //用户id
    'userId': {
        'type': Sequelize.INTEGER,
        'field': 'user_Id  ',
    },  
    //input表id
    'id': {
        'type': Sequelize.INTEGER,
        'field': 'id',
        'allowNull': false,
        'unique': true,
        'primaryKey': true
    },
    //文件名表地址id
    'docNameid': {
        'type': Sequelize.INTEGER,
        'field': 'doc_Name_id '
    },
    //父节点
    'originparentid ': {
        'type': Sequelize.INTEGER,
        'field': 'origin_parent_id'
    },
    //内容
    'detailInfo ': {
        'type': Sequelize.STRING,
        'field': 'detail_Info '
    },
    //操作时间
    'createTime ': {
        'type': Sequelize.DATE,
        'field': 'create_Time '
    },
    //最新操作时间
     'lastChangeTime ': {
     'type': Sequelize.DATE,
     'field': 'last_Change_Time '
     },
    //备注
    'remark': {
        'type': Sequelize.STRING,
        'field': 'remark'
    },
    //fuid
    'originParentId':{
        type: Sequelize.INTEGER,
        field: 'origin_parent_id'
    }
}, {
    // 自定义表名称
    'freezeTableName': true,
    'tableName': 't_inputinfo',
    // 不需要时间戳
    'timestamps': false,
});
UserInfo.hasMany(inputInfo,{foreignKey:'userId',sourceKey:'userId'});
inputInfo.belongsTo(UserInfo,{foreignKey:'userId',targetKey:'userId'});
module.exports = inputInfo;