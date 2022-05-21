import { Request, Response, NextFunction } from 'express';
import HttpException from '../interfaces/HttpException';

const manage = (
  err: HttpException,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorList = [404, 400, 422, 409, 401];

  const status = errorList.filter((error) => error === err.code);
  if (!status[0]) {
    return next(err);
  }
  res.status(status[0]).json({ message: err.error });
};

const server = (
  _err: HttpException,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {  
  res.status(500).json({ message: 'Something went wrong' });
  next();
};

export default { server, manage };