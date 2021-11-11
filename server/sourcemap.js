const fs = require("fs")
const sourceMap = require('source-map');
const _ = require("lodash")
var LruCache = require("lru-cache")
const {HttpCore} = require("http-core")
const path = require('path')
const sourceMapPath = "../../sourcemap";
let sourceMapCache = new LruCache(20);
let http = new HttpCore({
  withCredentials: false,
  timeout: 30000
});

function getFileNameByUrl(url) {
  return url.replace(/[^a-z0-9.]+|\./gi, "_")+'.bundle.map'
}

function getSourceMapObjByFileName(fileName) {
  return new Promise((resolve, reject) => {
    let filePath = path.join(__dirname, sourceMapPath, fileName);

    try {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        }
        
        resolve(new sourceMap.SourceMapConsumer(JSON.parse(data)))
      });
    } catch(err) {
      reject(err);
    }
  })
}

function getSourceMapObjByUrl(url) {
  return http.get(url, {}).then(data => {
    let fileName = getFileNameByUrl(url);
    let filePath = path.join(__dirname, sourceMapPath, fileName);

    try {
      let fileContent = JSON.stringify(data)
      fs.writeFile(filePath, fileContent, (err) => {
        err && console.log("getSourceMapObjByUrl error", err)
      });
    } catch(err) {
      console.log("getSourceMapObjByUrl JSON stringify error", err)
    }

    return new sourceMap.SourceMapConsumer(data)
  }).catch(err => {
    throw(err)
  })
}

function getRealStackLine(sourceMapObj, stackLine) {
  // 期望格式: filepath:line:column
  let stackLineBlockArr = stackLine.split(":");

  // 符合期望格式
  if (stackLineBlockArr.length >= 3 && _.isNumber(Number(stackLineBlockArr[1])) && _.isNumber(Number(stackLineBlockArr[2]))) {
    let {source, line, column, name} = sourceMapObj.originalPositionFor({
      line: Number(stackLineBlockArr[1]),
      column: Number(stackLineBlockArr[2])
    });

    if (source && line && column) {
      return [source, name, line, column].join(":")
    } else {
      return stackLine;
    }
  } else {
    return stackLine;
  }
}

function getRealStack(sourceMapObj, stack) {
    let stackArr = stack.split("\n");
    return stackArr.map(stackLine => getRealStackLine(sourceMapObj, stackLine)).join("\n");
}

function errorStackParser(url, log) {
  let fileName = getFileNameByUrl(url);
  let sourceMapObj = sourceMapCache.get(fileName);

  return new Promise(resolve => {
    // 如果缓存存在
    if (sourceMapObj) {
      resolve(sourceMapObj);

    // 如果存在本地文件
    } else if (fs.existsSync(path.join(__dirname, sourceMapPath, fileName))) {
      resolve(getSourceMapObjByFileName(fileName))

    // 如果只能从url获取
    } else {
      resolve(getSourceMapObjByUrl(url))
    }
  }).then((sourceMapObj) => {
    // 更新缓存
    sourceMapCache.set(fileName, sourceMapObj)
    // 更新错误栈
    log.data.stack = getRealStack(sourceMapObj, log.data.stack);
    return log;
  }).catch(err => {
    // 如果发生错误，则返回原本的log日志，保证日志记录无误
    console.log("errorStackParser error", err);
    return log;
  })
}

module.exports = errorStackParser;