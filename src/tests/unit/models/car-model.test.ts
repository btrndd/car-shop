import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/CarModel';
const carModel = new CarModel();

chai.use(chaiHttp);
const { expect } = chai;

describe('Modal layer car tests', () => {

  describe('Creating a new car', () => {
    describe('When a car is created successfully', () => {
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
          .stub(carModel.model , 'create')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the correct object, including properties and values', async () => {
        const response = await carModel.create(payload)        

        expect(response).to.be.an('object');  
        expect(response).to.include.all.keys(
          'model',
          'year',
          'color',
          'buyValue',
          'seatsQty',
          'doorsQty',
          '_id',
        );
        expect(response).to.be.deep.equal(payload);
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
          .stub(carModel.model, 'findByIdAndUpdate')
          .resolves(payload as never);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the correct object, including new properties and/or new values', async () => {
        const body = {
          model: "Ferrari Maranello",
          year: 1961,
          color: "yellow",
          buyValue: 1000000,
          seatsQty: 2,
          doorsQty: 2,
          _id: '628a9deb9f9bdbad802049f0'
        }
        const id = '628a9deb9f9bdbad802049f0';
        const response = await carModel.update(id, body)        

        expect(response).to.be.an('object');  
        expect(response).to.include.all.keys(
          'model',
          'year',
          'color',
          'buyValue',
          'seatsQty',
          'doorsQty',
          '_id',
        );
        expect(response).to.be.deep.equal(body);
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
          .stub(carModel.model, 'findById')
          .resolves(payload as never);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the car with the same id', async () => {
        const id = '628a9deb9f9bdbad802049f0';
        const response = await carModel.readOne(id);
  
        expect(response).to.be.deep.equal(payload);
      });
    });
    describe('when it does not match', () => {
      before(async () => {
        sinon
          .stub(carModel.model, 'findById')
          .resolves(null);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return null', async () => {
        const id = '628a9e319f9bdbad802049f2';
        const response = await carModel.readOne(id);
  
        expect(response).to.be.null;
      });
    });
  });
  describe('Getting all cars', () => {
    describe('when there is any car', () => {
      const payload = [
        {
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          seatsQty: 2,
          doorsQty: 2,
          _id: '628a9deb9f9bdbad802049f0'
        },
        {
          model: "Porsche Boxter",
          year: 1977,
          color: "black",
          buyValue: 4500000,
          seatsQty: 2,
          doorsQty: 2,
          _id: '628a90edd21ca6ca4ce4afc8'
        }
      ]

      
      before(() => {
        sinon
          .stub(carModel.model, 'find')
          .resolves(payload as never);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return an array with all same cars', async () => {
        const response = await carModel.read();

        expect(response).to.be.an('array'); 
        expect(response).to.be.deep.equal(payload);
      });
    });
  });
  describe('Deleting a car', () => {
    describe('when the id matchs', () => {
      const payload = {
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 2,
        doorsQty: 2,
        _id: '628a9deb9f9bdbad802049f0',
      };

      
      before(() => {
        sinon
          .stub(carModel.model, 'findByIdAndDelete')
          .resolves(payload as never);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the car deleted', async () => {
        const response = await carModel.delete('628a9deb9f9bdbad802049f0');
  
        expect(response).to.be.deep.equal(payload);
      });
    });
    describe('when the id does not match', () => {
      before(async () => {
        sinon
          .stub(carModel.model, 'findByIdAndDelete')
          .resolves(null);
      });
    
      after(()=>{
        sinon.restore();
      });
    
      it('return null', async () => {
        const response = await carModel.delete('628a90edd21ca6ca4ce4afc8');
  
        expect(response).to.be.null;
      });
    });
  });
});
