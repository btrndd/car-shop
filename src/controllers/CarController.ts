import { NextFunction, Request, Response } from 'express';
import Controller, { RequestWithBody } from './BaseController';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';
import HttpException from '../middlewares/errorHandlerMiddleware';
import { ErrorCode, ErrorMessage } from '../interfaces/ErrorEnum';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | undefined> => {
    const { body } = req;
    try {
      if (!body) {
        throw new HttpException(
          ErrorCode.required,
          ErrorMessage.requiredBody,
        );
      }
      const car = await this.service.create(body);
      return res.status(201).json(car);
    } catch (err) {
      next(err);
    }
  };

  readOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | undefined> => {
    const { id } = req.params;
    try {
      if (!id || id.length < 24) {
        throw new HttpException(ErrorCode.required, ErrorMessage.requiredId);
      }
      const car = await this.service.readOne(id);
      return res.status(200).json(car);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: RequestWithBody<Car>, res: Response, next: NextFunction):
  Promise<typeof res | undefined> => {
    const { body } = req;
    const { id } = req.params;
    try {
      if (!id || id.length < 24) {
        throw new HttpException(ErrorCode.required, ErrorMessage.requiredId);
      }
      if (!body) {
        throw new HttpException(
          ErrorCode.required,
          ErrorMessage.requiredBody,
        );
      }
      const car = await this.service.update(id, body);
      return res.status(200).json(car);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | undefined> => {
    const { id } = req.params;
    try {
      if (!id || id.length < 24) {
        throw new HttpException(ErrorCode.required, ErrorMessage.requiredId);
      }
      await this.service.delete(id);
      return res.status(204).json();
    } catch (err) {
      next(err);
    }
  };
}

export default CarController;