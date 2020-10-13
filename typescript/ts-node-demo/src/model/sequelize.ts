import { Sequelize } from 'sequelize';
let env = process.env.NODE_RNV
console.log(env)
let sequelize = new Sequelize('api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // 使用的数据库
  logging: true // 不再写SQL语句 直接生成sQL语句
})

export {
  sequelize
}