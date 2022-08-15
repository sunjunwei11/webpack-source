const loaderUtils = require('loader-utils');

const loader = function(content) {
    // 1、根据文件内容生成hash值文件名
    const interpolatedName = loaderUtils.interpolateName(
        this,
        '[name][contenthash:6].[ext]',
        { content }
    );
    // 2、将文件输出出去
    this.emitFile(interpolatedName, content);
    // 3、返回文件名称
    console.log('interpolatedName: ', interpolatedName);
    return `module.exports = '${interpolatedName}'`;
};

// 接受的是Buffer数据
loader.raw = true;

module.exports = loader;
