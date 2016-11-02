var coffee = require('coffee-react');
var transform = require('coffee-react-transform');
var babelJest = require("babel-jest");

module.exports = {
    process: function(src, path) {
        if (coffee.helpers.isCoffee(path)) {
            console.log(path);
            return coffee.compile(transform(src), {
                'bare': true
            });
        } else {
            console.log(path);
            return babelJest.process(src, {
                filename: path,
                stage: 0
            });
        }
    }
};
