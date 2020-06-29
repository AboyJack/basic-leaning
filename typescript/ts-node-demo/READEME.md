1. 初始化 package.json
`npm init -y`

2. 生成 `tsconfig.json` 文件
`npx tsconfig.json` 选择node

3. 安裝依賴
```
npm i express sequelize mysql2 morgan http-errors http-status-codes -S
npm i cross-env typescript @types/express @types/morgan @types/http-errors ts-node-dev nodemon ts-node nyc mocha @types/mocha chai @types/chai chai-http -D
```

- 使用`sequelize`
`sequelize` 是一个`基于promise`的`Node.js ORM`，目前支持 Postgresql, MySQL, SQLite 和 Microsoft SQL Server。它具有强大的事务支持，关联关系，预读和延迟加载、读取复制等功能

- `restful`
REST 就是用 `URL` 表示资源，用 `HTTP` 方法（GET, POST, PUT, DELETE）表示对这些资源做什么操作

方法 | 路径 | 名称
---|---|---
GET | /users | 查看用户列表
GET  | /users/id | 查看单个用户
POST | /users | 添加用户
PUT | /users/:id | 修改单个用户
DELETE | /users/:id | 删除单个用户