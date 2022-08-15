// 异步loader
module.exports = function(content) {
    const callback = this.async();
    console.log('async 1');

    setTimeout(() => {
        callback(null, 
            `
            ${content}
            console.log('async ok');
        `);
    }, 1000);
}
