import express, { Router, Request, Response } from 'express';
import { User } from '../model';
let router: Router = express.Router();
// 获取所有用户 GET /users
router.get('/', async (_request: Request, response: Response) => {
  let res = await User.findAll();
  response.json({
    success: true,
    data: res
  });
});
// 获取某个用户 GET /users/:id
router.get('/:id', async (request: Request, response: Response) => {
  let id = request.params.id;
  let res = await User.findByPk(id);
  response.json({
    success: true,
    data: res
  });
});
// 添加一个用户 POST /users/:id
router.post('/', async (request: Request, response: Response) => {
  let res = request.body;
  res = await User.create(res);
  response.json({
    success: true,
    data: res
  });
});
// 更新某个用户 PUT /users/:id
router.put('/:id', async (request: Request, response: Response) => {
  let id = request.params.id;
  let updateInfo = request.body;
  let res = await User.findByPk(id);
  await res?.update(updateInfo); // update users set where id = ?
  response.json({
    success: true,
    data: res
  });
});
// 删除某个用户 DELETE /users/:id
router.delete('/:id', async (request: Request, response: Response) => {
  let id = request.params.id;
  let user = await User.findByPk(id);
  let res = await user?.destroy(); // delete from users where id = ?
  response.json({
    success: true,
    data: res
  });
});
export default router;