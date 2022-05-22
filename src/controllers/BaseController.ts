import { NextFunction, Request, Response } from 'express';
import BaseService from '../services/BaseService';

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class BaseController<T> {
  abstract route: string;

  constructor(public service: BaseService<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T>,
    next: NextFunction
  ): Promise<typeof res | undefined>;

  read = async (
    _req: Request,
    res: Response<T[]>,
    next: NextFunction,    
  ) => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      next(err);
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction
  ): Promise<typeof res | undefined>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T>,
    next: NextFunction
  ): Promise<typeof res | undefined>;

  abstract delete(
    _req: Request,
    res: Response,
    next: NextFunction,    
  ): Promise<typeof res | undefined>;
}
export default BaseController;