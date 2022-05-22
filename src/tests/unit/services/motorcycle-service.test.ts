import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import MotorcycleService from '../../../services/MotorcycleService';
const motorcycleService = new MotorcycleService();
chai.use(chaiHttp);
const { expect } = chai;

describe('Service layer motorcycle tests', () => {

  describe('Creating a new motorcycle', () => {
    describe('When a motorcycle is created successfully', () => {
      const payload = {
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        category: "Street" as never,
        engineCapacity: 1000,
        _id: '628a9deb9f9bdbad802049f0'
      }
      before(async () => {
        sinon
          .stub(motorcycleService.model, 'create')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the correct object, including properties and values', async () => {
        const response = await motorcycleService.create(payload)        

        expect(response).to.be.an('object');  
        expect(response).to.include.all.keys(
          'model',
          'year',
          'color',
          'buyValue',
          'category',
          'engineCapacity',
          '_id',
        );
        expect(response).to.be.deep.equal(payload);
      });
    });
  });

  describe('Updating an existing motorcycle', () => {
    describe('When a motorcycle is updated successfully', () => {
      const payload = {
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        category: "Street" as never,
        engineCapacity: 1000,
        _id: '628a9deb9f9bdbad802049f0'
      }
      before(async () => {
        sinon
          .stub(motorcycleService.model, 'update')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the correct object, including new properties and/or new values', async () => {
        const body = {
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          category: "Street" as never,
          engineCapacity: 1000,
          _id: '628a9deb9f9bdbad802049f0'
        }
        const id = '628a9deb9f9bdbad802049f0';
        const response = await motorcycleService.update(id, body)        

        expect(response).to.be.an('object');  
        expect(response).to.include.all.keys(
          'model',
          'year',
          'color',
          'buyValue',
          'category',
          'engineCapacity',
          '_id',
        );
        expect(response).to.be.deep.equal(body);
      });
    });
  });
  describe('Getting a motorcycle by id', () => {
    describe('when id matchs', () => {
      const payload = {
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        category: "Street" as never,
        engineCapacity: 1000,
        _id: '628a9deb9f9bdbad802049f0'
      }
      before(async () => {
        sinon
          .stub(motorcycleService.model, 'readOne')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the motorcycle with the same id', async () => {
        const id = '628a9deb9f9bdbad802049f0';
        const response = await motorcycleService.readOne(id);
  
        expect(response).to.be.deep.equal(payload);
      });
    });
    describe('when it does not match', () => {
      const error = {
        error: "Id must have 24 hexadecimal characters"
      }
      before(async () => {
        sinon
          .stub(motorcycleService.model, 'readOne')
          .resolves(error as never);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return an error message', async () => {
        const id = '628a9e319f9bdbad802049f2';
        const response = await motorcycleService.readOne(id);
  
        expect(response).to.be.deep.equal(error);
      });
    });
  });
  describe('Getting all motorcycles', () => {
    describe('when there is any motorcycle', () => {
      const payload = [
        {
          model: "Ferrari Maranello",
          year: 1963,
          color: "red",
          buyValue: 3500000,
          category: "Street" as never,
          engineCapacity: 1000,
          _id: '628a9deb9f9bdbad802049f0'
        },
        {
          model: "Yamaha Fazer",
          year: 2010,
          color: "red",
          buyValue: 4500000,
          category: "Street" as never,
          engineCapacity: 150,
          _id: '6254c0411954dcc064d02fd1'
        }
      ]

      
      before(() => {
        sinon
          .stub(motorcycleService.model, 'read')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return an array with all same motorcycles', async () => {
        const response = await motorcycleService.read();

        expect(response).to.be.an('array'); 
        expect(response).to.be.deep.equal(payload);
      });
    });
  });
  describe('Deleting a motorcycle', () => {
    describe('when the id matchs', () => {
      const payload = {
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        category: "Street" as never,
        engineCapacity: 1000,
        _id: '628a9deb9f9bdbad802049f0'
      };

      
      before(() => {
        sinon
          .stub(motorcycleService.model, 'delete')
          .resolves(payload);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('return the motorcycle deleted', async () => {
        const response = await motorcycleService.delete('628a9deb9f9bdbad802049f0');
  
        expect(response).to.be.deep.equal(payload);
      });
    });
    describe('when the id does not match', () => {
      const error = {
        error: "Id must have 24 hexadecimal characters"
      }
      before(async () => {
        sinon
          .stub(motorcycleService.model, 'delete')
          .resolves(error as never);
      });
    
      after(()=>{
        sinon.restore();
      });
    
      it('return error message', async () => {
        const response = await motorcycleService.delete('628a90edd21ca6ca4ce4afc8');
  
        expect(response).to.be.deep.equal(error);
      });
    });
  });
});
