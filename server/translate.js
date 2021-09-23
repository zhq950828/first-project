const fs = require('fs');
const path = require('path');
const sourceMap = require('source-map');

const mapPath = path.join('.', 'dist', 'client.js.map');
console.log('mapPath', mapPath);

async function translate(line, column) {
    // 读取map文件，实际就是一个json文件
    const rawSourceMap = fs.readFileSync(mapPath).toString();
    // 通过sourceMap库转换为sourceMapConsumer对象
    const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
    // 传入要查找的行列数，查找到压缩前的源文件及行列数
    const sm = consumer.originalPositionFor({
        line,  // 压缩后的行数
        column  // 压缩后的列数
    });
    console.log('sm', sm);
    // 压缩前的所有源文件列表
    const sources = consumer.sources;
    // 根据查到的source，到源文件列表中查找索引位置
    const smIndex = sources.indexOf(sm.source);
    // 到源码列表中查到源代码
    const smContent = consumer.sourcesContent[smIndex];
    // 将源代码串按"行结束标记"拆分为数组形式
    const rawLines = smContent.split(/\r?\n/g);
    // 输出源码行，因为数组索引从0开始，故行数需要-1
    console.log(rawLines[sm.line - 1]);
}

// translate(4091, 5);

module.exports = {
    translate,
};