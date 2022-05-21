import { Router } from 'express';
import BaseController from '../controllers/BaseController';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: BaseController<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.post(route, controller.create);
  }
}

export default CustomRouter;