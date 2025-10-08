/* eslint-disable prettier/prettier */
import { z } from 'zod'

const userValidationSchema = z.object({
  name: z.object({
    first: z
      .string()
      .nonempty('First name must be provided and must be a string'),
    last: z
      .string()
      .nonempty('Last name must be provided and must be a string'),
  }),

  age: z
    .number()
    .int('Age must be an integer')
    .positive('Age must be a positive number'),

  email: z.string().email('Email must be a valid email address'),

  photo: z.string().optional(),
})

export const userValidation = {
  userValidationSchema,
}
