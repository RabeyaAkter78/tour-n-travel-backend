/* eslint-disable prettier/prettier */
import z, { email } from 'zod'

const loginValidationSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: z.string().nonempty('Password is required'),
})

const forgetPasswordSchema = z.object({
  body: z.object({
    email: z.string().nonempty('Email is required').email(),
  }),
})

export const AuthValidation = {
  loginValidationSchema,
  forgetPasswordSchema,
}
