// webpack 
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: { // 开发服务器的配置
    port: 8888,
    progress: true,
    contentBase: './build',
    compress: true
  },
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径 __dirname表示当前目录下
  },
  plugins: [ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true, // 压缩至一行
      },
      hash: true
    })
  ],
  module: { // 模块
    rules: [ // 规则 css-loader 
      {
        test: /\.css$/,
        use: []
      }
    ]
  }
}