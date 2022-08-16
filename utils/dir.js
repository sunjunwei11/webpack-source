const fs = require('fs');
const path = require('path');

function removeDir(dir) {
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.resolve(dir, file);
            const fileState = fs.statSync(filePath);
            const isDir = fileState.isDirectory()
            if (isDir) {
                removeDir(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });
        fs.rmdirSync(dir);
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    removeDir
}
