const USER = {
    USER_SCHEMA: 'users',
    CONFIG: {
        "id": "String",
        "name": "String",
        "description": "String"
    }
};

function analyseUrl(url) {
    if (!url) return;
    let queryStr = url.split('?')[1];
    let queryArr = queryStr.split('&');
    let obj = {};
    queryArr.forEach(v => {
        let str = v.split('=');
        let name = str[0];
        let value = str[1];
        obj[name] = value;
    });
    return obj;
}

const dataTemplate = {
    code: 200,
    data: {},
    msg: 'ok'
}

const errorDataTemplate = {
    code: 400,
    data: {},
    msg: ''
};

module.exports = {
    USER,
    analyseUrl,
    dataTemplate,
    errorDataTemplate
}