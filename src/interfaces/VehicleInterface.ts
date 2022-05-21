// model: Marca e/ou modelo do veículo. Deve ser uma string com, pelo menos, 3 caracteres;
// year: Ano de fabricação do veículo. Deve ser maior ou igual a 1900, porém menor ou igual a 2022;
// color: Cor principal do veículo. Deve ser uma string com, pelo menos, 3 caracteres;
// status: Status que define se um veículo pode ou não ser comprado. Deve receber valores booleanos e deve ser opcional;
// buyValue: Valor de compra do veículo. Deve receber apenas números inteiros;
  
import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  })
    .min(3, { message: 'Model must be 3 or more characters long' }),

  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).gte(1900, { message: 'Year must be equal or bigger than 1900' })
    .lte(2022, { message: 'Year must be equal or less than 2022' }),

  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  })
    .min(3, { message: 'Color must be 3 or more characters long' }),

  status: z.boolean({
    invalid_type_error: 'Status must be  a boolean',
  }).optional(),
  
  buyValue: z.number({
    required_error: 'Buy Value is required',
    invalid_type_error: 'Buy Value must be a number',
  }).int({ message: 'ButValue must be integer' }),
});

export type Vehicle = z.infer<typeof VehicleSchema>;