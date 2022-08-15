// 同步loader
module.exports = function(content) {
    const schema = {
        type: 'object',
        properties: {
            author: {
                type: 'string'
            }
        }
    };

    const options = this.getOptions(schema);

    console.log('sync 1', options.author);

    return `
        ${content}
        console.log('hello ${options.author}');
    `
};
