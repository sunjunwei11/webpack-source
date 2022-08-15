var babel = require("@babel/core");

module.exports = function(content) {
    // 异步Loader
    const callback = this.async();

    const schema = {
        type: "object",
        properties: {
            presets: {
                type: 'array'
            }
        }
    }

    const options = this.getOptions(schema);

    babel.transform(content, options, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result.code);
        }
    })
    
};
