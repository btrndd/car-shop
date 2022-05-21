import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z.number({
    required_error: 'DoorsQty is required',
    invalid_type_error: 'DoorsQty must be a number',
  })
    .gte(2, { message: 'DoorsQty must be equal or bigger than 2' })
    .lte(4, { message: 'DoorsQty must be equal or less than 4' }),

  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  })
    .gte(2, { message: 'seatsQty must be equal or bigger than 2' })
    .lte(7, { message: 'seatsQty must be equal or less than 4' }),
});

export type Car = Vehicle & z.infer<typeof CarSchema>;

export { CarSchema };