const sequelize = require('../config/setting');
const Sequelize = require('Sequelize');
const inputInfo = sequelize.define('inputInfo', {
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
    //文件地址id
    'docNameid': {
        'type': Sequelize.INTEGER,
        'field': 'doc_Name_id '
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
    }
}, {
    // 自定义表名称
    'freezeTableName': true,
    'tableName': 't_inputInfo',
    // 不需要时间戳
    'timestamps': false,
});
UserInfo.hasMany(inputInfo,{primaryKey:'userId',sourceKey:'userId'});
inputInfo.belongsTo(userIndo,{primaryKey:'userId',sourceKey:'userId'});
module.exports = inputInfo;