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
    rules: [ // 规则 css-loader 负责解析 @import 这种语法
      // style-loader 把css插入到head的标签中 loader的特点 希望单一
      // loader 的用法 字符串只是用的一个loader 多个loader需要用数组[] loader的顺序默认名是从右向左执行 从下到上执行
      // loader 还可以写成对象方式 单个loader里配置其他参数
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
          options: {
            // insertAt: 'top' // 引用到最上面
          }
        }, 'css-loader']
      },
      // 处理 less 文件  sass stylus node-sass sass-loader
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader'
          },
          'css-loader',
          'less-loader' // less -> css
        ]
      },
    ]
  }
}