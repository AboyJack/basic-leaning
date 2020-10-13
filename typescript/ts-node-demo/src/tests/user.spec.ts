import app from '../app';
import chai, { expect } from 'chai';
describe('测试用户的restful接口', () => {
  it('POST /users 添加用户', async () => {
    let result = await chai.request(app)
      .post('/users') // 以POST方法请求/users路径
      .set('Content-Type', 'application/json') // 设置请求头的类型
      .send({ username: 'zhangsan', password: '123456', email: 'zhangsan@163.com' });
    expect(result).to.have.status(200);
    expect(result.body).to.have.property('success');
    expect(result.body.success).to.equal(true);
    expect(result.body.data.id).to.equal(1);
  });
  it('GET /users 查看所有用户', async () => {
    await chai.request(app)
      .post('/users') // 以POST方法请求/users路径
      .set('Content-Type', 'application/json') // 设置请求头的类型
      .send({ username: 'zhangsan', password: '123456', email: 'zhangsan@163.com' });
    await chai.request(app)
      .post('/users') // 以POST方法请求/users路径
      .set('Content-Type', 'application/json') // 设置请求头的类型
      .send({ username: 'lisi', password: '123456', email: 'lisi@163.com' });
    let result = await chai.request(app)
      .get('/users');
    expect(result).to.have.status(200);
    expect(result.body.success).to.equal(true);
    expect(result.body.data).to.have.lengthOf(2);
  });
  it('PUT /users/:id 更新用户', async () => {
    let res1 = await chai.request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({ username: 'zhangsan', password: '123456', email: 'zhangsan@163.com' });
    await chai.request(app)
      .put(`/users/${res1.body.data.id}`)
      .set('Content-Type', 'application/json')
      .send({ username: 'lisi', password: '56789', email: 'lisi@163.com' });
    let result = await chai.request(app)
      .get(`/users/${res1.body.data.id}`);
    expect(result).to.have.status(200);
    expect(result.body.success).to.equal(true);
    expect(result.body.data.username).to.equal('lisi');
    expect(result.body.data.password).to.equal('56789');
    expect(result.body.data.email).to.equal('lisi@163.com');
  });
  it('DELETE /users/:id 删除用户', async () => {
    await chai.request(app)
      .post('/users') // 以POST方法请求/users路径
      .set('Content-Type', 'application/json') // 设置请求头的类型
      .send({ username: 'zhangsan', password: '123456', email: 'zhangsan@163.com' });
    await chai.request(app)
      .post('/users') // 以POST方法请求/users路径
      .set('Content-Type', 'application/json') // 设置请求头的类型
      .send({ username: 'lisi', password: '123456', email: 'lisi@163.com' });
    await chai.request(app)
      .delete('/users/2');
    let result = await chai.request(app)
      .get('/users');
    expect(result).to.have.status(200);
    expect(result.body.success).to.equal(true);
    expect(result.body.data).to.have.lengthOf(1);
  });
});