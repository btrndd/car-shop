import { NextFunction, Request, Response } from 'express';
import Controller, { RequestWithBody } from './BaseController';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import HttpException from '../interfaces/HttpException';
import { ErrorCode, ErrorMessage } from '../interfaces/ErrorEnum';

class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
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
      const moto = await this.service.create(body);
      return res.status(201).json(moto);
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
      const moto = await this.service.readOne(id);
      return res.status(200).json(moto);
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response, 
    next: NextFunction,
  ):
  Promise<typeof res | undefined> => {
    const { body, params: { id } } = req;
    try {
      if (!id || id.length < 24) { 
        throw new HttpException(ErrorCode.required, ErrorMessage.requiredId);
      }        
      if (!body) {
        throw new HttpException(ErrorCode.required, ErrorMessage.requiredBody);
      }
      const moto = await this.service.update(id, body);
      return res.status(200).json(moto);
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

export default MotorcycleController;