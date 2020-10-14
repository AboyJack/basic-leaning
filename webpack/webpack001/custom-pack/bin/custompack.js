#! /usr/bin/env node

// 该文件描述如何打包

let entry = '../../src/index.js'; // 入口文件
let output = '../../dist/main.js'; // 出口文件

let fs = require('fs');
let script = fs.readFileSync(entry, 'utf8');

let ejs = require('ejs');
let template = ``;
let result = ejs.render(template, { entry, script });
// result为替换后的结果 最后要写到output中
fs.writeFileSync(output, result);