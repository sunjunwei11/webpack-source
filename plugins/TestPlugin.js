/**
 * 执行流程
 * 1、加载webpack.config.js，会执行所有插件的new，会执行所有constructor
 * 2、webpack创建complier对象
 * 3、遍历所有插件，执行插件的apply方法
 * 4、在后面的编译流程中触发对应的hooks方法
 */

class TestPlugin {
    constructor() {
        console.log('TestPlugin constructor');
    }

    apply(compiler) {
        console.log('TestPlugin apply');
        // environment是同步钩子，只能使用tap
        compiler.hooks.environment.tap('MyPlugin', () => {
            console.log('TestPlugin environment tap');
        });

        // make是异步并行钩子
        compiler.hooks.make.tap('MyPlugin', () => {
            console.log('TestPlugin make tap');
        });

        compiler.hooks.make.tapAsync('MyPlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin make tapAsync 1000ms');
                callback();
            }, 1000);
        });

        compiler.hooks.make.tapPromise('MyPlugin', (compilation, callback) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('TestPlugin make Promise 900ms');
                    resolve();
                }, 900);
            });
        });

        // emit 异步串行钩子
        compiler.hooks.emit.tap('MyPlugin', () => {
            console.log('TestPlugin emit tap');
        });

        compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin emit tapAsync 1000ms');
                callback();
            }, 1000);
        });

        compiler.hooks.emit.tapPromise('MyPlugin', (compilation, callback) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('TestPlugin emit Promise 900ms');
                    resolve();
                }, 900);
            });
        });
    }
}

module.exports = TestPlugin;
