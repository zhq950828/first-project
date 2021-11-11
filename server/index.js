const express = require('express');
const { translate } = require('./translate');
const uuidv1 = require('uuid/v1');
// const { MongoDbAction } = require('./mongodb');
const { USER, dataTemplate, errorDataTemplate} = require('./common');

// const bodyParser = require('body-parser');

const app = express();

app.all('*', function (req, res, next) {
    // google需要配置，否则报错cors error
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // 允许的地址,http://127.0.0.1:9000这样的格式
    res.setHeader('Access-Control-Allow-Origin', req.get('Origin'))
    // 允许跨域请求的方法
    res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, OPTIONS, DELETE, PUT'
    )
    // 允许跨域请求header携带哪些东西
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
    )
    next();
});

// app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
    console.log('req', req);
    res.send('hello world');
})

app.post('/report', function (req, res, next) {
    console.log('req', req.method, req.url, req.body);
    res.send('ok');
    next();
}, express.json(), function (req, res) {
    console.log('req.body', req.body);
});

// app.post('/add', function (req, res, next) {
//     console.log('add', req.method, req.url, req.body);
//     res.send('ok');
//     next();
// }, express.json(), function (req, res) {
//     console.log('add.body', req.body);
//     MongoDbAction.insertMany(USER.USER_SCHEMA, {
//         ...req.body,
//         id: uuidv1().replace(/-/g, '')
//     }, (err, data) => {
//         console.log('callback', err, data);
//     });
// });

// app.get('/get', function (req, res) {
//     const params = req.query || {};
//     const {
//         pageNum = 1,
//         pageSize = 10,
//     } = params;
//     MongoDbAction.count(USER.USER_SCHEMA, {}, (err, total) => {
//         if (err) {
//             res.send({
//                 ...errorDataTemplate,
//                 msg: err
//             });
//             return;
//         }
//         MongoDbAction.where(USER.USER_SCHEMA, {}, {
//             skipCount: (pageNum - 1) * pageSize,
//             limit: parseInt(pageSize),
//             sort: {}
//         }, (err, data) => {
//             if (err) {
//                 res.send({
//                     ...errorDataTemplate,
//                     msg: err
//                 });
//                 return;
//             }
//             res.send({
//                 ...dataTemplate,
//                 data: {
//                     list: data
//                 },
//                 total,
//             });
//         })
//     })
// })

const server = app.listen(8083, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)
})