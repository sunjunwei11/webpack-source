const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class InlinechunkWebpackPlugin {
    apply (compiler) {
        compiler.hooks.compilation.tap('inlinechunkWebpackPlugin', (compilation) => {
    
          // Static Plugin interface |compilation |HOOK NAME | register listener 
          HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap(
            'inlinechunkWebpackPlugin', // <-- Set a meaningful name here for stacktraces
            (assets) => {
                assets.headTags = this.getInlineChunk(assets.headTags, compilation);
                assets.bodyTags = this.getInlineChunk(assets.bodyTags, compilation);


            }
          )

          HtmlWebpackPlugin.getHooks(compilation).afterEmit.tap(
            'inlinechunkWebpackPlugin', // <-- Set a meaningful name here for stacktraces
            () => {
                Object.keys(compilation.assets).forEach(filepath => {
                    if (/runtime(.*)\.js/.test(filepath)) {
                        delete compilation.assets[filepath];
                    }
                })
            }
          )
        })
    }

    getInlineChunk(tags, compilation) {
                /**
                 * console.log(assets.headTags, assets.bodyTags);
                 *    目前：            
                    [
                    {
                      tagName: 'script',
                      voidTag: false,
                      meta: { plugin: 'html-webpack-plugin' },
                      attributes: {
                        defer: true,
                        type: undefined,
                        src: 'js/runtime-main.js4a480747ef.js'
                      }
                    }
                    ]
                  修改为：
                    [
                    {
                      tagName: 'script',
                      voidTag: false,
                        innerHTML: runtime的内容
                    }
                    ]

                 */
        return tags.map(tag => {
            if (!/runtime(.*)\.js/.test(tag?.attributes?.src)) return tag;

            return {
                tagName: 'script',
                voidTag: false,
                innerHTML: compilation.assets[tag.attributes.src].source()
            }
        });
    }
}

module.exports = InlinechunkWebpackPlugin;
