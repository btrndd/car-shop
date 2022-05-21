import { Car, CarSchema } from '../interfaces/CarInterface';
import BaseService from './BaseService';
import CarModel from '../models/CarModel';
import HttpException from '../interfaces/HttpException';
import { ErrorCode } from '../interfaces/ErrorEnum';
import { VehicleSchema } from '../interfaces/VehicleInterface';

class CarService extends BaseService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car) => {
    const parsedCar = CarSchema.safeParse(obj);
    const parsedVehicle = VehicleSchema.safeParse(obj);
    if (!parsedCar.success) {
      throw new HttpException(ErrorCode.isRequired, parsedCar.error.message);
    }
    if (!parsedVehicle.success) {
      throw new HttpException(
        ErrorCode.isRequired,
        parsedVehicle.error.message,
      );
    }
    return this.model.create(obj);
  };
}

export default CarService;