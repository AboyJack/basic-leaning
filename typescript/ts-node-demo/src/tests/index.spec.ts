import app from '../app';
import chai, { expect } from 'chai';
describe('测试主页的restful接口', () => {
  it('GET / index', async () => {
    let result = await chai.request(app)
      .get('/');
    expect(result).to.have.status(200);
    expect(result.body).to.have.property('success');
  });
});