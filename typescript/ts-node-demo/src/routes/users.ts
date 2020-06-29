import express, { Router, Request, Response, NextFunction } from 'express';
import { User } from '../model';
import createError from 'http-errors';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
let router: Router = express.Router();
// 获取所有用户 GET /users
router.get('/', async (_request: Request, response: Response, next: NextFunction) => {
  try {
    let res = await User.findAll();
    response.json({
      success: true,
      data: res
    });
  } catch (error) {
    next(error);
  }
});
// 获取某个用户 GET /users/:id
router.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let id = request.params.id;
    let res = await User.findByPk(id);
    response.json({
      success: true,
      data: res
    });
  } catch (error) {
    next(error);
  }
});
// 添加一个用户 POST /users/:id
router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let res = request.body;
    res = await User.create(res);
    response.json({
      success: true,
      data: res
    });
  } catch (error) {
    next(error);
  }
});
// 更新某个用户 PUT /users/:id
router.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let id = request.params.id;
    let updateInfo = request.body;
    let res = await User.findByPk(id);
    await res?.update(updateInfo); // update users set where id = ?
    response.json({
      success: true,
      data: res
    });
  } catch (error) {
    next(error);
  }
});
// 删除某个用户 DELETE /users/:id
router.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let id = request.params.id;
    let user = await User.findByPk(id);
    if (!user) {
      return next(createError(INTERNAL_SERVER_ERROR));
    }
    let res = await user?.destroy(); // delete from users where id = ?
    response.json({
      success: true,
      data: res
    });
  } catch (error) {
    next(error);
  }
});
export default router;