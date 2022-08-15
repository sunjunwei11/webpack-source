// 同步loader
module.exports = function(content) {
    console.log('sync 2');
    this.callback(null, `
        ${content}
        console.log('hello2');
    `);
};
