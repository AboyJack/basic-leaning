import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

/**
 * 每个数据库都会对应一个模型 model
 * Model 里面封装了针对数据库的各种操作
 */
class User extends Model { }
User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING
}, { sequelize, modelName: 'user' });
// 把定义的模型结构同步到数据库里
// sequelize.sync().then(() => {
//   User.create({
//     username: 'zhangsan',
//     password: '123456',
//     email: 'zhangsan@163.com'
//   });
// }).then((result) => {
//   console.log(result);
// });
export {
  User
}