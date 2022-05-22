import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'EngineCapacity is required',
    invalid_type_error: 'EngineCapacity must be a number',
  }).min(1, { message: 'EngineCapacity cannot be less than 1' })
    .max(2500, { message: 'EngineCapacity cannot be bigger than 7' }),
});

export type Motorcycle = Vehicle & z.infer<typeof MotorcycleSchema>;

export { MotorcycleSchema };