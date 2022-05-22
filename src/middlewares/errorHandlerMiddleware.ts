import { Request, Response, NextFunction } from 'express';
import HttpExceptionInterface from '../interfaces/HttpExceptionInterface';

class HttpException extends Error implements HttpExceptionInterface {
  code: number;

  error: string;

  constructor(code: number, error: string) {
    super();
    this.code = code;
    this.error = error;
  }

  static manage(
    err: HttpException,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const errorList = [404, 400, 422, 409, 401];

    const status = errorList.filter((error) => error === err.code);
    if (!status[0]) {
      return next(err);
    }
    res.status(status[0]).json({ error: err.error });
  }

  static server(
    _err: HttpException,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {  
    res.status(500).json({ error: 'Something went wrong' });
    next();
  }
}

export default HttpException;