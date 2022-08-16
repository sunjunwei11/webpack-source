class AnalyzeWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('AnalyzeWebpackPlugin', compilation => {
            const assets = Object.entries(compilation.assets);
            let analyzeMd = `| 资源名称 | 资源大小 |
| --- | --- |`
            assets.forEach(([filename, fileinfo]) => {
                analyzeMd += `\n| ${filename} | ${Math.ceil(fileinfo.size() / 1024)}kb|`
            });
            compilation.assets['analyzeMd.md'] = {
                source() {
                    return analyzeMd;
                },
                size() {
                    return analyzeMd.length
                }
            }
        });
    }
}

module.exports = AnalyzeWebpackPlugin;
