import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface MotocycleDocument extends Motorcycle, Document {}

const MotorcycleSchema = new Schema<MotocycleDocument>(
  {
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    category: String,
    engineCapacity: Number,
  },
  { versionKey: false },
);

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('motocycles', MotorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;