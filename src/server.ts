import CustomRouter from './routers/CustomRouter';
import App from './app';

import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController, '/cars');

server.addRouter(carRouter.router);

server.addMiddleware(errorHandlerMiddleware.manage);
server.addMiddleware(errorHandlerMiddleware.server);

export default server;
