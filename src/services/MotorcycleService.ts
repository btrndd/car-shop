import { 
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import BaseService from './BaseService';
import MotorcycleModel from '../models/MotorcycleModel';
import HttpException from '../interfaces/HttpException';
import { ErrorCode, ErrorMessage } from '../interfaces/ErrorEnum';
import { VehicleSchema } from '../interfaces/VehicleInterface';

class MotorcycleService extends BaseService<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (obj: Motorcycle) => {
    const parsedMoto = MotorcycleSchema.safeParse(obj);
    const parsedVehicle = VehicleSchema.safeParse(obj);
    if (!parsedMoto.success) {
      throw new HttpException(ErrorCode.required, parsedMoto.error.message);
    }
    if (!parsedVehicle.success) {
      throw new HttpException(
        ErrorCode.required,
        parsedVehicle.error.message,
      );
    }
    return this.model.create(obj);
  };

  readOne = async (id: string) => {
    const moto = await this.model.readOne(id);
    if (!moto) {
      throw new HttpException(ErrorCode.notFound, ErrorMessage.notFound);
    }
    return moto;
  };

  update = async (id: string, obj: Motorcycle) => {
    const parsedMoto = MotorcycleSchema.safeParse(obj);
    const parsedVehicle = VehicleSchema.safeParse(obj);
    if (!parsedMoto.success) {
      throw new HttpException(ErrorCode.required, parsedMoto.error.message);
    }
    if (!parsedVehicle.success) {
      throw new HttpException(
        ErrorCode.required,
        parsedVehicle.error.message,
      );
    }
    const moto = await this.model.update(id, obj);
    if (!moto) {
      throw new HttpException(ErrorCode.notFound, ErrorMessage.notFound);
    }
    return moto;
  };

  delete = async (id: string) => {
    const moto = await this.model.delete(id);
    if (!moto) {
      throw new HttpException(ErrorCode.notFound, ErrorMessage.notFound);
    }
    return moto;
  };
}

export default MotorcycleService;