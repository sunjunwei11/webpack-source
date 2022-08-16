class BannerWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        const options = this.options;
        compiler.hooks.emit.tap('BannerWebpackPlugin', function(compilation) {
            const jsAsset = Object.keys(compilation.assets)
                .filter(item => /\.js$/.test(item));
            jsAsset.forEach(item => {
                const preContent = compilation.assets[item].source();
                const authorInfo = `/**
                 * author ${options && options.author}
                 */
                `
                const content = authorInfo + preContent;

                compilation.assets[item] = {
                    // 最终输出的资源内容会调用source方法
                    source() {
                        return content;
                    },
                    // 资源大小
                    size() {
                        return content.length;
                    }
                }
                debugger;
            });
        });
    }
}

module.exports = BannerWebpackPlugin;
