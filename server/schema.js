const mongoose = require('mongoose');
const { USER, } = require('./common');

const userModel = new mongoose.Schema(USER.CONFIG);

const users = mongoose.model(USER.USER_SCHEMA, userModel, USER.USER_SCHEMA);

// 导出的是表的名字，方便获取对应表的数据
module.exports = {
    users,
}