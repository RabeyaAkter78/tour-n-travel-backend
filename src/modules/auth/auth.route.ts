/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidation } from '../user/userValidation'
import { AuthValidation } from './auth.validation'

const authRoute = Router()

authRoute.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  AuthController.register
)
authRoute.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
)
authRoute.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordSchema),
  AuthController.forgetpassword
)
authRoute.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordSchema),
  AuthController.resetPassword
)

export default authRoute
