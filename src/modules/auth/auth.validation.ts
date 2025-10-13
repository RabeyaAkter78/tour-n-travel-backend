/* eslint-disable prettier/prettier */
import z from 'zod'

const loginValidationSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: z.string().nonempty('Password is required'),
})

export const AuthValidation = {
  loginValidationSchema,
}
