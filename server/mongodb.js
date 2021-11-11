const mongoose = require('mongoose');

// 引用定义好的数据表
const schema = require('./schema');

let MongoDbAction = {};

const options = {
    db_user: "admin", // 添加的普通账户名
    db_pwd: "admin",
    db_host: "127.0.0.1",
    db_port: 27017,
    db_name: "myUser", // 数据库名称
    useNewUrlParser: true
};

// const dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
const dbURL = "mongodb://" + options.db_host + ":" + options.db_port + "/" + options.db_name;

// 连接数据库
mongoose.connect(dbURL);

// 得到数据库连接句柄
let dbHandle = mongoose.connection;

dbHandle.on('open', function (err) {
    if (err) {
        console.log('数据库连接失败');
        throw err;
    }
    console.log('数据库连接成功')
})

/**
 *
 * @param table_name 表名
 */
MongoDbAction.getConnection = function (table_name) {
    return schema[table_name];
};

/**
 * 插入多条数据
 * @param table_name 表名
 * @param insertData 插入的数据
 * @param callback 回调方法
 */

MongoDbAction.insertMany = function (table_name, insertData, callback) {
    const node_model = this.getConnection(table_name);
    console.log('node_model', node_model);
    node_model.insertMany(insertData, function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, res);
        }
    });
};

/**
 * 查询单条数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
MongoDbAction.findOne = function (table_name, conditions, callback) {
    const node_model = this.getConnection(table_name);
    node_model.findOne(conditions, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 根据_id查询指定的数据
 * @param table_name 表名
 * @param _id 可以是字符串或 ObjectId 对象。
 * @param callback 回调方法
 */
MongoDbAction.findById = function (table_name, _id, callback) {
    const node_model = this.getConnection(table_name);
    node_model.findById(_id, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 查询数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param fields 待返回字段
 * @param callback 回调方法
 */
MongoDbAction.find = function (table_name, conditions, fields, callback) {
    const node_model = this.getConnection(table_name);
    node_model.find(conditions, fields || null, {}, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 分页查询
 * @param table_name 表名
 * @param conditions 查询条件 {a:1, b:2}
 * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10}
 * @param callback 回调方法
 */
MongoDbAction.where = function (table_name, conditions, options, callback) {
    const node_model = this.getConnection(table_name);
    node_model.find(conditions)
        .skip(options.skipCount || 0)
        .sort(options.sort || {})
        .limit(options.limit || {})
        .exec(function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
};

MongoDbAction.count = function (table_name, conditions, callback) {
    const node_model = this.getConnection(table_name);
    node_model.count(conditions, function (err, total) {
        if (err) {
            callback(err);
        } else {
            callback(null, total);
        }
    });
};

/**
 * 更新单条数据
 * @param table_name 表名
 * @param conditions 查询条件  {"name":'jackson影琪'};
 * @param updateStr 更新数据 {$set: { "url" : "https://www.cnblogs.com/jackson-zhangjiang" }};
 * @param callback 回调方法
 */
MongoDbAction.updateOne = function (table_name, conditions, updateStr, callback) {
    const node_model = this.getConnection(table_name);
    node_model.updateOne(conditions, updateStr, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 更新多条数据
 * @param table_name 表名
 * @param conditions 查询条件  {"type":'1'};
 * @param updateStr 更新数据 {$set: { "url" : "https://www.cnblogs.com/jackson-zhangjiang" }};
 * @param callback 回调方法
 */
MongoDbAction.updateMany = function (table_name, conditions, updateStr, callback) {
    const node_model = this.getConnection(table_name);
    node_model.updateMany(conditions, updateStr, function (err, res) {
        if (err) {
            callback(err);
        } else {
            console.log(res.result.nModified + " 条文档被更新");
            callback(null, res);
        }
    });
};

/**
 * 删除单条数据
 * @param table_name 表名
 * @param conditions 查询条件  {"name":'jackson影琪'};
 * @param callback 回调方法
 */
MongoDbAction.deleteOne = function (table_name, conditions, callback) {
    const node_model = this.getConnection(table_name);
    node_model.deleteOne(conditions, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 删除条数据
 * @param table_name 表名
 * @param conditions 查询条件  {"type":'1'};
 * @param callback 回调方法
 */
MongoDbAction.deleteMany = function (table_name, conditions, callback) {
    const node_model = this.getConnection(table_name);
    node_model.deleteMany(conditions, function (err, res) {
        if (err) {
            callback(err);
        } else {
            console.log(obj.result.n + " 条文档被删除");
            callback(null, res);
        }
    });
};

module.exports = {
    MongoDbAction
};
