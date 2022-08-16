const fs = require('fs');
const { removeDir } = require('../utils/dir');

class CleanwebpackPlugin {
    apply(compiler) {
        const outputPath = compiler.options.output.path;
        console.log('CleanwebpackPlugin outputPath: ', outputPath);
        compiler.hooks.emit.tap('CleanwebpackPlugin tap', (compilation) => {
            removeDir(outputPath);
        });
    }
}

module.exports = CleanwebpackPlugin;
