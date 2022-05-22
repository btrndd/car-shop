import CustomRouter from './routers/CustomRouter';
import App from './app';

import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';
import HttpException from './middlewares/errorHandlerMiddleware';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import MotorcycleController from './controllers/MotorcycleController';

const server = new App();

const carController = new CarController();
const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController, '/cars');
server.addRouter(carRouter.router);

const motorcycleController = new MotorcycleController();
const motorcyleRouter = new CustomRouter<Motorcycle>();
motorcyleRouter.addRoute(motorcycleController, '/motorcycles');
server.addRouter(motorcyleRouter.router);

server.addMiddleware(HttpException.manage);
server.addMiddleware(HttpException.server);

export default server;
