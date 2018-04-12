const TypescriptModulesWebpackPlugin = require('../lib/TypescriptModulesWebpackPlugin');

module.exports = {
    entry: './example.js',
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new TypescriptModulesWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
}