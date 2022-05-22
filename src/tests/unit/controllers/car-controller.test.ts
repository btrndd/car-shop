import { NextFunction, Request, Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarController from '../../../controllers/CarController';
import { Car } from '../../../interfaces/CarInterface';
import server from '../../../server';
const carController = new CarController();
const request = {} as Request;
const response = {} as Response;
function next(): NextFunction {
  const result = {} as NextFunction;
  return result;
}
// const app = server.startServer();
const { expect } = chai;
chai.use(chaiHttp);

const mockResponse = () => {
  const res = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2,
    _id: '628a9deb9f9bdbad802049f0',
  } as unknown as Response;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};
const mockRequest = () => {
  const req = {} as Request;
  req.params = { id: '628a9deb9f9bdbad802049f0' };
  req.body = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2,
  };
  return req;
};

describe('Controller layer car tests', () => {

  describe('Creating a new car', () => {
    describe('When a car is created successfully', () => {
      const payload = {
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          seatsQty: 2,
          doorsQty: 2,
          _id: '628a9deb9f9bdbad802049f0',
        };
      
      before(async () => {
        sinon
          .stub(carController.service, 'create')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return status 201 and the correct and object, including properties and values', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const result = await carController.create(req, res, next);
          expect(result?.json()).to.include.all.keys(
            'model',
            'year',
            'color',
            'buyValue',
            'seatsQty',
            'doorsQty',
            '_id',
          );
        expect((result?.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
      });
    });
  });

  describe('Updating an existing car', () => {
    describe('When a car is updated successfully', () => {
      const payload = {
        model: "Ferrari Maranello",
        year: 1961,
        color: "yellow",
        buyValue: 1000000,
        seatsQty: 2,
        doorsQty: 2,
        _id: '628a9deb9f9bdbad802049f0'
      }
      before(async () => {
        sinon
          .stub(carController.service, 'update')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the correct object, including new properties and/or new values', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const result = await carController.update(req, res, next)

        expect(result?.json()).to.include.all.keys(
          'model',
          'year',
          'color',
          'buyValue',
          'seatsQty',
          'doorsQty',
          '_id',
        );
        expect((result?.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      });
    });
  });
  describe('Getting a car by id', () => {
    describe('when id matchs', () => {
      const payload = {
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 2,
        doorsQty: 2,
        _id: '628a9deb9f9bdbad802049f0'
      }
      before(async () => {
        sinon
          .stub(carController.service, 'readOne')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the car with the same id', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const result = await carController.readOne(req, res, next);
  
        expect(result?.json()).to.include.all.keys(
          'model',
          'year',
          'color',
          'buyValue',
          'seatsQty',
          'doorsQty',
          '_id',
        );
        expect((result?.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      });
    });
    // describe('when it does not match', () => {
    //   const error = {
    //     error: "Id must have 24 hexadecimal characters"
    //   }
    //   before(async () => {
    //     sinon
    //       .stub(carController.model, 'readOne')
    //       .resolves(error as never);
    //   });
    
    //   after(()=>{
    //     sinon.restore();
    //   })
    
    //   it('return an error message', async () => {
    //     const id = '628a9e319f9bdbad802049f2';
    //     const result = await carController.readOne(id);
  
    //     expect(result).to.be.deep.equal(error);
    //   });
    // });
  });
  // describe('Getting all cars', () => {
  //   describe('when there is any car', () => {
  //     const payload = [
  //       {
  //         model: "Ferrari Maranello",
  //         year: 1963,
  //         color: "red",
  //         buyValue: 3500000,
  //         seatsQty: 2,
  //         doorsQty: 2,
  //         _id: '628a9deb9f9bdbad802049f0'
  //       },
  //       {
  //         model: "Porsche Boxter",
  //         year: 1977,
  //         color: "black",
  //         buyValue: 4500000,
  //         seatsQty: 2,
  //         doorsQty: 2,
  //         _id: '628a90edd21ca6ca4ce4afc8'
  //       }
  //     ]

      
  //     before(() => {
  //       sinon
  //         .stub(carController.model, 'read')
  //         .resolves(payload);
  //     });
    
  //     after(()=>{
  //       sinon.restore();
  //     })
    
  //     it('return an array with all same cars', async () => {
  //       const result = await carController.read();

  //       expect(result).to.be.an('array'); 
  //       expect(result).to.be.deep.equal(payload);
  //     });
  //   });
  // });
  // describe('Deleting a car', () => {
  //   describe('when the id matchs', () => {
  //     const payload = {
  //       model: "Ferrari Maranello",
  //       year: 1963,
  //       color: "red",
  //       buyValue: 3500000,
  //       seatsQty: 2,
  //       doorsQty: 2,
  //       _id: '628a9deb9f9bdbad802049f0',
  //     };

      
  //     before(() => {
  //       sinon
  //         .stub(carController.model, 'delete')
  //         .resolves(payload);
  //     });
    
  //     after(()=>{
  //       sinon.restore();
  //     })
    
  //     it('return the car deleted', async () => {
  //       const result = await carController.delete('628a9deb9f9bdbad802049f0');
  
  //       expect(result).to.be.deep.equal(payload);
  //     });
  //   });
  //   describe('when the id does not match', () => {
  //     const error = {
  //       error: "Id must have 24 hexadecimal characters"
  //     }
  //     before(async () => {
  //       sinon
  //         .stub(carController.model, 'delete')
  //         .resolves(error as never);
  //     });
    
  //     after(()=>{
  //       sinon.restore();
  //     });
    
  //     it('return error message', async () => {
  //       const result = await carController.delete('628a90edd21ca6ca4ce4afc8');
  
  //       expect(result).to.be.deep.equal(error);
  //     });
  //   });
  // });
});
