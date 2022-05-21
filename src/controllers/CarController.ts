import { NextFunction, Request, Response } from 'express';
import Controller, { RequestWithBody } from './BaseController';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';
import HttpException from '../interfaces/HttpException';
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
          ErrorCode.isRequired,
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
      const car = await this.service.readOne(id);
      if (!car) {
        throw new HttpException(ErrorCode.notFound, ErrorMessage.notFound);
      }
      return res.status(200).json(car);
    } catch (err) {
      next(err);
    }
  };
}

export default CarController;